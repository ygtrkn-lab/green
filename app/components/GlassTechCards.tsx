'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, HardDrive, Monitor, Gamepad2, Headphones, Keyboard } from 'lucide-react'

const GlassTechCards = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      id: 1,
      title: "FPS Artırma Kontrol Paneli",
      description: "Arka plan süreçlerini sadeleştir, güç planını sabitle ve işlemciyi oyuna odaklayarak anlık kare hızını koru.",
      specs: [
        { label: "CPU Yükü", value: "%15 altı boşta hedefle" },
        { label: "Güç Planı", value: "Yüksek performans modu" },
        { label: "Güncelleme", value: "BIOS/driver 12 haftada bir" }
      ],
      icon: Cpu,
      featured: true
    },
    {
      id: 2,
      title: "Bellek ve Depolama Rotaları",
      description: "Texture streaming ve shader önbelleğini hızlandırmak için bellek profillerini, disk erişimini ve sayfa dosyasını optimize et.",
      specs: [
        { label: "RAM Kullanımı", value: "%70 üstüne çıkma" },
        { label: "Profil", value: "XMP/EXPO doğrulandı" },
        { label: "Depolama", value: "NVMe 7GB/sn okuma" }
      ],
      icon: HardDrive,
      featured: false
    },
    {
      id: 3,
      title: "Grafik Profil Optimizasyonu",
      description: "Render skalasını, gölge çözünürlüğünü ve DLSS/FSR ayarlarını oyuna göre dengeleyerek kare süresini stabilize et.",
      specs: [
        { label: "Ön Ayar", value: "Orta + keskinleştirme" },
        { label: "DLSS/FSR", value: "Quality → Balanced" },
        { label: "Işıklandırma", value: "RT açıkken %30 tolerans" }
      ],
      icon: Monitor,
      featured: false
    },
    {
      id: 4,
      title: "Giriş Gecikmesi Laboratuvarı",
      description: "USB polling, sensör kalibrasyonu ve yüzey sürtünmesini ayarlayarak komutların ekrana yansımasını hızlandır.",
      specs: [
        { label: "Polling", value: "1000-8000 Hz test" },
        { label: "Firmware", value: "Düşük gecikme modu" },
        { label: "Yüzey", value: "Cam + PTFE ped" }
      ],
      icon: Gamepad2,
      featured: false
    },
    {
      id: 5,
      title: "Ağ ve Ping Stabilizasyonu",
      description: "Router yapılandırması, QoS ve kablolu bağlantıyla kare başına gecikmeyi minimuma çek.",
      specs: [
        { label: "Bağlantı", value: "CAT6 kablo öner" },
        { label: "QoS", value: "Oyun trafiği öncelikli" },
        { label: "Ping", value: "<25 ms hedefle" }
      ],
      icon: Headphones,
      featured: false
    },
    {
      id: 6,
      title: "Oyun İçin Hızlı Komut Dizini",
      description: "Makroları, performans profillerini ve overlay ölçümlerini tek tuşla değiştirerek tempoyu kaybetme.",
      specs: [
        { label: "Profil", value: "Turnuva / yayın modları" },
        { label: "Makro", value: "Cooldown takibi" },
        { label: "Overlay", value: "FPS + sıcaklık izleme" }
      ],
      icon: Keyboard,
      featured: false
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className={`group relative cursor-pointer ${card.featured ? 'lg:col-span-2' : ''}`}
            >
              <div className="relative h-full overflow-hidden rounded-3xl">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl shadow-[0_24px_60px_rgba(10,12,21,0.35)] group-hover:shadow-[0_32px_90px_rgba(18,20,35,0.45)] transition-shadow duration-500" />
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-transparent" />
                <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl group-hover:scale-125 transition-transform duration-700" />

                {/* Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/65 leading-relaxed max-w-xs">
                        {card.description}
                      </p>
                      <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-white/40 to-transparent" />
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] group-hover:bg-white/[0.1] transition-colors duration-500 shadow-inner shadow-white/5">
                      <card.icon className="w-5 h-5 text-white/70" />
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {card.specs.map((spec, idx) => (
                      <div key={idx} className="space-y-1 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-3 transition-colors duration-300 group-hover:bg-white/[0.06]">
                        <div className="text-[10px] text-white/45 uppercase tracking-[0.3em]">
                          {spec.label}
                        </div>
                        <div className="text-sm text-white/90 font-medium leading-tight">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GlassTechCards
