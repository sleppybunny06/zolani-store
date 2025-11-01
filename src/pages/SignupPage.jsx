import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, AlertCircle, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const SignupPage = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const { signup, isLoading, error: authError, isLoggedIn } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptsMarketing: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      errors.password = 'Password must contain lowercase letters'
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      errors.password = 'Password must contain uppercase letters'
    } else if (!/(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain numbers'
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    const { confirmPassword, ...signupData } = formData
    const result = await signup(signupData)
    
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Signup failed')
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
              Create Account
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              Join the ZOLANI community
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

          {/* Signup Form */}
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
            {/* First Name Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}>
                First Name
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                }`} size={18} />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${
                    isDarkMode
                      ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                      : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                  } ${validationErrors.firstName ? 'border-red-500' : ''}`}
                  placeholder="John"
                  disabled={isLoading}
                />
              </div>
              {validationErrors.firstName && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.firstName}</p>
              )}
            </div>

            {/* Last Name Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}>
                Last Name
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                }`} size={18} />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300 focus:outline-none ${
                    isDarkMode
                      ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                      : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                  } ${validationErrors.lastName ? 'border-red-500' : ''}`}
                  placeholder="Doe"
                  disabled={isLoading}
                />
              </div>
              {validationErrors.lastName && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.lastName}</p>
              )}
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
              <p className={`mt-2 text-xs ${
                isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
              }`}>
                • At least 8 characters
                <br />
                • Uppercase and lowercase letters
                <br />
                • At least one number
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                }`} size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-3 rounded-lg transition-all duration-300 focus:outline-none ${
                    isDarkMode
                      ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                      : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                  } ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                    isDarkMode ? 'text-luxury-dark-text-muted hover:text-luxury-dark-gold' : 'text-luxury-warm hover:text-luxury-gold'
                  }`}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Marketing Checkbox */}
            <div className="mb-6">
              <label className={`flex items-center gap-3 cursor-pointer ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}>
                <input
                  type="checkbox"
                  name="acceptsMarketing"
                  checked={formData.acceptsMarketing}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded"
                  disabled={isLoading}
                />
                <span className="text-sm">
                  I'd like to receive exclusive offers and updates
                </span>
              </label>
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </motion.button>

            {/* Divider */}
            <div className={`my-6 flex items-center ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              <div className={`flex-1 h-px ${
                isDarkMode ? 'bg-luxury-dark-border' : 'bg-luxury-beige'
              }`}></div>
              <span className="px-3 text-sm">Already have an account?</span>
              <div className={`flex-1 h-px ${
                isDarkMode ? 'bg-luxury-dark-border' : 'bg-luxury-beige'
              }`}></div>
            </div>

            {/* Sign In Link */}
            <p className={`text-center text-sm ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              <Link to="/login" className={`font-medium transition-colors ${
                isDarkMode 
                  ? 'text-luxury-dark-gold hover:text-luxury-dark-text' 
                  : 'text-luxury-gold hover:text-luxury-charcoal'
              }`}>
                Sign in here
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}

export default SignupPage