  'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Zap, Clock, Award, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const BannerSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const slides = [
    {
      title: "Gaming PC",
      subtitle: "RTX 4090 ile Sınırsız Performans",
      description: "Son teknoloji ile donatılmış gaming bilgisayarları. 4K çözünürlükte 120+ FPS deneyimi yaşayın.",
      image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1920",
      link: "/bilgisayar/gaming-pc",
      features: [
        { title: "RTX 4090", value: "4K Gaming" },
        { title: "Intel i9-13900K", value: "Maksimum Güç" },
        { title: "32GB DDR5", value: "Yüksek Hız" },
        { title: "2TB NVMe SSD", value: "Ultra Hızlı" }
      ]
    },
    {
      title: "AIO PC",
      subtitle: "Kompakt ve Güçlü",
      description: "Tüm gücü tek bir monitörde! İş ve oyun için ideal All-in-One bilgisayarlar.",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1920",
      link: "/bilgisayar/all-in-one-pc",
      features: [
        { title: "4K Ekran", value: "HDR Desteği" },
        { title: "RTX 4070", value: "Ray Tracing" },
        { title: "Intel i7", value: "Yüksek Performans" },
        { title: "Kompakt Tasarım", value: "Şık Görünüm" }
      ]
    },
    {
      title: "Soğutma Sistemleri",
      subtitle: "Maksimum Performans için Soğutma",
      description: "Sisteminizi her zaman serin tutun. Hava ve sıvı soğutma çözümleri ile maksimum performans.",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1920",
      link: "/bilgisayar-parcalari/sivi-sogutma",
      features: [
        { title: "360mm Radyatör", value: "Maksimum Soğutma" },
        { title: "RGB Aydınlatma", value: "Şık Görünüm" },
        { title: "Sessiz Çalışma", value: "25dB" },
        { title: "Kolay Montaj", value: "Tak-Çalıştır" }
      ]
    },
    {
      title: "Çevre Birimleri",
      subtitle: "Profesyonel Gaming Ekipmanları",
      description: "Oyun deneyiminizi zirveye taşıyın. En iyi gaming klavye, mouse ve aksesuarlar.",
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=1920",
      link: "/cevre-birimleri",
      features: [
        { title: "Mekanik Klavye", value: "1ms Tepki" },
        { title: "Gaming Mouse", value: "26000 DPI" },
        { title: "RGB Sync", value: "Tam Kontrol" },
        { title: "Premium Kalite", value: "Uzun Ömür" }
      ]
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Transition */}
      <motion.div 
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Image
          src={currentSlideData.image}
          alt={currentSlideData.title}
          fill
          className="object-cover transform scale-105 transition-transform duration-700"
          priority
          quality={100}
          sizes="100vw"
          style={{ transform: `scale(${currentSlide === 0 ? 1.05 : 1})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 h-full">
        <div className="flex flex-col justify-center h-full">
          <motion.div 
            className="max-w-3xl space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">
                {currentSlideData.title}
              </h2>
              <p className="text-3xl text-primary font-semibold mb-4">
                {currentSlideData.subtitle}
              </p>
              <p className="text-xl text-gray-300 mb-8">
                {currentSlideData.description}
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentSlideData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-primary font-semibold">{feature.title}</div>
                  <div className="text-white text-sm">{feature.value}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href={currentSlideData.link}>
                <button className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2">
                  <span>Hemen İncele</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  currentSlide === index 
                    ? 'bg-primary w-12 scale-110' 
                    : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default BannerSection
