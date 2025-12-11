'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Shield, Check } from 'lucide-react'
import { useState } from 'react'
import { saveOnboardingData } from '@/lib/onboarding-service'

// Custom Google Icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// Custom Microsoft Icon
const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M13 1h10v10H13z"/>
    <path fill="#7FBA00" d="M1 13h10v10H1z"/>
    <path fill="#FFB900" d="M13 13h10v10H13z"/>
  </svg>
)

interface AccountScreenProps {
  onboardingData: {
    userType: string
    purpose: string
    source: string
  }
  sessionId: string
  onBack: () => void
}

export default function AccountScreen({ onboardingData, sessionId, onBack }: AccountScreenProps) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  const handleAccountCreation = async (method: string) => {
    setIsCreatingAccount(true)
    
    try {
      // Save onboarding data to Supabase
      const result = await saveOnboardingData({
        session_id: sessionId,
        user_type: onboardingData.userType,
        purpose: onboardingData.purpose,
        source: onboardingData.source,
        account_method: method
      })

      if (result.success) {
        console.log('Onboarding data saved successfully:', result.data)
        // Simulate account creation process
        setTimeout(() => {
          console.log('Account created with:', method)
          // Here you would typically redirect to the main app
          // For now, we'll just show the success message
        }, 2000)
      } else {
        console.error('Failed to save onboarding data:', result.error)
        // Still proceed with account creation even if data saving fails
        setTimeout(() => {
          console.log('Account created with:', method, '(data save failed)')
        }, 2000)
      }
    } catch (error) {
      console.error('Error during account creation:', error)
      // Still proceed with account creation
      setTimeout(() => {
        console.log('Account created with:', method, '(with errors)')
      }, 2000)
    }
  }

  if (isCreatingAccount) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
              <Check className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Welcome aboard! 🚀
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          >
            Setting up your personalized experience...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-3"
          >
            {[
              'Analyzing your profile...',
              'Preparing AI recommendations...',
              'Setting up your workspace...'
            ].map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.3, duration: 0.5 }}
                className="flex items-center space-x-3 text-gray-700"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-md w-full">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Save your progress?
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Create an account to save your resume and access it anytime.
          </p>
        </motion.div>

        {/* Account Options */}
        <div className="space-y-4">
          {/* Google */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAccountCreation('google')}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 group"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
              <GoogleIcon />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
              Continue with Google
            </span>
          </motion.button>

          {/* Email */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAccountCreation('email')}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 group"
          >
            <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
              Continue with Email
            </span>
          </motion.button>

          {/* Microsoft */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAccountCreation('microsoft')}
            className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 group"
          >
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-sm">
              <MicrosoftIcon />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
              Continue with Microsoft
            </span>
          </motion.button>
        </div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-200 dark:border-slate-700"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                Your data is secure
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                We use industry-standard encryption to protect your information. 
                Your resume data is never shared with third parties.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skip Option */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => handleAccountCreation('skip')}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium transition-colors duration-200"
          >
            Skip for now
          </button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mt-12"
        >
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  step === 4 ? 'bg-blue-500' : 'bg-blue-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
