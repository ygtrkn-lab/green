'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Monitor, Keyboard, Mouse, Cpu, HardDrive, Gamepad2, Headphones, Search, Filter, Grid, List, Star, TrendingUp, Snowflake, Power, Box } from 'lucide-react'

interface AllCategoriesProps {
  variant?: 'standalone' | 'corporate'
}

const AllCategories = ({ variant = 'standalone' }: AllCategoriesProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const sectionClasses =
    variant === 'standalone'
      ? 'py-20 bg-gradient-to-b from-gray-50 to-white'
      : 'py-12 sm:py-14'

  const containerClasses =
    variant === 'standalone'
      ? 'container'
      : 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'

  const categories = [
    {
      id: 1,
      name: 'Gaming PC',
      description: 'Yüksek performanslı gaming bilgisayarlar',
      icon: Monitor,
      image: '/images/header-categories/gaming-pc-category.jpg',
      color: 'from-blue-500 to-purple-600',
      features: ['RTX 4060TI', 'Intel i5', '32GB RAM', 'NVMe SSD'],
      href: '/kategoriler/gaming-pc',
      trending: true,
      rating: 4.9,
      products: [
        { name: 'GRIFFIN G6x4060TI', price: 49867, image: 'https://green.net.tr/wp-content/uploads/2025/02/green-surena-z5x4060-v1-i5-12500-16gb-512gb-8gb-rtx4060-oyun-bilgisayari-gaming-pc-266108-scaled31270_nobg-png.webp' },
        { name: 'SURENA Z5x4070', price: 65999, image: 'https://green.net.tr/wp-content/uploads/2025/02/green-surena-z5x4060-v1-i5-12500-16gb-512gb-8gb-rtx4060-oyun-bilgisayari-gaming-pc-266108-scaled31270_nobg-png.webp' }
      ]
    },
    {
      id: 2,
      name: 'AIO PC',
      description: 'All-in-One bilgisayar sistemleri',
      icon: Monitor,
      image: '/images/header-categories/all-in-one-category.jpg',
      color: 'from-indigo-500 to-blue-600',
      features: ['24" Ekran', 'Intel i5', '16GB RAM', 'M.2 SSD'],
      href: '/kategoriler/aio-pc',
      trending: true,
      rating: 4.8,
      products: [
        { name: 'AIO GT24 i5-16SB', price: 25999, image: 'https://green.net.tr/wp-content/uploads/2025/06/aio-gt24-i516sb-i5-16gb-512gbm2-h6-2065.jpg' },
        { name: 'AIO GT27 i7-32GB', price: 38999, image: 'https://green.net.tr/wp-content/uploads/2025/06/aio-gt24-i516sb-i5-16gb-512gbm2-h6-2065.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Sıvı Soğutma',
      description: 'AIO ve custom loop soğutma sistemleri',
      icon: Snowflake,
      image: '/images/header-categories/liquid-cooler-category.jpg',
      color: 'from-cyan-500 to-blue-600',
      features: ['360mm Radyatör', 'ARGB Pump', 'Sessiz', 'AM5/LGA1700'],
      href: '/kategoriler/sivi-sogutma',
      trending: true,
      rating: 4.7,
      products: [
        { name: 'GLACIER 240 STREAM-ARGB', price: 3709, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GLC-240-STREAM-ARGB-G-149036_nobg-png.webp' },
        { name: 'GLACIER 360 PRO-ARGB', price: 4899, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GLC-240-STREAM-ARGB-G-149036_nobg-png.webp' }
      ]
    },
    {
      id: 4,
      name: 'Hava Soğutucu',
      description: 'Yüksek performanslı hava soğutucuları',
      icon: Snowflake,
      image: '/images/header-categories/cpu-fan-category.jpg',
      color: 'from-teal-500 to-cyan-600',
      features: ['200W TDP', '4 Isı Borusu', 'ARGB', 'AM5/LGA1700'],
      href: '/kategoriler/hava-sogutucu',
      trending: false,
      rating: 4.6,
      products: [
        { name: 'NOTUS 400-ARGB', price: 1109, image: 'https://green.net.tr/wp-content/uploads/2025/04/notus-400-argb-1855.webp' },
        { name: 'NOTUS 600-ARGB', price: 1599, image: 'https://green.net.tr/wp-content/uploads/2025/04/notus-400-argb-1855.webp' }
      ]
    },
    {
      id: 5,
      name: 'Kasa Fanı',
      description: 'Sessiz ve yüksek performanslı fanlar',
      icon: Snowflake,
      image: '/images/header-categories/case-fan-category.jpg',
      color: 'from-emerald-500 to-teal-600',
      features: ['PWM Kontrol', 'ARGB', 'Sessiz', 'Yüksek Basınç'],
      href: '/kategoriler/kasa-fani',
      trending: false,
      rating: 4.5,
      products: [
        { name: 'GF120-FSB Silent Fan', price: 202, image: 'https://green.net.tr/wp-content/uploads/2025/01/GREEN_GF120FSB_120mm_Silent_Fan_0339399_nobg-png.webp' },
        { name: 'GF140-ARGB RGB Fan', price: 389, image: 'https://green.net.tr/wp-content/uploads/2025/01/GREEN_GF120FSB_120mm_Silent_Fan_0339399_nobg-png.webp' }
      ]
    },
    {
      id: 6,
      name: 'Askeri PSU',
      description: 'Yüksek kaliteli askeri güç kaynakları',
      icon: Power,
      image: '/images/header-categories/power-supply-category.jpg',
      color: 'from-gray-700 to-gray-900',
      features: ['80+ Gold', 'Tam Modüler', 'Japon Kapasitör', '10 Yıl Garanti'],
      href: '/kategoriler/askeri-psu',
      trending: true,
      rating: 4.9,
      products: [
        { name: 'HP EVO 600W Askeri', price: 2899, image: 'https://green.net.tr/wp-content/uploads/2024/11/GREEN-GP600B-HP-EVO-008-jpg31864_nobg-png.webp' },
        { name: 'HP EVO 750W Askeri', price: 3599, image: 'https://green.net.tr/wp-content/uploads/2024/11/GREEN-GP600B-HP-EVO-008-jpg31864_nobg-png.webp' }
      ]
    },
    {
      id: 7,
      name: 'Gaming PSU',
      description: 'RGB aydınlatmalı gaming güç kaynakları',
      icon: Power,
      image: '/images/header-categories/power-supply-category.jpg',
      color: 'from-purple-500 to-pink-600',
      features: ['80+ Gold', 'RGB Fan', 'Yarı Modüler', '5 Yıl Garanti'],
      href: '/kategoriler/gaming-psu',
      trending: true,
      rating: 4.7,
      products: [
        { name: 'Gaming PSU 650W RGB', price: 2299, image: 'https://green.net.tr/wp-content/uploads/2024/11/GREEN-GP600B-HP-EVO-008-jpg31864_nobg-png.webp' },
        { name: 'Gaming PSU 850W RGB', price: 3199, image: 'https://green.net.tr/wp-content/uploads/2024/11/GREEN-GP600B-HP-EVO-008-jpg31864_nobg-png.webp' }
      ]
    },
    {
      id: 8,
      name: 'PC Kasası',
      description: 'Modern ve gaming bilgisayar kasaları',
      icon: Box,
      image: '/images/header-categories/pc-kasasi-category.jpg',
      color: 'from-zinc-700 to-zinc-900',
      features: ['Temperli Cam', 'Mesh Panel', 'ARGB', 'ATX'],
      href: '/kategoriler/pc-kasasi',
      trending: true,
      rating: 4.8,
      products: [
        { name: 'GREEN GAIA TG', price: 1899, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GAIA-Case-G-001-jpg47003_nobg-png.webp' },
        { name: 'GREEN TITAN RGB', price: 2599, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GAIA-Case-G-001-jpg47003_nobg-png.webp' }
      ]
    },
    {
      id: 9,
      name: 'Klavye',
      description: 'Mekanik ve membran gaming klavyeler',
      icon: Keyboard,
      image: '/images/header-categories/keyboard-category.jpg.jpg',
      color: 'from-rose-500 to-red-600',
      features: ['Mekanik Switch', 'RGB', 'Anti-Ghosting', 'Türkçe'],
      href: '/kategoriler/klavye',
      trending: true,
      rating: 4.7,
      products: [
        { name: 'GK702-RGB Klavye', price: 646, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GK702-Keyboard-G-02-jpg47003_nobg-png.webp' },
        { name: 'GK801-Mekanik Pro', price: 1299, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GK702-Keyboard-G-02-jpg47003_nobg-png.webp' }
      ]
    },
    {
      id: 10,
      name: 'Mouse',
      description: 'Hassas sensörlü gaming mouse\'lar',
      icon: Mouse,
      image: '/images/header-categories/mouse-category.jpg',
      color: 'from-orange-500 to-red-600',
      features: ['7200 DPI', 'RGB', 'Örgülü Kablo', 'Ergonomik'],
      href: '/kategoriler/mouse',
      trending: true,
      rating: 4.8,
      products: [
        { name: 'GM606 RGB Mouse', price: 412, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GM606-Mouse-G-004-119192_nobg-png.webp' },
        { name: 'GM808 Pro Gaming', price: 899, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GM606-Mouse-G-004-119192_nobg-png.webp' }
      ]
    },
    {
      id: 11,
      name: 'Kulaklık',
      description: '7.1 Surround gaming kulaklıklar',
      icon: Headphones,
      image: '/images/header-categories/mouse-category.jpg',
      color: 'from-violet-500 to-purple-600',
      features: ['7.1 Surround', 'RGB', 'Gürültü Önleme', 'Konforlu'],
      href: '/kategoriler/kulaklik',
      trending: true,
      rating: 4.6,
      products: [
        { name: 'GH505 Headset', price: 899, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GH505-Headset-G-003-jpg47003_nobg-png.webp' },
        { name: 'GH707 Pro Gaming', price: 1499, image: 'https://green.net.tr/wp-content/uploads/2024/10/GREEN-GH505-Headset-G-003-jpg47003_nobg-png.webp' }
      ]
    }
  ]

  // Dinamik fiyat aralığı ve ürün sayısı hesaplama
  const categoriesWithDynamicData = categories.map(category => {
    const prices = category.products.map(product => product.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const productCount = category.products.length
    
    return {
      ...category,
      productCount,
      priceRange: `${minPrice.toLocaleString('tr-TR')}₺ - ${maxPrice.toLocaleString('tr-TR')}₺`
    }
  })

  const filteredCategories = categoriesWithDynamicData.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedFilter === 'all') return matchesSearch
    if (selectedFilter === 'trending') return matchesSearch && category.trending
    if (selectedFilter === 'popular') return matchesSearch && category.rating >= 4.7
    
    return matchesSearch
  })

  const CategoryCard = ({ category, index }: { category: any, index: number }) => {
    const IconComponent = category.icon
    
    if (viewMode === 'list') {
      return (
        <Link
          href={category.href}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex items-center space-x-6 hover:scale-[1.02]"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              {category.trending && (
                <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>Trend</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-3">{category.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{category.rating}</span>
                </div>
                <span className="text-sm text-gray-500">{category.productCount} ürün</span>
                <span className="text-sm text-primary font-medium">{category.priceRange}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {category.features.slice(0, 3).map((feature: string, idx: number) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      )
    }

    return (
      <Link
        href={category.href}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Background Image */}
        <div className="relative h-56 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${category.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex flex-col space-y-2">
              {category.trending && (
                <div className="bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-medium">Trend</span>
                </div>
              )}
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm font-medium">{category.productCount} ürün</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{category.rating}</span>
          </div>

          {/* Hover Features */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {category.features.map((feature: string, idx: number) => (
                  <span 
                    key={idx}
                    className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <span className="inline-block bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                İncele
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
            {category.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-primary font-semibold text-sm">
              {category.priceRange}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Stokta</span>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(141,198,63,0.3)]"></div>
        </div>
      </Link>
    )
  }

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {/* Header Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Kategori ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            {/* Filters and View Mode */}
            <div className="flex items-center space-x-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="all">Tüm Kategoriler</option>
                  <option value="trending">Trend Olanlar</option>
                  <option value="popular">Popüler Olanlar</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            <span className="font-medium">{filteredCategories.length}</span> kategori bulundu
          </div>
        </div>

        {/* Categories Grid/List */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kategori bulunamadı</h3>
            <p className="text-gray-600 mb-6">Arama kriterlerinizi değiştirmeyi deneyin.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedFilter('all')
              }}
              className="btn btn-primary"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default AllCategories
