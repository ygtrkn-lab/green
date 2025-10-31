'use client'

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Lock,
  Radar,
  Server,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react'
import { useAdminTheme } from './components/AdminDashboardShell'

const systemMetrics = [
  {
    title: 'Aktif oturum',
    value: '28',
    change: '+12% artış',
    detail: '13 müşteri · 9 bayi · 6 admin',
  icon: Users
  },
  {
    title: 'API yanıt süresi',
    value: '182 ms',
    change: '-18% daha hızlı',
    detail: 'Son 15 dakikanın ortalaması',
    icon: Server
  },
  {
    title: 'Firewall blokları',
    value: '12',
    change: '+3 kritik olay',
    detail: 'Zero Trust katmanı aktif',
    icon: ShieldAlert
  }
]

const deploymentPipeline = [
  {
    name: 'Dağıtım kanalı',
    detail: 'GreenOS 2.4.1 - staging',
    status: 'Paketleniyor',
    trend: 'ETA 38 dk',
    icon: Activity
  },
  {
    name: 'Kubernetes akışı',
    detail: 'GPU iş yükleri · 4 düğüm',
    status: 'Rolling update',
    trend: 'Canlı trafik %62',
    icon: Cpu
  },
  {
    name: 'Servis otomasyonları',
    detail: 'Webhook & SLA tetikleyicileri',
    status: 'Tamamlandı',
    trend: 'Son doğrulama 8 dk önce',
    icon: CheckCircle2
  }
]

const securityEvents = [
  {
    time: '08:24',
    event: 'Dealer API token yenilendi',
    status: 'Başarılı',
    intent: 'Otomatik yenileme'
  },
  {
    time: '07:58',
    event: '2FA doğrulaması',
    status: 'Onaylandı',
    intent: 'Admin panel girişi'
  },
  {
    time: '07:41',
    event: 'Yüksek riskli IP engellendi',
    status: 'Firewall',
    intent: 'Zero Trust policy'
  }
]

const customerImpact = [
  {
    title: 'Servis SLA',
    value: '96%',
    description: '48 saat içinde kapanan talepler',
    badge: 'SLA 48h'
  },
  {
    title: 'Memnuniyet skoru',
    value: '4.8',
    description: 'Son 500 değerlendirme',
    badge: 'CSAT'
  },
  {
    title: 'Canlı destek',
    value: '3 dk',
    description: 'Ortalama yanıt süresi',
    badge: 'Live ops'
  }
]

