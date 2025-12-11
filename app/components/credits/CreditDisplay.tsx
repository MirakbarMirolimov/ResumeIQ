'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Coins, Plus } from 'lucide-react'
import { UserService } from '../../../lib/user-service'

interface CreditDisplayProps {
  userId?: string
  onPurchaseClick?: () => void
  showPurchaseButton?: boolean
}

export default function CreditDisplay({ 
  userId, 
  onPurchaseClick, 
  showPurchaseButton = true 
}: CreditDisplayProps) {
  const [credits, setCredits] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      loadCredits()
    }
  }, [userId])

  const loadCredits = async () => {
    if (!userId) return
    
    setLoading(true)
    try {
      const balance = await UserService.getCreditBalance(userId)
      setCredits(balance)
    } catch (error) {
      console.error('Error loading credits:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCreditColor = () => {
    if (credits === 0) return 'text-red-400'
    if (credits <= 2) return 'text-yellow-400'
    return 'text-emerald-400'
  }

  const getCreditBgColor = () => {
    if (credits === 0) return 'bg-red-500/20 border-red-500/30'
    if (credits <= 2) return 'bg-yellow-500/20 border-yellow-500/30'
    return 'bg-emerald-500/20 border-emerald-500/30'
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <div className="w-5 h-5 bg-slate-600 rounded-full animate-pulse"></div>
        <div className="w-8 h-4 bg-slate-600 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl border ${getCreditBgColor()}`}
      >
        <Coins className={`w-5 h-5 ${getCreditColor()}`} />
        <span className={`font-semibold ${getCreditColor()}`}>
          {credits}
        </span>
        <span className="text-gray-400 text-sm">credits</span>
      </motion.div>

      {showPurchaseButton && (
        <motion.button
          onClick={onPurchaseClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Buy</span>
        </motion.button>
      )}
    </div>
  )
}
