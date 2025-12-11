'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  BarChart3,
  CreditCard,
  HelpCircle,
  User
} from 'lucide-react'
import PlansModal from './PlansModal'
import FAQModal from './FAQModal'

interface SidebarProps {
  user: any
  authUser: any
  onSignOut: () => void
}

export default function Sidebar({ user, authUser, onSignOut }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('overview')
  const [showPlansModal, setShowPlansModal] = useState(false)
  const [showFAQModal, setShowFAQModal] = useState(false)

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'resumes', label: 'My Resumes', icon: FileText },
    { id: 'templates', label: 'Templates Library', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const bottomItems = [
    { id: 'plans', label: 'Plans', icon: CreditCard },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ]

  const getFirstName = () => {
    if (user?.username) return user.username
    if (user?.full_name) return user.full_name.split(' ')[0]
    if (authUser?.user_metadata?.full_name) return authUser.user_metadata.full_name.split(' ')[0]
    return 'User'
  }

  const getEmail = () => {
    return user?.email || authUser?.email || 'user@example.com'
  }

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="ResumeIQ" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-white font-bold text-lg">ResumeIQ</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700">
        <div className="p-4 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            
            const handleClick = () => {
              setActiveItem(item.id)
              if (item.id === 'plans') {
                setShowPlansModal(true)
              } else if (item.id === 'faq') {
                setShowFAQModal(true)
              }
            }
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={handleClick}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {getFirstName()[0]?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {getFirstName()}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {getEmail()}
              </p>
            </div>
            <button
              onClick={onSignOut}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PlansModal 
        isOpen={showPlansModal} 
        onClose={() => setShowPlansModal(false)} 
      />
      <FAQModal 
        isOpen={showFAQModal} 
        onClose={() => setShowFAQModal(false)} 
      />
    </div>
  )
}
