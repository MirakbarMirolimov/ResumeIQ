'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Check, X, Loader2 } from 'lucide-react'
import { UserService } from '../../../lib/user-service'

interface UsernamePromptProps {
  userId: string
  onSuccess: (username: string) => void
  onSkip?: () => void
}

export default function UsernamePrompt({ userId, onSuccess, onSkip }: UsernamePromptProps) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  const checkUsernameAvailability = async (value: string) => {
    if (value.length < 3) {
      setIsAvailable(null)
      return
    }

    setChecking(true)
    try {
      const available = await UserService.isUsernameAvailable(value)
      setIsAvailable(available)
    } catch (error) {
      console.error('Error checking username:', error)
      setIsAvailable(false)
    } finally {
      setChecking(false)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
    setUsername(value)
    setError('')
    
    // Debounce the availability check
    setTimeout(() => checkUsernameAvailability(value), 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    if (isAvailable === false) {
      setError('Username is already taken')
      return
    }

    setLoading(true)
    setError('')

    try {
      const updatedUser = await UserService.setUsername(userId, username)
      if (updatedUser) {
        onSuccess(username)
      } else {
        setError('Failed to set username. Please try again.')
      }
    } catch (error) {
      setError('Username is already taken or invalid')
    } finally {
      setLoading(false)
    }
  }

  const getInputBorderColor = () => {
    if (username.length < 3) return 'border-slate-600'
    if (checking) return 'border-yellow-500'
    if (isAvailable === true) return 'border-emerald-500'
    if (isAvailable === false) return 'border-red-500'
    return 'border-slate-600'
  }

  const getStatusIcon = () => {
    if (username.length < 3) return null
    if (checking) return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
    if (isAvailable === true) return <Check className="w-5 h-5 text-emerald-500" />
    if (isAvailable === false) return <X className="w-5 h-5 text-red-500" />
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-slate-900 rounded-2xl border border-slate-700 p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Choose Your Username
          </h2>
          <p className="text-gray-400">
            This will be displayed in your dashboard and can be changed later
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={`w-full pl-10 pr-12 py-3 bg-slate-800 border ${getInputBorderColor()} rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors`}
                placeholder="Enter your username"
                minLength={3}
                maxLength={20}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getStatusIcon()}
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {username.length < 3 ? (
                'Username must be at least 3 characters'
              ) : isAvailable === true ? (
                <span className="text-emerald-400">Username is available!</span>
              ) : isAvailable === false ? (
                <span className="text-red-400">Username is already taken</span>
              ) : checking ? (
                'Checking availability...'
              ) : (
                'Only lowercase letters, numbers, and underscores allowed'
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            <motion.button
              type="submit"
              disabled={loading || isAvailable !== true}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span>Set Username</span>
              )}
            </motion.button>

            {onSkip && (
              <motion.button
                type="button"
                onClick={onSkip}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors rounded-xl border border-slate-600 hover:border-slate-500"
              >
                Skip
              </motion.button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            You can always change your username later in settings
          </p>
        </div>
      </motion.div>
    </div>
  )
}
