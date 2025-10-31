'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, HardDrive, Monitor, Gamepad2, Headphones, Keyboard } from 'lucide-react'

const AppleStyleCards = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      id: 1,
      title: "Gelişmiş İşlemci Mimarisi",
      description: "Çok çekirdek optimizasyonları ve mikro mimari iyileştirmelerini içeren en son işlemci tasarımlarını keşfedin.",
      icon: Cpu,
      featured: true,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Bellek Yönetimi",
      description: "İşletim sistemlerinin hafıza kaynaklarını nasıl tahsis ettiğini ve yönettiğini öğrenin.",
      icon: HardDrive,
      featured: false,
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Gaming Monitörler",
      description: "Yüksek yenileme hızı ve düşük gecikme ile gaming deneyiminizi zirveye taşıyın.",
      icon: Monitor,
      featured: false,
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Gaming Aksesuarları",
      description: "Profesyonel gaming için tasarlanmış mouse, klavye ve kontrolcülerle farkı yaşayın.",
      icon: Gamepad2,
      featured: false,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 5,
      title: "Ses Sistemleri",
      description: "Kristal netliğinde ses kalitesi ile oyun ve müzik deneyiminizi geliştirin.",
      icon: Headphones,
      featured: false,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      id: 6,
      title: "Mekanik Klavyeler",
      description: "Hassas tuş hissi ve dayanıklılık ile yazım ve gaming performansınızı artırın.",
      icon: Keyboard,
      featured: false,
      gradient: "from-teal-500 to-green-600"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Teknoloji Dünyası
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Modern bilgisayar teknolojilerini keşfedin ve gaming deneyiminizi bir üst seviyeye taşıyın.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 ${
                card.featured ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Featured Badge */}
              {card.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Öne Çıkan
                  </div>
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Content */}
              <div className={`relative p-8 ${card.featured ? 'lg:p-12' : ''}`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className={`font-medium text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300 ${
                  card.featured ? 'text-2xl md:text-3xl' : 'text-xl'
                }`}>
                  {card.title}
                </h3>

                {/* Description */}
                <p className={`text-gray-600 leading-relaxed font-light group-hover:text-gray-700 transition-colors duration-300 ${
                  card.featured ? 'text-lg' : 'text-base'
                }`}>
                  {card.description}
                </p>

                {/* CTA */}
                <div className="mt-6">
                  <button className="inline-flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Detayları İncele
                    <svg 
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gray-200/30 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AppleStyleCards
