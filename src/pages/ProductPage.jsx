import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader,
  Heart, 
  ShoppingBag, 
  Share2, 
  Star, 
  ChevronDown,
  ChevronUp,
  Truck,
  RotateCcw,
  Shield,
  Ruler,
  Plus,
  Minus
} from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import { useShopifyProduct } from '../hooks/useShopifyProduct'

const ProductPage = () => {
  const { id } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSection, setExpandedSection] = useState('description')

  // Fetch product from Shopify using handle (id is used as handle in URL)
  const { product: shopifyProduct, loading, error } = useShopifyProduct(id)

  // Fallback product data
  const fallbackProduct = {
    id: 'ivory-bloom-kurta',
    name: "Ivory Bloom Kurta Set",
    price: 3490,
    originalPrice: 4200,
    rating: 4.8,
    reviews: 127,
    description: "Crafted in soft muslin with a gentle floral print — timeless yet playful. This elegant kurta set embodies the perfect balance between traditional aesthetics and contemporary comfort.",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory', 'Blush', 'Sage'],
    fabric: 'Pure Cotton Muslin',
    care: 'Hand wash in cold water. Do not bleach. Dry in shade.',
    delivery: '4-6 business days',
    features: [
      'Handcrafted with premium cotton muslin',
      'Intricate floral block print detailing',
      'Comfortable relaxed fit',
      'Includes matching dupatta',
      'Made in India with sustainable practices'
    ],
    model: {
      height: "5'7\"",
      size: 'M',
      bust: '34"',
      waist: '28"'
    }
  }

  // Transform Shopify product data to match expected format, or use fallback
  const product = shopifyProduct ? {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    price: parseInt(shopifyProduct.priceRange?.minVariantPrice?.amount) || 0,
    originalPrice: parseInt(shopifyProduct.priceRange?.maxVariantPrice?.amount) || null,
    rating: 4.5,
    reviews: 127,
    description: shopifyProduct.description || "Premium handcrafted collection piece.",
    images: shopifyProduct.images?.edges?.map(edge => edge.node?.url) || [],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: shopifyProduct.options?.find(opt => opt.name === 'Color')?.values || [],
    fabric: shopifyProduct.options?.find(opt => opt.name === 'Fabric')?.values?.[0] || 'Premium Fabric',
    care: 'Hand wash in cold water. Do not bleach. Dry in shade.',
    delivery: '4-6 business days',
    features: [
      'Handcrafted with premium materials',
      'Intricate detailing',
      'Comfortable fit',
      'Made in India',
      'Sustainable practices'
    ],
    model: {
      height: "5'7\"",
      size: 'M',
      bust: '34"',
      waist: '28"'
    }
  } : fallbackProduct

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const maxQuantity = 10

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // Add to bag logic
    console.log(`Added ${quantity} x ${product.name} (${selectedSize}) to bag`)
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section)
  }

  // Loading state - shows spinner briefly before falling back to demo/mock data
  if (loading && !product) {
    return (
      <div className="min-h-screen bg-luxury-ivory flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-12 h-12 text-luxury-gold" />
        </motion.div>
      </div>
    )
  }

  // No error state - we always have fallback product data

  const productSections = [
    {
      id: 'description',
      title: 'Description & Features',
      content: (
        <div className="space-y-4">
          <p className="text-luxury-warm leading-relaxed">{product.description}</p>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-luxury-warm">
                <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 'care',
      title: 'Fabric & Care',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-luxury-charcoal mb-2">Fabric</h4>
            <p className="text-luxury-warm">{product.fabric}</p>
          </div>
          <div>
            <h4 className="font-medium text-luxury-charcoal mb-2">Care Instructions</h4>
            <p className="text-luxury-warm">{product.care}</p>
          </div>
        </div>
      )
    },
    {
      id: 'sizing',
      title: 'Size & Fit',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-luxury-charcoal mb-2">Model Information</h4>
            <div className="text-luxury-warm space-y-1">
              <p>Height: {product.model.height}</p>
              <p>Size: {product.model.size}</p>
              <p>Bust: {product.model.bust}, Waist: {product.model.waist}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-luxury-gold hover:text-luxury-warm transition-colors">
            <Ruler size={16} />
            <span>Size Guide</span>
          </button>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Truck className="text-luxury-gold mt-1" size={18} />
            <div>
              <p className="font-medium text-luxury-charcoal">Free Shipping</p>
              <p className="text-luxury-warm">Delivery in {product.delivery}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="text-luxury-gold mt-1" size={18} />
            <div>
              <p className="font-medium text-luxury-charcoal">Easy Returns</p>
              <p className="text-luxury-warm">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="text-luxury-gold mt-1" size={18} />
            <div>
              <p className="font-medium text-luxury-charcoal">Quality Assurance</p>
              <p className="text-luxury-warm">Handpicked & quality checked</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-luxury-ivory">
      <div className="container-luxury py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-luxury-gold scale-105' 
                      : 'border-luxury-beige hover:border-luxury-warm'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-luxury-gold fill-current' : 'text-luxury-beige'}
                  />
                ))}
                <span className="text-luxury-warm">({product.reviews} reviews)</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-luxury-charcoal">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-luxury-warm line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-luxury-charcoal">Size</label>
                <button className="text-luxury-gold text-sm hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`aspect-square border-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-charcoal'
                        : 'border-luxury-beige hover:border-luxury-warm text-luxury-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="font-medium text-luxury-charcoal block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-luxury-beige rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-luxury-beige transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    className="p-3 hover:bg-luxury-beige transition-colors"
                    disabled={quantity >= maxQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-luxury-warm text-sm">
                  {maxQuantity - quantity} left in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToBag}
                className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-lg"
                disabled={!selectedSize}
              >
                <ShoppingBag size={20} />
                Add to Bag
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 border-2 rounded-lg font-medium transition-all duration-300 ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-luxury-beige hover:border-luxury-gold text-luxury-charcoal hover:text-luxury-gold'
                  }`}
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                  Wishlist
                </button>
                
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-luxury-beige hover:border-luxury-gold text-luxury-charcoal hover:text-luxury-gold rounded-lg font-medium transition-all duration-300">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-luxury-beige">
              <div className="text-center">
                <Truck className="text-luxury-gold mx-auto mb-2" size={20} />
                <p className="text-sm text-luxury-warm">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="text-luxury-gold mx-auto mb-2" size={20} />
                <p className="text-sm text-luxury-warm">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="text-luxury-gold mx-auto mb-2" size={20} />
                <p className="text-sm text-luxury-warm">Quality Assured</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Accordion */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg shadow-luxury-beige/20 overflow-hidden">
            {productSections.map((section, index) => (
              <div key={section.id} className={index !== 0 ? 'border-t border-luxury-beige' : ''}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-luxury-cream/30 transition-colors"
                >
                  <h3 className="font-display font-semibold text-luxury-charcoal text-lg">
                    {section.title}
                  </h3>
                  {expandedSection === section.id ? (
                    <ChevronUp className="text-luxury-gold" size={20} />
                  ) : (
                    <ChevronDown className="text-luxury-gold" size={20} />
                  )}
                </button>
                {expandedSection === section.id && (
                  <div className="px-6 pb-6">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-display font-bold text-luxury-charcoal mb-8 text-center">
            You Might Also Like
          </h2>
          <ProductGrid limit={4} />
        </motion.div>
      </div>
    </div>
  )
}

export default ProductPage