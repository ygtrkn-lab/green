'use client'

import { useState, useEffect } from 'react'
import { Heart, Eye, Share2, Award, Users, Gamepad2, Monitor, Cpu, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const UserSetupGallery = () => {
  const [currentSetup, setCurrentSetup] = useState(0)
  const [hoveredSetup, setHoveredSetup] = useState<number | null>(null)
  const [likedSetups, setLikedSetups] = useState<Set<number>>(new Set())

  const userSetups = [
    {
      id: 1,
      username: 'ProGamer_TR',
      title: 'Ultimate RGB Gaming Mağarası',
      description: 'RTX 4090 + i9-13900K ile 4K 144Hz gaming deneyimi',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      likes: 1247,
      views: 8934,
      components: [
        { name: 'RTX 4090', brand: 'NVIDIA' },
        { name: 'i9-13900K', brand: 'Intel' },
        { name: '64GB DDR5', brand: 'Corsair' },
        { name: '2TB NVMe', brand: 'Samsung' }
      ],
      games: ['Cyberpunk 2077', 'Valorant', 'Call of Duty'],
      performance: { fps: '144+', resolution: '4K', settings: 'En Yüksek' },
      badge: 'Haftanın Kurulumu',
      badgeColor: 'bg-yellow-500'
    },
    {
      id: 2,
      username: 'StreamerQueen',
      title: 'Pembe Gaming Cenneti',
      description: 'Aesthetic ve performansın mükemmel birleşimi',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      likes: 892,
      views: 5621,
      components: [
        { name: 'RTX 4070', brand: 'ASUS' },
        { name: 'i7-13700F', brand: 'Intel' },
        { name: '32GB DDR5', brand: 'G.Skill' },
        { name: '1TB NVMe', brand: 'WD' }
      ],
      games: ['League of Legends', 'Genshin Impact', 'Overwatch 2'],
      performance: { fps: '165+', resolution: '1440p', settings: 'Yüksek Kalite' },
      badge: 'Topluluk Favorisi',
      badgeColor: 'bg-pink-500'
    },
    {
      id: 3,
      username: 'MinimalGamer',
      title: 'Temiz Beyaz Setup',
      description: 'Minimalist tasarım, maksimum performans',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      likes: 1156,
      views: 7234,
      components: [
        { name: 'RTX 4080', brand: 'MSI' },
        { name: 'i7-13700K', brand: 'Intel' },
        { name: '32GB DDR5', brand: 'Corsair' },
        { name: '2TB NVMe', brand: 'Samsung' }
      ],
      games: ['CS2', 'Apex Legends', 'Fortnite'],
      performance: { fps: '240+', resolution: '1440p', settings: 'Rekabetçi Mod' },
      badge: 'Editör Favorisi',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 4,
      username: 'RGBMaster',
      title: 'Gökkuşağı Gaming İstasyonu',
      description: 'Her rengin dansı, sınırsız performans',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      likes: 2103,
      views: 12456,
      components: [
        { name: 'RTX 4090', brand: 'GIGABYTE' },
        { name: 'i9-13900KS', brand: 'Intel' },
        { name: '64GB DDR5', brand: 'G.Skill' },
        { name: '4TB NVMe', brand: 'Samsung' }
      ],
      games: ['Elden Ring', 'Hogwarts Legacy', 'Starfield'],
      performance: { fps: '120+', resolution: '4K', settings: 'Ultra RTX Açık' },
      badge: 'En Çok Beğenilen',
      badgeColor: 'bg-purple-500'
    }
  ]

  const handleLike = (setupId: number) => {
    setLikedSetups(prev => {
      const newSet = new Set(prev)
      if (newSet.has(setupId)) {
        newSet.delete(setupId)
      } else {
        newSet.add(setupId)
      }
      return newSet
    })
  }

  const nextSetup = () => {
    setCurrentSetup((prev) => (prev + 1) % userSetups.length)
  }

  const prevSetup = () => {
    setCurrentSetup((prev) => (prev - 1 + userSetups.length) % userSetups.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSetup, 8000)
    return () => clearInterval(timer)
  }, [])

  const currentSetupData = userSetups[currentSetup]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
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
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Setup Galerisi</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
            Topluluk Setup'ları
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Gaming topluluğumuzun en etkileyici setup'larını keşfedin. Kendi setup'ınızı paylaşın ve ilham alın.
          </p>
        </motion.div>

        {/* Main Featured Setup */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSetup}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentSetupData.image})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className={`absolute top-6 left-6 ${currentSetupData.badgeColor} text-white font-bold px-4 py-2 rounded-full flex items-center space-x-2`}>
                    <Award className="w-4 h-4" />
                    <span>{currentSetupData.badge}</span>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-6 left-6 flex space-x-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                      <Heart className={`w-4 h-4 ${likedSetups.has(currentSetupData.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                      <span className="text-white font-medium">{currentSetupData.likes}</span>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-white" />
                      <span className="text-white font-medium">{currentSetupData.views}</span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="absolute bottom-6 right-6 flex space-x-2">
                    <button
                      onClick={prevSetup}
                      className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-primary/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={nextSetup}
                      className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-primary/80 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">@{currentSetupData.username}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-3xl font-bold text-gray-900 mb-3">
                    {currentSetupData.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {currentSetupData.description}
                  </p>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-primary">{currentSetupData.performance.fps}</div>
                      <div className="text-sm text-gray-600">FPS</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-500">{currentSetupData.performance.resolution}</div>
                      <div className="text-sm text-gray-600">Çözünürlük</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-500">{currentSetupData.performance.settings}</div>
                      <div className="text-sm text-gray-600">Ayarlar</div>
                    </div>
                  </div>

                  {/* Components */}
                  <div className="mb-6">
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      <span>Bileşenler</span>
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {currentSetupData.components.map((component, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3">
                          <div className="font-medium text-gray-900">{component.name}</div>
                          <div className="text-sm text-gray-600">{component.brand}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Games */}
                  <div className="mb-6">
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                      <Monitor className="w-5 h-5 text-primary" />
                      <span>Oynadığı Oyunlar</span>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {currentSetupData.games.map((game, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleLike(currentSetupData.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        likedSetups.has(currentSetupData.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedSetups.has(currentSetupData.id) ? 'fill-current' : ''}`} />
                      <span>Beğen</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Paylaş</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Setup Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {userSetups.map((setup, index) => (
            <motion.div
              key={setup.id}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                currentSetup === index ? 'ring-4 ring-primary scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setCurrentSetup(index)}
              onMouseEnter={() => setHoveredSetup(setup.id)}
              onMouseLeave={() => setHoveredSetup(null)}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${setup.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="text-right">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                      @{setup.username}
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="text-white font-bold text-sm mb-1">{setup.title}</h6>
                    <div className="flex items-center space-x-2 text-xs text-gray-300">
                      <Heart className="w-3 h-3" />
                      <span>{setup.likes}</span>
                      <Eye className="w-3 h-3" />
                      <span>{setup.views}</span>
                    </div>
                  </div>
                </div>

                {hoveredSetup === setup.id && (
                  <motion.div 
                    className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-white rounded-full p-3">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5" />
              <span>Setup'ını Paylaş</span>
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Tüm Setup'ları Gör</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UserSetupGallery
