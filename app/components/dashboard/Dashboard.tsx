'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AuthService } from '../../../lib/auth'
import { UserService } from '../../../lib/user-service'
import { User as UserType } from '../../../lib/types/user'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

interface DashboardProps {
  onSignOut: () => void
}

export default function Dashboard({ onSignOut }: DashboardProps) {
  const [user, setUser] = useState<UserType | null>(null)
  const [authUser, setAuthUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser()
      if (currentUser) {
        setAuthUser(currentUser)
        const userData = await UserService.getUserById(currentUser.id)
        setUser(userData)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await AuthService.signOut()
    onSignOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        authUser={authUser}
        onSignOut={handleSignOut}
      />
      
      {/* Main Content */}
      <MainContent 
        user={user}
        authUser={authUser}
      />
    </div>
  )
}
