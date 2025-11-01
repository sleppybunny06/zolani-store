import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ArrowRight, Loader } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { fetchCustomerOrders } from '../services/shopifyService'

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn, accessToken } = useAuth()
  const { isDarkMode } = useTheme()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    const loadOrders = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchCustomerOrders(accessToken)
        
        if (data?.customer?.orders?.edges) {
          const ordersList = data.customer.orders.edges.map(edge => edge.node)
          setOrders(ordersList)
        }
      } catch (err) {
        console.error('Error loading orders:', err)
        setError('Failed to load orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [isLoggedIn, accessToken, navigate])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'fulfilled':
        return { bg: 'bg-green-500/20', text: 'text-green-600', label: 'Delivered' }
      case 'partially_fulfilled':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-600', label: 'Partially Shipped' }
      case 'unfulfilled':
        return { bg: 'bg-blue-500/20', text: 'text-blue-600', label: 'Processing' }
      case 'cancelled':
        return { bg: 'bg-red-500/20', text: 'text-red-600', label: 'Cancelled' }
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-600', label: 'Pending' }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  if (loading) {
    return (
      <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-ivory'}`}>
        <div className="container-luxury py-16 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader className={`w-8 h-8 ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`} />
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-ivory'}`}>
      <div className="container-luxury py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="mb-12"
        >
          <Link
            to="/account"
            className={`inline-flex items-center gap-2 mb-8 transition-colors ${
              isDarkMode
                ? 'text-luxury-dark-gold hover:text-luxury-dark-accent'
                : 'text-luxury-gold hover:text-luxury-charcoal'
            }`}
          >
            <ArrowRight size={20} className="rotate-180" />
            Back to Account
          </Link>

          <h1 className={`text-4xl md:text-5xl font-display font-bold ${
            isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
          }`}>
            Order History
          </h1>
          <p className={`text-lg mt-3 ${
            isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
          }`}>
            View and manage all your orders
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl mb-8 ${
              isDarkMode
                ? 'bg-red-500/20 border border-red-500/30'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
              {error}
            </p>
          </motion.div>
        )}

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-24 px-6 rounded-2xl ${
              isDarkMode
                ? 'bg-luxury-dark-surface border border-luxury-dark-border'
                : 'bg-white shadow-lg shadow-luxury-beige/20'
            }`}
          >
            <Package
              size={64}
              className={`mx-auto mb-6 ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`}
            />
            <h2 className={`text-3xl font-display font-bold mb-4 ${
              isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
            }`}>
              No orders yet
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
            }`}>
              Start shopping to place your first order
            </p>
            <Link to="/shop" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {orders.map((order, index) => {
              const statusInfo = getStatusBadgeColor(order.fulfillmentStatus)
              const totalAmount = order.totalPriceV2?.amount || 0

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl p-6 transition-all ${
                    isDarkMode
                      ? 'bg-luxury-dark-surface border border-luxury-dark-border hover:border-luxury-dark-gold'
                      : 'bg-white shadow-lg shadow-luxury-beige/20 hover:shadow-xl'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Order Number & Date */}
                    <div>
                      <h3 className={`font-display font-semibold mb-2 ${
                        isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                      }`}>
                        Order #{order.orderNumber}
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                      }`}>
                        {formatDate(order.processedAt)}
                      </p>
                    </div>

                    {/* Items Count */}
                    <div>
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                      }`}>
                        Items
                      </p>
                      <p className={`text-lg font-semibold ${
                        isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                      }`}>
                        {order.lineItems?.edges?.length || 0} items
                      </p>
                    </div>

                    {/* Total Amount */}
                    <div>
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                      }`}>
                        Total
                      </p>
                      <p className={`text-lg font-semibold ${
                        isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-charcoal'
                      }`}>
                        {formatPrice(totalAmount)}
                      </p>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.label}
                      </div>
                      <button
                        onClick={() => {
                          // In a real implementation, navigate to order details
                          alert(`View details for order #${order.orderNumber}`)
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode
                            ? 'hover:bg-luxury-dark-border text-luxury-dark-gold'
                            : 'hover:bg-luxury-beige/30 text-luxury-gold'
                        }`}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  {order.lineItems?.edges && order.lineItems.edges.length > 0 && (
                    <div className={`mt-4 pt-4 border-t ${
                      isDarkMode ? 'border-luxury-dark-border/30' : 'border-luxury-beige/30'
                    }`}>
                      <p className={`text-sm font-medium mb-3 ${
                        isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                      }`}>
                        Items ordered:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {order.lineItems.edges.slice(0, 3).map((edge, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            {edge.node.image?.url && (
                              <img
                                src={edge.node.image.url}
                                alt={edge.node.title}
                                className="w-12 h-12 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className={`text-sm font-medium ${
                                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                              }`}>
                                {edge.node.title}
                              </p>
                              <p className={`text-xs ${
                                isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                              }`}>
                                Qty: {edge.node.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.lineItems.edges.length > 3 && (
                          <div className={`px-3 py-2 rounded-lg ${
                            isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-beige/20'
                          }`}>
                            <p className={`text-sm font-medium ${
                              isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                            }`}>
                              +{order.lineItems.edges.length - 3} more
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OrderHistoryPage