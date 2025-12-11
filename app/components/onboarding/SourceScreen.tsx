'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Search, UserPlus, MoreHorizontal } from 'lucide-react'

// Custom Social Media Icons
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
)

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
  </svg>
)
import { useState } from 'react'

interface SourceScreenProps {
  onNext: (source: string) => void
  onBack: () => void
}

export default function SourceScreen({ onNext, onBack }: SourceScreenProps) {
  const [selectedSource, setSelectedSource] = useState('')
  const [customSource, setCustomSource] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const sources = [
    {
      id: 'tiktok',
      icon: TikTokIcon,
      title: 'TikTok',
      color: 'from-black to-red-500',
      bgColor: 'bg-black'
    },
    {
      id: 'instagram',
      icon: InstagramIcon,
      title: 'Instagram',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      id: 'google',
      icon: Search,
      title: 'Google Search',
      color: 'from-blue-500 to-green-500',
      bgColor: 'bg-gradient-to-br from-blue-500 to-green-500'
    },
    {
      id: 'reddit',
      icon: RedditIcon,
      title: 'Reddit',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500'
    },
    {
      id: 'discord',
      icon: DiscordIcon,
      title: 'Discord',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-600'
    },
    {
      id: 'friend',
      icon: UserPlus,
      title: 'Friend',
      color: 'from-green-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-green-500 to-blue-500'
    },
    {
      id: 'other',
      icon: MoreHorizontal,
      title: 'Other',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gradient-to-br from-gray-500 to-gray-600'
    }
  ]

  const handleSelect = (sourceId: string) => {
    setSelectedSource(sourceId)
    if (sourceId === 'other') {
      setShowCustomInput(true)
    } else {
      setShowCustomInput(false)
      setTimeout(() => onNext(sourceId), 300)
    }
  }

  const handleCustomSubmit = () => {
    if (customSource.trim()) {
      onNext(`other: ${customSource.trim()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomSubmit()
    }
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
            Where did you hear about ResumeIQ?
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            This helps us understand our users better.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sources.map((source, index) => {
            const Icon = source.icon
            const isOther = source.id === 'other'
            const isOtherSelected = selectedSource === 'other'
            
            if (isOther && isOtherSelected) {
              // Transform "Other" box into input field
              return (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="md:col-span-2 p-6 rounded-2xl border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 ${source.bgColor} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        Please specify:
                      </h3>
                    </div>
                    <input
                      type="text"
                      value={customSource}
                      onChange={(e) => setCustomSource(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., YouTube, LinkedIn, Blog, etc."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors duration-200"
                      autoFocus
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setShowCustomInput(false)
                          setSelectedSource('')
                          setCustomSource('')
                        }}
                        className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCustomSubmit}
                        disabled={!customSource.trim()}
                        className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            }
            
            return (
              <motion.button
                key={source.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(source.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center group ${
                  selectedSource === source.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-xl'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-16 h-16 ${source.bgColor} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {source.title}
                  </h3>
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
                  step === 3 ? 'bg-blue-500' : step < 3 ? 'bg-blue-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
