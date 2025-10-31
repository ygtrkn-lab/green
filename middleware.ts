import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { DASHBOARD_ROUTE_BY_ROLE } from '@/lib/auth/constants'
import type { UserRole } from '@/lib/auth/types'
import { AUTH_SECRET } from '@/lib/auth/config'

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req
    const token = nextauth.token
    const { pathname, search } = nextUrl

    if (!token?.role) {
      const signInUrl = new URL('/giris', req.url)
      const callbackUrl = `${pathname}${search}`
      signInUrl.searchParams.set('callbackUrl', callbackUrl)
      return NextResponse.redirect(signInUrl)
    }

    const role = token.role as UserRole
    const expectedRoute = DASHBOARD_ROUTE_BY_ROLE[role]

    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      return NextResponse.redirect(new URL(expectedRoute, req.url))
    }

    if (!pathname.startsWith(expectedRoute)) {
      return NextResponse.redirect(new URL(expectedRoute, req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    secret: AUTH_SECRET
  }
)

export const config = {
  matcher: ['/dashboard/:path*']
}
