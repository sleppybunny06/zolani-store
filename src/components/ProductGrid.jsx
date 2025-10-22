import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { products } from '../data/products'

const ProductGrid = ({ limit = 8 }) => {
  const [wishlist, setWishlist] = useState(new Set())

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
          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-luxury-beige/20 hover:shadow-xl hover:shadow-luxury-beige/30 transition-all duration-500"
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
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-luxury-gold text-luxury-charcoal px-3 py-1 text-xs font-semibold rounded-full">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-luxury-charcoal text-luxury-ivory px-3 py-1 text-xs font-semibold rounded-full">
                  BESTSELLER
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                  SALE
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  wishlist.has(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 hover:bg-luxury-gold text-luxury-charcoal'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart size={16} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
              </button>
              
              <Link
                to={`/product/${product.id}`}
                className="p-2 rounded-full bg-white/90 hover:bg-luxury-gold text-luxury-charcoal transition-colors duration-300"
                aria-label="Quick view"
              >
                <Eye size={16} />
              </Link>
            </div>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button className="w-full bg-luxury-charcoal text-luxury-ivory hover:bg-luxury-gold hover:text-luxury-charcoal py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
                <ShoppingBag size={16} />
                Add to Bag
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-luxury-warm text-sm font-medium">{product.category}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.floor(product.rating) 
                        ? 'bg-luxury-gold' 
                        : 'bg-luxury-beige'
                    }`}
                  />
                ))}
                <span className="text-luxury-warm text-sm ml-1">({product.rating})</span>
              </div>
            </div>
            
            <h3 className="font-display font-semibold text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors duration-300">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-luxury-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-luxury-warm line-through text-sm">
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