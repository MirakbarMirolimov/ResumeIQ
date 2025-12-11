'use client'

import { useState, useEffect } from 'react'
import { AuthService } from '../../lib/auth'
import { UserService } from '../../lib/user-service'
import { SubscriptionService } from '../../lib/subscription-service'
import LandingPage from './landing/LandingPage'
import Dashboard from './dashboard/Dashboard'
import AuthForm from './auth/AuthForm'

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check for existing session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        setShowAuth(false)
        
        // Ensure user record exists in our database
        const existingUser = await UserService.getUserById(session.user.id)
        if (!existingUser) {
          await UserService.createUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name
          })
        }

        // Create free subscription if user doesn't have one
        const subscription = await SubscriptionService.getUserSubscription(session.user.id)
        if (!subscription) {
          await SubscriptionService.createSubscription(session.user.id, 'free')
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setShowAuth(false)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartOnboarding = () => {
    if (user) {
      // User is authenticated, show onboarding or dashboard
      setShowOnboarding(true)
    } else {
      // User needs to sign up/in first
      setShowAuth(true)
    }
  }

  const handleAuthSuccess = () => {
    setShowAuth(false)
    // User will be set via the auth state change listener
  }

  const handleSignOut = () => {
    setUser(null)
    setShowOnboarding(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading ResumeIQ...</p>
        </div>
      </div>
    )
  }

  // Show dashboard if user is authenticated and email is confirmed
  if (user && user.email_confirmed_at) {
    return <Dashboard onSignOut={handleSignOut} />
  }

  // Show auth form if requested
  if (showAuth) {
    return (
      <AuthForm 
        onSuccess={handleAuthSuccess}
        onClose={() => setShowAuth(false)}
      />
    )
  }

  // Show landing page by default
  return (
    <LandingPage onStartOnboarding={handleStartOnboarding} />
  )
}
