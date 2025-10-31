import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions, getDashboardRouteForRole } from '@/lib/auth/options'

export default async function DashboardIndex() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    redirect('/giris?callbackUrl=/dashboard')
  }

  const targetRoute = getDashboardRouteForRole(session.user.role)
  redirect(targetRoute)
}
