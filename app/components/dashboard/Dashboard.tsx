'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, LogOut, FileText, BarChart3, Crown } from 'lucide-react'
import { AuthService } from '../../../lib/auth'
import { UserService } from '../../../lib/user-service'
import { User as UserType } from '../../../lib/types/user'
import CreditDisplay from '../credits/CreditDisplay'
import CreditPurchase from '../credits/CreditPurchase'

interface DashboardProps {
  onSignOut: () => void
}

export default function Dashboard({ onSignOut }: DashboardProps) {
  const [user, setUser] = useState<UserType | null>(null)
  const [authUser, setAuthUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreditPurchase, setShowCreditPurchase] = useState(false)

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

  const handleCreditPurchase = async (packageId: string) => {
    // This would integrate with your payment processor
    console.log('Purchase package:', packageId)
    // For now, just close the modal
    setShowCreditPurchase(false)
  }

  const getSubscriptionPlan = () => {
    if (!user) return 'Free'
    // This would be determined by actual subscription data
    // For now, return based on credits or other logic
    return 'Free'
  }

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'Pro': return 'text-purple-400'
      case 'Premium': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ResumeIQ</h1>
                <p className="text-sm text-gray-400">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <CreditDisplay 
                userId={user?.id}
                onPurchaseClick={() => setShowCreditPurchase(true)}
              />
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium">{user?.full_name || authUser?.email}</p>
                  <p className="text-sm text-gray-400">{authUser?.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.full_name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="text-gray-400">
            Ready to create your next professional resume?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{user?.credits || 0}</p>
                <p className="text-gray-400">Credits Available</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{getSubscriptionPlan()}</p>
                <p className="text-gray-400">Current Plan</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-gray-400">Resumes Created</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white text-left group"
            >
              <FileText className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Create New Resume</h4>
              <p className="text-sm opacity-90">Start building a professional resume with AI assistance</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white text-left group hover:border-slate-500/50 transition-colors"
            >
              <BarChart3 className="w-8 h-8 mb-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Analyze Resume</h4>
              <p className="text-sm text-gray-400">Get AI-powered feedback on your existing resume</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreditPurchase(true)}
              className="p-6 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white text-left group hover:border-slate-500/50 transition-colors"
            >
              <Crown className="w-8 h-8 mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold mb-2">Upgrade Plan</h4>
              <p className="text-sm text-gray-400">Get more credits and premium features</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Account Status */}
        {!authUser?.email_confirmed_at && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-yellow-400 font-medium">Email Verification Pending</h4>
                <p className="text-sm text-gray-400">
                  Please check your email and click the verification link to activate all features.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Credit Purchase Modal */}
      <CreditPurchase
        isOpen={showCreditPurchase}
        onClose={() => setShowCreditPurchase(false)}
        onPurchase={handleCreditPurchase}
      />
    </div>
  )
}
