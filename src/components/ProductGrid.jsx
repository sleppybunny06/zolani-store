import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { products } from '../data/products'
import { useTheme } from '../contexts/ThemeContext'

const ProductGrid = ({ limit = 8 }) => {
  const [wishlist, setWishlist] = useState(new Set())
  const { isDarkMode } = useTheme()

  const displayProducts = products.slice(0, limit)

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {displayProducts.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
            isDarkMode 
              ? 'bg-luxury-dark-surface shadow-lg shadow-luxury-dark-border/20 hover:shadow-xl hover:shadow-luxury-dark-border/40 border border-luxury-dark-border/30' 
              : 'bg-white shadow-lg shadow-luxury-beige/20 hover:shadow-xl hover:shadow-luxury-beige/40'
          }`}
          whileHover={{ y: -8 }}
        >
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            {product.hoverImage && (
              <img
                src={product.hoverImage}
                alt={`${product.name} alternate view`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${isDarkMode ? 'bg-luxury-dark-gold text-luxury-dark-bg' : 'bg-luxury-gold text-luxury-charcoal'}`}
                >
                  NEW
                </motion.span>
              )}
              {product.isBestseller && (
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${isDarkMode ? 'bg-luxury-dark-surface/80 border border-luxury-dark-gold text-luxury-dark-gold' : 'bg-luxury-charcoal text-luxury-ivory'}`}
                >
                  BESTSELLER
                </motion.span>
              )}
              {product.originalPrice && (
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full"
                >
                  SALE
                </motion.span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  wishlist.has(product.id)
                    ? 'bg-red-500 text-white'
                    : isDarkMode
                      ? 'bg-luxury-dark-surface/90 hover:bg-luxury-dark-gold text-luxury-dark-text'
                      : 'bg-white/90 hover:bg-luxury-gold text-luxury-charcoal'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={16} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
              </button>
              
              <Link
                to={`/product/${product.id}`}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-luxury-dark-surface/90 hover:bg-luxury-dark-gold text-luxury-dark-text'
                    : 'bg-white/90 hover:bg-luxury-gold text-luxury-charcoal'
                }`}
                aria-label="Quick view"
              >
                <Eye size={16} />
              </Link>
            </div>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                isDarkMode
                  ? 'bg-luxury-dark-gold text-luxury-dark-bg hover:bg-luxury-dark-accent hover:text-luxury-dark-text'
                  : 'bg-luxury-charcoal text-luxury-ivory hover:bg-luxury-gold hover:text-luxury-charcoal'
              }`}>
                <ShoppingBag size={16} />
                Add to Bag
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className={`p-6 border-t ${isDarkMode ? 'border-luxury-dark-border/30' : 'border-luxury-beige/50'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>{product.category}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.floor(product.rating) 
                        ? isDarkMode ? 'bg-luxury-dark-gold' : 'bg-luxury-gold'
                        : isDarkMode ? 'bg-luxury-dark-border/50' : 'bg-luxury-beige'
                    }`}
                  />
                ))}
                <span className={`text-sm ml-1 ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>({product.rating})</span>
              </div>
            </div>
            
            <h3 className={`font-display font-semibold mb-3 group-hover:${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} transition-colors duration-300 ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-charcoal'}`}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className={`line-through text-sm ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductGrid