import React, { useState, useEffect } from 'react'
import logoImg from '../assets/logo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const { user, logout, isLoggedIn } = useAuth()
  const { getCartItemCount } = useCart()

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
    setIsUserMenuOpen(false)
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
              <Link
                to="/cart"
                className={`relative p-2 transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                    : 'text-luxury-charcoal hover:text-luxury-gold'
                }`}
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                {getCartItemCount() > 0 && (
                  <span className={`absolute flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full -top-1 -right-1 ${
                    isDarkMode
                      ? 'bg-luxury-dark-gold text-luxury-dark-bg'
                      : 'bg-luxury-gold text-luxury-charcoal'
                  }`}>
                    {getCartItemCount()}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <div className="relative hidden sm:block">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`relative p-2 transition-colors duration-300 ${
                        isDarkMode
                          ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                          : 'text-luxury-charcoal hover:text-luxury-gold'
                      }`}
                      aria-label="Account menu"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-medium text-sm ${
                        isDarkMode
                          ? 'bg-luxury-dark-gold text-luxury-dark-bg'
                          : 'bg-luxury-gold text-luxury-charcoal'
                      }`}>
                        {user?.firstName?.charAt(0) || 'U'}
                      </div>
                    </button>
                    
                    {/* User Dropdown Menu */}
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl z-50 ${
                            isDarkMode
                              ? 'bg-luxury-dark-surface border border-luxury-dark-border'
                              : 'bg-white border border-luxury-beige/50'
                          }`}
                        >
                          <div className={`p-4 border-b ${
                            isDarkMode ? 'border-luxury-dark-border' : 'border-luxury-beige/30'
                          }`}>
                            <p className={`font-medium ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                              {user?.email}
                            </p>
                          </div>
                          
                          <div className="py-2">
                            <Link
                              to="/account"
                              className={`block px-4 py-2 transition-colors ${
                                isDarkMode
                                  ? 'text-luxury-dark-text hover:text-luxury-dark-gold hover:bg-luxury-dark-bg/50'
                                  : 'text-luxury-charcoal hover:text-luxury-gold hover:bg-luxury-beige/30'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>My Account</span>
                              </div>
                            </Link>

                            <Link
                              to="/orders"
                              className={`block px-4 py-2 transition-colors ${
                                isDarkMode
                                  ? 'text-luxury-dark-text hover:text-luxury-dark-gold hover:bg-luxury-dark-bg/50'
                                  : 'text-luxury-charcoal hover:text-luxury-gold hover:bg-luxury-beige/30'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <ShoppingBag size={16} />
                                <span>Order History</span>
                              </div>
                            </Link>
                            
                            <button
                              onClick={() => {
                                logout()
                                setIsUserMenuOpen(false)
                                navigate('/')
                              }}
                              className={`w-full text-left px-4 py-2 transition-colors ${
                                isDarkMode
                                  ? 'text-red-300 hover:text-red-200 hover:bg-red-500/20'
                                  : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <LogOut size={16} />
                                <span>Logout</span>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className={`p-2 transition-colors duration-300 ${
                      isDarkMode
                        ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                        : 'text-luxury-charcoal hover:text-luxury-gold'
                    }`}
                    aria-label="Login"
                  >
                    <User size={20} />
                  </Link>
                )}
              </div>

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
                <div className={`flex flex-col pt-4 space-y-3 border-t ${
                  isDarkMode ? 'border-luxury-dark-border/30' : 'border-luxury-beige/30'
                }`}>
                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/account"
                        className={`flex items-center space-x-2 transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                            : 'text-luxury-charcoal hover:text-luxury-gold'
                        }`}
                      >
                        <User size={18} />
                        <span>{user?.firstName} {user?.lastName}</span>
                      </Link>

                      <Link 
                        to="/orders"
                        className={`flex items-center space-x-2 transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                            : 'text-luxury-charcoal hover:text-luxury-gold'
                        }`}
                      >
                        <ShoppingBag size={18} />
                        <span>Order History</span>
                      </Link>

                      <button 
                        onClick={() => {
                          logout()
                          setIsMobileMenuOpen(false)
                          navigate('/')
                        }}
                        className={`flex items-center space-x-2 transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-red-300 hover:text-red-200'
                            : 'text-red-600 hover:text-red-700'
                        }`}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className={`flex items-center space-x-2 transition-colors duration-300 ${
                        isDarkMode
                          ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                          : 'text-luxury-charcoal hover:text-luxury-gold'
                      }`}
                    >
                      <User size={18} />
                      <span>Login</span>
                    </Link>
                  )}
                  <Link
                    to="/cart"
                    className={`flex items-center space-x-2 transition-colors duration-300 ${
                      isDarkMode
                        ? 'text-luxury-dark-text hover:text-luxury-dark-gold'
                        : 'text-luxury-charcoal hover:text-luxury-gold'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag size={18} />
                    <span>Shopping Cart</span>
                    {getCartItemCount() > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isDarkMode
                          ? 'bg-luxury-dark-gold text-luxury-dark-bg'
                          : 'bg-luxury-gold text-luxury-charcoal'
                      }`}>
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
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