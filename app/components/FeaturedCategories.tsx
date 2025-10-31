'use client'

import Link from 'next/link'
import {
  Monitor,
  Mouse,
  Keyboard,
  Cpu,
  Waves,
  Fan,
  BatteryCharging,
  HardDrive,
  Zap,
  ArrowUpRight,
  Star,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'

const FeaturedCategories = () => {
  const { tString } = useTranslation()

  interface CategoryCard {
    id: string
    name: string
    description: string
    image: string
    rating: number
    badge: string
    features: string[]
    href: string
    icon: typeof Monitor
    accent: string
  }

  const categories: CategoryCard[] = [
    {
      id: 'gaming-pc',
      name: 'Gaming PC Koleksiyonu',
      description:
        '4K çözünürlükte yarış pistlerinden open-world deneyimlerine kadar her sahnede akıcı performans.',
      image: '/images/categories-hero-img/masaüstü-bilgisayar.png',
      rating: 4.9,
      badge: 'Pro Series',
      features: ['RTX 4060 Ti', 'Intel i5 12.Nesil', '32GB DDR4'],
      href: '/kategoriler/gaming-pc',
      icon: Monitor,
      accent: 'from-slate-900/80 to-slate-800/60'
    },
    {
      id: 'all-in-one',
      name: 'All-in-One Setup',
      description: 'Ultra ince, hareketli stand ve yerleşik HD kamera ile masaüstünü sadeleştir.',
      image: '/images/categories-hero-img/all-in-one.png',
      rating: 4.7,
      badge: 'Studio Ready',
      features: ['27" FHD Panel', '802.11ac Wi-Fi', 'Hareketli Stand'],
      href: '/kategoriler/aio-pc',
      icon: Cpu,
      accent: 'from-emerald-500/70 to-emerald-400/40'
    },
    {
      id: 'gaming-mouse',
      name: 'Gaming Mouse',
      description: 'Hassas sensör, hafif tasarım ve RGB dokunuşuyla rekabete hazır.',
      image: '/images/categories-hero-img/mouse.jpg',
      rating: 4.8,
      badge: 'Esports',
      features: ['20.000 DPI', '65g Ağırlık', 'Tri-Mode'],
      href: '/kategoriler/gaming-mouse',
      icon: Mouse,
      accent: 'from-cyan-500/60 to-blue-500/40'
    },
    {
      id: 'keyboard',
      name: 'Gaming Klavye',
      description: 'Hot-swap tuşlar ve manyetik wrist rest ile kusursuz konfor.',
      image: '/images/categories-hero-img/klavye.jpg',
      rating: 4.8,
      badge: 'Hot-Swap',
      features: ['Gateron Switch', 'Manyetik Palm Rest', 'Per-Key RGB'],
      href: '/kategoriler/gaming-klavye',
      icon: Keyboard,
      accent: 'from-rose-500/60 to-purple-500/40'
    },
    {
      id: 'air-cooling',
      name: 'Hava Soğutma',
      description: 'Heatpipe mimarisiyle maksimum termal verimlilik.',
      image: '/images/categories-hero-img/hava-soğutma.jpg',
      rating: 4.6,
      badge: 'Thermal Flow',
      features: ['6 Heatpipe', 'ARGB Fan', 'LGA1700'],
      href: '/kategoriler/hava-sogutucu',
      icon: Fan,
      accent: 'from-orange-500/60 to-amber-500/40'
    },
    {
      id: 'liquid-cooling',
      name: 'Sıvı Soğutma',
      description: '360mm radyatör ve cam rezervuar ile sessizlik ve performans.',
      image: '/images/categories-hero-img/sıvı-soğutma.jpg',
      rating: 4.7,
      badge: 'Glacier',
      features: ['360mm Radyatör', 'ARGB Pompa', 'AM5 Uyumlu'],
      href: '/kategoriler/sivi-sogutma',
      icon: Waves,
      accent: 'from-blue-500/60 to-indigo-500/40'
    },
    {
      id: 'psu',
      name: 'Güç Kaynağı',
      description: '80+ Gold sertifikalı, tam modüler PSU portföyü.',
      image: '/images/categories-hero-img/güç-kaynağı.jpg',
      rating: 4.9,
      badge: 'Silent Power',
      features: ['80+ Gold', 'Tam Modüler', 'ARGB Fan'],
      href: '/kategoriler/gaming-psu',
      icon: BatteryCharging,
      accent: 'from-slate-900/70 to-slate-800/50'
    },
    {
      id: 'cases',
      name: 'PC Kasası',
      description: 'Panoramik temperli cam ve tool-less montaj kolaylığı.',
      image: '/images/categories-hero-img/bilgisayar-kasasi.png',
      rating: 4.8,
      badge: 'Panorama',
      features: ['Tool-less', 'ARGB Hub', 'E-ATX'],
      href: '/kategoriler/pc-kasasi',
      icon: HardDrive,
      accent: 'from-violet-500/60 to-fuchsia-500/40'
    }
  ]

  const heroCategory = categories[0]
  const secondaryCategories = categories.slice(1)
  const HeroIcon = heroCategory.icon

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[460px] w-[460px] rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative z-10 space-y-16">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-5 py-2 text-sm font-medium text-slate-700">
            <Zap className="h-4 w-4 text-primary" />
            {tString('pages.categories.featured.title')}
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              {tString('pages.categories.featured.subtitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
              {tString('pages.categories.featured.description')}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-12 xl:grid-cols-[1.1fr_1fr]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.article
            className="group relative overflow-hidden rounded-[36px] bg-white/80 p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.45)] ring-1 ring-white/60 backdrop-blur-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
              <div className="space-y-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  <Sparkles className="h-4 w-4 text-primary" />
                  {heroCategory.badge}
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold text-slate-900 md:text-[36px]">
                    {heroCategory.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                    {heroCategory.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {heroCategory.features.map(feature => (
                    <span
                      key={feature}
                      className="rounded-full bg-slate-900/5 px-3 py-2 text-xs font-medium text-slate-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href={heroCategory.href}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:shadow-slate-900/25"
                  >
                    Koleksiyonu Keşfet
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <div className="flex items-center gap-3 rounded-full bg-slate-900/5 px-4 py-2 text-sm font-medium text-slate-600">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span>{heroCategory.rating.toFixed(1)} kullanıcı skoru</span>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden rounded-[32px]">
                <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${heroCategory.accent}`} />
                <motion.div
                  className="absolute inset-0 rounded-[32px] bg-cover bg-center opacity-90"
                  style={{ backgroundImage: `url(${heroCategory.image})` }}
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <HeroIcon className="h-6 w-6" />
                  </div>
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                    <div>Ultra Sessiz</div>
                    <div>RGB Aydınlatma</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-6">
            {secondaryCategories.slice(0, 2).map(category => {
              const Icon = category.icon
              return (
                <motion.article
                  key={category.id}
                  className="relative overflow-hidden rounded-[28px] bg-white/80 p-7 shadow-xl shadow-slate-900/10 ring-1 ring-white/60 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid gap-5 sm:grid-cols-[minmax(0,1.1fr)_120px] sm:items-center">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                          {category.badge}
                        </span>
                        <div className="flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600">
                          <Star className="h-4 w-4 text-amber-400" />
                          {category.rating.toFixed(1)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold text-slate-900">
                          {category.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.features.map(feature => (
                          <span
                            key={feature}
                            className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={category.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-primary"
                      >
                        Kategoriyi Aç
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="relative h-28 overflow-hidden rounded-2xl">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accent}`} />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${category.image})` }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-900">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.12, duration: 0.4 }
            }
          }}
        >
          {secondaryCategories.slice(2).map(category => {
            const Icon = category.icon
            return (
              <motion.article
                key={category.id}
                className="group relative overflow-hidden rounded-[26px] bg-white/80 p-6 shadow-xl shadow-slate-900/10 ring-1 ring-white/60 backdrop-blur-sm"
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ translateY: -6 }}
              >
                <Link href={category.href} className="block">
                  <div className="relative h-36 overflow-hidden rounded-2xl">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.accent}`} />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${category.image})` }}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-slate-900">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
                      <Star className="h-4 w-4 text-amber-400" />
                      {category.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold text-slate-900">
                        {category.name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map(feature => (
                        <span
                          key={feature}
                          className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:text-primary">
                      Keşfet
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/kategoriler"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
          >
            {tString('pages.categories.featured.viewAllCategories')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/katalog.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
          >
            {tString('pages.categories.featured.downloadCatalog')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCategories
