import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "ZOLANI's pieces are absolutely stunning. The attention to detail and quality of craftsmanship is exceptional. I've received countless compliments wearing their festive collection!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      product: "Ivory Bloom Kurta Set"
    },
    {
      id: 2,
      name: "Anisha Patel",
      location: "Delhi",
      rating: 5,
      text: "The perfect blend of traditional and contemporary. ZOLANI understands what the modern Indian woman wants - elegance with comfort. Their fabrics are luxurious yet breathable.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      product: "Sage Cotton Palazzo Set"
    },
    {
      id: 3,
      name: "Kavya Reddy",
      location: "Bangalore",
      rating: 5,
      text: "I'm obsessed with ZOLANI's aesthetic! Every piece tells a story and makes me feel confident and beautiful. The customer service is also exceptional.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      product: "Golden Thread Anarkali"
    },
    {
      id: 4,
      name: "Meera Joshi",
      location: "Pune",
      rating: 5,
      text: "ZOLANI has become my go-to for both festive occasions and everyday elegance. The versatility of their designs is unmatched. Truly luxury fashion with a soul.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      product: "Minimalist Linen Kurta"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const slideVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -300,
      opacity: 0
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-luxury-cream via-luxury-blush to-luxury-beige relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-luxury-gold rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-luxury-warm rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-luxury-gold rounded-full"></div>
      </div>

      <div className="container-luxury relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
            What Our Customers Say
          </h2>
          <p className="text-luxury-warm text-lg max-w-2xl mx-auto">
            Stories of elegance, comfort, and confidence from our ZOLANI family
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                <div className="card-luxury p-8 md:p-12 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 text-luxury-gold/20">
                    <Quote size={48} />
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="text-luxury-gold fill-current" 
                        size={20} 
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-luxury-charcoal mb-8 leading-relaxed font-light italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-luxury-gold/20"
                    />
                    <div className="text-left">
                      <div className="font-display font-semibold text-luxury-charcoal">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-luxury-warm text-sm">
                        {testimonials[currentTestimonial].location}
                      </div>
                      <div className="text-luxury-gold text-sm">
                        Purchased: {testimonials[currentTestimonial].product}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-luxury-charcoal hover:text-luxury-gold transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft 
                size={20} 
                className="group-hover:-translate-x-1 transition-transform duration-300" 
              />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-luxury-charcoal hover:text-luxury-gold transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-luxury-gold scale-110' 
                    : 'bg-luxury-warm/50 hover:bg-luxury-warm'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection