import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const CartPage = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const { isLoggedIn } = useAuth()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }
    // In a real implementation, this would create a draft order via Shopify
    // For now, we'll show an alert
    alert('Checkout functionality would integrate with Shopify hosted checkout')
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-ivory pt-20">
        <div className="container-luxury py-16">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className={`text-center py-24 px-6 rounded-2xl ${
              isDarkMode
                ? 'bg-luxury-dark-surface border border-luxury-dark-border'
                : 'bg-white shadow-lg shadow-luxury-beige/20'
            }`}
          >
            <ShoppingBag 
              size={64} 
              className={`mx-auto mb-6 ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`} 
            />
            <h2 className={`text-3xl font-display font-bold mb-4 ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
              Your cart is empty
            </h2>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
              Discover our collection of luxury fashion pieces
            </p>
            <Link
              to="/shop"
              className="btn-primary inline-block"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-ivory'}`}>
      <div className="container-luxury py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/shop')}
          className={`flex items-center gap-2 mb-8 transition-colors ${
            isDarkMode
              ? 'text-luxury-dark-gold hover:text-luxury-dark-accent'
              : 'text-luxury-gold hover:text-luxury-charcoal'
          }`}
        >
          <ArrowLeft size={20} />
          Continue Shopping
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-display font-bold mb-8 ${
                isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
              }`}
            >
              Shopping Cart
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.variant}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-6 p-6 rounded-2xl transition-all ${
                    isDarkMode
                      ? 'bg-luxury-dark-surface border border-luxury-dark-border hover:border-luxury-dark-gold'
                      : 'bg-white shadow-lg shadow-luxury-beige/20 hover:shadow-xl'
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className={`font-display font-semibold mb-2 ${
                      isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'
                    }`}>
                      {item.variant ? `Variant: ${item.variant}` : 'Default variant'}
                    </p>
                    <p className={`font-semibold ${
                      isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-charcoal'
                    }`}>
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col gap-4">
                    <div className={`flex items-center gap-3 rounded-lg ${
                      isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-beige/20'
                    }`}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className={`px-3 py-2 font-semibold transition-colors ${
                          isDarkMode
                            ? 'hover:text-luxury-dark-gold'
                            : 'hover:text-luxury-gold'
                        }`}
                      >
                        −
                      </button>
                      <span className={`px-4 py-2 font-medium ${
                        isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
                      }`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className={`px-3 py-2 font-semibold transition-colors ${
                          isDarkMode
                            ? 'hover:text-luxury-dark-gold'
                            : 'hover:text-luxury-gold'
                        }`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.variant)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20'
                          : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      }`}
                      aria-label="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Clear Cart Button */}
            {cart.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={clearCart}
                className={`mt-8 px-6 py-3 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? 'text-red-400 border border-red-500/30 hover:bg-red-500/10'
                    : 'text-red-600 border border-red-200 hover:bg-red-50'
                }`}
              >
                Clear Cart
              </motion.button>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-8 h-fit sticky top-28 ${
              isDarkMode
                ? 'bg-luxury-dark-surface border border-luxury-dark-border'
                : 'bg-white shadow-lg shadow-luxury-beige/20'
            }`}
          >
            <h2 className={`text-2xl font-display font-bold mb-6 ${
              isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'
            }`}>
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}>
                  Subtotal ({cart.length} items)
                </span>
                <span className={`font-semibold ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}>
                  Shipping
                </span>
                <span className={`font-semibold ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                  Calculated at checkout
                </span>
              </div>

              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}>
                  Tax
                </span>
                <span className={`font-semibold ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div className={`border-t pt-6 mb-6 ${
              isDarkMode ? 'border-luxury-dark-border' : 'border-luxury-beige'
            }`}>
              <div className="flex justify-between mb-6">
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                  Total
                </span>
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-charcoal'}`}>
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mb-3"
              >
                {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>

              <Link
                to="/shop"
                className="w-full btn-secondary block text-center"
              >
                Continue Shopping
              </Link>
            </div>

            <p className={`text-xs text-center ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
              Secure checkout powered by Shopify
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CartPage