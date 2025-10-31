'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Clock,
  ShoppingCart,
  Heart,
  Star,
  Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const FLASH_DEALS = [
  {
    id: 'gpsu002',
    name: 'Gaming PSU 850W RGB',
    originalPrice: 3699,
    flashPrice: 3199,
    discount: 14,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviews: 38,
    sold: 78,
    stock: 22,
    specs: ['850W Güç Kapasitesi', '80+ Gold Verimlilik', 'ARGB Fan', 'Tam Modüler'],
    badge: 'MEGA İNDİRİM',
    badgeColor: 'bg-primary'
  },
  {
    id: 'headset002',
    name: 'GREEN GM606 RGB',
    originalPrice: 2499,
    flashPrice: 2199,
    discount: 12,
    images: [
      '/images/products/GREEN606.webp',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviews: 76,
    sold: 55,
    stock: 45,
    specs: ['Hi-Res Ses', '30sa Pil', 'ARGB', 'Çift Batarya'],
    badge: 'PREMIUM',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'mouse002',
    name: 'GREEN GM603 RGB',
    originalPrice: 1099,
    flashPrice: 899,
    discount: 18,
    images: [
      '/images/products/GREEN603.webp',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviews: 56,
    sold: 158,
    stock: 42,
    specs: ['12000 DPI', 'Kablosuz', '50sa Pil', 'ARGB'],
    badge: 'SON FIRSATLAR',
    badgeColor: 'bg-amber-500'
  },
  {
    id: 'mouse001',
    name: 'GREEN GM-605 ARGB',
    originalPrice: 499,
    flashPrice: 412,
    discount: 17,
    images: [
      '/images/products/GREEN605.webp',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    reviews: 89,
    sold: 225,
    stock: 75,
    specs: ['7200 DPI', 'Mesh Gövde', 'RGB', '6 Tuş'],
    badge: 'ÇOK SATAN',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'keyboard001',
    name: 'GREEN GK701 Mekanik Klavye',
    originalPrice: 1899,
    flashPrice: 1599,
    discount: 16,
    images: [
      'https://www.green.net.tr/assets/filemanager/userfiles/green/Keyborad/GK302/GREEN_GK302_03.jpg',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviews: 64,
    sold: 132,
    stock: 38,
    specs: ['Hot-Swap Switch', 'RGB Aydınlatma', 'Alüminyum Kas', 'USB-C'],
    badge: 'PRO SERİ',
    badgeColor: 'bg-violet-600'
  }
]

const FlashDeals = () => {
  const flashDeals = FLASH_DEALS
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  const [hoveredDeal, setHoveredDeal] = useState<string | null>(null)
  const { addItem } = useCart()


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const getSoldPercentage = (sold: number, stock: number) => {
    const total = sold + stock
    if (total === 0) {
      return 0
    }
    return Math.round((sold / total) * 100)
  }

  const handleAddToCart = (deal: typeof FLASH_DEALS[number]) => {
    if (!deal || deal.stock <= 0) {
      return
    }

    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.flashPrice,
      quantity: 1,
      image: deal.images?.[0] ?? null,
      slug: deal.id,
      categorySlug: 'flash-deals',
      stock: deal.stock
    })
  }

  return (
    <section
      id="flash-deals"
      className="relative overflow-hidden py-16 sm:py-20 xl:py-24"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.7) 45%, rgba(15,23,42,0.55) 100%), url('/images/hero/flash-deals.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 z-0 bg-slate-900/35 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />

      <div className="container relative z-[30] px-4 sm:px-6">
        <div className="space-y-10 rounded-3xl border border-white/10 bg-slate-900/30 p-5 shadow-[0_32px_120px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-8 lg:space-y-14 lg:p-10">
          <motion.header
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/20 backdrop-blur">
                  <Zap className="h-4 w-4" />
                  <span>Sınırlı Süreli Fırsatlar</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl xl:text-4xl">
                  En iyi oyun ekipmanlarında anlık fırsatlar
                </h2>
                <p className="text-sm text-slate-200/80 sm:text-base lg:text-lg">
                  Güvendiğin GREEN ürünlerini özel fiyatlarla hemen kap. Stok bitmeden üstelik hızlı teslimat seçenekleriyle.
                </p>
              </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-5 py-3 shadow-lg ring-1 ring-slate-200 backdrop-blur sm:px-6 sm:py-4">
                <Clock className="h-6 w-6 text-primary" />
                <div className="flex items-center gap-3">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="min-w-[56px] rounded-xl bg-slate-900 text-xl font-semibold tracking-wide text-white shadow-md sm:min-w-[64px] sm:text-2xl">
                        <span className="block px-3 py-2 sm:py-2.5">
                          {value.toString().padStart(2, '0')}
                        </span>
                      </div>
                      <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
                        {unit === 'hours' ? 'Saat' : unit === 'minutes' ? 'Dakika' : 'Saniye'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/kategoriler"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition-all hover:shadow-slate-900/20 sm:px-6"
              >
                Tüm fırsatları gör
              </Link>
            </div>
          </div>
        </motion.header>
        <motion.div
          className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {flashDeals.map((deal, index) => (
            <motion.article
              key={deal.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/80 p-5 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/70 backdrop-blur-xl transition-all sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setHoveredDeal(deal.id)}
              onMouseLeave={() => setHoveredDeal(null)}
            >
              <div className="flex h-full flex-col gap-4 lg:gap-5">
                <div className="relative h-44 overflow-hidden rounded-2xl bg-slate-900/5 sm:h-48">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${hoveredDeal === deal.id && deal.images[1] ? deal.images[1] : deal.images[0]})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {deal.badge}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    -{deal.discount}%
                  </div>

                  <AnimatePresence>
                    {hoveredDeal === deal.id && (
                      <motion.div
                        className="absolute right-4 bottom-4 flex gap-2"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                      >
                        <button className="rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-primary hover:text-white">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button
                          className="rounded-full bg-primary p-2 text-white shadow-md transition hover:bg-primary/90"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleAddToCart(deal)
                          }}
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <div className="space-y-1.5">
                    <h4 className="text-base font-semibold text-slate-900 sm:text-lg">
                      {deal.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(deal.rating)
                                ? 'text-amber-300 fill-current'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span>({deal.reviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 min-h-[48px] sm:min-h-[56px]">
                    {deal.specs.slice(0, 3).map(spec => (
                      <span
                        key={spec}
                        className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto space-y-3 sm:space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-semibold text-slate-900 sm:text-2xl">
                            {formatPrice(deal.flashPrice)}
                          </span>
                          <span className="text-xs font-medium text-slate-400 line-through">
                            {formatPrice(deal.originalPrice)}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-emerald-600">
                          {formatPrice(deal.originalPrice - deal.flashPrice)} kazanç
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(deal)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 whitespace-nowrap"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Sepete Ekle
                      </button>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                        <span>{deal.sold} adet satıldı</span>
                        <span>{deal.stock} stok</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200">
                        <div
                          className="h-1.5 rounded-full bg-slate-900"
                          style={{ width: `${getSoldPercentage(deal.sold, deal.stock)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
    </section>
  )
}

export default FlashDeals
