import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-10 h-10 p-2 
        transition-all duration-300 rounded-full
        ${isDarkMode 
          ? 'bg-luxury-dark-surface/80 text-luxury-dark-gold hover:bg-luxury-dark-border' 
          : 'bg-luxury-beige/50 text-luxury-charcoal hover:bg-luxury-beige'
        }
        backdrop-blur-sm border
        ${isDarkMode ? 'border-luxury-dark-border' : 'border-luxury-beige'}
        hover:scale-105 active:scale-95
      `}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={isDarkMode ? 'dark' : 'light'}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut",
          type: "spring",
          stiffness: 200
        }}
        className="flex items-center justify-center"
      >
        {isDarkMode ? (
          <Moon size={18} className="text-luxury-dark-gold" />
        ) : (
          <Sun size={18} className="text-luxury-gold" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle