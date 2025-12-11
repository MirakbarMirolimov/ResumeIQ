'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Target, TrendingUp, FileText, BarChart } from 'lucide-react'
import { useState } from 'react'

interface PurposeScreenProps {
  onNext: (purpose: string) => void
  onBack: () => void
}

export default function PurposeScreen({ onNext, onBack }: PurposeScreenProps) {
  const [selectedPurpose, setSelectedPurpose] = useState('')

  const purposes = [
    {
      id: 'create-new',
      icon: Sparkles,
      emoji: '✨',
      title: 'Create a New Resume',
      description: 'Start fresh with AI-powered content',
      popular: true
    },
    {
      id: 'tailor-job',
      icon: Target,
      emoji: '🎯',
      title: 'Tailor My Resume for a Job',
      description: 'Optimize for a specific position',
      popular: false
    },
    {
      id: 'improve-existing',
      icon: TrendingUp,
      emoji: '📈',
      title: 'Improve My Existing Resume',
      description: 'Enhance what you already have',
      popular: false
    },
    {
      id: 'cover-letter',
      icon: FileText,
      emoji: '📝',
      title: 'Generate a Cover Letter',
      description: 'Create compelling cover letters',
      popular: false
    },
    {
      id: 'ats-score',
      icon: BarChart,
      emoji: '📊',
      title: 'Get an ATS Score',
      description: 'Analyze resume compatibility',
      badge: 'Coming Soon'
    }
  ]

  const handleSelect = (purposeId: string) => {
    if (purposeId === 'ats-score') return // Disabled for now
    setSelectedPurpose(purposeId)
    setTimeout(() => onNext(purposeId), 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-2xl w-full">
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
            What would you like to do?
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose one — you can always switch later.
          </p>
        </motion.div>

        {/* Options */}
        <div className="space-y-4">
          {purposes.map((purpose, index) => {
            const Icon = purpose.icon
            const isDisabled = purpose.id === 'ats-score'
            
            return (
              <motion.button
                key={purpose.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={!isDisabled ? { scale: 1.01, x: 4 } : {}}
                whileTap={!isDisabled ? { scale: 0.99 } : {}}
                onClick={() => handleSelect(purpose.id)}
                disabled={isDisabled}
                className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left group relative ${
                  selectedPurpose === purpose.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : isDisabled
                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed opacity-60'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-md cursor-pointer'
                }`}
              >
                {/* Popular Badge */}
                {purpose.popular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Coming Soon Badge */}
                {purpose.badge && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {purpose.badge}
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-300 ${
                      isDisabled 
                        ? 'bg-gray-400' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 group-hover:shadow-lg'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{purpose.emoji}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {purpose.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {purpose.description}
                    </p>
                  </div>
                  {!isDisabled && (
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  step === 2 ? 'bg-blue-500' : step < 2 ? 'bg-blue-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
