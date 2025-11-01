import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const { login, isLoading, error: authError, isLoggedIn } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const validateForm = () => {
    const errors = {}
    
    if (!email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email'
    }
    
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    const result = await login({ email, password })
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  return (
    <div className={`min-h-screen py-12 ${
      isDarkMode 
        ? 'bg-luxury-dark-bg' 
        : 'bg-gradient-to-br from-luxury-ivory to-luxury-beige'
    }`}>
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className={`text-4xl font-light mb-4 ${
              isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'
            }`}>
              Welcome Back
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              Sign in to your ZOLANI account
            </p>
          </div>

          {/* Error Messages */}
          {(error || authError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                isDarkMode
                  ? 'bg-red-500/20 border border-red-500/50 text-red-200'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}
            >
              <AlertCircle size={20} />
              <p>{error || authError}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className={`p-8 rounded-2xl backdrop-blur-sm ${
              isDarkMode
                ? 'bg-luxury-dark-surface/80 border border-luxury-dark-border'
                : 'bg-white/80 border border-luxury-beige/50 shadow-lg'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Email Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                }`} size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setValidationErrors(prev => ({ ...prev, email: '' }))
                  }}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${
                    isDarkMode
                      ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                      : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                  } ${validationErrors.email ? 'border-red-500' : ''}`}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                }`} size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setValidationErrors(prev => ({ ...prev, password: '' }))
                  }}
                  className={`w-full pl-12 pr-12 py-3 rounded-lg transition-all duration-300 focus:outline-none ${
                    isDarkMode
                      ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                      : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                  } ${validationErrors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isDarkMode ? 'text-luxury-dark-text-muted hover:text-luxury-dark-gold' : 'text-luxury-warm hover:text-luxury-gold'
                  }`}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className={`flex items-center gap-2 cursor-pointer ${
                isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
              }`}>
                <input type="checkbox" className="w-4 h-4 rounded" disabled={isLoading} />
                <span className="text-sm">Remember me</span>
              </label>
              <Link to="#" className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-luxury-dark-gold hover:text-luxury-dark-text' 
                  : 'text-luxury-gold hover:text-luxury-charcoal'
              }`}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-medium tracking-wide transition-all duration-300 ${
                isDarkMode
                  ? 'bg-luxury-dark-gold text-luxury-dark-bg hover:shadow-lg hover:shadow-luxury-dark-gold/30'
                  : 'bg-luxury-gold text-luxury-charcoal hover:shadow-lg hover:shadow-luxury-gold/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>

            {/* Divider */}
            <div className={`my-6 flex items-center ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              <div className={`flex-1 h-px ${
                isDarkMode ? 'bg-luxury-dark-border' : 'bg-luxury-beige'
              }`}></div>
              <span className="px-3 text-sm">New to ZOLANI?</span>
              <div className={`flex-1 h-px ${
                isDarkMode ? 'bg-luxury-dark-border' : 'bg-luxury-beige'
              }`}></div>
            </div>

            {/* Sign Up Link */}
            <p className={`text-center text-sm ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              Create an account{' '}
              <Link to="#" className={`font-medium transition-colors ${
                isDarkMode 
                  ? 'text-luxury-dark-gold hover:text-luxury-dark-text' 
                  : 'text-luxury-gold hover:text-luxury-charcoal'
              }`}>
                here
              </Link>
            </p>
          </motion.form>

          {/* Test Credentials Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`mt-8 p-4 rounded-lg text-sm ${
              isDarkMode
                ? 'bg-luxury-dark-surface/50 border border-luxury-dark-border text-luxury-dark-text-muted'
                : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-warm'
            }`}
          >
            <p className="font-medium mb-2">Demo credentials:</p>
            <p>Email: customer@example.com</p>
            <p>Password: password123</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage