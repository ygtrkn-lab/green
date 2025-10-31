'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Shield, CreditCard, Clock, Award, Phone } from 'lucide-react'

const announcements = [
  {
    id: 1,
    icon: <Truck className="w-4 h-4" />,
    text: 'Aynı Gün Kargo - 14:00\'a Kadar Verilen Siparişlerde'
  },
  {
    id: 2,
    icon: <Shield className="w-4 h-4" />,
    text: 'Power Supply\'lerde 10 Yıla Varan Garanti'
  },
  {
    id: 3,
    icon: <CreditCard className="w-4 h-4" />,
    text: 'Güvenli Ödeme - Kredi Kartı & Havale/EFT'
  },
  {
    id: 4,
    icon: <Clock className="w-4 h-4" />,
    text: 'Çalışma Saatleri: 09:00 - 18:00 (Pzt-Cuma)'
  },
  {
    id: 5,
    icon: <Award className="w-4 h-4" />,
    text: 'Tüm Ürünlerde 2 Yıl Garanti'
  },
  {
    id: 6,
    icon: <Phone className="w-4 h-4" />,
    text: 'Teknik Destek: +90 216 473 36 01'
  }
]

const InfoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] text-white py-1.5 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px',
          animation: 'slide 20s linear infinite'
        }} />
      </div>

      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-30px);
          }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 absolute"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
                {announcements[currentIndex].icon}
              </div>
              <span className="text-sm font-medium">
                {announcements[currentIndex].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/20">
        <motion.div
          className="h-full bg-white/40"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: 4,
            ease: 'linear',
            repeat: Infinity
          }}
        />
      </div>
    </div>
  )
}

export default InfoBanner
