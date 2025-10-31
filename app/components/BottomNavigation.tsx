'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Grid3X3,
  User,
  Zap,
  ShieldCheck,
  ShoppingCart
} from 'lucide-react'
import { useCart } from '../context/CartContext'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

const BottomNavigation = () => {
  const pathname = usePathname()
  const { totalCount } = useCart()

  const navItems = useMemo<NavItem[]>(() => [
    {
      id: 'home',
      label: 'Ana Sayfa',
      href: '/',
      icon: Home
    },
    {
      id: 'categories',
      label: 'Kategoriler',
      href: '/kategoriler',
      icon: Grid3X3
    },
    {
      id: 'deals',
      label: 'Fırsatlar',
      href: '/#flash-deals',
      icon: Zap
    },
    {
      id: 'compare',
      label: 'Karşılaştır',
      href: '/karsilastirma',
      icon: ShieldCheck
    },
    {
      id: 'cart',
      label: 'Sepet',
      href: '/sepet',
      icon: ShoppingCart,
      badge: totalCount || undefined
    },
    {
      id: 'account',
      label: 'Hesabım',
      href: '/giris',
      icon: User
    }
  ], [totalCount])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    if (href.includes('#')) {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-xl px-4 pb-4">
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/95 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="absolute inset-x-8 -top-10 h-20 rounded-full bg-gradient-to-b from-white via-white/80 to-transparent blur-2xl" aria-hidden="true" />
          <div className="relative grid grid-cols-6">
            {navItems.map(({ id, label, href, icon: Icon, badge }) => {
              const active = isActive(href)

              return (
                <Link
                  key={id}
                  href={href}
                  className={`group flex flex-col items-center gap-1.5 px-2 py-3 text-[11px] font-medium transition-colors ${
                    active ? 'text-[#8dc63f]' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${
                      active
                        ? 'border-[#8dc63f]/60 bg-[#f6fbec] shadow-[0_8px_26px_rgba(141,198,63,0.22)]'
                        : 'border-black/5 bg-white group-hover:border-[#8dc63f]/60 group-hover:bg-[#f6fbec]'
                    }`}
                  >
                    <Icon className={`h-5 w-5 transition-transform ${active ? 'scale-105' : 'scale-100'}`} />
                    {badge && (
                      <span className="absolute -top-1.5 -right-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#8dc63f] px-1.5 text-[10px] font-semibold text-black">
                        {badge > 99 ? '99+' : badge}
                      </span>
                    )}
                  </span>
                  <span>{label}</span>
                  {active && <span className="h-1 w-6 rounded-full bg-[#8dc63f]" />}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default BottomNavigation
