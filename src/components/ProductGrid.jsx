import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye, Loader } from 'lucide-react'
import { useShopifyProducts } from '../hooks/useShopifyProducts'
import { useTheme } from '../contexts/ThemeContext'
import { useCart } from '../contexts/CartContext'

const ProductGrid = ({ 
  limit = 8,
  filters = {},
  sortBy = 'newest'
}) => {
  const [wishlist, setWishlist] = useState(new Set())
  const [addedToCart, setAddedToCart] = useState(new Set())
  const { isDarkMode } = useTheme()
  const { addToCart } = useCart()
  const { products, loading, error } = useShopifyProducts(limit * 2) // Fetch extra to account for filtering

  // Fallback products with diverse prices and categories
  const fallbackProducts = [
    {
      id: '1',
      name: 'Ivory Bloom Kurta Set',
      price: 3490,
      originalPrice: 4200,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Kurta Sets',
      rating: 4.8,
      isNew: true,
      isBestseller: false,
      vendor: 'Premium Collection',
      tags: ['kurta', 'festival']
    },
    {
      id: '2',
      name: 'Royal Banarasi Saree',
      price: 8990,
      originalPrice: 10500,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Sarees',
      rating: 4.9,
      isNew: false,
      isBestseller: true,
      vendor: 'Luxury',
      tags: ['saree', 'wedding']
    },
    {
      id: '3',
      name: 'Emerald Evening Anarkali',
      price: 5490,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Anarkalis',
      rating: 4.7,
      isNew: true,
      isBestseller: false,
      vendor: 'Contemporary',
      tags: ['anarkali', 'party']
    },
    {
      id: '4',
      name: 'Festive Lehenga Choli',
      price: 6990,
      originalPrice: 8200,
      image: 'https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Lehengas',
      rating: 4.6,
      isNew: false,
      isBestseller: false,
      vendor: 'Festive',
      tags: ['lehenga', 'festival']
    },
    {
      id: '5',
      name: 'Navy Block Print Kurta',
      price: 2990,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Kurtas',
      rating: 4.5,
      isNew: false,
      isBestseller: true,
      vendor: 'Casual',
      tags: ['kurta', 'casual']
    },
    {
      id: '6',
      name: 'Silk Palazzo Set',
      price: 4490,
      originalPrice: 5200,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Palazzo Sets',
      rating: 4.4,
      isNew: false,
      isBestseller: false,
      vendor: 'Contemporary',
      tags: ['palazzo', 'casual']
    },
    {
      id: '7',
      name: 'Rose Gold Dupatta',
      price: 1990,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Dupattas',
      rating: 4.5,
      isNew: true,
      isBestseller: false,
      vendor: 'Accessories',
      tags: ['dupatta', 'accessory']
    },
    {
      id: '8',
      name: 'Chanderi Saree',
      price: 5990,
      originalPrice: 7200,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      hoverImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3',
      category: 'Sarees',
      rating: 4.8,
      isNew: false,
      isBestseller: true,
      vendor: 'Luxury',
      tags: ['saree', 'festival']
    }
  ]

  // Transform Shopify data
  const transformedProducts = useMemo(() => {
    if (products && products.length > 0) {
      return products.map(product => ({
        id: product.id,
        name: product.title,
        price: product.priceRange?.minVariantPrice?.amount || 0,
        originalPrice: null,
        image: product.featuredImage?.url || '',
        hoverImage: product.images?.edges?.[1]?.node?.url || '',
        category: product.productType || 'Product',
        rating: 4.5,
        isNew: false,
        isBestseller: false,
        vendor: product.vendor || 'ZOLANI',
        tags: product.tags || [],
        handle: product.handle,
      }))
    }
    return fallbackProducts
  }, [products])

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...transformedProducts]

    // Apply filters
    if (filters.category && filters.category.length > 0) {
      result = result.filter(p => filters.category.includes(p.category))
    }

    if (filters.priceRange && filters.priceRange.length === 2) {
      result = result.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.isBestseller - a.isBestseller)
        break
      case 'newest':
      default:
        result.sort((a, b) => b.isNew - a.isNew)
    }

    return result.slice(0, limit)
  }, [transformedProducts, filters, sortBy, limit])

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

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      handle: product.handle,
    }, 1)

    // Show visual feedback
    setAddedToCart(prev => new Set([...prev, product.id]))
    setTimeout(() => {
      setAddedToCart(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 1500)
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

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader className={`w-8 h-8 ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`} />
        </motion.div>
      </div>
    )
  }

  // Empty state
  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className={`text-center py-12 px-6 rounded-2xl ${isDarkMode ? 'bg-luxury-dark-surface border border-luxury-dark-border' : 'bg-luxury-beige/20 border border-luxury-beige'}`}>
        <p className={`text-lg font-medium ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
          No products match your filters
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {filteredAndSortedProducts.map((product) => (
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
              <button 
                onClick={() => handleAddToCart(product)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedToCart.has(product.id)
                    ? isDarkMode
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 text-white'
                    : isDarkMode
                      ? 'bg-luxury-dark-gold text-luxury-dark-bg hover:bg-luxury-dark-accent hover:text-luxury-dark-text'
                      : 'bg-luxury-charcoal text-luxury-ivory hover:bg-luxury-gold hover:text-luxury-charcoal'
                }`}
              >
                <ShoppingBag size={16} />
                {addedToCart.has(product.id) ? 'Added!' : 'Add to Bag'}
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