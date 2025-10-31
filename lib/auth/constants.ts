import type { UserRole } from './types'

export const DASHBOARD_ROUTE_BY_ROLE: Record<UserRole, string> = {
  customer: '/dashboard/customer',
  dealer: '/dashboard/dealer',
  admin: '/dashboard/admin'
}
