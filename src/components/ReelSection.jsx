import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Heart, Share2, Eye } from 'lucide-react'

const ReelSection = () => {
  const [currentReel, setCurrentReel] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [likedReels, setLikedReels] = useState(new Set())
  const videoRefs = useRef([])

  const reels = [
    {
      id: 1,
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Royal Banarasi Collection",
      description: "Experience the grandeur of handwoven Banarasi silk sarees with intricate gold zari work",
      author: "@zolani.official",
      likes: 2.4,
      views: 15.8,
      product: {
        name: "Heritage Banarasi Silk Saree",
        price: "₹12,500",
        link: "/product/heritage-banarasi-silk"
      }
    },
    {
      id: 2,
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Festive Lehenga Styling",
      description: "Transform your wedding look with our exquisite hand-embroidered lehengas",
      author: "@zolani.official", 
      likes: 3.2,
      views: 22.1,
      product: {
        name: "Bridal Heritage Lehenga",
        price: "₹28,900",
        link: "/product/bridal-heritage-lehenga"
      }
    },
    {
      id: 3,
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "Artisan Craft Process",
      description: "Behind the scenes with master craftspeople creating intricate embroidery patterns",
      author: "@zolani.official",
      likes: 1.8,
      views: 12.5,
      product: {
        name: "Handcrafted Anarkali Set",
        price: "₹8,750",
        link: "/product/handcrafted-anarkali"
      }
    },
    {
      id: 4,
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      title: "Contemporary Kurta Styling",
      description: "Modern interpretations of traditional kurta sets for everyday elegance",
      author: "@zolani.official",
      likes: 2.1,
      views: 18.3,
      product: {
        name: "Contemporary Kurta Set",
        price: "₹4,200",
        link: "/product/contemporary-kurta-set"
      }
    },
    {
      id: 5,
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      title: "Palazzo Set Collection",
      description: "Comfort meets style in our flowing palazzo sets perfect for any occasion",
      author: "@zolani.official",
      likes: 1.9,
      views: 14.7,
      product: {
        name: "Elegant Palazzo Set",
        price: "₹3,800",
        link: "/product/elegant-palazzo-set"
      }
    }
  ]

  const handleReelChange = (direction) => {
    const nextReel = direction === 'next' 
      ? (currentReel + 1) % reels.length 
      : (currentReel - 1 + reels.length) % reels.length
    
    setCurrentReel(nextReel)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    const video = videoRefs.current[currentReel]
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRefs.current[currentReel]
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleLike = (reelId) => {
    setLikedReels(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(reelId)) {
        newLiked.delete(reelId)
      } else {
        newLiked.add(reelId)
      }
      return newLiked
    })
  }

  const handleShare = (reel) => {
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: reel.description,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${reel.title} - ${window.location.href}`)
    }
  }

  useEffect(() => {
    const video = videoRefs.current[currentReel]
    if (video) {
      video.muted = isMuted
      video.addEventListener('ended', () => setIsPlaying(false))
      return () => video.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [currentReel, isMuted])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-luxury-cream to-luxury-blush">
      <div className="container-luxury">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-luxury-charcoal mb-4">
            Style Stories
          </h2>
          <p className="text-luxury-warm text-lg max-w-2xl mx-auto font-light">
            Discover the artistry behind our collections and get inspired by authentic Indian fashion
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Reel Thumbnails - Left */}
            <motion.div 
              className="hidden lg:block space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {reels.slice(0, 3).map((reel, index) => (
                <motion.button
                  key={reel.id}
                  variants={itemVariants}
                  onClick={() => setCurrentReel(reels.findIndex(r => r.id === reel.id))}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    currentReel === reels.findIndex(r => r.id === reel.id)
                      ? 'bg-white shadow-lg border border-luxury-gold'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                >
                  <h4 className="font-medium text-luxury-charcoal mb-2">{reel.title}</h4>
                  <p className="text-sm text-luxury-warm line-clamp-2">{reel.description}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-luxury-warm">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {reel.views}k
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={12} />
                      {reel.likes}k
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Main Video Player - Center */}
            <motion.div 
              className="relative aspect-[9/16] max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Video */}
              <video
                ref={(el) => videoRefs.current[currentReel] = el}
                src={reels[currentReel].video}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted={isMuted}
              />

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-black/20">
                {/* Top Controls */}
                <div className="flex justify-between items-start">
                  <div className="text-white">
                    <span className="text-sm bg-black/30 px-2 py-1 rounded-full">
                      {currentReel + 1} / {reels.length}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleMute}
                      className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>

                {/* Center Play Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={togglePlayPause}
                    className={`p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 ${
                      !isPlaying ? 'scale-110' : 'scale-0'
                    }`}
                  >
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>

                {/* Bottom Info */}
                <div className="text-white">
                  <div className="mb-3">
                    <h3 className="font-semibold mb-1">{reels[currentReel].title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{reels[currentReel].description}</p>
                    <p className="text-xs text-white/60 mt-1">{reels[currentReel].author}</p>
                  </div>

                  {/* Product Info */}
                  <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{reels[currentReel].product.name}</span>
                      <span className="text-luxury-gold font-bold">{reels[currentReel].product.price}</span>
                    </div>
                    <button className="w-full bg-luxury-gold text-luxury-charcoal py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => handleReelChange('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => handleReelChange('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
              >
                →
              </button>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-4">
                <button
                  onClick={() => toggleLike(reels[currentReel].id)}
                  className="flex flex-col items-center text-white"
                >
                  <div className={`p-2 rounded-full transition-all duration-300 ${
                    likedReels.has(reels[currentReel].id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-black/30 hover:bg-black/50'
                  }`}>
                    <Heart size={16} fill={likedReels.has(reels[currentReel].id) ? "currentColor" : "none"} />
                  </div>
                  <span className="text-xs mt-1">{reels[currentReel].likes}k</span>
                </button>
                
                <button
                  onClick={() => handleShare(reels[currentReel])}
                  className="flex flex-col items-center text-white"
                >
                  <div className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
                    <Share2 size={16} />
                  </div>
                  <span className="text-xs mt-1">Share</span>
                </button>

                <div className="flex flex-col items-center text-white">
                  <div className="p-2 bg-black/30 rounded-full">
                    <Eye size={16} />
                  </div>
                  <span className="text-xs mt-1">{reels[currentReel].views}k</span>
                </div>
              </div>
            </motion.div>

            {/* Reel Thumbnails - Right */}
            <motion.div 
              className="hidden lg:block space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {reels.slice(3).map((reel, index) => (
                <motion.button
                  key={reel.id}
                  variants={itemVariants}
                  onClick={() => setCurrentReel(reels.findIndex(r => r.id === reel.id))}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                    currentReel === reels.findIndex(r => r.id === reel.id)
                      ? 'bg-white shadow-lg border border-luxury-gold'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                >
                  <h4 className="font-medium text-luxury-charcoal mb-2">{reel.title}</h4>
                  <p className="text-sm text-luxury-warm line-clamp-2">{reel.description}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-luxury-warm">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {reel.views}k
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={12} />
                      {reel.likes}k
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex space-x-2">
              {reels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReel(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentReel 
                      ? 'bg-luxury-gold scale-125' 
                      : 'bg-luxury-warm/30 hover:bg-luxury-warm/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReelSection