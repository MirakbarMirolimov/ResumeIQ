'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface PricingSectionProps {
  onSelectPlan?: (plan: string) => void
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
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
      buttonText: 'Start Free',
      buttonStyle: 'bg-slate-700 hover:bg-slate-600 text-white'
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
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Start free and upgrade when you're ready to accelerate your job search
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-pink-500 shadow-2xl shadow-pink-500/20' 
                  : 'bg-slate-800/50 border border-slate-700'
              } backdrop-blur-sm`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Save Badge */}
              {plan.saveText && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {plan.saveText}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    className="flex items-center space-x-3"
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={`${feature.included ? 'text-white' : 'text-gray-500'}`}>
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPlan?.(plan.id)}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ Secure payments</span>
            <span>✓ 24/7 support</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
