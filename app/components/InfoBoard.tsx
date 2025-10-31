'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, HardDrive, Monitor, Gamepad2, Headphones, Keyboard } from 'lucide-react'

const InfoBoard = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      id: 1,
      title: "İşlemci Teknolojisi",
      specs: [
        { label: "Model", value: "Intel i9 13900K" },
        { label: "Çekirdek", value: "24 Core" },
        { label: "Frekans", value: "5.8 GHz" }
      ],
      info: "En son nesil Intel işlemci ile maksimum performans",
      icon: Cpu,
      featured: true
    },
    {
      id: 2,
      title: "Bellek Sistemi",
      specs: [
        { label: "RAM", value: "32GB DDR5" },
        { label: "Hız", value: "6000MHz" },
        { label: "CAS", value: "CL36" }
      ],
      info: "Yüksek hızlı DDR5 bellek teknolojisi",
      icon: HardDrive,
      featured: false
    },
    {
      id: 3,
      title: "Ekran Teknolojisi",
      specs: [
        { label: "Panel", value: "IPS" },
        { label: "Hz", value: "360Hz" },
        { label: "HDR", value: "HDR600" }
      ],
      info: "Ultra akıcı gaming monitör deneyimi",
      icon: Monitor,
      featured: false
    },
    {
      id: 4,
      title: "Gaming Mouse",
      specs: [
        { label: "DPI", value: "26000" },
        { label: "IPS", value: "650" },
        { label: "Polling", value: "4000Hz" }
      ],
      info: "Ultra hassas optik sensör teknolojisi",
      icon: Gamepad2,
      featured: false
    },
    {
      id: 5,
      title: "Ses Sistemi",
      specs: [
        { label: "Sistem", value: "7.1" },
        { label: "THX", value: "Spatial" },
        { label: "Mic", value: "Çift Yönlü" }
      ],
      info: "Surround ses sistemi ve kristal netliğinde ses",
      icon: Headphones,
      featured: false
    },
    {
      id: 6,
      title: "Mekanik Klavye",
      specs: [
        { label: "Switch", value: "Red" },
        { label: "RGB", value: "16.8M" },
        { label: "N-Key", value: "Rollover" }
      ],
      info: "Özel mekanik switchler ve tam RGB aydınlatma",
      icon: Keyboard,
      featured: false
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Bilgisayar Bilgi Panosu
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group ${card.featured ? 'lg:col-span-2' : ''}`}
            >
              <div className="h-full bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                {/* Header */}
                <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">
                      {card.title}
                    </h3>
                    <div className="p-2 rounded-xl bg-white/10">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-blue-100">
                    {card.info}
                  </p>
                </div>

                {/* Specs */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {card.specs.map((spec, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">
                          {spec.label}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InfoBoard
