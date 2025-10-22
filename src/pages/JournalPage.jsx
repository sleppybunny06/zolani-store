import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react'

const JournalPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Stories', count: 24 },
    { id: 'style', name: 'Style Notes', count: 8 },
    { id: 'behind-scenes', name: 'Behind the Scenes', count: 6 },
    { id: 'festive', name: 'Festive Edits', count: 5 },
    { id: 'sustainability', name: 'Sustainability', count: 3 },
    { id: 'community', name: 'Community', count: 2 }
  ]

  const journalPosts = [
    {
      id: 1,
      title: "The Art of Festive Dressing: A Complete Guide",
      excerpt: "Navigate the festive season with grace and style. From traditional ceremonies to contemporary celebrations, discover how to choose pieces that make you feel confident and elegant.",
      image: "https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: 'festive',
      author: 'Priya Mehta',
      date: '2024-01-15',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: "From Sketch to Silhouette: Creating the Woven Dreams Collection",
      excerpt: "Take a behind-the-scenes journey into our design process. See how traditional motifs are reimagined for the modern woman's wardrobe through careful research and artisan collaboration.",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: 'behind-scenes',
      author: 'Design Team',
      date: '2024-01-12',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 3,
      title: "Sustainable Luxury: Our Commitment to Conscious Fashion",
      excerpt: "Explore our journey towards sustainable practices. From sourcing eco-friendly materials to supporting local artisan communities, discover how ZOLANI is making a positive impact.",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: 'sustainability',
      author: 'Sustainability Team',
      date: '2024-01-10',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 4,
      title: "How to Style Fusion Wear for the Modern Workplace",
      excerpt: "Professional doesn't have to mean boring. Learn how to incorporate Indian fusion pieces into your work wardrobe while maintaining elegance and cultural pride.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: 'style',
      author: 'Style Team',
      date: '2024-01-08',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 5,
      title: "Meet the Artisans: Stories from Our Rajasthan Studio",
      excerpt: "Get to know the incredible craftspeople behind our collections. Their stories of tradition, skill, and passion are woven into every piece we create.",
      image: "https://images.unsplash.com/photo-1631084655463-e671365ec05f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: 'community',
      author: 'Community Team',
      date: '2024-01-05',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 6,
      title: "Color Psychology in Indian Fashion: The ZOLANI Palette",
      excerpt: "Discover the emotional and cultural significance behind our carefully curated color palette. Learn how different hues can transform your mood and presence.",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
      category: 'style',
      author: 'Color Specialist',
      date: '2024-01-03',
      readTime: '6 min read',
      featured: false
    }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? journalPosts 
    : journalPosts.filter(post => post.category === selectedCategory)

  const featuredPost = journalPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
              The ZOLANI Journal
            </h1>
            <p className="text-lg md:text-xl text-luxury-warm font-light">
              Stories of style, heritage, and craftsmanship. Discover the narratives 
              behind our collections and the philosophy that drives our designs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-16">
        {/* Categories */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variants={fadeInUp}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-luxury-gold text-luxury-charcoal'
                  : 'bg-white text-luxury-warm hover:text-luxury-charcoal border border-luxury-beige hover:border-luxury-gold'
              }`}
            >
              {category.name} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center card-luxury p-8 lg:p-12">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-luxury-gold text-luxury-charcoal px-3 py-1 text-xs font-semibold rounded-full">
                    FEATURED
                  </span>
                  <span className="text-luxury-gold font-medium text-sm capitalize">
                    {featuredPost.category.replace('-', ' ')}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-display font-bold text-luxury-charcoal mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-luxury-warm mb-6 leading-relaxed text-lg">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-luxury-warm text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/journal/${featuredPost.id}`}
                  className="inline-flex items-center btn-primary group"
                >
                  Read Full Story
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                </Link>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {regularPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              className="group card-luxury overflow-hidden hover:scale-105 transition-transform duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} className="text-luxury-gold" />
                  <span className="text-luxury-gold text-sm font-medium capitalize">
                    {post.category.replace('-', ' ')}
                  </span>
                </div>
                
                <h3 className="text-lg font-display font-semibold text-luxury-charcoal mb-3 group-hover:text-luxury-gold transition-colors duration-300 leading-tight">
                  <Link to={`/journal/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-luxury-warm mb-4 leading-relaxed text-sm">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-luxury-warm">
                  <div className="flex items-center gap-4">
                    <span>{post.author}</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button className="btn-secondary">
            Load More Stories
          </button>
        </motion.div>
      </div>

      {/* Newsletter CTA */}
      <section className="py-20 bg-luxury-charcoal">
        <div className="container-luxury text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-ivory mb-6">
              Stay Updated with Our Latest Stories
            </h2>
            <p className="text-lg text-luxury-ivory/80 mb-8 leading-relaxed">
              Subscribe to receive our newest journal entries, style guides, 
              and behind-the-scenes content directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 input-luxury"
              />
              <button className="btn-gold whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default JournalPage