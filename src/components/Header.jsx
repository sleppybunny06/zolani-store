import React, { useState, useEffect } from 'react'
import logoImg from '../assets/logo.jpg'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [location])

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? isDarkMode
              ? 'bg-luxury-dark-surface/95 backdrop-blur-md shadow-lg border-b border-luxury-dark-border/50' 
              : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-luxury-beige/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center flex-shrink-0 group"
              aria-label="ZOLANI Home"
            >
              {/* image logo imported from assets */}
              <img src={logoImg} alt="ZOLANI logo" className="object-contain h-10 md:h-12" />
            </Link>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 lg:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative font-medium tracking-wide transition-colors duration-300 ${
                    location.pathname === item.href 
                      ? isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'
                      : isDarkMode 
                        ? 'text-luxury-dark-text hover:text-luxury-dark-gold' 
                        : 'text-luxury-charcoal hover:text-luxury-gold'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isDarkMode ? 'bg-luxury-dark-gold' : 'bg-luxury-gold'
                      }`}
                      layoutId="navbar-indicator"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <button
                className={`relative hidden p-2 transition-colors duration-300 sm:block ${
                  isDarkMode
                    ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                <span className={`absolute flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full -top-1 -right-1 ${
                  isDarkMode
                    ? 'bg-luxury-dark-gold text-luxury-dark-bg'
                    : 'bg-luxury-gold text-luxury-charcoal'
                }`}>
                  2
                </span>
              </button>

              {/* Shopping Bag */}
              <button
                className={`relative p-2 transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                <span className={`absolute flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full -top-1 -right-1 ${
                  isDarkMode
                    ? 'bg-luxury-dark-gold text-luxury-dark-bg'
                    : 'bg-luxury-gold text-luxury-charcoal'
                }`}>
                  3
                </span>
              </button>

              {/* User Account */}
              <button
                className={`hidden p-2 transition-colors duration-300 sm:block ${
                  isDarkMode
                    ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
                aria-label="Account"
              >
                <User size={20} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 lg:hidden ${
                  isDarkMode
                    ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed left-0 right-0 z-40 border-b shadow-lg top-20 lg:hidden backdrop-blur-md ${
              isDarkMode
                ? 'bg-luxury-dark-surface/98 border-luxury-dark-border'
                : 'bg-white/98 border-luxury-beige'
            }`}
          >
            <div className="py-6 container-luxury">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-lg font-medium tracking-wide transition-colors duration-300 ${
                      location.pathname === item.href 
                        ? isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'
                        : isDarkMode 
                          ? 'text-luxury-dark-text hover:text-luxury-dark-gold' 
                          : 'text-luxury-charcoal hover:text-luxury-gold'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile User Actions */}
                <div className={`flex items-center pt-4 space-x-4 border-t ${
                  isDarkMode ? 'border-luxury-dark-border/30' : 'border-luxury-beige/30'
                }`}>
                  <button className={`flex items-center space-x-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                      : 'text-luxury-charcoal hover:text-luxury-gold'
                  }`}>
                    <User size={18} />
                    <span>Account</span>
                  </button>
                  <button className={`flex items-center space-x-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                      : 'text-luxury-charcoal hover:text-luxury-gold'
                  }`}>
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <div className="pt-32 container-luxury">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`max-w-2xl p-8 mx-auto shadow-2xl rounded-xl ${
                  isDarkMode ? 'bg-luxury-dark-surface' : 'bg-white'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Search className={`absolute transform -translate-y-1/2 left-4 top-1/2 ${
                    isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                  }`} size={20} />
                  <input
                    type="text"
                    placeholder="Search for products, collections..."
                    className={`w-full py-4 pl-12 pr-4 text-lg transition-colors duration-300 border rounded-lg focus:outline-none ${
                      isDarkMode
                        ? 'bg-luxury-dark-bg/50 border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                        : 'bg-luxury-beige/30 border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                    }`}
                    autoFocus
                  />
                </div>
                <div className={`mt-6 text-sm ${
                  isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                }`}>
                  Popular searches: Festive Collection, Kurta Sets, Everyday Luxe
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header