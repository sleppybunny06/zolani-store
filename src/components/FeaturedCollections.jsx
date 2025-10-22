import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Royal Silks",
      subtitle: "Handwoven Excellence",
      description: "Authentic Banarasi and Kanjivaram sarees with pure zari work representing centuries of Indian textile mastery.",
      image: "https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      slug: "royal-silks",
      color: "luxury-gold"
    },
    {
      id: 2,
      title: "Bridal Heritage",
      subtitle: "Wedding Grandeur",
      description: "Exquisite lehengas, anarkalis, and shararas crafted for your most cherished moments with traditional embroidery.",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      slug: "bridal-heritage",
      color: "luxury-warm"
    },
    {
      id: 3,
      title: "Artisan Crafts",
      subtitle: "Handcrafted Beauty",
      description: "Block prints, Ajrakh patterns, and Kalamkari artistry celebrating India's diverse regional craft traditions.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      slug: "artisan-crafts",
      color: "luxury-gold"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-luxury">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-luxury-charcoal mb-4">
            Curated Collections
          </h2>
          <p className="text-luxury-warm text-lg max-w-2xl mx-auto font-light">
            Each collection tells a story of heritage, craftsmanship, and contemporary design
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 1 ? 'lg:row-span-2 lg:scale-110' : ''
              }`}
            >
              <Link to={`/collections/${collection.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${collection.image})`,
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <p className={`text-luxury-gold font-medium tracking-widest uppercase mb-2 text-sm`}>
                        {collection.subtitle}
                      </p>
                      
                      <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 leading-tight">
                        {collection.title}
                      </h3>
                      
                      <p className="text-white/90 mb-6 leading-relaxed font-light">
                        {collection.description}
                      </p>
                      
                      <div className="inline-flex items-center text-white group-hover:text-luxury-gold transition-colors duration-300">
                        <span className="font-medium">Explore Collection</span>
                        <ArrowRight 
                          className="ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                          size={18} 
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Decorative Element */}
                  <div className="absolute top-6 right-6 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center group-hover:border-luxury-gold transition-colors duration-300">
                    <div className="w-2 h-2 bg-white rounded-full group-hover:bg-luxury-gold transition-colors duration-300"></div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link 
            to="/collections" 
            className="btn-secondary group"
          >
            View All Collections
            <ArrowRight 
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
              size={18} 
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCollections