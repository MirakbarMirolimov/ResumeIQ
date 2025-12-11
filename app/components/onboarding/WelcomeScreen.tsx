'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 p-2">
            <img 
              src="/logo.png" 
              alt="ResumeIQ Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Welcome to ResumeIQ{' '}
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            🎉
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
        >
          Create a job-winning resume in seconds using AI.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-4 mb-12"
        >
          {[
            { icon: '⚡', text: 'AI-powered content generation' },
            { icon: '🎯', text: 'ATS-optimized templates' },
            { icon: '📊', text: 'Real-time optimization tips' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="flex items-center justify-center space-x-3 text-gray-700 dark:text-gray-300"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </motion.button>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8 text-xs text-gray-500 dark:text-gray-400 space-y-1"
        >
          <p>✓ Free to start • ✓ No credit card required</p>
          <p>✓ Start free, upgrade only if you love it!</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
