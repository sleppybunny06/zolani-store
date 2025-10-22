import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Leaf, Users, Award, Globe } from 'lucide-react'

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const values = [
    {
      icon: Heart,
      title: "Heritage Craftsmanship",
      description: "Preserving age-old Indian textile traditions through authentic handloom weaving and intricate embroidery techniques."
    },
    {
      icon: Sparkles,
      title: "Ethnic Elegance", 
      description: "Celebrating India's rich cultural tapestry with traditional silhouettes enhanced by contemporary comfort."
    },
    {
      icon: Leaf,
      title: "Natural Materials",
      description: "Using pure silk, organic cotton, and traditional dyes to maintain authenticity and sustainability."
    },
    {
      icon: Users,
      title: "Artisan Empowerment",
      description: "Directly supporting master weavers, block print artists, and embroidery craftspeople across India."
    }
  ]

  const milestones = [
    {
      year: "2019",
      title: "Heritage Revival",
      description: "ZOLANI was founded to revive and celebrate India's magnificent textile heritage for the modern woman."
    },
    {
      year: "2020", 
      title: "Artisan Partnerships",
      description: "Established direct partnerships with master weavers in Varanasi, Kanchipuram, and Gujarat."
    },
    {
      year: "2021",
      title: "Banarasi Excellence",
      description: "Launched our signature Royal Banarasi collection, featuring authentic handwoven silk sarees."
    },
    {
      year: "2022",
      title: "Regional Expansion",
      description: "Extended our artisan network to include Chanderi weavers, Ajrakh block printers, and Lucknow embroiderers."
    },
    {
      year: "2023",
      title: "Craft Preservation",
      description: "Initiated programs to teach traditional techniques to younger generations of artisans."
    },
    {
      year: "2024",
      title: "Cultural Ambassador",
      description: "Became official partner for promoting Indian ethnic wear at international fashion events."
    }
  ]

  const stats = [
    { number: "500+", label: "Artisans Supported" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Delivered" },
    { number: "95%", label: "Satisfaction Rate" }
  ]

  return (
    <div className="min-h-screen bg-luxury-ivory">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-cream via-luxury-blush to-luxury-beige overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-luxury-gold rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-luxury-warm rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-luxury-gold rounded-full"></div>
        </div>

        <div className="container-luxury relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div 
              className="flex justify-center mb-6"
              variants={fadeInUp}
            >
              <div className="p-4 rounded-full bg-luxury-gold/20">
                <Heart className="text-luxury-gold" size={32} />
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold text-luxury-charcoal mb-6 leading-tight"
              variants={fadeInUp}
            >
              Our Story
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-luxury-warm leading-relaxed font-light"
              variants={fadeInUp}
            >
              ZOLANI was born from a dream — to weave Indian roots with global ease. 
              Every silhouette celebrates the spirit of today's woman — confident, 
              expressive, and effortlessly elegant.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b830?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Founder of ZOLANI"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
                  Meet the Founder
                </h2>
                <h3 className="text-xl text-luxury-gold font-medium mb-6">
                  Priya Mehta, Creative Director
                </h3>
              </div>
              
              <div className="space-y-4 text-luxury-warm leading-relaxed">
                <p>
                  "Growing up in Rajasthan, I was surrounded by the most incredible textile heritage. 
                  My grandmother would tell me stories while weaving on her handloom, and I knew 
                  from a young age that I wanted to be part of preserving this beautiful craft."
                </p>
                
                <p>
                  "After studying fashion design in Milan and working with luxury brands in Paris, 
                  I realized there was a gap in the market for truly contemporary Indian wear that 
                  didn't compromise on tradition or quality."
                </p>
                
                <p>
                  "ZOLANI represents my journey — from the ancient looms of my childhood to the 
                  modern wardrobes of women who appreciate both heritage and innovation. Every piece 
                  we create is a bridge between worlds."
                </p>
              </div>

              <div className="pt-6 border-t border-luxury-beige">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <Award className="text-luxury-gold mx-auto mb-2" size={24} />
                    <p className="text-luxury-charcoal font-semibold">15+ Awards</p>
                    <p className="text-luxury-warm text-sm">Design Excellence</p>
                  </div>
                  <div>
                    <Globe className="text-luxury-gold mx-auto mb-2" size={24} />
                    <p className="text-luxury-charcoal font-semibold">20+ Countries</p>
                    <p className="text-luxury-warm text-sm">Global Reach</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-luxury-beige">
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
              Our Values
            </h2>
            <p className="text-luxury-warm text-lg max-w-2xl mx-auto">
              The principles that guide every decision, every design, and every relationship we build.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 card-luxury hover:scale-105 transition-transform duration-500"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-luxury-gold/10">
                    <value.icon className="text-luxury-gold" size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold text-luxury-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-luxury-warm text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="container-luxury">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-4">
              Our Journey
            </h2>
            <p className="text-luxury-warm text-lg max-w-2xl mx-auto">
              From a dream to reality — the milestones that shaped ZOLANI into what it is today.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-luxury-gold/30 hidden md:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 1 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 card-luxury p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl font-display font-bold text-luxury-gold">
                          {milestone.year}
                        </span>
                        <div className="h-px flex-1 bg-luxury-beige"></div>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-luxury-charcoal mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-luxury-warm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:block w-4 h-4 bg-luxury-gold rounded-full border-4 border-white shadow-lg"></div>

                    {/* Spacer */}
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-luxury-charcoal">
        <div className="container-luxury">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-luxury-gold mb-2">
                  {stat.number}
                </div>
                <p className="text-luxury-ivory/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-blush to-luxury-cream">
        <div className="container-luxury text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-charcoal mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-lg text-luxury-warm mb-8 leading-relaxed">
              Join the ZOLANI community and be part of a movement that celebrates heritage, 
              supports artisans, and redefines contemporary Indian fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Shop Our Collections
              </button>
              <button className="btn-secondary">
                Follow Our Journey
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage