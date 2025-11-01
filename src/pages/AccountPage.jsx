import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, User, Mail, Phone, MapPin, Edit2, Check, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const AccountPage = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const { user, logout, updateUser, isLoggedIn } = useAuth()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    updateUser({
      ...user,
      ...formData,
    })
    setIsEditing(false)
  }

  if (!user) {
    return null
  }

  const defaultAddress = user.defaultAddress

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
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className={`text-4xl font-light mb-2 ${
                isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'
              }`}>
                My Account
              </h1>
              <p className={`text-lg ${
                isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
              }`}>
                Manage your profile and settings
              </p>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`lg:col-span-2 p-8 rounded-2xl backdrop-blur-sm ${
                isDarkMode
                  ? 'bg-luxury-dark-surface/80 border border-luxury-dark-border'
                  : 'bg-white/80 border border-luxury-beige/50 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-2xl font-light flex items-center gap-2 ${
                  isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'
                }`}>
                  <User size={24} />
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isDarkMode
                      ? 'text-luxury-dark-gold hover:bg-luxury-dark-border'
                      : 'text-luxury-gold hover:bg-luxury-beige/30'
                  }`}
                >
                  <Edit2 size={18} />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                      }`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 rounded-lg transition-all focus:outline-none ${
                          isDarkMode
                            ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                            : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                      }`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 rounded-lg transition-all focus:outline-none ${
                          isDarkMode
                            ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                            : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                    }`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 rounded-lg transition-all focus:outline-none ${
                        isDarkMode
                          ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                          : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                    }`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 rounded-lg transition-all focus:outline-none ${
                        isDarkMode
                          ? 'bg-luxury-dark-bg/50 border border-luxury-dark-border text-luxury-dark-text focus:border-luxury-dark-gold'
                          : 'bg-luxury-beige/30 border border-luxury-beige text-luxury-charcoal focus:border-luxury-gold'
                      }`}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      onClick={handleSaveChanges}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                        isDarkMode
                          ? 'bg-luxury-dark-gold text-luxury-dark-bg hover:shadow-lg'
                          : 'bg-luxury-gold text-luxury-charcoal hover:shadow-lg'
                      }`}
                    >
                      <Check size={18} />
                      Save Changes
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <User className={isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} size={20} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                        Name
                      </p>
                      <p className={`text-lg font-medium ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className={isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} size={20} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                        Email
                      </p>
                      <p className={`text-lg font-medium ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-center gap-4">
                      <Phone className={isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} size={20} />
                      <div>
                        <p className={`text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                          Phone
                        </p>
                        <p className={`text-lg font-medium ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                          {user.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Sidebar Info Cards */}
            <div className="space-y-6">
              {/* Default Address */}
              {defaultAddress && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`p-6 rounded-2xl backdrop-blur-sm ${
                    isDarkMode
                      ? 'bg-luxury-dark-surface/80 border border-luxury-dark-border'
                      : 'bg-white/80 border border-luxury-beige/50 shadow-lg'
                  }`}
                >
                  <h3 className={`text-lg font-light mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'
                  }`}>
                    <MapPin size={20} />
                    Default Address
                  </h3>
                  <div className={`space-y-2 text-sm ${
                    isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                  }`}>
                    <p>{defaultAddress.address1}</p>
                    {defaultAddress.address2 && <p>{defaultAddress.address2}</p>}
                    <p>{defaultAddress.city}, {defaultAddress.province}</p>
                    <p>{defaultAddress.country} {defaultAddress.zip}</p>
                  </div>
                </motion.div>
              )}

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`p-6 rounded-2xl backdrop-blur-sm ${
                  isDarkMode
                    ? 'bg-luxury-dark-surface/80 border border-luxury-dark-border'
                    : 'bg-white/80 border border-luxury-beige/50 shadow-lg'
                }`}
              >
                <h3 className={`text-lg font-light mb-4 ${
                  isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                }`}>
                  Account Verified
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`}></div>
                    <p className={`text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                      Email verified
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`}></div>
                    <p className={`text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                      Account active
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AccountPage