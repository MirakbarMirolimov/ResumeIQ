'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Coins, Check, CreditCard } from 'lucide-react'
import { CREDIT_PACKAGES } from '../../../lib/user-service'
import { CreditPurchaseOption } from '../../../lib/types/user'

interface CreditPurchaseProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (packageId: string) => Promise<void>
  loading?: boolean
}

export default function CreditPurchase({ 
  isOpen, 
  onClose, 
  onPurchase, 
  loading = false 
}: CreditPurchaseProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [purchasing, setPurchasing] = useState(false)

  const handlePurchase = async (packageId: string) => {
    if (purchasing) return
    
    setPurchasing(true)
    try {
      await onPurchase(packageId)
      onClose()
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setPurchasing(false)
    }
  }

  const getPackageColor = (pkg: CreditPurchaseOption) => {
    if (pkg.popular) return 'from-purple-600 to-pink-600'
    return 'from-slate-600 to-slate-700'
  }

  const getPackageBorder = (pkg: CreditPurchaseOption) => {
    if (pkg.popular) return 'border-purple-500/50'
    return 'border-slate-600/50'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 rounded-2xl border border-slate-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Purchase Credits</h2>
                <p className="text-gray-400">Choose a credit package to continue using ResumeIQ services</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Credit Packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {CREDIT_PACKAGES.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedPackage === pkg.id 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : getPackageBorder(pkg) + ' bg-slate-800/50'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${getPackageColor(pkg)} flex items-center justify-center`}>
                      <Coins className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-emerald-400 mb-1">{pkg.credits}</div>
                    <div className="text-sm text-gray-400 mb-4">credits</div>
                    
                    <div className="text-2xl font-bold text-white mb-4">
                      ${pkg.price}
                    </div>

                    <div className="text-sm text-gray-400 mb-4">
                      ${(pkg.price / pkg.credits).toFixed(2)} per credit
                    </div>

                    {selectedPackage === pkg.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Purchase Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Credits never expire and can be used for any ResumeIQ service
              </div>
              
              <motion.button
                onClick={() => selectedPackage && handlePurchase(selectedPackage)}
                disabled={!selectedPackage || purchasing}
                whileHover={{ scale: selectedPackage ? 1.05 : 1 }}
                whileTap={{ scale: selectedPackage ? 0.95 : 1 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedPackage && !purchasing
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-slate-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {purchasing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Purchase Credits</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Secure Payment</h4>
                  <p className="text-sm text-gray-400">
                    Your payment is processed securely through Stripe. We never store your payment information.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
