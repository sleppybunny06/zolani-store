import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  ShoppingBag,
  User,
  Calendar
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
    }, 2000)
  }

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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Studio",
      content: ["ZOLANI Design Studio", "Fashion District, Bandra West", "Mumbai, Maharashtra 400050", "India"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: ["+91 22 6789 0123", "+91 98765 43210 (WhatsApp)"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: ["hello@zolani.com", "orders@zolani.com", "press@zolani.com"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Studio Hours",
      content: ["Monday - Friday: 10:00 AM - 7:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 12:00 PM - 5:00 PM"],
      action: "Book Appointment"
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'orders', label: 'Order Support' },
    { value: 'returns', label: 'Returns & Exchanges' },
    { value: 'custom', label: 'Custom Design' },
    { value: 'press', label: 'Press & Media' },
    { value: 'careers', label: 'Careers' }
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/zolani', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/zolani', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/zolani', color: 'hover:text-blue-400' }
  ]

  const services = [
    {
      icon: User,
      title: "Personal Styling",
      description: "Book a one-on-one styling session with our experts"
    },
    {
      icon: ShoppingBag,
      title: "Custom Orders",
      description: "Create bespoke pieces tailored to your preferences"
    },
    {
      icon: Calendar,
      title: "Virtual Consultations",
      description: "Get style advice from the comfort of your home"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Quick assistance via our WhatsApp business line"
    }
  ]

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
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-luxury-warm font-light">
              We'd love to hear from you. Whether you have questions about our collections, 
              need styling advice, or want to share your ZOLANI story — reach out to us.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="card-luxury p-8"
            >
              <h2 className="text-2xl font-display font-bold text-luxury-charcoal mb-6">
                Send Us a Message
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-luxury-charcoal font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-luxury"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-luxury-charcoal font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-luxury"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-luxury-charcoal font-medium mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="input-luxury"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-luxury-charcoal font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-luxury"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-luxury-charcoal font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input-luxury resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-luxury-ivory/30 border-t-luxury-ivory rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-luxury-charcoal mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-luxury-warm mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="card-luxury p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-luxury-gold/10 rounded-lg">
                      <info.icon className="text-luxury-gold" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-luxury-charcoal mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1 text-luxury-warm text-sm mb-4">
                        {info.content.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                      <button className="text-luxury-gold text-sm font-medium hover:underline">
                        {info.action}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Services */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="card-luxury p-6"
            >
              <h3 className="font-display font-semibold text-luxury-charcoal mb-6">
                Our Services
              </h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <service.icon className="text-luxury-gold mt-1" size={18} />
                    <div>
                      <h4 className="font-medium text-luxury-charcoal">{service.title}</h4>
                      <p className="text-luxury-warm text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="card-luxury p-6"
            >
              <h3 className="font-display font-semibold text-luxury-charcoal mb-6">
                Follow Our Journey
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-3 bg-luxury-cream hover:bg-luxury-gold rounded-lg transition-all duration-300 ${social.color} group`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container-luxury">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-display font-bold text-luxury-charcoal mb-8 text-center">
              Find Our Studio
            </h2>
            <div className="aspect-[16/9] bg-luxury-beige rounded-2xl overflow-hidden">
              {/* Placeholder for map - in real app, integrate Google Maps or similar */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-cream to-luxury-beige">
                <div className="text-center">
                  <MapPin className="text-luxury-gold mx-auto mb-4" size={48} />
                  <h3 className="font-display font-semibold text-luxury-charcoal mb-2">
                    ZOLANI Design Studio
                  </h3>
                  <p className="text-luxury-warm">
                    Fashion District, Bandra West, Mumbai
                  </p>
                  <button className="mt-4 btn-secondary">
                    View on Google Maps
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage