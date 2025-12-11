'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, CheckCircle } from 'lucide-react'

interface HeroSlide {
  id: number
  title: React.ReactNode
  subtitle: React.ReactNode
  ctaText: string
  features: string[]
  icon: React.ReactNode
  gradient: string
}

interface HeroSliderProps {
  onGetStarted: () => void
}

export default function HeroSlider({ onGetStarted }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: HeroSlide[] = [
    {
      id: 1,
      title: (
        <>
          <span className="text-cyan-300 font-extrabold">AI That Customizes</span> Your Resume for{' '}
          <span className="text-yellow-300 font-extrabold">Every Job</span>
        </>
      ),
      subtitle: (
        <>
          Get a <span className="text-yellow-200 font-semibold">perfectly tailored, ATS-optimized</span> resume with{' '}
          <span className="text-green-300 font-semibold">one click</span> — no more{' '}
          <span className="text-pink-300 font-semibold">manual editing</span>.
        </>
      ),
      ctaText: "Tailor Now",
      features: ["No credit card", "Fast & simple", "Free forever"],
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-blue-600 via-purple-600 to-indigo-700"
    },
    {
      id: 2,
      title: (
        <>
          <span className="text-green-300 font-extrabold">Instant Resumes</span>.{' '}
          <span className="text-yellow-300 font-extrabold">Zero Effort</span>.{' '}
          <span className="text-cyan-300 font-extrabold">Fully Free</span>.
        </>
      ),
      subtitle: (
        <>
          <span className="text-yellow-200 font-semibold">Paste your experience</span> or{' '}
          <span className="text-green-300 font-semibold">upload your old resume</span> — AI rebuilds it into a{' '}
          <span className="text-pink-300 font-semibold">clean, professional, ATS-ready</span> version.
        </>
      ),
      ctaText: "Build My Resume",
      features: ["Free forever", "No credit card", "Ready in minutes"],
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-emerald-600 via-teal-600 to-cyan-700"
    }
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 dark:from-gray-900 dark:via-purple-950 dark:to-gray-800">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-pink-500/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        {/* Additional floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex items-center justify-center min-h-screen">
        <div className="text-center w-full">
          {/* Slide Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="mb-12"
            >

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-6xl font-bold text-white mt-20 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-white dark:bg-gray-100 text-gray-900 dark:text-gray-800 font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto text-lg group"
              >
                <span>{slides[currentSlide].ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap justify-center items-center space-x-6 mt-8 text-white/80"
              >
                {slides[currentSlide].features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center space-x-3 mt-12"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </motion.div>

          {/* Auto-advance progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 max-w-xs mx-auto"
          >
            <div className="w-full bg-white/20 rounded-full h-1">
              <motion.div
                className="bg-white h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                key={currentSlide}
              />
            </div>
            <div className="text-center mt-2 text-white/60 text-xs">
              {currentSlide + 1} of {slides.length}
            </div>
          </motion.div>

          {/* First Slide Additional Content */}
          {currentSlide === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">1-Click AI Rewrite</h3>
                  <p className="text-white/90 text-sm">Turn your raw text into polished resume bullets</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="text-3xl mb-3">📋</div>
                  <h3 className="text-xl font-bold text-white mb-2">100% Standardized Formatting</h3>
                  <p className="text-white/90 text-sm">Clean, recruiter-friendly layout</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-2">50%+ Better Match Score</h3>
                  <p className="text-white/90 text-sm">AI tailors resume to each job description</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Second Slide Additional Content */}
          {currentSlide === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
                  <p className="text-white/90 text-sm">Smart resume generation that highlights your strengths.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="text-xl font-bold text-white mb-2">ATS-Optimized</h3>
                  <p className="text-white/90 text-sm">Clean formatting built to pass recruiter screening systems.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
                >
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-xl font-bold text-white mb-2">Interview Boost</h3>
                  <p className="text-white/90 text-sm">Tailored resumes that help you stand out and get noticed.</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
