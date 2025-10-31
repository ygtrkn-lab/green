'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Star, Zap, Shield, Award, ArrowDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from '../hooks/useTranslation'

const HeroSlider = () => {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const slides = [
    {
      id: 1,
      titleKey: "hero.slides.aio.title",
      subtitleKey: "hero.slides.aio.subtitle",
      descriptionKey: "hero.slides.aio.description",
      backgroundImage: "/images/hero-slider-anasayfa/green-all-in-one-background.webp",
      productImage: "/images/hero-slider-anasayfa/green-all-in-one.webp",
      ctaKey: "hero.explore",
      price: "₺25.999",
      features: ["Intel i5 12500", "16GB DDR4 RAM", "512GB M.2 NVME", "H610T CHIPSET"],
      gradient: "from-blue-600/20 via-indigo-600/20 to-purple-600/20",
      categoryUrl: "/kategoriler/aio-pc"
    },
    {
      id: 2,
      titleKey: "hero.slides.gaming.title",
      subtitleKey: "hero.slides.gaming.subtitle",
      descriptionKey: "hero.slides.gaming.description",
      backgroundImage: "/images/hero-slider-anasayfa/gaming-pc-background.webp",
      productImage: "/images/hero-slider-anasayfa/gaming-pc.png",
      ctaKey: "hero.examine",
      price: "₺35.999",
      features: ["RTX 4060 8GB", "Intel i5-12500", "16GB DDR4", "512GB SSD"],
      gradient: "from-red-600/20 via-orange-600/20 to-yellow-600/20",
      categoryUrl: "/kategoriler/gaming-pc"
    },
    {
      id: 3,
      titleKey: "hero.slides.powerSupply.title",
      subtitleKey: "hero.slides.powerSupply.subtitle",
      descriptionKey: "hero.slides.powerSupply.description",
      backgroundImage: "/images/hero-slider-anasayfa/power2.jpg",
      productImage: "/images/hero-slider-anasayfa/power-supply.png",
      ctaKey: "hero.buyNow",
      price: "₺2.899",
      features: ["80Plus GOLD", "ARGB Aydınlatma", "5 Yıl Garanti", "Askeri Tasarım"],
      gradient: "from-yellow-600/20 via-amber-600/20 to-orange-600/20",
      categoryUrl: "/kategoriler/gaming-psu"
    },
    {
      id: 4,
      titleKey: "hero.slides.airCooling.title",
      subtitleKey: "hero.slides.airCooling.subtitle",
      descriptionKey: "hero.slides.airCooling.description",
      backgroundImage: "https://wallpapercave.com/wp/wp7095182.jpg",
      productImage: "/images/hero-slider-anasayfa/cpu-fan.png",
      ctaKey: "hero.examine",
      price: "₺1.109",
      features: ["4x Isı Borusu", "ARGB Infinity Mirror", "1800RPM Fan", "HDT Teknolojisi"],
      gradient: "from-cyan-600/20 via-teal-600/20 to-blue-600/20",
      categoryUrl: "/kategoriler/hava-sogutucu"
    },
    {
      id: 5,
      titleKey: "hero.slides.liquidCooling.title",
      subtitleKey: "hero.slides.liquidCooling.subtitle",
      descriptionKey: "hero.slides.liquidCooling.description",
      backgroundImage: "https://wallpapercave.com/wp/wp13179696.jpg",
      productImage: "/images/hero-slider-anasayfa/sivi-sogutma.png",
      ctaKey: "hero.discover",
      price: "₺3.709",
      features: ["240mm Radyatör", "ARGB Fanlar", "Bakır Rulman", "2 Yıl Garanti"],
      gradient: "from-blue-600/20 via-cyan-600/20 to-teal-600/20",
      categoryUrl: "/kategoriler/sivi-sogutma"
    },
    {
      id: 6,
      titleKey: "hero.slides.caseFan.title",
      subtitleKey: "hero.slides.caseFan.subtitle",
      descriptionKey: "hero.slides.caseFan.description",
      backgroundImage: "https://wallpapercave.com/wp/wp7094586.jpg",
      productImage: "https://green.net.tr/wp-content/uploads/2025/01/GREEN_GF120FSB_120mm_Silent_Fan_0339399_nobg-png.webp",
      ctaKey: "hero.examine",
      price: "₺202",
      features: ["Ultra Sessiz", "FSB Teknolojisi", "Shark-Fin Tasarım", "Anti-Titreşim"],
      gradient: "from-gray-600/20 via-slate-600/20 to-zinc-600/20",
      categoryUrl: "/kategoriler/kasa-fani"
    },
    {
      id: 7,
      titleKey: "hero.slides.keyboard.title",
      subtitleKey: "hero.slides.keyboard.subtitle",
      descriptionKey: "hero.slides.keyboard.description",
      backgroundImage: "https://wallpapercave.com/wp/wp11631310.jpg",
      productImage: "/images/hero-slider-anasayfa/keyboard-product.webp",
      ctaKey: "hero.buyNow",
      price: "₺646",
      features: ["19 Anti-Ghost", "RGB Aydınlatma", "4 Makro Tuş", "Türkçe Q Layout"],
      gradient: "from-purple-600/20 via-pink-600/20 to-rose-600/20",
      categoryUrl: "/kategoriler/klavye"
    },
    {
      id: 8,
      titleKey: "hero.slides.mouse.title",
      subtitleKey: "hero.slides.mouse.subtitle",
      descriptionKey: "hero.slides.mouse.description",
      backgroundImage: "https://wallpapercave.com/wp/wp7094679.png",
      productImage: "https://green.net.tr/wp-content/uploads/2024/10/GREEN-GM605-Mouse-G-00133595_nobg-png.webp",
      ctaKey: "hero.discover",
      price: "₺412",
      features: ["7200 DPI", "Mesh Gövde", "6 Tuş", "ARGB Aydınlatma"],
      gradient: "from-green-600/20 via-emerald-600/20 to-teal-600/20",
      categoryUrl: "/kategoriler/mouse"
    },
    {
      id: 9,
      titleKey: "hero.slides.pcCase.title",
      subtitleKey: "hero.slides.pcCase.subtitle",
      descriptionKey: "hero.slides.pcCase.description",
      backgroundImage: "https://wallpapercave.com/wp/wp12984853.png",
      productImage: "https://green.net.tr/wp-content/uploads/2024/10/GREEN-Z5-SURENA-G121893_nobg-png.webp",
      ctaKey: "hero.examine",
      price: "₺1.899",
      features: ["Tempered Glass", "RGB Aydınlatma", "Kablo Yönetimi", "Gelişmiş Havalandırma"],
      gradient: "from-slate-600/20 via-gray-600/20 to-zinc-600/20",
      categoryUrl: "/kategoriler/pc-kasasi"
    },
    {
      id: 10,
      titleKey: "hero.slides.headset.title",
      subtitleKey: "hero.slides.headset.subtitle",
      descriptionKey: "hero.slides.headset.description",
      backgroundImage: "https://wallpapercave.com/wp/wp13179375.jpg",
      productImage: "/images/hero-slider-anasayfa/headsetproduct.png",
      ctaKey: "hero.discover",
      price: "₺899",
      features: ["7.1 Surround", "RGB Aydınlatma", "Noise Cancelling", "Ergonomik Tasarım"],
      gradient: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20",
      categoryUrl: "/kategoriler/kulaklik"
    }
  ];

  const featureCards = [
    {
      icon: Shield,
      titleKey: "hero.featureCards.secureShoppingTitle",
      subtitleKey: "hero.featureCards.secureShoppingSubtitle",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      titleKey: "hero.featureCards.warrantyTitle",
      subtitleKey: "hero.featureCards.warrantySubtitle",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      titleKey: "hero.featureCards.psuWarrantyTitle",
      subtitleKey: "hero.featureCards.psuWarrantySubtitle",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Star,
      titleKey: "hero.featureCards.premiumQualityTitle",
      subtitleKey: "hero.featureCards.premiumQualitySubtitle",
      color: "from-purple-500 to-pink-500"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    
    setIntervalId(interval)
    return () => clearInterval(interval)
  }, [slides.length])

  const resetAutoPlayTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    // Immediately start a new interval
    const newInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    setIntervalId(newInterval)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    resetAutoPlayTimer()
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    resetAutoPlayTimer()
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetAutoPlayTimer()
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '60%', right: '10%' }}
        />
      </div>

      {/* Slides Container */}
      <div className="relative h-full">
        <AnimatePresence mode="wait" initial={true}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].backgroundImage})` }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
            />

            {/* Dynamic Gradient Overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                    opacity: 0
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                  {/* Left Content */}
                  <div className="max-w-2xl">
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    key={`content-${currentSlide}`}
                  >
                    {/* Badge */}
                    <motion.div
                      variants={itemVariants}
                      className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-primary font-medium text-sm">{String(t("hero.featuredProduct"))}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      variants={itemVariants}
                      className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
                    >
                      <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                        {String(t(slides[currentSlide].titleKey))}
                      </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                      variants={itemVariants}
                      className="text-2xl md:text-3xl font-medium text-primary mb-6"
                    >
                      {String(t(slides[currentSlide].subtitleKey))}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      variants={itemVariants}
                      className="text-lg text-gray-200 mb-8 max-w-2xl leading-relaxed"
                    >
                      {String(t(slides[currentSlide].descriptionKey))}
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-wrap gap-4 mb-8"
                    >
                      {slides[currentSlide].features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                        >
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-white text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Price and CTA */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                      <motion.div
                        className="text-3xl font-bold text-white"
                        whileHover={{ scale: 1.05 }}
                      >
                        {slides[currentSlide].price}
                        <span className="text-lg text-gray-400 ml-2">başlangıç</span>
                      </motion.div>

                      <div className="flex space-x-4">
                        <Link href={slides[currentSlide].categoryUrl}>
                          <motion.button
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {String(t(slides[currentSlide].ctaKey))}
                          </motion.button>
                        </Link>

                        <motion.button
                          className="border-2 border-white/30 hover:border-primary/50 hover:bg-primary/10 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-4 h-4" />
                          <span>Video İzle</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                  </div>

                  {/* Right Product Showcase */}
                  <div className="hidden lg:flex items-center justify-center relative">
                    {/* Floating Product Container */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 50, rotateY: -15 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150"
                        animate={{
                          scale: [1.5, 1.8, 1.5],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Product Showcase - Minimal */}
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Simple Background Circle */}
                        <motion.div
                          className="absolute inset-0 bg-white/5 rounded-full blur-xl scale-110"
                          animate={{
                            scale: [1.1, 1.3, 1.1],
                            opacity: [0.3, 0.5, 0.3]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Product Image */}
                        <Link href={slides[currentSlide].categoryUrl}>
                          <motion.img
                            src={slides[currentSlide].productImage}
                            alt={String(t(slides[currentSlide].titleKey))}
                            className="relative w-full max-w-[550px] h-auto object-contain drop-shadow-2xl cursor-pointer"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                          />
                        </Link>

                        {/* Green Logo with Advanced Animation */}
                        <motion.div
                          className="absolute -top-6 -right-6"
                          initial={{ scale: 0, rotate: -720, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            rotate: 0, 
                            opacity: 1,
                            transition: {
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                              duration: 2
                            }
                          }}
                          whileHover={{ 
                            scale: 1.15,
                            y: -5,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }
                          }}
                        >
                          <div className="relative group">
                            {/* Glow Effect */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/30 blur-xl z-0"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            
                            {/* Logo Container */}
                            <div className="relative overflow-hidden rounded-full">
                              <img 
                                src="/images/kurumsal-logo/green-logo.svg" 
                                alt="Green Logo"
                                className="w-24 h-auto drop-shadow-2xl relative z-10 transform transition-transform duration-700 group-hover:scale-110"
                              />
                              
                              {/* Multiple Shine Effects */}
                              <motion.div
                                className="absolute inset-0 w-[200%] h-full"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              >
                                {/* Primary Shine */}
                                <div 
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                                  style={{ transform: 'skew(-45deg)' }}
                                />
                                {/* Secondary Shine */}
                                <div 
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-20"
                                  style={{ transform: 'skew(-45deg) translateX(-50%)' }}
                                />
                              </motion.div>
                            </div>

                            {/* Orbital Particles */}
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: "easeInOut"
                                }}
                                style={{
                                  left: `${50 + 35 * Math.cos(2 * Math.PI * i / 8)}%`,
                                  top: `${50 + 35 * Math.sin(2 * Math.PI * i / 8)}%`,
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>

                        {/* Floating Feature Badges */}
                        <div className="absolute -left-16 top-1/2 -translate-y-1/2 space-y-6">
                          {slides[currentSlide].features.slice(0, 2).map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/30"
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1.2 + idx * 0.1 }}
                              whileHover={{ scale: 1.05, x: 5 }}
                            >
                              {feature}
                            </motion.div>
                          ))}
                        </div>

                        {/* Floating Feature Badges Right */}
                        <div className="absolute -right-16 top-1/3 space-y-6">
                          {slides[currentSlide].features.slice(2, 4).map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/30"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
                              whileHover={{ scale: 1.05, x: -5 }}
                            >
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Floating Particles around Product */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-primary/60 rounded-full"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${10 + Math.random() * 80}%`,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feature Cards - Bottom */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex gap-6 z-20">
        {featureCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <motion.div
              key={index}
              className="relative bg-white/10 backdrop-blur-md rounded-xl p-3 group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 transition-all duration-300`}
              />
              <div className="relative z-10 flex items-center space-x-2">
                <IconComponent className="w-4 h-4 text-primary" />
                <div>
                  <span className="text-white font-semibold text-xs block">{String(t(card.titleKey))}</span>
                  <span className="text-gray-300 text-xs">{String(t(card.subtitleKey))}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => {
          const nextSection = document.querySelector('#featured-categories')
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        className="absolute bottom-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full group"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowDown className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
      </motion.button>
    </section>
  )
}

export default HeroSlider