export default function AdminDashboardPage() {
  const { tokens } = useAdminTheme()
  const cardBase = `rounded-3xl p-6 transition duration-500 ${tokens.card}`

  return (
    <section className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        {systemMetrics.map(({ title, value, change, detail, icon: Icon }) => (
          <article key={title} className={`${cardBase} ${tokens.glow}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-xs uppercase tracking-[0.32em] ${tokens.muted}`}>{title}</p>
                <p className="mt-3 text-3xl font-semibold">{value}</p>
              </div>
              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tokens.badge}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-emerald-400">{change}</p>
            <p className={`mt-2 text-sm ${tokens.muted}`}>{detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
        <article className={`${cardBase} space-y-6`}>
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Dağıtım akışları</h2>
              <p className={`text-sm ${tokens.muted}`}>
                Canlı yayınlanan pipeline&apos;lar, rollback pencereleri ve gözlemleyici metrikler burada.
              </p>
            </div>
            <button type="button" className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ${tokens.accentSoft}`}>
              <Sparkles className="h-4 w-4" />
              Otomatik raporla
            </button>
          </header>

          <div className="space-y-4">
            {deploymentPipeline.map(({ name, detail, status, trend, icon: Icon }) => (
              <div
                key={name}
                className={`flex flex-col gap-3 rounded-2xl px-4 py-3 md:flex-row md:items-center md:justify-between ${tokens.accentSoft}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${tokens.badge}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className={`text-sm ${tokens.muted}`}>{detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`rounded-2xl px-3 py-1 font-medium ${tokens.badge}`}>{status}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ArrowUpRight className="h-4 w-4" />
                    {trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className={`${cardBase} space-y-5`}>
          <header className="space-y-2">
            <h2 className="text-xl font-semibold">Güvenlik telemetrisi</h2>
            <p className={`text-sm ${tokens.muted}`}>Zero Trust katmanı 15 dakikada bir risk skoru hesaplıyor.</p>
          </header>
          <div className="space-y-4">
            {securityEvents.map(({ time, event, status, intent }) => (
              <div key={`${time}-${event}`} className={`rounded-2xl border px-4 py-3 ${tokens.badge}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-[0.26em]">{time}</span>
                  <span className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]">{status}</span>
                </div>
                <p className="mt-3 text-sm font-semibold">{event}</p>
                <p className={`text-xs ${tokens.muted}`}>{intent}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <article className={`${cardBase} space-y-6`}>
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Operasyon matrisi</h2>
              <p className={`text-sm ${tokens.muted}`}>
                Gerçek zamanlı gözlemlenebilirlik, kuyruk uzunlukları ve bakım pencereleri.
              </p>
            </div>
            <span className="rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">Aktif</span>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {customerImpact.map(({ title, value, description, badge }) => (
              <div key={title} className={`rounded-2xl p-4 ${tokens.accentSoft}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-xs uppercase tracking-[0.28em] ${tokens.muted}`}>{badge}</p>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-3 text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm font-medium">{title}</p>
                <p className={`mt-2 text-sm ${tokens.muted}`}>{description}</p>
              </div>
            ))}
          </div>
          <div className={`flex flex-col gap-4 rounded-2xl border px-5 py-4 md:flex-row md:items-center md:justify-between ${tokens.badge}`}>
            <div>
              <p className="text-sm font-semibold">Sürüm geçiş çizelgesi</p>
              <p className={`text-sm ${tokens.muted}`}>Canary dağıtım 23:00&apos;te üretime aktarılacak.</p>
            </div>
            <button type="button" className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ${tokens.accent}`}>
              <Radar className="h-4 w-4" />
              İzlemeyi başlat
            </button>
          </div>
        </article>

        <aside className={`${cardBase} space-y-5`}>
          <header className="space-y-2">
            <h2 className="text-xl font-semibold">Risk paneli</h2>
            <p className={`text-sm ${tokens.muted}`}>Otomatik risk segmentasyonu ve manuel müdahale kuyruğu.</p>
          </header>

          <div className={`space-y-4 rounded-2xl border px-4 py-4 ${tokens.badge}`}>
            <div className="flex items-center gap-3">
              <Lock className="h-10 w-10 rounded-2xl border border-white/10 bg-white/10 p-2" />
              <div>
                <p className="text-sm font-semibold">Zero Trust</p>
                <p className={`text-xs ${tokens.muted}`}>Risk skoru: 18 · Limit: 40</p>
              </div>
            </div>
            <p className="text-sm font-medium">Otomasyon politikaları kritik IP bloklarını başarıyla izole etti.</p>
            <button type="button" className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ${tokens.accentSoft}`}>
              <AlertTriangle className="h-4 w-4" />
              Manuel incele
            </button>
          </div>

          <div className={`space-y-4 rounded-2xl border px-4 py-4 ${tokens.badge}`}>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-10 w-10 rounded-2xl border border-white/10 bg-white/10 p-2" />
              <div>
                <p className="text-sm font-semibold">Canlı performans</p>
                <p className={`text-xs ${tokens.muted}`}>Kartuş gecikmesi: 42 ms</p>
              </div>
            </div>
            <p className="text-sm font-medium">Oyun içi telemetri 144 Hz akış hedefini %102 oranında karşılıyor.</p>
            <button type="button" className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ${tokens.accentSoft}`}>
              <TrendingUp className="h-4 w-4" />
              Detaylı raporla
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}
