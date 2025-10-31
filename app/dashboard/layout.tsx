import type { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth/options'
import { DASHBOARD_ROUTE_BY_ROLE } from '@/lib/auth/constants'
import type { UserRole } from '@/lib/auth/types'
import SignOutButton from './components/SignOutButton'

const ROLE_LABELS: Record<UserRole, string> = {
  customer: 'Müşteri Paneli',
  dealer: 'Bayi Paneli',
  admin: 'Admin Paneli'
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    redirect('/giris?callbackUrl=/dashboard')
  }

  const currentRole = session.user.role
  if (currentRole === 'admin') {
    return <div className="min-h-screen">{children}</div>
  }
  const navItems = (Object.entries(DASHBOARD_ROUTE_BY_ROLE) as Array<[UserRole, string]>).map(([role]) => ({
    role,
    label: ROLE_LABELS[role]
  }))

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <header className="border-b border-white/10 bg-[#071127]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.28em] text-white/50">Green korumalı alan</span>
            <h1 className="text-2xl font-semibold text-white">
              Hoş geldiniz, {session.user.name ?? 'Green üyesi'}
            </h1>
            <p className="text-sm text-white/60">
              Güvenli panel üzerinden sipariş akışlarını, stok güncellemelerini ve servis bildirimlerini yönetebilirsiniz.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
              {ROLE_LABELS[currentRole]}
            </span>
            <SignOutButton />
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6 pb-6 text-sm">
          {navItems.map(({ role, label }) => {
            const isActive = role === currentRole
            return isActive ? (
              <span
                key={role}
                className="rounded-2xl border border-white px-5 py-2 font-medium text-black bg-white shadow-[0_12px_40px_rgba(15,215,120,0.25)]"
              >
                {label}
              </span>
            ) : (
              <span
                key={role}
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2 text-white/40"
              >
                Kilitli ({label})
              </span>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>
    </div>
  )
}
