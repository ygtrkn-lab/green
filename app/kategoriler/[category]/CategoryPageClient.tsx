'use client'

import { useState, useEffect } from 'react'
import PageHero from '../../components/PageHero'
import ProductCard from '../../components/ProductCard'
import FilterSidebar from '../../components/FilterSidebar'
import Breadcrumb from '../../components/Breadcrumb'
import Pagination from '../../components/Pagination'
import { Grid, List, ArrowUpDown, ChevronDown, Loader2, Filter, Search, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: string
  badgeColor?: string
  specs: {
    [key: string]: string
  }
  stock: number
}

interface CategoryData {
  category: string
  filters: {
    priceRange: {
      min: number
      max: number
    }
    specs: {
      [key: string]: string[]
    }
  }
  products: Product[]
}

interface CategoryPageClientProps {
  category: string
  initialData?: CategoryData | null
}

export default function CategoryPageClient({ category, initialData = null }: CategoryPageClientProps) {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(initialData)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialData?.products ?? [])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    priceRange: {
      min: initialData?.filters.priceRange.min ?? 0,
      max: initialData?.filters.priceRange.max ?? 0
    },
    specs: {} as { [key: string]: string },
    sort: 'featured'
  })

  useEffect(() => {
    if (initialData) {
      setCategoryData(initialData)
      setFilteredProducts(initialData.products)
      setFilters({
        priceRange: {
          min: initialData.filters.priceRange.min,
          max: initialData.filters.priceRange.max
        },
        specs: {},
        sort: 'featured'
      })
    } else {
      setCategoryData(null)
      setFilteredProducts([])
    }
  }, [initialData])

  const applyFilters = () => {
    if (!categoryData) return

    let filtered = [...categoryData.products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price filter
    filtered = filtered.filter(product => 
  product.price >= filters.priceRange.min && 
  product.price <= filters.priceRange.max
    )

    // Specs filter
    Object.entries(filters.specs).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(product => 
          product.specs[key]?.toLowerCase().includes(value.toLowerCase())
        )
      }
    })

    // Sorting
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredProducts(filtered)
  }

  useEffect(() => {
    applyFilters()
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters, categoryData, searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const getCategoryDisplayName = (category: string) => {
    if (categoryData?.category) {
      return categoryData.category
    }
    const categoryNames: { [key: string]: string } = {
      'gaming-pc': 'Gaming PC',
      'gaming-mouse': 'Gaming Mouse',
      'gaming-klavye': 'Gaming Klavye',
      'gaming-kulaklik': 'Gaming Kulaklık',
      'sivi-sogutma': 'Sıvı Soğutma',
      'hava-sogutucu': 'Hava Soğutucu',
      'kasa-fani': 'Kasa Fanı',
      'pc-kasasi': 'PC Kasası',
      'gaming-psu': 'Gaming PSU',
      'askeri-psu': 'Askeri PSU',
      'aio-pc': 'All-in-One PC',
      'klavye': 'Klavye',
      'mouse': 'Mouse',
      'kulaklik': 'Kulaklık',
      'diger': 'Diğer Ürünler'
    }
    return categoryNames[category] || category
  }

  const getSortDisplayName = (sort: string) => {
    const sortNames: { [key: string]: string } = {
      'featured': 'Öne Çıkanlar',
      'price-asc': 'En Düşük Fiyat',
      'price-desc': 'En Yüksek Fiyat',
      'name-asc': 'A\'dan Z\'ye',
      'name-desc': 'Z\'den A\'ya'
    }
    return sortNames[sort] || sort
  }

  const clearAllFilters = () => {
    setFilters({
      priceRange: {
        min: categoryData?.filters.priceRange.min ?? 0,
        max: categoryData?.filters.priceRange.max ?? 0
      },
      specs: {},
      sort: 'featured'
    })
    setSearchTerm('')
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full mx-auto animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Yükleniyor...</h3>
          <p className="text-gray-600">Ürünler hazırlanıyor</p>
        </motion.div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Kategoriler', href: '/kategoriler' },
    { label: getCategoryDisplayName(category) }
  ]

  const activeFilterCount = Object.values(filters.specs).filter(Boolean).length + (searchTerm ? 1 : 0)

  // Category hero image mapping
  const getCategoryHeroImage = (category: string) => {
    const categoryImageMap: { [key: string]: string } = {
      'gaming-psu': 'power-supply.jpg',
      'askeri-psu': 'power-supply.jpg',
      // Add more mappings as images become available
    }
    
    // Check if specific image exists for this category
    if (categoryImageMap[category]) {
      return `/images/categories-hero-img/${categoryImageMap[category]}`
    }
    
    // Fallback to default hero image
    return `/images/hero/categories.jpg`
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <PageHero
        title={categoryData.category}
        subtitle={`${categoryData.category} kategorisindeki tüm ürünleri keşfedin.`}
        image={getCategoryHeroImage(category)}
        pattern="gaming"
      />

      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumb items={breadcrumbItems} />
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Mobile Filter Toggle */}
          <motion.div 
            className="lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full space-x-2 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Filter className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="font-medium">Filtreler</span>
              {activeFilterCount > 0 && (
                <motion.span 
                  className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </button>
          </motion.div>

          {/* Mobile Filter Sidebar Overlay */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Filtreler</h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <FilterSidebar
                      filters={categoryData.filters}
                      selectedFilters={filters}
                      onFilterChange={setFilters}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filter Sidebar */}
          <motion.div 
            className="hidden lg:block lg:w-1/4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FilterSidebar
              filters={categoryData.filters}
              selectedFilters={filters}
              onFilterChange={setFilters}
            />
          </motion.div>

          {/* Product Grid */}
          <div className="lg:w-3/4 space-y-6">
            {/* Header Controls */}
            <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/40 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {/* Title and Search */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-medium text-gray-900 mb-2 tracking-tight">
                      <Sparkles className="w-6 h-6 text-primary mr-2" />
                      {getCategoryDisplayName(category)}
                    </h1>
                    <p className="text-gray-600">
                      {filteredProducts.length} ürün bulundu
                    </p>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === 'grid' 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Grid className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === 'list' 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <List className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 hover:border-gray-300 transition-colors shadow-sm"
                    >
                      <ArrowUpDown className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{getSortDisplayName(filters.sort)}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.button>

                    <AnimatePresence>
                      {showSortMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20"
                        >
                          {['featured', 'price-asc', 'price-desc', 'name-asc', 'name-desc'].map((sort) => (
                            <motion.button
                              key={sort}
                              whileHover={{ backgroundColor: 'rgba(141, 198, 63, 0.05)' }}
                              onClick={() => {
                                setFilters({...filters, sort})
                                setShowSortMenu(false)
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                filters.sort === sort ? 'text-primary font-medium' : 'text-gray-700'
                              }`}
                            >
                              {getSortDisplayName(sort)}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                  viewMode === 'grid' 
                      ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" 
                      : "grid grid-cols-1 gap-4"
                  }
                >
                  {currentProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        categorySlug={category}
                        categoryLabel={categoryData.category}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="text-gray-300 mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Grid className="w-20 h-20 mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Ürün Bulunamadı
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Seçtiğiniz filtrelere uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin veya farklı arama terimleri kullanın.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium shadow-lg"
                  >
                    Tüm Filtreleri Temizle
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
