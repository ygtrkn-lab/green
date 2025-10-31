const DEFAULT_SECRET = 'development-nextauth-secret-change-me'
const DEFAULT_URL = 'http://localhost:3000'

export const AUTH_SECRET = process.env.NEXTAUTH_SECRET ?? DEFAULT_SECRET
export const AUTH_URL = process.env.NEXTAUTH_URL ?? DEFAULT_URL

const isUsingFallbackSecret = !process.env.NEXTAUTH_SECRET
if (isUsingFallbackSecret && process.env.NODE_ENV !== 'production') {
  console.warn('NextAuth: using fallback development secret. Set NEXTAUTH_SECRET for production deployments.')
}
