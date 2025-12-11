'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Mail, 
  Briefcase, 
  Star,
  Calendar,
  MoreHorizontal,
  Grid,
  List,
  Filter,
  Search
} from 'lucide-react'

interface MainContentProps {
  user: any
  authUser: any
}

export default function MainContent({ user, authUser }: MainContentProps) {
  const [activeTab, setActiveTab] = useState('recently-opened')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getFirstName = () => {
    if (user?.username) return user.username
    if (user?.full_name) return user.full_name.split(' ')[0]
    if (authUser?.user_metadata?.full_name) return authUser.user_metadata.full_name.split(' ')[0]
    return 'there'
  }

  const featureCards = [
    {
      id: 'resume-builder',
      title: 'Help me build my resume',
      description: 'Start fresh or let AI guide your layout.',
      icon: FileText,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'cover-letter',
      title: 'Help me craft a cover letter',
      description: 'AI will generate a personalized cover letter instantly.',
      icon: Mail,
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 'job-match',
      title: 'Help me find the right job match',
      description: 'See how well your resume fits a job description.',
      icon: Briefcase,
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ]

  const recentFiles: any[] = []

  return (
    <div className="flex-1 bg-slate-900 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {getGreeting()}, {getFirstName()}!
          </h1>
          <p className="text-gray-400">
            A new day, a new opportunity! Let's create something amazing together.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featureCards.map((card, index) => {
            const Icon = card.icon
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                
                {/* Mock preview */}
                <div className="bg-slate-700 rounded-lg p-3 mt-4">
                  <div className="space-y-2">
                    <div className="h-2 bg-slate-600 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-600 rounded w-1/2"></div>
                    <div className="h-2 bg-slate-600 rounded w-2/3"></div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
