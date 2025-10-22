import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
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

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/shop?filter=new' },
      { name: 'Festive Collection', href: '/collections/festive' },
      { name: 'Everyday Luxe', href: '/collections/everyday' },
      { name: 'Woven Dreams', href: '/collections/woven-dreams' },
      { name: 'Sale', href: '/shop?filter=sale' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' }
    ],
    help: [
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'Contact Us', href: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refunds' }
    ]
  }

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/zolani', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/zolani', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/zolani', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/zolani', color: 'hover:text-red-500' }
  ]

  return (
    <footer className="bg-luxury-beige border-t border-luxury-sage/20">
      {/* Main Footer */}
      <div className="container-luxury py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-3xl font-display font-bold text-luxury-charcoal hover:text-luxury-gold transition-colors duration-300">
                ZOLANI
              </h3>
            </Link>
            <p className="text-luxury-warm mb-6 leading-relaxed font-light">
              Where tradition meets effortless modernity. Celebrating the spirit 
              of today's woman through conscious craftsmanship and contemporary design.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 rounded-full bg-luxury-cream hover:bg-luxury-gold text-luxury-charcoal ${social.color} transition-all duration-300 group`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-display font-semibold text-luxury-charcoal mb-4 text-lg">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-luxury-warm hover:text-luxury-gold transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-display font-semibold text-luxury-charcoal mb-4 text-lg">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-luxury-warm hover:text-luxury-gold transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-display font-semibold text-luxury-charcoal mb-4 text-lg">
              Help & Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-luxury-warm hover:text-luxury-gold transition-colors duration-300 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-display font-semibold text-luxury-charcoal mb-4 text-lg">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-luxury-warm">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <div className="font-light">
                  <p>ZOLANI Studio</p>
                  <p>Fashion District, Mumbai</p>
                  <p>Maharashtra 400001</p>
                </div>
              </div>
              
              <a 
                href="tel:+911234567890" 
                className="flex items-center gap-3 text-luxury-warm hover:text-luxury-gold transition-colors duration-300 font-light"
              >
                <Phone size={18} />
                <span>+91 12345 67890</span>
              </a>
              
              <a 
                href="mailto:hello@zolani.com" 
                className="flex items-center gap-3 text-luxury-warm hover:text-luxury-gold transition-colors duration-300 font-light"
              >
                <Mail size={18} />
                <span>hello@zolani.com</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-luxury-sage/20">
        <div className="container-luxury py-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 text-luxury-warm text-sm">
              <p className="flex items-center gap-1">
                © {currentYear} ZOLANI. Made with 
                <Heart size={14} className="text-luxury-gold fill-current" /> 
                in India.
              </p>
              <div className="flex items-center gap-4">
                {footerLinks.legal.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-luxury-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                    {index < footerLinks.legal.length - 1 && (
                      <span className="text-luxury-sage">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-luxury-warm text-sm">
              <span>Crafted with precision & love</span>
              <div className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer