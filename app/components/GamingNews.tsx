'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Eye, MessageCircle, ArrowRight, Gamepad2, Zap, Trophy, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const GamingNews = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tümü', icon: Gamepad2 },
    { id: 'hardware', name: 'Donanım', icon: Zap },
    { id: 'games', name: 'Oyunlar', icon: Trophy },
    { id: 'esports', name: 'Esports', icon: Star }
  ]

  const newsArticles = [
    {
      id: 1,
      title: 'RTX 4090 Ti Geliyor: Gaming Dünyasında Yeni Çağ',
      excerpt: 'NVIDIA\'nın yeni amiral gemisi RTX 4090 Ti, 4K gaming\'de çıtayı daha da yükseltiyor. İlk benchmark sonuçları şaşırtıcı.',
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'hardware',
      author: 'Tech Editor',
      date: '2024-01-15',
      readTime: '5 dk',
      views: 12450,
      comments: 89,
      featured: true,
      tags: ['RTX 4090 Ti', 'NVIDIA', '4K Gaming']
    },
    {
      id: 2,
      title: 'Valorant Champions 2024: Türk Takımları Zirvede',
      excerpt: 'Türk esports takımları Valorant Champions 2024\'te büyük başarı gösteriyor. Finalde Türk derbisi bekleniyor.',
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'esports',
      author: 'Esports Reporter',
      date: '2024-01-14',
      readTime: '3 dk',
      views: 8920,
      comments: 156,
      featured: false,
      tags: ['Valorant', 'Esports', 'Türkiye']
    },
    {
      id: 3,
      title: 'Gaming Klavyelerde Yeni Trend: Analog Switchler',
      excerpt: 'Mekanik klavyelerde analog switch teknolojisi gaming deneyimini nasıl değiştiriyor? Detaylı inceleme.',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'hardware',
      author: 'Hardware Specialist',
      date: '2024-01-13',
      readTime: '7 dk',
      views: 5670,
      comments: 43,
      featured: false,
      tags: ['Gaming Klavye', 'Analog Switch', 'Teknoloji']
    },
    {
      id: 4,
      title: 'Cyberpunk 2077: Phantom Liberty DLC İncelemesi',
      excerpt: 'CD Projekt RED\'in uzun beklenen DLC\'si Phantom Liberty, oyunu nasıl dönüştürüyor? Kapsamlı inceleme.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'games',
      author: 'Game Reviewer',
      date: '2024-01-12',
      readTime: '10 dk',
      views: 15230,
      comments: 234,
      featured: true,
      tags: ['Cyberpunk 2077', 'DLC', 'İnceleme']
    },
    {
      id: 5,
      title: 'AIO Soğutma Sistemlerinde 2024 Trendleri',
      excerpt: 'Yeni nesil AIO soğutma sistemleri hangi yenilikleri getiriyor? LCD ekranlar, RGB efektler ve daha fazlası.',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'hardware',
      author: 'Cooling Expert',
      date: '2024-01-11',
      readTime: '6 dk',
      views: 7890,
      comments: 67,
      featured: false,
      tags: ['AIO Soğutma', 'LCD Ekran', 'RGB']
    },
    {
      id: 6,
      title: 'Gaming Mouse Sensör Teknolojisinde Devrim',
      excerpt: '30.000 DPI\'ya kadar çıkan yeni sensörler gaming mouse dünyasını nasıl etkiliyor? Teknik analiz.',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'hardware',
      author: 'Peripheral Expert',
      date: '2024-01-10',
      readTime: '4 dk',
      views: 4560,
      comments: 32,
      featured: false,
      tags: ['Gaming Mouse', 'Sensör', 'DPI']
    }
  ]

  const filteredArticles = activeCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeCategory)

  const featuredArticle = filteredArticles.find(article => article.featured) || filteredArticles[0]
  const regularArticles = filteredArticles.filter(article => article.id !== featuredArticle.id)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hardware': return 'bg-blue-500'
      case 'games': return 'bg-purple-500'
      case 'esports': return 'bg-red-500'
      default: return 'bg-primary'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl bottom-20 -right-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <Gamepad2 className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold">Gaming Haberleri</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-blue-600 bg-clip-text text-transparent">
            Gaming Dünyasından Haberler
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gaming dünyasındaki en son gelişmeler, donanım incelemeleri, oyun haberleri ve esports güncellemeleri.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredArticle.image})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-6 left-6 ${getCategoryColor(featuredArticle.category)} text-white font-bold px-4 py-2 rounded-full`}>
                    {categories.find(c => c.id === featuredArticle.category)?.name}
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6 bg-yellow-500 text-white font-bold px-4 py-2 rounded-full flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Öne Çıkan</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredArticle.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredArticle.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {featuredArticle.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{featuredArticle.author}</div>
                        <div className="text-sm text-gray-500">Gaming Editörü</div>
                      </div>
                    </div>

                    <Link href={`/haberler/${featuredArticle.id}`}>
                      <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group">
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <motion.article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.image})` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {categories.find(c => c.id === article.category)?.name}
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">{article.views.toLocaleString()}</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">{article.comments}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {article.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{article.author}</span>
                  </div>

                  <Link href={`/haberler/${article.id}`}>
                    <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1 group">
                      <span>Oku</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/haberler">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <Gamepad2 className="w-5 h-5" />
              <span>Tüm Haberleri Gör</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default GamingNews
