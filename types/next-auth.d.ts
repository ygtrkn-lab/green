import type { DefaultSession } from 'next-auth'
import type { UserRole } from '@/lib/auth/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      role?: UserRole
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole
  }
}
