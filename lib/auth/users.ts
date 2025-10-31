import type { UserRole } from './types'

export interface AppUser {
  id: string
  email: string
  name: string
  role: UserRole
  passwordHash: string
}

export const users: AppUser[] = [
  {
    id: 'admin-001',
    email: 'admin@green.net.tr',
    name: 'Green Admin',
    role: 'admin',
    passwordHash: '$2a$12$zOanD22ECRbqX7U/suUKwOUWUSh9M84b8ValQxS2L13mE6J8xooF2'
  },
  {
    id: 'dealer-001',
    email: 'bayi@green.net.tr',
    name: 'Green Bayi',
    role: 'dealer',
    passwordHash: '$2a$12$Gdph3A0buN9nh9lhOW7Kl.uWcWnrnFILXToKMmQJSjBH1bdC8TXli'
  },
  {
    id: 'customer-001',
    email: 'musteri@green.net.tr',
    name: 'Green Müşteri',
    role: 'customer',
    passwordHash: '$2a$12$c3NAizEDUee3oIGDEhK.3Ouf9PGgC1CQ0D4gPL0qYm3W4xTxYhuLq'
  }
]

export const normalizeEmail = (email: string) => email.trim().toLowerCase()
