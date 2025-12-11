'use client'

import { motion } from 'framer-motion'
import { X, Check, Crown, Zap, Star } from 'lucide-react'

interface PlansModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PlansModal({ isOpen, onClose }: PlansModalProps) {
  if (!isOpen) return null

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Get started with basic resume building',
      popular: false,
      features: [
        { text: '3 free credits included', included: true },
        { text: 'Basic resume templates', included: true },
        { text: 'Manual resume builder', included: true },
        { text: 'PDF export', included: true },
        { text: 'AI-powered content generation', included: false },
        { text: 'ATS optimization scoring', included: false },
        { text: 'Premium templates', included: false },
        { text: 'Priority support', included: false },
      ],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-slate-600 text-white cursor-not-allowed'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'Unlock AI-powered resume optimization',
      popular: true,
      badge: 'Most Popular',
      features: [
        { text: 'Everything in Free, plus:', included: true },
        { text: '25 credits per month', included: true },
        { text: 'AI bullet point generator', included: true },
        { text: 'AI resume optimization', included: true },
        { text: 'ATS keyword scoring', included: true },
        { text: 'Premium template library', included: true },
        { text: 'Multiple export formats', included: true },
        { text: 'Email support', included: true },
      ],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$50.99',
      period: '/6 months',
      description: 'Complete job search acceleration package',
      popular: false,
      saveText: 'SAVE 50%',
      features: [
        { text: 'Everything in Pro included', included: true },
        { text: '200 credits (6 months)', included: true },
        { text: 'Unlimited AI generations', included: true },
        { text: 'Advanced ATS optimization', included: true },
        { text: 'LinkedIn profile optimization', included: true },
        { text: 'Cover letter generator', included: true },
        { text: 'Interview preparation tools', included: true },
        { text: 'Priority support & coaching', included: true },
      ],
      buttonText: 'Get Premium',
      buttonStyle: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 rounded-2xl border border-slate-700 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
            <p className="text-gray-400">Unlock the full potential of ResumeIQ</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`relative bg-slate-800 rounded-2xl border p-6 transition-all duration-300 ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              {/* Save Badge */}
              {plan.saveText && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {plan.saveText}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  {plan.id === 'free' && <Zap className="w-8 h-8 text-gray-400" />}
                  {plan.id === 'pro' && <Crown className="w-8 h-8 text-blue-400" />}
                  {plan.id === 'premium' && <Star className="w-8 h-8 text-purple-400" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-1">/{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-white' : 'text-gray-500'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: plan.id === 'free' ? 1 : 1.02 }}
                whileTap={{ scale: plan.id === 'free' ? 1 : 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${plan.buttonStyle}`}
                disabled={plan.id === 'free'}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            All plans include 30-day money-back guarantee
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <span>✓ Secure payment</span>
            <span>✓ Cancel anytime</span>
            <span>✓ No hidden fees</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
