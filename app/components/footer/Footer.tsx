'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Youtube, Instagram, Mail } from 'lucide-react'

interface FooterProps {
  onCreateResume?: () => void
  onViewDashboard?: () => void
}

export default function Footer({ onCreateResume, onViewDashboard }: FooterProps) {
  const socialLinks = [
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
  ]

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Resume Builder', href: '#' },
        { name: 'Templates', href: '#' },
        { name: 'AI Writer', href: '#' },
        { name: 'ATS Checker', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Resume Examples', href: '#' },
        { name: 'Career Tips', href: '#' },
        { name: 'Job Search Guide', href: '#' },
        { name: 'Interview Prep', href: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Live Chat', href: '#' },
        { name: 'Email Support', href: '#' },
        { name: 'Feature Requests', href: '#' },
      ]
    }
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-slate-900 to-black dark:from-black dark:via-gray-950 dark:to-black border-t border-emerald-500/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
      {/* Main CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Your professional future is your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              greatest investment
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10"
          >
            Begin crafting your success story right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateResume}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Build Your Resume Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewDashboard}
              className="bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-bold py-4 px-8 rounded-2xl backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
            >
              Access Dashboard
            </motion.button>
          </motion.div>
        </div>
      </section>
    </footer>
  )
}
