'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const recoveryHighlights = [
  {
    title: 'Sipariş erişimi',
    description: 'Bekleyen teslimatlarınızı görüntüleyin ve kargo takip bağlantılarını yeniden aktive edin.',
    accent: 'from-[#8dc63f]/40 via-[#6ea82a]/60 to-[#0f172a]/90'
  },
  {
    title: 'Ödeme güvenliği',
    description: 'Kaydedilmiş kartlarınızı koruyun ve taksit ödemelerini gecikmeden yönetin.',
    accent: 'from-[#38bdf8]/35 via-[#0ea5e9]/55 to-[#0b1533]/90'
  },
  {
    title: 'GreenCare desteği',
    description: 'Garanti taleplerinizi, onarım süreçlerini ve servis randevularını aynı panelden takip edin.',
    accent: 'from-[#f97316]/35 via-[#fb923c]/55 to-[#1f2937]/90'
  },
  {
    title: 'Çok faktörlü giriş',
    description: 'SMS doğrulama ve e-posta güvenlik kodlarıyla hesabınızı anında güvence altına alın.',
    accent: 'from-[#6366f1]/35 via-[#4338ca]/55 to-[#0e1330]/90'
  }
]

export default function ResetPasswordClientPage() {
  const [showMobileModal, setShowMobileModal] = useState(false)

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
              <h2 className="text-xl font-light text-white">Mobil şifre sıfırlama</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Hesabınızı korumak için doğrulama adımlarını tamamlayın. Sipariş ve ödeme erişiminiz kısa sürede yeniden açılacak.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-white/60">
                <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">E-posta doğrulama bağlantısı</span>
                <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">SMS güvenlik kodu desteği</span>
                <span className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3">GreenCare canlı destek yönlendirmesi</span>
              </div>
              <button
                onClick={() => setShowMobileModal(false)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#8dc63f] via-[#7ab32f] to-[#5a8c1d] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black"
              >
                Sıfırlamaya devam et
              </button>
            </div>
          </div>
        )}

        <header className="flex items-center justify-between gap-4">
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
                Şifre sıfırlama merkezi
              </span>
              <h1 className="text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
                Hesabınızı güvenli şekilde yeniden etkinleştirin.
              </h1>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                E-posta adresinizi girerek şifre sıfırlama bağlantısı talep edin. Kod doğrulaması ve yeni şifre oluşturma adımlarını
                tamamlayarak sipariş geçmişi, ödeme kayıtları ve kargo bildirimlerinize yeniden erişin.
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-6 text-sm text-white/60 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">Doğrulama süresi</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">2 dk</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">Destek kanalı</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">7/24</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">Güvenlik seviyesi</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">MFA</dd>
              </div>
            </dl>
          </div>

          <div className="w-full max-w-md">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
              <form className="space-y-6" action="#" method="post">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Kayıtlı e-posta
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
                  <label htmlFor="recoveryMethod" className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Bildirim tercihi
                  </label>
                  <select
                    id="recoveryMethod"
                    name="recoveryMethod"
                    className="w-full appearance-none rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    defaultValue="email"
                  >
                    <option value="email" className="text-slate-900">E-posta bağlantısı</option>
                    <option value="sms" className="text-slate-900">SMS doğrulama kodu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Destek ekibi için not (isteğe bağlı)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Teslimat numarası veya sipariş bilgisi ekleyebilirsiniz"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-[#8dc63f] via-[#7ab32f] to-[#5a8c1d] px-6 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-black shadow-[0_18px_40px_rgba(141,198,63,0.45)] transition hover:shadow-[0_22px_60px_rgba(141,198,63,0.55)]"
                >
                  Şifre sıfırlama bağlantısı gönder
                </button>
              </form>

              <div className="mt-8 space-y-3 text-center text-xs text-white/60">
                <p>Oturum bilgilerinizi hatırladınız mı? <Link href="/giris" className="underline decoration-white/30 transition hover:decoration-white">Giriş sayfasına dön</Link></p>
                <p>Hâlâ erişemiyor musunuz? <Link href="/iletisim" className="underline decoration-white/30 transition hover:decoration-white">Green destek ekibine ulaşın</Link></p>
              </div>
            </div>
          </div>
        </div>

        <section className="relative border-t border-white/10 py-14">
          <div className="grid gap-8 lg:grid-cols-4">
            {recoveryHighlights.map(({ title, description, accent }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition hover:border-white/25 hover:bg-white/10"
              >
                <div className={`absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-70 bg-gradient-to-br ${accent}`} />
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{description}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.3em] text-white/50">Hesap güvenliği</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
