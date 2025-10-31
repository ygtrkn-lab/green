'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const categoryHighlights = [
  {
    title: 'Gaming PC Koleksiyonları',
    description: 'NVIDIA GeForce RTX serileri ve özel sıvı soğutmalı Green build’leri tek panelden keşfedin.',
    accent: 'from-[#8dc63f]/40 via-[#6ea82a]/60 to-[#0f172a]/90'
  },
  {
    title: 'E-spor Aksesuarları',
    description: 'FPS odaklı mouse’lar, mekanik klavyeler ve turnuva kulaklıkları için stok durumunu takip edin.',
    accent: 'from-[#38bdf8]/35 via-[#0ea5e9]/55 to-[#0b1533]/90'
  },
  {
    title: 'Yayıncı Çözümleri',
    description: '4K capture kartları, yayın mikserleri ve RGB sahne ışıklarıyla stüdyo hazır kurulumlar.',
    accent: 'from-[#f97316]/35 via-[#fb923c]/55 to-[#1f2937]/90'
  },
  {
    title: 'Kurumsal Destek',
    description: 'ProSupport SLA, GreenCare garanti paketi ve hızlı değişim hizmetleriyle kesintisiz deneyim.',
    accent: 'from-[#6366f1]/35 via-[#4338ca]/55 to-[#0e1330]/90'
  }
]

