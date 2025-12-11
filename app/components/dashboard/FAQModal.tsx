'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

interface FAQModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [openItems, setOpenItems] = useState<number[]>([0])

  if (!isOpen) return null

  const faqs = [
    {
      question: "How does ResumeIQ's AI work?",
      answer: "ResumeIQ uses advanced AI to analyze job descriptions and optimize your resume content. Our AI suggests improvements for keywords, formatting, and content structure to increase your chances of passing ATS systems and catching recruiters' attention."
    },
    {
      question: "Can I use ResumeIQ for free?",
      answer: "Yes! ResumeIQ offers a free plan that includes 1 resume template, basic AI assistance, PDF export, and email support. You can upgrade to Pro or Premium plans for more advanced features and unlimited access."
    },
    {
      question: "What file formats can I export my resume in?",
      answer: "You can export your resume in PDF format with our free plan. Pro and Premium users get additional export options including Word (.docx), plain text, and optimized formats for different ATS systems."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use enterprise-grade encryption to protect your data. Your personal information and resume content are stored securely and never shared with third parties. You maintain full control over your data."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll continue to have access to premium features until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with ResumeIQ within the first 30 days, contact our support team for a full refund."
    },
    {
      question: "How many resumes can I create?",
      answer: "Free users can create 1 resume. Pro users get unlimited resumes with access to all templates. Premium users get everything in Pro plus additional branding and customization options."
    },
    {
      question: "What is ATS optimization?",
      answer: "ATS (Applicant Tracking System) optimization ensures your resume is formatted and structured to be easily read by automated systems that many companies use to screen resumes. Our AI helps optimize your resume for better ATS compatibility."
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-slate-900 rounded-2xl border border-slate-700 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400">Find answers to common questions about ResumeIQ</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/50 transition-colors"
              >
                <h3 className="text-white font-semibold text-lg pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-slate-700"
                >
                  <div className="p-6 pt-4">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Contact Support
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
