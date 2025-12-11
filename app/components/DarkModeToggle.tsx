'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className={`fixed top-6 right-6 z-[9999] p-3 rounded-2xl backdrop-blur-md transition-all duration-300 border-2 ${
        isDarkMode
          ? 'bg-slate-800/90 border-slate-600 text-yellow-400 hover:bg-slate-700/90 shadow-lg shadow-slate-900/20'
          : 'bg-white/90 border-gray-200 text-slate-700 hover:bg-gray-50/90 shadow-lg shadow-gray-900/10'
      }`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative"
      >
        <motion.div
          initial={false}
          animate={{ 
            opacity: isDarkMode ? 0 : 1,
            scale: isDarkMode ? 0.5 : 1
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: isDarkMode ? 1 : 0,
            scale: isDarkMode ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          <Sun className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}
