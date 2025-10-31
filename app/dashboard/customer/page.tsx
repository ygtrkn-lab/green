import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions, getDashboardRouteForRole } from '@/lib/auth/options'

const customerMetrics = [
  {
    title: 'Açık sipariş',
    value: '3',
    detail: 'Kargoya hazırlanan siparişler'
  },
  {
    title: 'Teslim edilen',
    value: '18',
    detail: 'Son 30 günlük teslimatlar'
  },
  {
    title: 'Aktif destek kaydı',
    value: '1',
    detail: 'Servis takibi bekleyen vaka'
  }
]

const quickActions = [
  'Sipariş durumunu takip et',
  'Fatura ve ödeme dekontlarını indir',
  'Servis kaydı aç',
  'Garanti durumunu görüntüle'
]

export default async function CustomerDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    redirect('/giris?callbackUrl=/dashboard/customer')
  }

  if (session.user.role !== 'customer') {
    redirect(getDashboardRouteForRole(session.user.role))
  }

  return (
    <section className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        {customerMetrics.map((metric) => (
          <article
            key={metric.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(3,7,18,0.35)] backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">{metric.title}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-2 text-sm text-white/60">{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-emerald-400/10 to-sky-500/10 p-8">
          <h2 className="text-xl font-semibold text-white">Hızlı işlemler</h2>
          <ul className="mt-6 space-y-4 text-sm text-white/70">
            {quickActions.map((action) => (
              <li key={action} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-xs uppercase tracking-[0.26em] text-emerald-200">
                  GO
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Teslimat izleme</h2>
          <p className="mt-4 text-sm text-white/60">
            RTX 4080 Gamer Build siparişiniz paketleme aşamasında. Tahmini kargo çıkış süresi <strong className="text-white">36 saat</strong>.
            Güncellemeler SMS ve e-posta ile anlık gönderilecektir.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-white/70">
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4">
              <span className="block text-xs uppercase tracking-[0.3em] text-emerald-200">KARGO NO</span>
              <span className="mt-1 block font-semibold text-white">GRN-458221</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <span className="block text-xs uppercase tracking-[0.3em] text-white/50">Teslimat penceresi</span>
              <span className="mt-1 block font-semibold text-white">02-04 Mart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