export default function GirisClientPage() {
  const [showMobileModal, setShowMobileModal] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { status } = useSession()

  const callbackParam = searchParams?.get('callbackUrl') ?? null
  const safeCallbackUrl = useMemo(() => {
    if (!callbackParam) {
      return '/dashboard'
    }

    if (!callbackParam.startsWith('/') || callbackParam.startsWith('//')) {
      return '/dashboard'
    }

    return callbackParam
  }, [callbackParam])

  const queryError = searchParams?.get('error') ?? null

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) {
      setShowMobileModal(true)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = showMobileModal ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showMobileModal])

  useEffect(() => {
    if (!queryError) return

    const errorMap: Record<string, string> = {
      CredentialsSignin: 'E-posta veya şifre doğrulanamadı. Lütfen bilgilerinizi kontrol edin.',
      AccessDenied: 'Bu alana erişim yetkiniz bulunmuyor. Doğru hesapla giriş yapmayı deneyin.'
    }

    setFormError(errorMap[queryError] ?? 'Giriş işlemi sırasında bir hata oluştu.')
  }, [queryError])

  useEffect(() => {
    if (status !== 'authenticated') return
    router.replace(safeCallbackUrl)
  }, [status, router, safeCallbackUrl])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')

    if (!email || !password) {
      setFormError('Lütfen e-posta ve şifre alanlarını doldurun.')
      return
    }

    try {
      setIsSubmitting(true)
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: safeCallbackUrl
      })

      if (result?.error) {
        setFormError('E-posta veya şifre doğrulanamadı. Lütfen bilgilerinizi kontrol edin.')
        return
      }

      router.replace(result?.url ?? safeCallbackUrl)
    } catch (error) {
      console.error('Login error', error)
      setFormError('Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/videos/giris/giris-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/55 to-[#061429]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(76,201,240,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-12 pt-24 sm:px-10 md:px-16 lg:px-24">
        {showMobileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
            <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-3xl">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Image src="/images/kurumsal-logo/green-logo.svg" alt="Green" width={96} height={32} className="h-6 w-auto" />
              </div>
              <h2 className="text-xl font-light text-white">Mobil giriş başlangıç</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Sipariş özetlerinizi, ödeme durumlarınızı ve kargo bildirimlerinizi görüntülemeden önce hesabınıza güvenle bağlanın.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-white/60">
                <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">Sipariş geçmişi ve iade kayıtları</span>
                <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">Ödeme dekontları ve taksit detayları</span>
                <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">Canlı kargo takip bağlantıları</span>
              </div>
              <button
                onClick={() => setShowMobileModal(false)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#8dc63f] via-[#7ab32f] to-[#5a8c1d] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
              >
                Portala devam et
              </button>
            </div>
          </div>
        )}

        <header>
          <Link href="/" className="text-sm uppercase tracking-[0.38em] text-white/70">
            Green
          </Link>
          <Link
            href="/kategoriler"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium tracking-wide text-white/80 transition hover:border-white/25 hover:bg-white/10"
          >
            Ürün kataloğu
          </Link>
        </header>

        <div className="flex flex-1 flex-col items-stretch gap-16 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-24">
          <div className="max-w-xl space-y-10">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                Green müşteri portalı
              </span>
              <h1 className="text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
                Hesabınızı yönetin, sipariş ve ödemeleri takip edin.
              </h1>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                Green platformu, yüksek çözünürlüklü ekranlara hazır, tamamen responsive ve detaylı bir giriş akışı sunar. Gaming PC
                konfigürasyonlarından yayıncı ekipmanlarına kadar tüm siparişlerinizi tek panelde görüntüleyin, ödeme geçmişinizi kontrol
                edin, kargo süreçlerini canlı izleyin ve servis bildirimlerini kaçırmadan güncel kalın.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-6 text-sm text-white/60 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">Ürün koleksiyonu</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">1200+</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">Aktif kampanya</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">38</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">Teslimat takibi</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">Canlı</dd>
              </div>
            </dl>
          </div>

          <div className="w-full max-w-md">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                {formError && (
                  <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {formError}
                  </div>
                )}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Kurumsal e-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@green.com"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Şifre
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#8dc63f]" />
                    <span>Oturumu açık tut</span>
                  </label>
                  <Link href="/sifremi-unuttum" className="underline decoration-white/30 transition hover:decoration-white">
                    Şifremi unuttum
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#8dc63f] via-[#7ab32f] to-[#5a8c1d] px-6 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-black shadow-[0_18px_40px_rgba(141,198,63,0.45)] transition hover:shadow-[0_22px_60px_rgba(141,198,63,0.55)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Giriş yapılıyor…' : 'Green ile giriş yap'}
                </button>
              </form>

              <div className="mt-8 space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">Hızlı giriş</p>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white px-5 py-4 text-sm font-medium text-slate-900 transition hover:border-white/30 hover:bg-white/90"
                >
                  <span className="flex h-6 w-6 items-center justify-center">
                    <svg className="h-5 w-5" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M17.64 9.2045c0-.6395-.0573-1.2527-.1636-1.8386H9v3.4766h4.8436c-.2092 1.128-.845 2.0848-1.8008 2.7224v2.2626h2.9082c1.7018-1.5672 2.688-3.8743 2.688-6.6229Z" fill="#4285F4" />
                      <path d="M9 18c2.43 0 4.4679-.8063 5.9574-2.1724l-2.9082-2.2626c-.8063.54-1.8374.8591-3.0492.8591-2.3455 0-4.329-1.5837-5.0366-3.7109H.957031v2.3313C2.4375 15.9827 5.481 18 9 18Z" fill="#34A853" />
                      <path d="M3.96338 10.7132c-.181-.54-.2842-1.1169-.2842-1.7132s.1032-1.1732.2842-1.7132V4.95557H.957031C.347789 6.17457 0 7.54738 0 9c0 1.4526.347789 2.8254.957031 4.0444l3.006349-2.3312Z" fill="#FBBC04" />
                      <path d="M9 3.57955c1.3215 0 2.5061.45436 3.4378 1.34627l2.5785-2.57846C13.464 1.0457 11.427 0 9 0 5.481 0 2.4375 2.01727.957031 4.95557l3.006349 2.33113C4.671 5.16327 6.6545 3.57955 9 3.57955Z" fill="#EA4335" />
                    </svg>
                  </span>
                  <span>Google ile oturum aç</span>
                </button>

                <Link
                  href="/kayit"
                  className="block w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/20"
                >
                  Hesabın yok mu? Kayıt ol
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="relative border-t border-white/10 py-14">
          <div className="grid gap-8 lg:grid-cols-4">
            {categoryHighlights.map(({ title, description, accent }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition hover:border-white/25 hover:bg-white/10"
              >
                <div className={`absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-70 bg-gradient-to-br ${accent}`} />
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{description}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.3em] text-white/50">Kişiselleştirilmiş öneriler</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
