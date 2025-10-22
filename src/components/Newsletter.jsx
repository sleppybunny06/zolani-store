import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'

const Newsletter = () => {
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
    <section className="py-20 bg-gradient-to-r from-luxury-charcoal via-luxury-warm to-luxury-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
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
            className="text-3xl md:text-5xl font-display font-bold text-luxury-ivory mb-6 leading-tight"
            variants={fadeInUp}
          >
            Join the ZOLANI Circle
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-luxury-ivory/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
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
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-luxury-ivory placeholder-luxury-ivory/70 focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-luxury-gold text-luxury-charcoal hover:bg-luxury-ivory transition-all duration-300 px-8 py-4 font-semibold tracking-wide rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
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
                className="flex items-center justify-center gap-3 text-luxury-gold"
              >
                <CheckCircle size={24} />
                <span className="text-lg font-medium">
                  Welcome to the ZOLANI Circle! Check your email for a special gift.
                </span>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-8 text-luxury-ivory/80 text-sm"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>Exclusive Collections</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>Early Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>Styling Tips</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
              <span>Member-Only Events</span>
            </div>
          </motion.div>

          <motion.p 
            className="mt-6 text-luxury-ivory/60 text-sm max-w-md mx-auto"
            variants={fadeInUp}
          >
            We respect your privacy. Unsubscribe at any time. 
            See our <a href="/privacy" className="text-luxury-gold hover:underline">Privacy Policy</a>.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter