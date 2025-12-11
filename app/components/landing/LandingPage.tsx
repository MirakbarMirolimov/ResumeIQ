'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import HeroSlider from './HeroSlider'
import DarkModeToggle from '../DarkModeToggle'
import PricingSection from '../pricing/PricingSection'
import Footer from '../footer/Footer'

interface LandingPageProps {
  onStartOnboarding: () => void
}

export default function LandingPage({ onStartOnboarding }: LandingPageProps) {
  const [currentLogoSet, setCurrentLogoSet] = useState(0)
  
  // Company logos data
  const logoSets = [
    [
      { src: '/company_logo_2.png', alt: 'Company 2' },
      { src: '/company_logo_5.png', alt: 'Company 5' },
      { src: '/company_logo_7.png', alt: 'Company 7' },
    ],
    [
      { src: '/company_logo_8.png', alt: 'Company 8' },
      { src: '/company_logo_9.png', alt: 'Company 9' },
      { src: '/company_logo_10.png', alt: 'Company 10' },
      { src: '/company_logo_11.png', alt: 'Company 11' },
      { src: '/company_logo_13.png', alt: 'Company 13' },
    ]
  ]

  // Auto-rotate logos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoSet((prev) => (prev + 1) % logoSets.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [logoSets.length])

  return (
    <div className="min-h-screen">
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Navigation */}
      <Navbar onGetStarted={onStartOnboarding} />
      
      {/* Hero Section with Slider */}
      <HeroSlider onGetStarted={onStartOnboarding} />
      
      {/* Features Section */}
      <section id="features" className="relative py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 dark:from-black dark:via-gray-900 dark:to-slate-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              See What <span className="text-emerald-400">Recruiters See</span> In Your Resume
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Our AI analyzes your resume just like an ATS system would, highlighting strengths and areas for improvement to maximize your interview chances.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Analysis Points */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Strengths Identified */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-emerald-400 font-semibold text-lg mb-2">Strengths Identified</h3>
                  <p className="text-gray-300">Strong technical skills and quantified experience bullets with business impact.</p>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-yellow-400 font-semibold text-lg mb-2">Improvement Suggestions</h3>
                  <p className="text-gray-300">Emphasize technical leadership and add production-level projects.</p>
                </div>
              </div>

              {/* Strong Bullets */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-emerald-400 font-semibold text-lg mb-2">Strong Bullets</h3>
                  <p className="text-gray-300">Optimized Redis-based caching layer, increasing cache hit rate from 58% to 91%.</p>
                </div>
              </div>

              {/* How to Improve */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-blue-400 font-semibold text-lg mb-2">How to Improve</h3>
                  <p className="text-gray-300">Weak: Developed a Spring Boot app with Docker on AWS EC2, resulting 50% stakeholders.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Resume Preview & Score */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Resume Image */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="/MirakbarMirolimovv.jpg" 
                  alt="Resume Analysis Example" 
                  className="w-full h-auto object-contain"
                />
                
                {/* Overlay Score Card */}
                <div className="absolute top-6 right-6 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#374151"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray="93, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-emerald-400">93</span>
                      </div>
                    </div>
                    <p className="text-emerald-400 font-semibold">Excellent Resume!</p>
                  </div>
                </div>

                {/* AI Content Writer Badge */}
                <div className="absolute bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">AI Content Writer</p>
                      <p className="text-xs opacity-90">Generate metrics-driven bullets focused on technical skills and impact.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 border-t border-purple-500/20 overflow-hidden">
        {/* Animated background mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Create Resumes That <span className="text-emerald-400">Get You Hired</span> At
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Build professional resumes tailored for positions at top-tier companies and growing startups
            </motion.p>
          </div>

          {/* Company Logos Slider */}
          <div className="relative h-24 mb-16 overflow-hidden">
            {logoSets.map((logoSet, setIndex) => (
              <motion.div
                key={setIndex}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentLogoSet === setIndex ? 1 : 0,
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 flex justify-center items-center gap-8 md:gap-12"
              >
                {logoSet.map((logo, logoIndex) => (
                  <motion.div
                    key={`${setIndex}-${logoIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentLogoSet === setIndex ? 1 : 0,
                      y: currentLogoSet === setIndex ? 0 : 20
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: currentLogoSet === setIndex ? logoIndex * 0.1 : 0,
                      ease: "easeOut"
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110 p-2">
                      <img 
                        src={logo.src} 
                        alt={logo.alt}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
            
            {/* Slider Indicators */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {logoSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentLogoSet(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentLogoSet === index 
                      ? 'bg-emerald-400 w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          >
            <div className="flex items-center space-x-3 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-white">ATS-Optimized Templates</span>
            </div>
            
            <div className="flex items-center space-x-3 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-white">Industry-Specific Content</span>
            </div>
            
            <div className="flex items-center space-x-3 text-emerald-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-white">AI-Powered Optimization</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Upload & Analysis Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 dark:from-black dark:via-slate-950 dark:to-black overflow-hidden">
        {/* Interactive background elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Upload Your Resume to <span className="text-purple-400">Start for Free</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Get your ResumeIQ Score instantly and discover how to maximize your resume's impact.
              <br />
              Our AI analyzes every aspect of your resume to ensure it gets past ATS systems.
            </motion.p>
          </div>

          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl"
          >
            {/* Score Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Your ResumeIQ Score</h3>
              <div className="text-right">
                <span className="text-5xl font-bold text-pink-400">28</span>
                <span className="text-2xl text-gray-400">/100</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "28%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                />
              </div>
            </div>

            {/* Score Categories */}
            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-white font-medium">Content Quality</span>
                </div>
                <span className="text-yellow-400 font-semibold">26/35</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white font-medium">ATS & Structure</span>
                </div>
                <span className="text-red-400 font-semibold">3/25</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white font-medium">Job Optimization</span>
                </div>
                <span className="text-red-400 font-semibold">3/25</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-white font-medium">Writing Quality</span>
                </div>
                <span className="text-yellow-400 font-semibold">5/10</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white font-medium">Application Ready</span>
                </div>
                <span className="text-red-400 font-semibold">2/5</span>
              </motion.div>
            </div>

            {/* Upload Section */}
            <div className="text-center">
              <p className="text-gray-400 mb-6">
                Import your resume to get a detailed analysis and personalized recommendations
              </p>
              
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Import Resume</span>
              </motion.a>
              
              <p className="text-sm text-gray-500 mt-4">
                Get your detailed ResumeIQ Score with personalized feedback for each category
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 dark:from-black dark:via-slate-950 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-emerald-500/5"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              About <span className="text-emerald-400">ResumeIQ</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              We're on a mission to help professionals create resumes that get results. Our AI-powered platform combines industry expertise with cutting-edge technology to maximize your career potential.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ATS Optimization</h3>
              <p className="text-gray-300">Ensure your resume passes through Applicant Tracking Systems with our advanced optimization algorithms.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Content</h3>
              <p className="text-gray-300">Generate compelling, metrics-driven bullet points that showcase your achievements and impact.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Industry Expertise</h3>
              <p className="text-gray-300">Leverage insights from hiring managers and recruiters across various industries and company sizes.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection onSelectPlan={(plan) => {
          console.log('Selected plan:', plan)
          // Handle plan selection logic here
        }} />
      </div>

      {/* Footer */}
      <Footer 
        onCreateResume={onStartOnboarding}
        onViewDashboard={() => {
          console.log('View dashboard clicked')
          // Handle dashboard navigation
        }}
      />
    </div>
  )
}
