import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()

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
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-luxury-beige/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 group"
              aria-label="ZOLANI Home"
            >
              <motion.div 
                className="text-2xl md:text-3xl font-display font-bold text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ZOLANI
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative font-medium tracking-wide transition-colors duration-300 hover:text-luxury-gold ${
                    location.pathname === item.href 
                      ? 'text-luxury-gold' 
                      : 'text-luxury-charcoal'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold"
                      layoutId="navbar-indicator"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <button
                className="hidden sm:block p-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-charcoal text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  2
                </span>
              </button>

              {/* Shopping Bag */}
              <button
                className="p-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300 relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-charcoal text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </button>

              {/* User Account */}
              <button
                className="hidden sm:block p-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300"
                aria-label="Account"
              >
                <User size={20} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300"
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
            className="fixed top-20 left-0 right-0 z-40 lg:hidden bg-white/98 backdrop-blur-md border-b border-luxury-beige shadow-lg"
          >
            <div className="container-luxury py-6">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-lg font-medium tracking-wide transition-colors duration-300 hover:text-luxury-gold ${
                      location.pathname === item.href 
                        ? 'text-luxury-gold' 
                        : 'text-luxury-charcoal'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-luxury-beige/30 flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300">
                    <User size={18} />
                    <span>Account</span>
                  </button>
                  <button className="flex items-center space-x-2 text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300">
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
            <div className="container-luxury pt-32">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-luxury-warm" size={20} />
                  <input
                    type="text"
                    placeholder="Search for products, collections..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-luxury-beige/30 rounded-lg border border-luxury-beige focus:border-luxury-gold focus:outline-none transition-colors duration-300"
                    autoFocus
                  />
                </div>
                <div className="mt-6 text-sm text-luxury-warm">
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