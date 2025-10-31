import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions, getDashboardRouteForRole } from '@/lib/auth/options'

const dealerHighlights = [
  {
    title: 'Bekleyen teklif',
    value: '5',
    detail: 'Onay bekleyen bayi teklifleri'
  },
  {
    title: 'Anlık stok',
    value: '412',
    detail: 'Tüm konfigürasyonlardaki toplam stok'
  },
  {
    title: 'Servis SLA',
    value: '96%',
    detail: '48 saat içinde kapanan talepler'
  }
]

const priorityOrders = [
  {
    code: 'BY-2298',
    config: 'Green Nova i7 - RTX 4070',
    status: 'Üretimde',
    eta: '72 saat'
  },
  {
    code: 'BY-2295',
    config: 'Green Flux R9 - RX 7900 XTX',
    status: 'Parça bekliyor',
    eta: '96 saat'
  },
  {
    code: 'BY-2287',
    config: 'Green Stream Studio - i9',
    status: 'Kargoya Hazırlanıyor',
    eta: '24 saat'
  }
]

export default async function DealerDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.role) {
    redirect('/giris?callbackUrl=/dashboard/dealer')
  }

  if (session.user.role !== 'dealer') {
    redirect(getDashboardRouteForRole(session.user.role))
  }

  return (
    <section className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        {dealerHighlights.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-slate-900/40 p-6 backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-white/60">{item.title}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-white/60">{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr,2fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold text-white">Öncelikli siparişler</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.26em] text-white/40">
                <tr>
                  <th className="px-4 py-3">Sipariş</th>
                  <th className="px-4 py-3">Konfigürasyon</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3">ETA</th>
                </tr>
              </thead>
              <tbody>
                {priorityOrders.map((order) => (
                  <tr key={order.code} className="border-b border-white/5 bg-white/[0.03] last:border-b-0">
                    <td className="px-4 py-3 font-semibold text-white">{order.code}</td>
                    <td className="px-4 py-3">{order.config}</td>
                    <td className="px-4 py-3 text-emerald-300">{order.status}</td>
                    <td className="px-4 py-3">{order.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-cyan-500/10 to-emerald-500/10 p-8">
          <h2 className="text-xl font-semibold text-white">Bayi iletişim ağı</h2>
          <p className="mt-4 text-sm text-white/60">
            Donanım sevkiyat hızları, fiyat güncellemeleri ve garanti süreçleri için özel bayi destek hattı 7/24 aktiftir.
          </p>
          <div className="mt-6 space-y-4 text-sm text-white">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Sıcak hat</p>
              <p className="mt-2 font-semibold">0 (216) 000 00 00 - Bayi 2. seviye</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Lojistik paneli</p>
              <p className="mt-2 font-semibold">Sevkiyat dalgası: 02:00 / 14:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
