'use client'

import { useState } from 'react'
import { BarChart3, Zap, Monitor, Cpu, Trophy, Target, ChevronDown, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const GamingPerformanceHub = () => {
  const [selectedGame, setSelectedGame] = useState('cyberpunk2077')
  const [selectedResolution, setSelectedResolution] = useState('1440p')
  const [activeTab, setActiveTab] = useState('fps')

  const games = [
    {
      id: 'cyberpunk2077',
      name: 'Cyberpunk 2077',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'AAA',
      difficulty: 'Çok Ağır'
    },
    {
      id: 'valorant',
      name: 'Valorant',
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Esports',
      difficulty: 'Hafif'
    },
    {
      id: 'warzone',
      name: 'Call of Duty: Warzone',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Battle Royale',
      difficulty: 'Ağır'
    },
    {
      id: 'apex',
      name: 'Apex Legends',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      category: 'Battle Royale',
      difficulty: 'Orta'
    }
  ]

  const resolutions = ['1080p', '1440p', '4K']

  const performanceData = {
    cyberpunk2077: {
      '1080p': [
        { gpu: 'RTX 4090', fps: 165, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 142, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 118, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 95, price: 22999, color: 'bg-orange-500' }
      ],
      '1440p': [
        { gpu: 'RTX 4090', fps: 125, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 108, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 87, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 68, price: 22999, color: 'bg-orange-500' }
      ],
      '4K': [
        { gpu: 'RTX 4090', fps: 78, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 65, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 52, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 38, price: 22999, color: 'bg-orange-500' }
      ]
    },
    valorant: {
      '1080p': [
        { gpu: 'RTX 4090', fps: 580, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 520, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 465, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 385, price: 22999, color: 'bg-orange-500' }
      ],
      '1440p': [
        { gpu: 'RTX 4090', fps: 420, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 380, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 340, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 285, price: 22999, color: 'bg-orange-500' }
      ],
      '4K': [
        { gpu: 'RTX 4090', fps: 285, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 245, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 210, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 165, price: 22999, color: 'bg-orange-500' }
      ]
    },
    warzone: {
      '1080p': [
        { gpu: 'RTX 4090', fps: 195, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 165, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 135, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 110, price: 22999, color: 'bg-orange-500' }
      ],
      '1440p': [
        { gpu: 'RTX 4090', fps: 145, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 125, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 98, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 78, price: 22999, color: 'bg-orange-500' }
      ],
      '4K': [
        { gpu: 'RTX 4090', fps: 88, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 72, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 58, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 42, price: 22999, color: 'bg-orange-500' }
      ]
    },
    apex: {
      '1080p': [
        { gpu: 'RTX 4090', fps: 285, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 245, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 205, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 165, price: 22999, color: 'bg-orange-500' }
      ],
      '1440p': [
        { gpu: 'RTX 4090', fps: 195, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 165, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 135, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 108, price: 22999, color: 'bg-orange-500' }
      ],
      '4K': [
        { gpu: 'RTX 4090', fps: 125, price: 45999, color: 'bg-green-500' },
        { gpu: 'RTX 4080', fps: 98, price: 35999, color: 'bg-blue-500' },
        { gpu: 'RTX 4070', fps: 78, price: 28999, color: 'bg-yellow-500' },
        { gpu: 'RTX 4060Ti', fps: 58, price: 22999, color: 'bg-orange-500' }
      ]
    }
  }

  const currentData = performanceData[selectedGame as keyof typeof performanceData][selectedResolution as keyof typeof performanceData.cyberpunk2077]
  const maxFps = Math.max(...currentData.map(item => item.fps))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const getFpsColor = (fps: number) => {
    if (fps >= 144) return 'text-green-500'
    if (fps >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getFpsLabel = (fps: number) => {
    if (fps >= 240) return 'Esports Ready'
    if (fps >= 144) return 'High Refresh'
    if (fps >= 60) return 'Smooth Gaming'
    return 'Playable'
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-primary/30">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold">Performans Merkezi</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gaming Performans Merkezi
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hangi ekran kartının hangi oyunda kaç FPS verdiğini öğrenin. Doğru seçimi yapın, oyun deneyiminizi optimize edin.
          </p>
        </motion.div>

        {/* Game Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Play className="w-6 h-6 text-primary" />
            <span>Oyun Seçin</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {games.map((game) => (
              <motion.button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  selectedGame === game.id
                    ? 'ring-4 ring-primary bg-primary/20'
                    : 'bg-gray-800/50 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-video relative mb-3 rounded-lg overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{game.name}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{game.category}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    game.difficulty === 'Çok Ağır' ? 'bg-red-500/20 text-red-400' :
                    game.difficulty === 'Ağır' ? 'bg-orange-500/20 text-orange-400' :
                    game.difficulty === 'Orta' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Resolution Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Monitor className="w-6 h-6 text-primary" />
            <span>Çözünürlük</span>
          </h3>
          <div className="flex space-x-4">
            {resolutions.map((resolution) => (
              <button
                key={resolution}
                onClick={() => setSelectedResolution(resolution)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  selectedResolution === resolution
                    ? 'bg-primary text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {resolution}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <motion.div 
          className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-primary" />
              <span>{games.find(g => g.id === selectedGame)?.name} - {selectedResolution}</span>
            </h3>
            <div className="text-gray-400 text-sm">Ultra Settings / Ray Tracing ON</div>
          </div>

          <div className="space-y-6">
            {currentData.map((item, index) => (
              <motion.div
                key={item.gpu}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      <span className="text-white font-bold text-lg">{item.gpu}</span>
                    </div>
                    <span className="text-gray-400">{formatPrice(item.price)}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-2xl font-bold ${getFpsColor(item.fps)}`}>
                      {item.fps} FPS
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.fps >= 240 ? 'bg-green-500/20 text-green-400' :
                      item.fps >= 144 ? 'bg-blue-500/20 text-blue-400' :
                      item.fps >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {getFpsLabel(item.fps)}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${item.color} relative`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.fps / maxFps) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                  </motion.div>
                </div>

                {/* Performance Indicators */}
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                  <span>Minimum: {Math.floor(item.fps * 0.8)} FPS</span>
                  <span>Average: {item.fps} FPS</span>
                  <span>Maximum: {Math.floor(item.fps * 1.2)} FPS</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Tips */}
          <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
            <h4 className="text-primary font-bold mb-3 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Performans İpuçları</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-white">60+ FPS:</strong> Akıcı oyun deneyimi için minimum
              </div>
              <div>
                <strong className="text-white">144+ FPS:</strong> Yüksek yenileme hızlı monitörler için ideal
              </div>
              <div>
                <strong className="text-white">240+ FPS:</strong> Profesyonel esports için gerekli
              </div>
              <div>
                <strong className="text-white">Ray Tracing:</strong> Görsel kalite için performans kaybı
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>PC Toplama Sihirbazı</span>
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Detaylı Benchmark</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GamingPerformanceHub
