import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Pause } from 'lucide-react'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Royal Banarasi Collection",
      subtitle: "Heritage Handwoven Excellence",
      description: "Exquisite handwoven Banarasi silks with intricate zari work that celebrate India's finest textile traditions",
      cta: "Explore Sarees",
      ctaLink: "/collections/banarasi-sarees"
    },
    {
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Festive Anarkalis",
      subtitle: "Timeless Ethnic Elegance",
      description: "Stunning floor-length Anarkali suits with intricate embroidery perfect for weddings and celebrations",
      cta: "Shop Anarkalis",
      ctaLink: "/collections/anarkali-suits"
    },
    {
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Handcrafted Lehengas",
      subtitle: "Artisan Made Beauty",
      description: "Traditional lehengas featuring mirror work, gota patti, and hand embroidery from master craftspeople",
      cta: "Discover Lehengas",
      ctaLink: "/collections/lehenga-cholis"
    }
  ]

  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [isPlaying, heroSlides.length])

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
    }
  }

  const textVariants = {
    enter: {
      opacity: 0,
      y: 50,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -50,
    }
  }

  const itemVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-luxury text-center text-white">
              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="max-w-4xl mx-auto"
              >
                <motion.p 
                  variants={itemVariants}
                  className="text-luxury-gold font-medium tracking-widest uppercase mb-4 text-sm md:text-base"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed text-white/90"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                <motion.div variants={itemVariants}>
                  <Link 
                    to={heroSlides[currentSlide].ctaLink}
                    className="inline-flex items-center bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white transition-all duration-300 px-8 py-4 font-medium tracking-wide group transform hover:scale-105"
                  >
                    {heroSlides[currentSlide].cta}
                    <ArrowRight 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                      size={18} 
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-10">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-luxury-gold scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm font-light mb-2 rotate-90 origin-bottom">scroll</span>
          <div className="w-px h-12 bg-white/50"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection