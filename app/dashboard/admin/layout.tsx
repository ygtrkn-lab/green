import type { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions, getDashboardRouteForRole } from '@/lib/auth/options'
import AdminDashboardShell from './components/AdminDashboardShell'

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    redirect('/giris?callbackUrl=/dashboard/admin')
  }

  if (session.user.role !== 'admin') {
    redirect(getDashboardRouteForRole(session.user.role))
  }

  return <AdminDashboardShell userName={session.user.name ?? 'Green Admin'}>{children}</AdminDashboardShell>
}
