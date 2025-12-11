'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, GraduationCap, Briefcase, Code, Crown, RefreshCw, Globe } from 'lucide-react'
import { useState } from 'react'

interface UserTypeScreenProps {
  onNext: (userType: string) => void
  onBack: () => void
}

export default function UserTypeScreen({ onNext, onBack }: UserTypeScreenProps) {
  const [selectedType, setSelectedType] = useState('')

  const userTypes = [
    {
      id: 'student',
      icon: GraduationCap,
      emoji: '🎓',
      title: 'Student / No Experience',
      description: 'Just starting your career journey'
    },
    {
      id: 'entry-level',
      icon: Briefcase,
      emoji: '💼',
      title: 'Entry-Level Professional',
      description: '0-2 years of experience'
    },
    {
      id: 'mid-level',
      icon: Code,
      emoji: '🧑‍💻',
      title: 'Mid-Level Professional',
      description: '3-7 years of experience'
    },
    {
      id: 'senior',
      icon: Crown,
      emoji: '🧑‍🏫',
      title: 'Senior / Experienced',
      description: '8+ years of experience'
    },
    {
      id: 'career-switcher',
      icon: RefreshCw,
      emoji: '🔄',
      title: 'Career Switcher',
      description: 'Transitioning to a new field'
    },
    {
      id: 'international',
      icon: Globe,
      emoji: '🌍',
      title: 'International Student',
      description: 'Seeking opportunities abroad'
    }
  ]

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId)
    setTimeout(() => onNext(typeId), 300)
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
            Which best describes you?
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            This helps us personalize your resume instantly.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(type.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{type.emoji}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {type.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {type.description}
                    </p>
                  </div>
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
                  step === 1 ? 'bg-blue-500' : step < 1 ? 'bg-blue-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
