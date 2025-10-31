'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, HardDrive, Monitor, Gamepad2, Headphones, Keyboard } from 'lucide-react'

const ModernTechCards = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      id: 1,
      title: "Gelişmiş İşlemci",
      description: "RTX 4090 + Intel i9 13900K",
      icon: Cpu,
      featured: true,
      value: "4K Gaming",
      color: "bg-[#ff6b00]"
    },
    {
      id: 2,
      title: "DDR5 RAM",
      description: "32GB 6000MHz",
      icon: HardDrive,
      featured: false,
      value: "Yüksek Hız",
      color: "bg-[#00b7ff]"
    },
    {
      id: 3,
      title: "Gaming Monitör",
      description: "360Hz 1ms",
      icon: Monitor,
      featured: false,
      value: "Ultra Akıcı",
      color: "bg-[#ff008c]"
    },
    {
      id: 4,
      title: "Gaming Mouse",
      description: "26000 DPI",
      icon: Gamepad2,
      featured: false,
      value: "Pro Gaming",
      color: "bg-[#7c3aed]"
    },
    {
      id: 5,
      title: "Ses Sistemi",
      description: "7.1 Surround",
      icon: Headphones,
      featured: false,
      value: "Ultra Clear",
      color: "bg-[#0ea5e9]"
    },
    {
      id: 6,
      title: "Mekanik Klavye",
      description: "1ms Response",
      icon: Keyboard,
      featured: false,
      value: "RGB Sync",
      color: "bg-[#22c55e]"
    }
  ]

  return (
    <section ref={ref} className="py-16 bg-[#0c0c0c] relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative ${card.featured ? 'lg:col-span-2' : ''}`}
            >
              {/* Card Background */}
              <div className="absolute inset-0.5 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl blur" />
              
              {/* Card Content */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full overflow-hidden group-hover:border-white/20 transition-colors duration-500">
                {/* Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${card.color} opacity-20 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${card.color} bg-opacity-10 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <card.icon className={`w-6 h-6 ${card.color} text-opacity-90`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl text-white font-medium tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-white/60">
                      {card.description}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center space-x-1 text-sm text-white/40">
                        <span>{card.value}</span>
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
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

export default ModernTechCards
