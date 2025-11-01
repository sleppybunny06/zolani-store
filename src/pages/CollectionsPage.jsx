import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Loader } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import { useShopifyCollections, useCollectionByHandle } from '../hooks/useShopifyCollections'

const CollectionsPage = () => {
  const { slug } = useParams()
  
  // Fetch specific collection if slug exists
  const { collection: specificCollection, loading: specificLoading, error: specificError } = useCollectionByHandle(slug, 50)
  
  // Fetch all collections
  const { collections: shopifyCollections, loading: allLoading, error: allError } = useShopifyCollections(50)

  // Fallback collections data if API fails
  const defaultCollections = [
    {
      id: 1,
      title: "The Festive Bloom",
      slug: "festive-bloom",
      subtitle: "Celebrate with Grace",
      description: "Intricate handwork meets contemporary silhouettes in this stunning festive collection. Each piece tells a story of celebration, joy, and timeless elegance.",
      image: "https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      products: 24
    },
    {
      id: 2,
      title: "Everyday Elegance",
      slug: "everyday-elegance", 
      subtitle: "Effortless Sophistication",
      description: "Versatile pieces that transition seamlessly from day to evening with timeless appeal. Comfort meets luxury in every thread.",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      products: 18
    },
    {
      id: 3,
      title: "Woven Dreams",
      slug: "woven-dreams",
      subtitle: "Heritage Reimagined", 
      description: "Traditional weaving techniques reimagined for the modern woman's wardrobe. Where ancestral craft meets contemporary design philosophy.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      products: 16
    }
  ]

  // Transform Shopify collections to match expected format, or use defaults
  const collections = shopifyCollections && shopifyCollections.length > 0 
    ? shopifyCollections.map(col => ({
        id: col.id,
        title: col.title,
        slug: col.handle,
        subtitle: col.title,
        description: col.description || "Curated collection of premium handcrafted pieces.",
        image: col.image?.url || defaultCollections[0].image,
        products: col.products?.edges?.length || 0
      }))
    : defaultCollections

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  // If we have a specific collection slug, show that collection
  const foundCollection = collections.find(c => c.slug === slug)

  if (specificLoading) {
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

  if (foundCollection) {
    return (
      <div className="min-h-screen bg-luxury-ivory">
        {/* Collection Hero */}
        <section className="relative h-screen min-h-[600px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${foundCollection.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-luxury text-center text-white">
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="max-w-4xl mx-auto"
              >
                <p className="text-luxury-gold font-medium tracking-widest uppercase mb-4 text-sm md:text-base">
                  {foundCollection.subtitle}
                </p>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                  {foundCollection.title}
                </h1>
                
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light leading-relaxed text-white/90">
                  {foundCollection.description}
                </p>
                
                <div className="flex items-center justify-center gap-4 text-white/80">
                  <span>{foundCollection.products} pieces</span>
                  <span>•</span>
                  <span>Handcrafted in India</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collection Products */}
        <section className="py-20">
          <div className="container-luxury">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <ProductGrid limit={Math.max(foundCollection.products, 20)} />
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  // Show all collections
  return (
    <div className="min-h-screen bg-luxury-ivory">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-luxury-cream to-luxury-blush">
        <div className="container-luxury">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-luxury-charcoal mb-6">
              Our Collections
            </h1>
            <p className="text-lg md:text-xl text-luxury-warm font-light">
              Each collection tells a story of heritage, craftsmanship, and contemporary design. 
              Discover the narrative that speaks to your soul.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20">
        <div className="container-luxury">
          <div className="space-y-16">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Link to={`/collections/${collection.slug}`} className="block group">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Overlay Content */}
                      <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-luxury-gold font-medium tracking-widest uppercase mb-2 text-sm">
                          {collection.products} pieces
                        </p>
                        <div className="flex items-center text-white group-hover:text-luxury-gold transition-colors duration-300">
                          <span className="font-medium">Explore Collection</span>
                          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <p className="text-luxury-gold font-medium tracking-widest uppercase mb-2 text-sm">
                        {collection.subtitle}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
                        {collection.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-luxury-warm leading-relaxed font-light">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center gap-6 text-luxury-warm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                        <span>{collection.products} pieces</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                        <span>Handcrafted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                        <span>Limited Edition</span>
                      </div>
                    </div>
                    
                    <div>
                      <Link 
                        to={`/collections/${collection.slug}`}
                        className="inline-flex items-center btn-secondary group"
                      >
                        View Collection
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-charcoal text-center">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-ivory mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-luxury-ivory/80 mb-8 leading-relaxed">
              Our design team is always working on new collections. 
              Join our newsletter to be the first to know about upcoming releases.
            </p>
            <Link to="/contact" className="btn-gold">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CollectionsPage