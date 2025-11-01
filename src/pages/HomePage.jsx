import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, Lock } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import FeaturedCollections from '../components/FeaturedCollections'
import ProductGrid from '../components/ProductGrid'
import TestimonialSection from '../components/TestimonialSection'
import Newsletter from '../components/Newsletter'
import { useTheme } from '../contexts/ThemeContext'

const HomePage = () => {
  const { isDarkMode } = useTheme()

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Elegant Divider */}
      <div className={`py-8 ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-ivory'}`}>
        <div className="container-luxury">
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className={`flex-1 h-px ${isDarkMode ? 'bg-luxury-dark-border/50' : 'bg-luxury-beige/50'}`}></div>
            <div className={`text-sm tracking-widest uppercase font-light ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
              Luxury Redefined
            </div>
            <div className={`flex-1 h-px ${isDarkMode ? 'bg-luxury-dark-border/50' : 'bg-luxury-beige/50'}`}></div>
          </motion.div>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-gradient-to-b from-luxury-ivory to-luxury-cream'}`}>
        <div className="container-luxury">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div 
              className="flex justify-center mb-8"
              variants={fadeInUp}
            >
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-luxury-dark-gold/20' : 'bg-luxury-gold/10'}`}>
                <Sparkles className={isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} size={32} />
              </div>
            </motion.div>
            
            <motion.h2 
              className={`text-4xl md:text-6xl font-display font-bold mb-8 leading-tight ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}
              variants={fadeInUp}
            >
              Crafted for the Bold<br />
              <span className="text-gradient">Defined by Elegance</span>
            </motion.h2>
            
            <motion.p 
              className={`text-lg md:text-xl leading-relaxed mb-8 font-light max-w-3xl mx-auto ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}
              variants={fadeInUp}
            >
              ZOLANI celebrates the rich tapestry of Indian heritage through a contemporary lens. 
              From handwoven Banarasi silks to intricate Kalamkari prints, every piece tells 
              a story of timeless craftsmanship, modern elegance, and conscious luxury.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Link 
                to="/about" 
                className="inline-flex items-center btn-secondary group"
              >
                The Story Behind the Craft
                <ArrowRight 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                  size={18} 
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Zolani Signature Collection Section */}
      <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-luxury-dark-surface' : 'bg-white'}`}>
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.p 
              className={`text-sm tracking-widest uppercase mb-4 font-light ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`}
              variants={fadeInUp}
            >
              Exclusive Collection
            </motion.p>
            
            <motion.h2 
              className={`text-4xl md:text-5xl font-display font-bold mb-6 leading-tight ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}
              variants={fadeInUp}
            >
              Zolani Signature Collection
            </motion.h2>
            
            <motion.p 
              className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}
              variants={fadeInUp}
            >
              Our most coveted pieces - each handpicked for its exceptional craftsmanship, 
              rare materials, and timeless elegance. Limited edition designs that celebrate 
              the intersection of heritage and haute couture.
            </motion.p>
          </motion.div>

          {/* Signature Products Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Royal Banarasi Heritage Saree",
                price: "₹24,990",
                image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                label: "Limited Edition"
              },
              {
                title: "Bridal Splendor Lehenga",
                price: "₹34,990",
                image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                label: "Exclusively Crafted"
              },
              {
                title: "Artisan's Pride Saree",
                price: "₹19,990",
                image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                label: "Hand-Embroidered"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className={`group relative overflow-hidden rounded-2xl ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-ivory'}`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/40' : 'bg-white/20'} group-hover:${isDarkMode ? 'bg-black/50' : 'bg-white/30'} transition-all duration-300`}></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`inline-block px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full ${isDarkMode ? 'bg-luxury-dark-gold text-luxury-dark-bg' : 'bg-luxury-gold text-luxury-charcoal'}`}>
                      {item.label}
                    </span>
                  </div>
                </div>
                
                <div className={`p-6 text-center ${isDarkMode ? 'bg-luxury-dark-surface border-t border-luxury-dark-border' : 'bg-white border-t border-luxury-beige'}`}>
                  <h3 className={`font-display font-semibold mb-3 text-lg group-hover:${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} transition-colors duration-300 ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`}>
                    {item.price}
                  </p>
                  <Link 
                    to="/shop"
                    className="inline-flex items-center justify-center w-full btn-secondary group/btn text-sm"
                  >
                    View Details
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Best Sellers */}
      <section className={`py-24 ${isDarkMode ? 'bg-luxury-dark-bg' : 'bg-luxury-ivory'}`}>
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.p 
              className={`text-sm tracking-widest uppercase mb-4 font-light ${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'}`}
              variants={fadeInUp}
            >
              Most Loved
            </motion.p>

            <motion.h2 
              className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}
              variants={fadeInUp}
            >
              Bestsellers
            </motion.h2>

            <motion.p 
              className={`text-lg max-w-2xl mx-auto font-light ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}
              variants={fadeInUp}
            >
              Discover our most loved ethnic pieces - from stunning Kanjivaram sarees to elegant Anarkali sets
            </motion.p>
          </motion.div>
          
          <ProductGrid limit={8} />
          
          <motion.div 
            className="text-center mt-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link 
              to="/shop" 
              className="btn-primary group"
            >
              Explore All Products
              <ArrowRight 
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                size={18} 
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-luxury-dark-surface' : 'bg-gradient-to-r from-luxury-beige to-luxury-blush'}`}>
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
              Our Philosophy
            </h2>
            <p className={`text-lg max-w-2xl mx-auto font-light ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
              Guided by principles of elegance, sustainability, and cultural celebration
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              {
                icon: Heart,
                title: "Conscious Craftsmanship",
                description: "Every piece is thoughtfully created with attention to detail, ethical sourcing, and sustainable practices that honor both artisans and the environment."
              },
              {
                icon: Star,
                title: "Contemporary Design",
                description: "Modern silhouettes that honor traditional techniques while embracing contemporary aesthetics for the woman of today."
              },
              {
                icon: Sparkles,
                title: "Timeless Elegance",
                description: "Designs that transition seamlessly from day to evening, casual to festive, transcending trends and seasons."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 rounded-2xl group hover:scale-105 transition-transform duration-500 ${isDarkMode ? 'bg-luxury-dark-bg border border-luxury-dark-border/50' : 'bg-white/80 backdrop-blur-sm border border-luxury-beige/50'}`}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-luxury-dark-gold/20 group-hover:bg-luxury-dark-gold/30' : 'bg-luxury-gold/10 group-hover:bg-luxury-gold/20'} transition-all duration-300`}>
                    <item.icon className={isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} size={36} />
                  </div>
                </motion.div>
                <h3 className={`text-xl font-display font-semibold mb-4 group-hover:${isDarkMode ? 'text-luxury-dark-gold' : 'text-luxury-gold'} transition-colors duration-300 ${isDarkMode ? 'text-luxury-dark-text' : 'text-luxury-charcoal'}`}>
                  {item.title}
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-luxury-dark-text-muted' : 'text-luxury-warm'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

export default HomePage