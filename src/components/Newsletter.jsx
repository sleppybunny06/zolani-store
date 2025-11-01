import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Newsletter = () => {
  const { isDarkMode } = useTheme()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1000)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className={`py-24 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-r from-luxury-dark-surface via-luxury-dark-gold/10 to-luxury-dark-surface'
        : 'bg-gradient-to-r from-luxury-charcoal via-luxury-warm to-luxury-charcoal'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI1Ii8+CjwvZz4KPC9nPgo8L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="container-luxury relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.div 
            className="flex justify-center mb-6"
            variants={fadeInUp}
          >
            <div className="p-4 rounded-full bg-luxury-gold/20">
              <Mail className="text-luxury-gold" size={32} />
            </div>
          </motion.div>

          <motion.h2 
            className={`text-4xl md:text-5xl font-display font-bold mb-6 leading-tight ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-ivory'}`}
            variants={fadeInUp}
          >
            Join the ZOLANI Circle
          </motion.h2>

          <motion.p 
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-ivory/90'}`}
            variants={fadeInUp}
          >
            Where style meets soul. Be the first to discover new collections, 
            exclusive offers, and styling inspiration curated just for you.
          </motion.p>

          <motion.div variants={fadeInUp}>
            {!isSubscribed ? (
              <form 
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full px-6 py-4 backdrop-blur-sm border rounded-lg focus:outline-none focus:ring-1 transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-luxury-dark-surface/40 border-luxury-dark-gold/30 text-luxury-dark-text placeholder-luxury-dark-text-muted focus:border-luxury-dark-gold focus:ring-luxury-dark-gold'
                        : 'bg-white/10 border-white/20 text-luxury-ivory placeholder-luxury-ivory/70 focus:border-luxury-gold focus:ring-luxury-gold'
                    }`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`transition-all duration-300 px-8 py-4 font-semibold tracking-wide rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap ${
                    isDarkMode
                      ? 'bg-luxury-dark-gold text-luxury-dark-bg hover:bg-luxury-dark-accent hover:text-luxury-dark-text'
                      : 'bg-luxury-gold text-luxury-charcoal hover:bg-luxury-ivory'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-luxury-charcoal/30 border-t-luxury-charcoal rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center justify-center gap-3 ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`}
              >
                <CheckCircle size={24} />
                <span className="text-lg font-medium">
                  Welcome to the ZOLANI Circle! Check your email for a special gift.
                </span>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className={`mt-8 flex flex-wrap justify-center gap-8 text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-ivory/80'}`}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-luxury-dark-gold' : 'bg-luxury-gold'}`}></div>
              <span>Exclusive Collections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-luxury-dark-gold' : 'bg-luxury-gold'}`}></div>
              <span>Early Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-luxury-dark-gold' : 'bg-luxury-gold'}`}></div>
              <span>Styling Tips</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-luxury-dark-gold' : 'bg-luxury-gold'}`}></div>
              <span>Member-Only Events</span>
            </div>
          </motion.div>

          <motion.p 
            className={`mt-6 text-sm max-w-md mx-auto ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-ivory/60'}`}
            variants={fadeInUp}
          >
            We respect your privacy. Unsubscribe at any time. 
            See our <a href="/privacy" className={`${isDarkMode ? 'text-luxury-dark-gold hover:underline' : 'text-luxury-gold hover:underline'}`}>Privacy Policy</a>.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter