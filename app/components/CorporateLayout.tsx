import { ReactNode } from 'react'
import { Calendar } from 'lucide-react'

interface CorporateLayoutProps {
  title: string
  subtitle: string
  heroImage: string
  heroBadge?: string
  lastUpdatedLabel?: string
  children: ReactNode
}

const CorporateLayout = ({
  title,
  subtitle,
  heroImage,
  heroBadge = 'Kurumsal Bilgi',
  lastUpdatedLabel,
  children
}: CorporateLayoutProps) => {
  const formattedDate = lastUpdatedLabel ?? new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-20 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-40 top-24 h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-[60%] h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="relative isolate overflow-hidden rounded-[36px] border border-white/10 bg-slate-950 text-white shadow-[0_40px_120px_-60px_rgba(15,23,42,0.65)]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-95" />
            <div
              className="absolute inset-y-0 right-0 w-2/3 opacity-45"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className="absolute -right-24 top-16 h-60 w-60 rounded-full bg-primary/40 blur-[120px]" />
            <div className="absolute -left-20 bottom-10 h-52 w-52 rounded-full bg-blue-500/30 blur-[120px]" />
          </div>

          <div className="relative grid gap-12 p-10 md:p-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
                {heroBadge}
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-base text-white/70 md:text-lg">
                  {subtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <Calendar className="h-4 w-4" />
                  <span>Güncellendi: {formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="relative mt-4 h-72 overflow-hidden rounded-[28px] bg-white/5 backdrop-blur sm:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                <span className="rounded-full bg-white/10 px-4 py-2">Green Planet Gaming</span>
                <span className="rounded-full bg-white/10 px-4 py-2">Kurumsal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-16 grid gap-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CorporateLayout
