'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  BarChart3,
  Bell,
  Database,
  LayoutDashboard,
  Layers,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Workflow
} from 'lucide-react'
import SignOutButton from '../../components/SignOutButton'

type ThemeMode = 'light' | 'dark'

interface ThemeTokens {
  background: string
  sidebar: string
  header: string
  card: string
  muted: string
  accent: string
  accentSoft: string
  badge: string
  input: string
  glow: string
}

const TOKENS_BY_THEME: Record<ThemeMode, ThemeTokens> = {
  light: {
    background: 'bg-slate-100 text-slate-900',
    sidebar:
      'bg-white/95 border border-slate-200 text-slate-900 shadow-[0_20px_60px_rgba(148,163,184,0.25)] backdrop-blur-xl',
    header: 'bg-white/85 border-b border-slate-200 text-slate-900 backdrop-blur-xl',
    card: 'border border-slate-200 bg-white text-slate-900 shadow-[0_20px_60px_rgba(148,163,184,0.18)]',
    muted: 'text-slate-500',
    accent: 'border border-slate-900/10 bg-slate-900 text-white shadow-[0_24px_80px_rgba(15,23,42,0.25)]',
    accentSoft:
      'border border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-800',
    badge: 'border border-slate-200 bg-slate-100 text-slate-700',
    input: 'border border-slate-200 bg-slate-100 text-slate-900 placeholder:text-slate-400',
    glow: 'shadow-[0_28px_90px_rgba(148,163,184,0.35)]'
  },
  dark: {
    background: 'bg-[#050b1a] text-white',
    sidebar: 'bg-[#0b1326]/95 border border-white/10 text-white shadow-[0_40px_120px_rgba(6,19,61,0.65)] backdrop-blur-xl',
    header: 'bg-[#0f1d3a]/85 border-b border-white/10 text-white backdrop-blur-xl',
    card: 'border border-white/10 bg-white/5 text-white backdrop-blur-xl',
    muted: 'text-white/60',
    accent: 'border border-emerald-400/30 bg-emerald-500 text-black shadow-[0_34px_90px_rgba(16,185,129,0.35)]',
    accentSoft:
      'border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white',
    badge: 'border border-white/10 bg-white/10 text-white/80',
    input: 'border border-white/10 bg-white/5 text-white placeholder:text-white/50',
    glow: 'shadow-[0_36px_120px_rgba(13,148,136,0.35)]'
  }
}

interface AdminThemeContextValue {
  theme: ThemeMode
  tokens: ThemeTokens
  toggleTheme: () => void
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null)

export const useAdminTheme = () => {
  const value = useContext(AdminThemeContext)
  if (!value) {
    throw new Error('useAdminTheme must be used inside AdminDashboardShell')
  }
  return value
}

const NAV_ITEMS = [
  { label: 'Kontrol paneli', icon: LayoutDashboard, href: '/dashboard/admin' },
  { label: 'Operasyon akışı', icon: Workflow, href: '/dashboard/admin/operations' },
  { label: 'Sipariş segmentleri', icon: Layers, href: '/dashboard/admin/orders' },
  { label: 'Servis ve ekipman', icon: ShieldCheck, href: '/dashboard/admin/support' },
  { label: 'Kullanıcı yönetimi', icon: Users, href: '/dashboard/admin/users' },
  { label: 'Analitik ve rapor', icon: BarChart3, href: '/dashboard/admin/analytics' },
  { label: 'Altyapı & API', icon: Database, href: '/dashboard/admin/infrastructure' },
  { label: 'Otomasyon kuralları', icon: Activity, href: '/dashboard/admin/automation' },
  { label: 'Panel ayarları', icon: Settings, href: '/dashboard/admin/settings' }
]

interface AdminDashboardShellProps {
  children: React.ReactNode
  userName: string
}

