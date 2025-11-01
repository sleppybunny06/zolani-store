import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import ReelSection from '../components/ReelSection'

const ShopPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 10000],
    occasion: [],
    fabric: [],
    color: []
  })

  const filterOptions = {
    category: ['Sarees', 'Kurta Sets', 'Anarkalis', 'Lehengas', 'Palazzo Sets', 'Sharara Sets', 'Ghagra Cholis', 'Dupatta Sets', 'Accessories', 'Suits', 'Gowns', 'Dresses'],
    occasion: ['Wedding', 'Festive', 'Casual', 'Party', 'Office', 'Sangeet', 'Mehendi', 'Traditional'],
    fabric: ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Chanderi', 'Handloom', 'Banarasi Silk', 'Kanjivaram Silk', 'Khadi', 'Brocade', 'Ikkat', 'Modal'],
    color: ['Gold', 'Maroon', 'Navy', 'Ivory', 'Blush', 'Burgundy', 'Emerald', 'Yellow', 'Pink', 'Indigo', 'Rose Gold', 'Purple', 'Teal', 'Orange']
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 10000],
      occasion: [],
      fabric: [],
      color: []
    })
  }

  const activeFiltersCount = Object.values(filters).reduce((count, filterArray) => {
    if (Array.isArray(filterArray)) {
      return count + filterArray.length
    }
    return count
  }, 0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsFilterOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <div className="min-h-screen bg-luxury-ivory">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-luxury-cream to-luxury-blush">
        <div className="container-luxury">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-luxury-charcoal mb-6">
              Shop All
            </h1>
            <p className="text-lg md:text-xl text-luxury-warm font-light">
              Discover our complete collection of contemporary Indian fashion, 
              where every piece tells a story of elegance and craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-luxury py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-luxury-beige/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-luxury-charcoal text-lg">
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-luxury-gold text-sm hover:underline"
                    >
                      Clear All ({activeFiltersCount})
                    </button>
                  )}
                </div>

                {/* Filter Sections */}
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key} className="mb-6">
                    <h4 className="font-medium text-luxury-charcoal mb-3 capitalize">
                      {key === 'priceRange' ? 'Price Range' : key}
                    </h4>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters[key].includes(option)}
                            onChange={() => toggleFilter(key, option)}
                            className="rounded border-luxury-beige text-luxury-gold focus:ring-luxury-gold"
                          />
                          <span className="text-luxury-warm hover:text-luxury-charcoal transition-colors">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-luxury-charcoal mb-3">Price Range</h4>
                  <div className="px-3">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [0, parseInt(e.target.value)]
                      }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-luxury-warm mt-2">
                      <span>₹0</span>
                      <span>₹{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 btn-secondary"
                >
                  <Filter size={18} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-luxury-gold text-luxury-charcoal px-2 py-1 rounded-full text-xs font-semibold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <span className="text-luxury-warm">
                  Showing 20 products
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-luxury py-2"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-luxury-warm hover:text-luxury-charcoal'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-luxury-warm hover:text-luxury-charcoal'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductGrid limit={20} />
            </motion.div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="btn-secondary">
                Load More Products
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Reel Section */}
      <ReelSection />

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-luxury-charcoal text-lg">
                  Filters
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 hover:bg-luxury-beige rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Same filter content as desktop */}
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key} className="mb-6">
                  <h4 className="font-medium text-luxury-charcoal mb-3 capitalize">
                    {key}
                  </h4>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters[key].includes(option)}
                          onChange={() => toggleFilter(key, option)}
                          className="rounded border-luxury-beige text-luxury-gold focus:ring-luxury-gold"
                        />
                        <span className="text-luxury-warm">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-luxury-beige">
                <button
                  onClick={() => {
                    clearFilters()
                    setIsFilterOpen(false)
                  }}
                  className="w-full btn-secondary mb-3"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ShopPage