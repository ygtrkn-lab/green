import type { LucideIcon } from 'lucide-react'
import {
  Layers,
  Sparkles,
  TrendingUp,
  Compass,
  ShieldCheck,
  Cpu,
  Headphones
} from 'lucide-react'

import AllCategories from '../components/AllCategories'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'

export const metadata = {
  title: 'Kategoriler | Green Computer Gaming',
  description:
    'Gaming bilgisayar ve ekipmanları kategorileri. Gaming PC, klavye, mouse, soğutma sistemleri ve daha fazlası.',
}

type Highlight = {
  title: string
  description: string
  icon: LucideIcon
}

const strategicHighlights: Highlight[] = [
  {
    title: '11 ana kategori',
    description:
      'Hazır gaming sistemlerinden profesyonel soğutma çözümlerine kadar tüm ürün aileleri tek ekosistemde buluşuyor.',
    icon: Layers,
  },
  {
    title: 'Dinamik fiyat aralıkları',
    description:
      'Canlı ürün verileri sayesinde her kategori için güncel fiyat aralıklarını ve stok durumlarını hemen görebilirsiniz.',
    icon: Sparkles,
  },
  {
    title: 'Trend odaklı filtreleme',
    description:
      'Popülerlik ve trend etiketleri ile yükselen ürün gruplarına saniyeler içinde ulaşın.',
    icon: TrendingUp,
  },
]

type Guide = {
  title: string
  description: string
  icon: LucideIcon
  recommendations: string[]
}

const selectionGuides: Guide[] = [
  {
    title: 'Performans arayan oyuncular',
    description:
      'En güncel GPU ve işlemci platformlarına sahip sistemleri değerlendirin.',
    icon: Cpu,
    recommendations: [
      'Gaming PC koleksiyonunda RTX 40 serisi sistemleri inceleyin.',
      'Sıvı soğutma kategorisi ile sıcaklıkları kontrol altına alın.',
    ],
  },
  {
    title: 'Kurumsal ve uzun ömürlü kullanım',
    description:
      'Saha dayanıklılığı ve enerji verimliliği ön planda olan çözümler.',
    icon: ShieldCheck,
    recommendations: [
      'Askeri PSU serisi ile yüksek güvenlikte güç aktarımı sağlayın.',
      'AIO PC modelleri ile kompakt ve düşük bakım gerektiren kurulumlar yapın.',
    ],
  },
  {
    title: 'E-ticaret ve yayıncılık ekipleri',
    description:
      'İş akışını hızlandıran çevre birimleri ile kesintisiz üretkenlik sağlayın.',
    icon: Headphones,
    recommendations: [
      'Klavye ve mouse kategorilerinde makro profilli modelleri tercih edin.',
      'Kulaklık bölümünden gürültü engelleme destekli setleri seçin.',
    ],
  },
  {
    title: 'Stüdyo ve tasarım projeleri',
    description:
      'Estetik, sessizlik ve modülerlik odağında kasalarla yaratıcı alanınızı kurun.',
    icon: Compass,
    recommendations: [
      'PC kasası kategorisindeki temperli cam opsiyonlarını keşfedin.',
      'Kasa fanı koleksiyonundan düşük gürültülü PWM çözümleri ekleyin.',
    ],
  },
]

export default function KategorilerPage() {
  const lastUpdatedLabel = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <CorporateLayout
      title="Kategoriler"
      subtitle="Gaming dünyasının en başarılı bileşenlerini ve tamamlayıcı aksesuarlarını tek merkezde keşfedin. Filtrelenebilir kategori yapısı ile ihtiyacınız olan ürüne anında ulaşın."
      heroImage="/images/hero/categories.jpg"
      heroBadge="Ürün Ekosistemi"
      lastUpdatedLabel={lastUpdatedLabel}
    >
      <CorporateSection
        title="Green Planet Gaming ekosistemini keşfedin"
        description="Ürün stratejinizi şekillendirmenize yardımcı olmak için kategorileri performans, dayanıklılık ve kullanıcı deneyimi odaklı olarak sınıflandırdık."
        icon={<Layers className="h-6 w-6" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {strategicHighlights.map(highlight => {
            const Icon = highlight.icon

            return (
              <div
                key={highlight.title}
                className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-60px_rgba(15,23,42,0.45)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-slate-600">{highlight.description}</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 via-primary/0" />
              </div>
            )
          })}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Hangi kategori size uygun?"
        description="Kullanım senaryolarına göre kategori önerilerimizi inceleyerek doğru kombinasyonu birkaç adımda oluşturabilirsiniz."
        icon={<Compass className="h-6 w-6" />}
        tone="subtle"
      >
        <div className="not-prose grid gap-6 lg:grid-cols-2">
          {selectionGuides.map(guide => {
            const Icon = guide.icon

            return (
              <article
                key={guide.title}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-inner shadow-white/30"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-900">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-slate-600">{guide.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {guide.recommendations.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-2xl bg-slate-100/70 px-4 py-2 text-slate-700"
                    >
                      <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </CorporateSection>

      <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/90 shadow-xl shadow-slate-900/5">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative">
          <AllCategories variant="corporate" />
        </div>
      </div>
    </CorporateLayout>
  )
}
