import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { DASHBOARD_ROUTE_BY_ROLE } from './constants'
import type { UserRole } from './types'
import { normalizeEmail, users } from './users'
import { AUTH_SECRET } from './config'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'E-posta ile giriş',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const email = normalizeEmail(credentials.email)
        const user = users.find((candidate) => candidate.email === email)
        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  pages: {
    signIn: '/giris'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: UserRole }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id
        session.user.role = token.role as UserRole | undefined
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      if (url.startsWith(baseUrl)) {
        return url
      }

      return baseUrl
    }
  },
  secret: AUTH_SECRET
}

export const getDashboardRouteForRole = (role: UserRole | undefined) => {
  if (!role) {
    return '/giris'
  }

  return DASHBOARD_ROUTE_BY_ROLE[role]
}