export default function AdminDashboardShell({ children, userName }: AdminDashboardShellProps) {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedTheme = window.localStorage.getItem('admin-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('admin-theme', theme)
  }, [theme])

  const tokens = useMemo(() => TOKENS_BY_THEME[theme], [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <AdminThemeContext.Provider value={{ theme, tokens, toggleTheme }}>
      <div className={`flex min-h-screen w-full transition-colors duration-500 ${tokens.background}`}>
        <aside className={`hidden w-72 flex-col gap-10 px-6 py-8 lg:flex ${tokens.sidebar}`}>
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              Green Admin
            </span>
            <div className="space-y-1">
              <p className="text-sm font-medium uppercase tracking-[0.4em] text-emerald-200/80">Secure Core</p>
              <h2 className="text-2xl font-semibold">Kontrol Merkezi</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href
              const baseClasses = 'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition'

              return isActive ? (
                <div key={label} className={`${baseClasses} ${tokens.accent}`}>
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                  <Sparkles className="h-4 w-4 opacity-80" />
                </div>
              ) : (
                <Link key={label} href={href} className={`${baseClasses} ${tokens.accentSoft}`}>
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                  <Workflow className="h-4 w-4 opacity-30" />
                </Link>
              )
            })}
          </nav>

          <div className={`mt-auto space-y-3 rounded-2xl p-5 ${tokens.card}`}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 p-2" />
              <div>
                <p className="text-sm font-semibold">Yüksek güvenlik modu</p>
                <p className={`text-xs ${tokens.muted}`}>2FA ve Zero Trust aktif durumda</p>
              </div>
            </div>
            <div className="grid gap-2 text-xs">
              <span className={`rounded-xl px-3 py-2 ${tokens.badge}`}>Canlı izleme: Aktif</span>
              <span className={`rounded-xl px-3 py-2 ${tokens.badge}`}>Olay günlüğü: 12 yeni kayıt</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${tokens.muted}`}>Çıkış yap</span>
              <SignOutButton variant="ghost" className={`px-4 py-2 text-xs font-semibold ${tokens.accentSoft}`} />
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <AdminHeader userName={userName} />
          <main className="flex-1 overflow-y-auto px-6 py-10">
            <div className="mx-auto max-w-6xl space-y-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminThemeContext.Provider>
  )
}

function AdminHeader({ userName }: { userName: string }) {
  const { theme, tokens, toggleTheme } = useAdminTheme()

  return (
    <header className={`border-b px-6 py-6 transition-colors duration-500 ${tokens.header}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className={`text-xs uppercase tracking-[0.36em] ${tokens.muted}`}>Apple level Ops UI</p>
          <h1 className="text-3xl font-semibold leading-tight">
            Merhaba {userName}, altyapı dengeleri stabil.
          </h1>
          <p className={`max-w-xl text-sm ${tokens.muted}`}>
            Dağıtımlar, servis SLA&apos;ları ve gerçek zamanlı güvenlik olaylarını tek panelde takip edin. Tema geçişiyle gece ve gündüz
            operasyonlarında aynı hızda kalın.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <HeaderSearch tokens={tokens} />
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${tokens.accentSoft}`}
            aria-label="Tema değiştir"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === 'dark' ? 'Açık tema' : 'Koyu tema'}
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${tokens.accentSoft}`}
          >
            <Bell className="h-4 w-4" />
            Uyarılar
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${tokens.accent}`}
          >
            <Layers className="h-4 w-4" />
            Yeni görev
          </button>
        </div>
      </div>
    </header>
  )
}

function HeaderSearch({ tokens }: { tokens: ThemeTokens }) {
  return (
    <label className={`hidden items-center gap-3 rounded-2xl px-4 py-2 text-sm font-medium transition md:flex ${tokens.input}`}>
      <Search className="h-4 w-4" />
      <span className="sr-only">Panel içinde ara</span>
      <input
        type="search"
        placeholder="Komut yazın veya arayın (⌘K)"
        className="w-48 bg-transparent text-sm outline-none"
      />
    </label>
  )
}
