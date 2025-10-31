'use client'

import { signOut } from 'next-auth/react'

interface SignOutButtonProps {
  variant?: 'outline' | 'ghost'
  className?: string
}

export default function SignOutButton({ variant = 'outline', className }: SignOutButtonProps) {
  const baseClasses = 'rounded-2xl px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-300/40'

  const variantClasses =
    variant === 'outline'
      ? 'border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10'
      : 'text-white/70 hover:text-white'

  const composedClassName = [baseClasses, variantClasses, className].filter(Boolean).join(' ')

  return (
    <button type="button" onClick={() => signOut({ callbackUrl: '/giris' })} className={composedClassName}>
      Oturumu kapat
    </button>
  )
}
