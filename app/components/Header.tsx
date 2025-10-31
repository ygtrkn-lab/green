'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Box,
  Gamepad2,
  Globe,
  Mail,
  Menu,
  Monitor,
  Phone,
  Power,
  Snowflake,
  ShoppingCart,
  User,
  X,
  ChevronRight,
  MapPin,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

interface Category {
  name: string
  href: string
  image?: string
}

interface FeaturedProduct {
  name: string
  price: string
  image: string
  slug: string
  categorySlug: string
}

interface MenuItem {
  name: string
  href: string
  icon: ReactNode
  description: string
  featured: FeaturedProduct[]
  categories: Category[]
  accent: {
    from: string
    to: string
  }
  featuredCategory?: string
}

interface ContactLink {
  label: string
  href: string
  description: string
  icon: ReactNode
}

interface ApiProductRecord {
  name: string
  price: number
  slug: string
  categorySlug: string
  currency: string
  stock: number
  images: Array<{ url: string }>
}

interface CategoryApiResponse {
  products?: ApiProductRecord[]
}

interface HeaderProps {
  isDark?: boolean
}

const HEADER_EXPANDED_HEIGHT = 112
const HEADER_COMPACT_HEIGHT = 72
const COMPACT_SCROLL_THRESHOLD = 120

const DesktopMegaPanel = ({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: MenuItem
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 right-0 top-full z-40 pt-5"
    >
      <div className="mx-auto w-[min(70rem,calc(100vw-6rem))] overflow-hidden rounded-3xl border border-white/10 bg-[#0f1015ee] backdrop-blur-2xl shadow-[0_28px_80px_rgba(5,6,12,0.55)]">
        <div className="relative flex flex-col gap-8 px-8 pb-8 pt-6">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                <span className="rounded-xl border border-[#8dc63f]/40 bg-[#8dc63f]/15 px-2.5 py-2 text-[#8dc63f]">
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Green Gaming Hub</span>
                  <span className="text-lg font-semibold text-white">{item.name}</span>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/65">{item.description}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {item.categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="relative h-36 overflow-hidden">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-white/10 to-transparent" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                    </div>
                    <div className="flex items-center justify-between px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Kategori</p>
                        <h4 className="text-base font-semibold text-white">{category.name}</h4>
                      </div>
                      <span className="rounded-full border border-[#8dc63f]/40 bg-[#8dc63f]/15 p-2 text-[#8dc63f] transition-transform duration-300 group-hover:translate-x-1">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Öne Çıkanlar</p>
                  <p className="text-sm font-medium text-white/70">Green Gaming vitrinindeki güncel donanımlar</p>
                </div>
                <Link
                  href={item.href}
                  className="text-xs font-semibold text-white/70 transition-colors duration-200 hover:text-white"
                >
                  Tümünü gör
                </Link>
              </div>
              {item.featured.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {item.featured.slice(0, 4).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/kategoriler/${product.categorySlug}/${product.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/12"
                    >
                      <div className="relative h-32 w-full overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-white">{product.name}</p>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                          {product.price}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-white/60">
                  Öne çıkan ürünler yükleniyor...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Header = ({ isDark = false }: HeaderProps) => {
  const { language, setLanguage } = useLanguage()
  const { totalCount } = useCart()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isProductDetailPage = pathname.split('/').length >= 4 && pathname.includes('/kategoriler/')

  const [mounted, setMounted] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactPanelOpen, setContactPanelOpen] = useState(false)
  const [isProductStickyActive, setIsProductStickyActive] = useState(false)

  const isStickyHeader = !isHomePage || isCompact
  const headerAnimationState = isStickyHeader ? 'compact' : 'expanded'

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contactTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const baseMegaMenuItems = useMemo<MenuItem[]>(
    () => [
      {
        name: 'Bilgisayar',
        href: '/kategoriler/gaming-pc',
        icon: <Monitor className="h-4 w-4" />,
        description: 'Green atölyesinden çıkan gaming PC ve turnuva hazır AIO çözümleri.',
        featured: [],
        featuredCategory: 'gaming-pc',
        categories: [
          {
            name: 'Gaming PC',
            href: '/kategoriler/gaming-pc',
            image: '/images/header-categories/gaming-pc-category.jpg',
          },
          {
            name: 'All-in-One PC',
            href: '/kategoriler/aio-pc',
            image: '/images/header-categories/all-in-one-category.jpg',
          },
        ],
        accent: {
          from: '#42ff89',
          to: '#4b9fff',
        },
      },
      {
        name: 'PC Kasası',
        href: '/kategoriler/pc-kasasi',
        icon: <Box className="h-4 w-4" />,
  description: 'E-spor atmosferine uygun, hava akışı güçlü kasalar ve modüler gövdeler.',
        featured: [],
        featuredCategory: 'pc-kasasi',
        categories: [
          {
            name: 'Mid Tower',
            href: '/kategoriler/pc-kasasi',
            image: '/images/header-categories/pc-kasasi-category.jpg',
          },
        ],
        accent: {
          from: '#ffb347',
          to: '#ff5f6d',
        },
      },
      {
        name: 'Güç Kaynağı',
        href: '/kategoriler/gaming-psu',
        icon: <Power className="h-4 w-4" />,
  description: 'FPS düşüşlerini önleyen, yüksek verimlilikli ve sessiz PSU çözümleri.',
        featured: [],
        featuredCategory: 'gaming-psu',
        categories: [
          {
            name: 'Gaming PSU',
            href: '/kategoriler/gaming-psu',
            image: '/images/header-categories/power-supply-category.jpg',
          },
        ],
        accent: {
          from: '#f6d365',
          to: '#fda085',
        },
      },
      {
        name: 'Soğutma',
        href: '/kategoriler/sivi-sogutma',
        icon: <Snowflake className="h-4 w-4" />,
  description: 'Sıvı ve hava soğutma kitleriyle overclock altinda serin ve kararlı kalın.',
        featured: [],
        featuredCategory: 'sivi-sogutma',
        categories: [
          {
            name: 'Sıvı Soğutma',
            href: '/kategoriler/sivi-sogutma',
            image: '/images/header-categories/liquid-cooler-category.jpg',
          },
          {
            name: 'Hava Soğutucu',
            href: '/kategoriler/hava-sogutucu',
            image: '/images/header-categories/cpu-fan-category.jpg',
          },
          {
            name: 'Kasa Fanı',
            href: '/kategoriler/kasa-fani',
            image: '/images/header-categories/case-fan-category.jpg',
          },
        ],
        accent: {
          from: '#74ebd5',
          to: '#9face6',
        },
      },
      {
        name: 'Gaming Aksesuarlar',
        href: '/kategoriler/mouse',
        icon: <Gamepad2 className="h-4 w-4" />,
  description: 'Mouse, klavye, kulaklık ve aksesuarlarla Green Gaming setupını tamamlayın.',
        featured: [],
        featuredCategory: 'mouse',
        categories: [
          {
            name: 'Klavye',
            href: '/kategoriler/klavye',
            image: '/images/header-categories/keyboard-category.jpg.jpg',
          },
          {
            name: 'Mouse',
            href: '/kategoriler/mouse',
            image: '/images/header-categories/mouse-category.jpg',
          },
          {
            name: 'Kulaklık',
            href: '/kategoriler/kulaklik',
            image: '/images/header-categories/mouse-category.jpg',
          },
        ],
        accent: {
          from: '#a18cd1',
          to: '#fbc2eb',
        },
      },
    ],
    []
  )

  const [megaMenuItems, setMegaMenuItems] = useState<MenuItem[]>(baseMegaMenuItems)
  const contactLinks = useMemo<ContactLink[]>(
    () => [
      {
        label: 'Telefon',
        href: 'tel:+902164733601',
        description: '+90 216 473 36 01',
        icon: <Phone className="h-4 w-4" />,
      },
      {
        label: 'E-posta',
        href: 'mailto:info@green.net.tr',
        description: 'info@green.net.tr',
        icon: <Mail className="h-4 w-4" />,
      },
      {
        label: 'Konum',
        href: 'https://maps.app.goo.gl/8VTgi11UKAGf4J4F8',
        description: 'Green Teknoloji Merkezi',
  icon: <MapPin className="h-4 w-4" />,
      },
    ],
    []
  )
  const activeMenuItem = useMemo(() => {
    if (!activeMenuKey) {
      return null
    }
    return megaMenuItems.find((item) => item.name === activeMenuKey) ?? null
  }, [activeMenuKey, megaMenuItems])

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    if (!activeMenuKey) {
      return
    }
    closeTimer.current = setTimeout(() => {
      setActiveMenuKey(null)
      closeTimer.current = null
    }, 120)
  }, [activeMenuKey, clearCloseTimer])

  const updateScrollState = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? window.scrollY / docHeight : 0
    setScrollProgress(progress)
    setIsCompact(window.scrollY > COMPACT_SCROLL_THRESHOLD)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleScroll = () => {
      window.requestAnimationFrame(updateScrollState)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mounted, updateScrollState])

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
      }
      if (contactTimer.current) {
        clearTimeout(contactTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const syncFromBody = () => {
      const isActive = document.body.classList.contains('product-sticky-active')
      setIsProductStickyActive(isActive)
    }

    const handleProductStickyChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ active?: boolean }>
      if (typeof customEvent.detail?.active === 'boolean') {
        setIsProductStickyActive(customEvent.detail.active)
      } else {
        syncFromBody()
      }
    }

    syncFromBody()
    window.addEventListener('product-sticky-change', handleProductStickyChange)

    return () => {
      window.removeEventListener('product-sticky-change', handleProductStickyChange)
    }
  }, [mounted])
  const openContactPanel = useCallback(() => {
    if (contactTimer.current) {
      clearTimeout(contactTimer.current)
      contactTimer.current = null
    }
    setContactPanelOpen(true)
  }, [])

  const scheduleContactClose = useCallback(() => {
    if (contactTimer.current) {
      clearTimeout(contactTimer.current)
    }
    contactTimer.current = setTimeout(() => {
      setContactPanelOpen(false)
      contactTimer.current = null
    }, 220)
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchFeaturedProducts = async () => {
      const formatter = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        maximumFractionDigits: 0,
      })

      const updatedItems = await Promise.all(
        baseMegaMenuItems.map(async (item) => {
          if (!item.featuredCategory) {
            return item
          }

          try {
            const response = await fetch(`/api/products?category=${encodeURIComponent(item.featuredCategory)}`)
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`)
            }

            const data = (await response.json()) as CategoryApiResponse
            const featuredProducts = (data.products ?? [])
              .filter((product) => product.stock > 0)
              .slice(0, 4)
              .map<FeaturedProduct>((product) => ({
                name: product.name,
                price:
                  product.price && Number.isFinite(product.price)
                    ? formatter.format(product.price)
                    : 'Fiyat yakında',
                image:
                  product.images?.[0]?.url ??
                  item.categories[0]?.image ??
                  '/images/products/GREEN606.webp',
                slug: product.slug,
                categorySlug: product.categorySlug,
              }))

            return {
              ...item,
              featured: featuredProducts,
            }
          } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
              console.error(
                `[Header] Failed to load featured products for ${item.featuredCategory}`,
                error
              )
            }
            return item
          }
        })
      )

      if (!cancelled) {
        setMegaMenuItems(updatedItems)
      }
    }

    fetchFeaturedProducts()

    return () => {
      cancelled = true
    }
  }, [baseMegaMenuItems])

  const headerVariants = useMemo(
    () => ({
      expanded: {
        height: HEADER_EXPANDED_HEIGHT,
        borderRadius: 36,
        backgroundColor: isHomePage
          ? 'rgba(15, 16, 22, 0)'
          : isDark
            ? 'rgba(6, 7, 11, 0.88)'
            : 'rgba(10, 11, 15, 0.82)',
        boxShadow: isHomePage
          ? '0 20px 50px rgba(5, 6, 12, 0.28)'
          : '0 32px 90px rgba(10, 11, 15, 0.6)',
        borderColor: isHomePage ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
        backdropFilter: isHomePage ? 'blur(0px)' : 'blur(24px)',
        WebkitBackdropFilter: isHomePage ? 'blur(0px)' : 'blur(24px)',
        y: 0,
        scale: 1,
      },
      compact: {
        height: HEADER_COMPACT_HEIGHT,
        borderRadius: 28,
        backgroundColor: isDark ? 'rgba(5, 6, 10, 0.95)' : 'rgba(9, 10, 15, 0.93)',
        boxShadow: '0 28px 80px rgba(5, 6, 12, 0.55)',
        borderColor: 'rgba(255,255,255,0.14)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        y: -6,
        scale: 0.995,
      },
    }),
    [isDark, isHomePage]
  )

  const languageLabel = language === 'tr' ? 'TR' : 'EN'
  const shouldHideHeader = isProductDetailPage && isProductStickyActive

  return (
    <div className="relative">
      <div className="hidden lg:block fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div
          className={`mx-auto flex w-full max-w-[min(100rem,calc(100vw-3rem))] transform flex-col gap-4 px-6 pt-6 transition-all duration-300 ${
            shouldHideHeader ? 'pointer-events-none -translate-y-4 opacity-0' : 'pointer-events-auto translate-y-0 opacity-100'
          }`}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <motion.header
            variants={headerVariants}
            animate={headerAnimationState}
            initial={false}
            layout
            transition={{
              duration: 0.32,
              ease: [0.24, 0.8, 0.25, 1],
              backgroundColor: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              boxShadow: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              borderColor: { duration: 0.35, ease: 'easeOut' },
              scale: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
              y: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
            }}
            className={`relative flex w-full items-center justify-between overflow-visible border transition-[background,box-shadow,border-color,transform] duration-300 ${
              isStickyHeader ? 'backdrop-blur-2xl' : 'backdrop-blur-none'
            }`}
          >
            <div className="flex h-full flex-1 items-center justify-between gap-6 px-8">
              <Link href="/" className="flex items-center gap-3 text-white">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, rotate: -6 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  whileHover={{ scale: 1.04 }}
                  className="relative flex items-center"
                >
                  <Image
                    src="/images/kurumsal-logo/green-logo.svg"
                    alt="Green Planet"
                    width={isStickyHeader ? 128 : 164}
                    height={isStickyHeader ? 38 : 46}
                    className="h-auto w-auto max-h-12"
                    priority
                  />
                </motion.div>
              </Link>

              <nav className="relative hidden flex-1 items-center justify-center gap-1 md:flex">
                {megaMenuItems.map((item) => {
                  const isActive = activeMenuKey === item.name
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onMouseEnter={() => {
                        clearCloseTimer()
                        setActiveMenuKey(item.name)
                      }}
                      onMouseLeave={scheduleClose}
                      onFocus={() => setActiveMenuKey(item.name)}
                      className={`group relative flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span
                        className={`absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'group-hover:opacity-70'
                        }`}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="rounded-full border border-[#8dc63f]/40 bg-[#8dc63f]/15 p-2 text-[#8dc63f]">
                          {item.icon}
                        </span>
                        {item.name}
                      </span>
                    </Link>
                  )
                })}
              </nav>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <button
                    onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition-all duration-200 hover:border-white/20 hover:text-white"
                  >
                    <Globe className="h-4 w-4" />
                    {languageLabel}
                  </button>
                </div>

                <div className="hidden items-center gap-2 lg:flex">
                  <div
                    className="relative"
                    onMouseEnter={openContactPanel}
                    onMouseLeave={scheduleContactClose}
                    onFocusCapture={openContactPanel}
                    onBlurCapture={scheduleContactClose}
                  >
                    <a
                      href="tel:+902164733601"
                      className="relative z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/20 hover:text-white whitespace-nowrap"
                      aria-describedby="contact-quick-links"
                      aria-expanded={contactPanelOpen}
                    >
                      <Phone className="h-4 w-4" />
                      <span>
                        +90 216 <span className="text-[#8dc63f]">473 36</span> 01
                      </span>
                    </a>
                    <span
                      role="presentation"
                      aria-hidden="true"
                      className="absolute inset-x-0 top-full h-6"
                      onMouseEnter={openContactPanel}
                      onMouseLeave={scheduleContactClose}
                    />
                    <div
                      id="contact-quick-links"
                      className={`absolute right-0 top-full z-[200] mt-2 min-w-[244px] rounded-3xl border border-white/10 bg-[#11121a]/95 p-4 text-sm text-white/80 shadow-[0_20px_52px_rgba(10,11,18,0.55)] backdrop-blur-xl transition-all duration-200 ${
                        contactPanelOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-2 opacity-0'
                      }`}
                      onMouseEnter={openContactPanel}
                      onMouseLeave={scheduleContactClose}
                    >
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                        Green İletişim
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {contactLinks.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => {
                              setContactPanelOpen(false)
                              setActiveMenuKey(null)
                            }}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                            target={link.label === 'Konum' ? '_blank' : undefined}
                            rel={link.label === 'Konum' ? 'noopener noreferrer' : undefined}
                          >
                            <span className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#8dc63f]/40 bg-[#8dc63f]/15 text-[#8dc63f]">
                                {link.icon}
                              </span>
                              <span className="flex flex-col">
                                <span className="text-xs uppercase tracking-[0.2em] text-white/45">{link.label}</span>
                                <span className="text-sm font-semibold text-white/80">{link.description}</span>
                              </span>
                            </span>
                            <ChevronRight className="h-4 w-4 text-[#8dc63f]" />
                          </Link>
                        ))}
                        <Link
                          href="/iletisim"
                          onClick={() => {
                            setContactPanelOpen(false)
                            setActiveMenuKey(null)
                          }}
                          className="flex items-center justify-between gap-3 rounded-2xl bg-[#8dc63f]/15 px-4 py-3 text-white transition hover:bg-[#8dc63f]/20"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8dc63f]/25 text-[#8dc63f]">
                              <User className="h-4 w-4" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-xs uppercase tracking-[0.2em] text-[#8dc63f]">İletişim Sayfası</span>
                              <span className="text-sm font-semibold text-white">Bizimle iletişime geçin</span>
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 text-[#8dc63f]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/sepet"
                    className="group relative flex items-center gap-3 rounded-2xl border border-[#8dc63f]/25 bg-[#8dc63f]/10 px-4 py-2 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-[#8dc63f]/60 hover:bg-[#8dc63f]/20"
                  >
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#8dc63f]/40 bg-[#8dc63f]/15 text-[#8dc63f]">
                      <ShoppingCart className="h-4 w-4" />
                      {totalCount > 0 && (
                        <span className="absolute -top-2 -right-2 inline-flex min-w-[18px] items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-semibold text-[#0b140a]">
                          {totalCount > 99 ? '99+' : totalCount}
                        </span>
                      )}
                    </span>
                    Sepetim
                  </Link>
                  <Link
                    href="/giris"
                    className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-[#0f1016] transition-colors duration-200 hover:bg-white/90"
                  >
                    <User className="h-4 w-4" />
                    Hesabım
                  </Link>
                </div>
              </div>
            </div>

            <motion.span
              className="absolute bottom-0 left-8 right-8 h-px origin-left bg-gradient-to-r from-white/0 via-white/35 to-white/0"
              style={{ scaleX: Math.max(scrollProgress, isStickyHeader ? 0.12 : 0.05) }}
            />
          </motion.header>

          <AnimatePresence>
            {activeMenuItem && (
              <DesktopMegaPanel
                key={activeMenuItem.name}
                item={activeMenuItem}
                onMouseEnter={() => clearCloseTimer()}
                onMouseLeave={scheduleClose}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <header
        className={`lg:hidden transform transition-all duration-300 ${
          isProductDetailPage ? 'relative' : 'fixed inset-x-0 top-0'
        } ${shouldHideHeader ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 pointer-events-auto translate-y-0'} z-50 border-b border-white/10 bg-[#0f1016]/95 backdrop-blur-2xl`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <button
            onClick={() => {
              setActiveMenuKey(null)
              setMobileMenuOpen(true)
            }}
            className="rounded-full border border-[#8dc63f]/40 bg-[#8dc63f]/15 p-2 text-[#8dc63f]"
            aria-label="Menüyü aç"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/kurumsal-logo/green-logo.svg"
              alt="Green Planet"
              width={140}
              height={36}
              className="h-auto w-auto max-h-11"
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/sepet"
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[#8dc63f]/25 bg-[#8dc63f]/10 text-[#8dc63f]"
              aria-label="Sepet"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 inline-flex min-w-[16px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-[#0b140a]">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white"
            >
              {languageLabel}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 bg-[#04050a]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 py-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setActiveMenuKey(null)
                  }}
                  className="rounded-full border border-[#8dc63f]/40 bg-[#8dc63f]/15 p-2 text-[#8dc63f]"
                  aria-label="Menüyü kapat"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/55">
                  Menü
                </span>
                <a
                  href="tel:+902164733601"
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70"
                >
                  <Phone className="h-4 w-4" />
                  Ara
                </a>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-8">
                <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-white/70">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">Green Gaming Hub</p>
                  <p className="mt-2 text-base font-semibold text-white">
                    Green oyuncu topluluğu için seçilmiş hazır sistemler ve ekipmanlar.
                  </p>
                </div>

                <div className="space-y-4">
                  {megaMenuItems.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-3xl border border-white/10 bg-white/5"
                    >
                      <button
                        onClick={() =>
                          setActiveMenuKey((prev) => (prev === item.name ? null : item.name))
                        }
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="flex items-center gap-3">
                          <span className="rounded-2xl border border-[#8dc63f]/40 bg-[#8dc63f]/15 p-2 text-[#8dc63f]">
                            {item.icon}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-white">{item.name}</span>
                            <span className="block text-xs text-white/55">{item.description}</span>
                          </span>
                        </span>
                        <motion.span
                          animate={{ rotate: activeMenuKey === item.name ? 90 : 0 }}
                          className="text-[#8dc63f]"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {activeMenuKey === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                            className="space-y-4 px-5 pb-6"
                          >
                            <div className="grid gap-3 sm:grid-cols-2">
                              {item.categories.map((category) => (
                                <Link
                                  key={category.name}
                                  href={category.href}
                                  onClick={() => {
                                    setMobileMenuOpen(false)
                                    setActiveMenuKey(null)
                                  }}
                                  className="group relative overflow-hidden rounded-2xl border border-white/10"
                                >
                                  <div className="relative h-32">
                                    {category.image && (
                                      <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover"
                                      />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-4">
                                      <p className="text-sm font-semibold text-white">{category.name}</p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {item.featured.length > 0 ? (
                                item.featured.map((product) => (
                                  <Link
                                    key={product.slug}
                                    href={`/kategoriler/${product.categorySlug}/${product.slug}`}
                                    onClick={() => {
                                      setMobileMenuOpen(false)
                                      setActiveMenuKey(null)
                                    }}
                                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition-colors duration-200 hover:border-white/20"
                                  >
                                    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-white/5">
                                      <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-3"
                                      />
                                    </div>
                                    <p className="mt-3 text-sm font-semibold">{product.name}</p>
                                    <p className="text-xs text-white/60">{product.price}</p>
                                  </Link>
                                ))
                              ) : (
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
                                  Öne çıkan ürünler yükleniyor...
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href="mailto:info@green.net.tr"
                    className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white/70"
                  >
                    <Mail className="h-4 w-4" />
                    info@green.net.tr
                  </a>
                  <a
                    href="tel:+902164733601"
                    className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-white/70"
                  >
                    <Phone className="h-4 w-4" />
                    +90 216 473 36 01
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
