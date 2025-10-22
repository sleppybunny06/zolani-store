import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import FeaturedCollections from '../components/FeaturedCollections'
import ProductGrid from '../components/ProductGrid'
import TestimonialSection from '../components/TestimonialSection'
import Newsletter from '../components/Newsletter'

const HomePage = () => {
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

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Brand Story Section */}
      <section className="py-20 bg-gradient-to-b from-luxury-ivory to-luxury-cream">
        <div className="container-luxury">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div 
              className="flex justify-center mb-6"
              variants={fadeInUp}
            >
              <Sparkles className="text-luxury-gold" size={32} />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-display font-bold text-luxury-charcoal mb-8 leading-tight"
              variants={fadeInUp}
            >
              Where Tradition Meets
              <span className="text-gradient"> Effortless Modernity</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-luxury-warm leading-relaxed mb-8 font-light"
              variants={fadeInUp}
            >
              ZOLANI celebrates the rich tapestry of Indian heritage through contemporary lens. 
              From handwoven Banarasi silks to intricate Kalamkari prints, every piece tells 
              a story of timeless craftsmanship and modern elegance.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Link 
                to="/about" 
                className="inline-flex items-center btn-secondary group"
              >
                Discover Our Story
                <ArrowRight 
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                  size={18} 
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Best Sellers */}
      <section className="py-20 bg-luxury-ivory">
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
              Bestsellers
            </h2>
            <p className="text-luxury-warm text-lg max-w-2xl mx-auto">
              Discover our most loved ethnic pieces - from stunning Kanjivaram sarees to elegant Anarkali sets
            </p>
          </motion.div>
          
          <ProductGrid limit={8} />
          
          <motion.div 
            className="text-center mt-12"
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
      <section className="py-20 bg-gradient-to-r from-luxury-beige to-luxury-blush">
        <div className="container-luxury">
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
                description: "Every piece is thoughtfully created with attention to detail and sustainable practices."
              },
              {
                icon: Star,
                title: "Contemporary Design",
                description: "Modern silhouettes that honor traditional techniques while embracing contemporary aesthetics."
              },
              {
                icon: Sparkles,
                title: "Effortless Elegance",
                description: "Designs that transition seamlessly from day to evening, casual to festive."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-8 card-luxury group hover:scale-105 transition-transform duration-500"
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                    <item.icon className="text-luxury-gold" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-luxury-charcoal mb-4">
                  {item.title}
                </h3>
                <p className="text-luxury-warm leading-relaxed">
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