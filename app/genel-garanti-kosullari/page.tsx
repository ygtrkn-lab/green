import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  Award,
  FileText,
  Info,
  Headphones,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const GenelGarantiKosullari = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const garantiDahil = [
    'Üretim hatalarından kaynaklanan arızalar',
    'Malzeme kalitesinden kaynaklanan sorunlar',
    'Normal kullanım koşullarında oluşan teknik arızalar',
    'Donanım bileşenlerindeki fabrika kusurları'
  ]

  const garantiHaric = [
    'Sıvı ve kimyasal madde teması',
    'Darbe ve fiziksel hasarlar',
    'Yetkisiz kişilerce açılması',
    'Elektrik dalgalanmaları ve yanlış kullanım',
    'Doğal afetler ve yangın hasarları'
  ]

  const kritikKosullar = [
    {
      title: 'Fatura Zorunluluğu',
      description: 'Garanti hizmeti alınırken faturanın ibraz edilmesi zorunludur.',
      accent: 'primary' as const
    },
    {
      title: 'Donanım Kapsamı',
      description: 'Garanti yalnızca donanım bileşenlerini kapsar, yazılım sorunları dahil değildir.',
      accent: 'blue' as const
    },
    {
      title: 'Yetkisiz Müdahale',
      description: 'Ürünün yetkisiz kişilerce açılması veya müdahale edilmesi garanti kapsamını sona erdirir.',
      accent: 'emerald' as const
    },
    {
      title: 'Alternatif Model',
      description: 'Orijinal ürünün bulunmadığı durumlarda güncel fiyat farkı gözetilerek eşdeğer model sunulur.',
      accent: 'amber' as const
    }
  ]

  return (
    <CorporateLayout
      title="Genel Garanti Koşulları"
      subtitle="Satın aldığınız gaming ürünlerinizin garanti kapsamı, süreleri ve teknik servis süreçleri hakkında bilmeniz gereken tüm detaylar."
      heroImage="/images/hero/warranty.png"
      heroBadge="Garanti"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Garanti Yaklaşımımız"
        icon={<FileText className="h-5 w-5" />}
        description="Green Planet Gaming ürünleri, premium üretim standartlarına uygun olarak kapsamlı garanti prosedürleriyle desteklenir."
      >
        <p>
          Cihazın doğasından gelen teknik kusurlardan, kullanılan malzemelerden ve üretim koşullarından kaynaklanan hasarlar{' '}
          <strong>fatura tarihinden itibaren garanti kapsamına dahildir.</strong> Ürünlerinizin uzun vadeli performansını korumak için yetkilendirilmiş servis ağımız ile çalışıyoruz.
        </p>
        <div className="not-prose mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white/60 to-white/80 p-6 shadow-xl shadow-primary/10">
            <p className="text-sm text-slate-600">
              Garanti süreciniz boyunca seri numarası, fatura bilgisi ve sorun detayının eksiksiz iletilmesi değerlendirme süresini hızlandırır. Yetkisiz müdahalelerden kaçınmanız ve orijinal parça kullanmanız garanti kapsamının korunması için kritik önem taşır.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="rounded-full bg-primary/10 px-4 py-2">Resmi Servis</span>
              <span className="rounded-full bg-primary/10 px-4 py-2">Premium Parça</span>
              <span className="rounded-full bg-primary/10 px-4 py-2">Şeffaf Süreç</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-4 rounded-[32px] bg-primary/20 blur-xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/40 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.75)]">
              <Image
                src="/images/warranty-certificate.jpg"
                alt="Green Planet Garanti Belgesi"
                width={680}
                height={420}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Garanti Kapsamı & Hariç Durumlar"
        icon={<ShieldCheck className="h-5 w-5" />}
        description="Ürünlerinizin garanti haklarından sorunsuz yararlanabilmeniz için kapsam dahilindeki ve hariçteki senaryoları dikkatle inceleyin."
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <CorporateInfoCard
            title="Garanti Kapsamında"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="emerald"
          >
            <ul className="space-y-2 text-sm">
              {garantiDahil.map(madde => (
                <li key={madde}>• {madde}</li>
              ))}
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Garanti Kapsamı Dışında"
            icon={<AlertTriangle className="h-5 w-5" />}
            accent="amber"
          >
            <ul className="space-y-2 text-sm">
              {garantiHaric.map(madde => (
                <li key={madde}>• {madde}</li>
              ))}
            </ul>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Önemli Garanti Koşulları"
        icon={<Info className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          {kritikKosullar.map(kural => (
            <CorporateInfoCard
              key={kural.title}
              title={kural.title}
              accent={kural.accent}
            >
              <p className="text-sm text-slate-600">{kural.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Servis Süreci"
        icon={<Headphones className="h-5 w-5" />}
        description="Garanti taleplerinizin eksiksiz değerlendirilmesi için aşağıdaki adımları izleyin."
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          <li>Ürün seri numarası, fatura ve arıza detaylarını hazırlayın.</li>
          <li>Green Planet Gaming müşteri hizmetleri ile iletişime geçerek arıza kaydı oluşturun.</li>
          <li>Tarafınıza iletilecek kargo/teslimat yönergelerine uygun şekilde ürünü gönderin.</li>
          <li>Uzman ekip tarafından yapılan inceleme sonrası onarım, değişim veya alternatif model sürecine geçiş yapılır.</li>
          <li>Servis süreci tamamlandığında ürününüz orijinal paketinde tarafınıza ulaştırılır.</li>
        </ol>
        <div className="not-prose mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary">
          Garanti süresince yetkisiz müdahalelerden kaçınılmalı ve ürün üzerinde yapılan tüm işlemler kayıt altına alınmalıdır.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Ürün Kategorilerine Göre Garanti Süreleri"
        icon={<Clock className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-5 md:grid-cols-3">
          <CorporateInfoCard
            title="2 Yıl Garanti"
            icon={<Award className="h-5 w-5" />}
            accent="blue"
          >
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• AIO Bilgisayarlar</li>
              <li>• Soğutma Sistemleri</li>
              <li>• Gaming Fareler</li>
              <li>• Mekanik Klavyeler</li>
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="3 - 5 Yıl Garanti"
            icon={<Award className="h-5 w-5" />}
            accent="emerald"
          >
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• Güç Kaynakları (PSU)</li>
              <li>• Premium PSU Modelleri</li>
              <li>• Endüstriyel Güç Üniteleri</li>
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Özel Garanti Programları"
            icon={<Award className="h-5 w-5" />}
            accent="amber"
          >
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• 10 Yıl 10 Ay PSU Garantisi</li>
              <li>• Premium Ürün Kategorileri</li>
              <li>• Özel Seri Ürünler</li>
            </ul>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Garanti Hizmeti İçin İletişim"
        icon={<Mail className="h-5 w-5" />}
      >
        <p>
          Garanti kapsamındaki ürünleriniz için teknik destek ve servis talepleriyle ilgili tüm sorularınızda müşteri hizmetlerimiz yanınızdadır.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">destek@green.net.tr</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<Phone className="h-5 w-5" />} accent="emerald">
            <p className="text-sm font-semibold text-slate-900">Telefon</p>
            <p className="text-sm text-slate-600">+90 216 473 36 01</p>
            <p className="text-sm text-slate-600">+90 216 GREEN 01</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<MapPin className="h-5 w-5" />} accent="blue">
            <p className="text-sm font-semibold text-slate-900">Yetkili Servis Merkezi</p>
            <p className="text-sm text-slate-600">
              Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23 Ümraniye – İstanbul / TÜRKİYE
            </p>
          </CorporateInfoCard>
        </div>
        <div className="not-prose mt-8 flex justify-center">
          <Link
            href="/iletisim"
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/25 transition hover:scale-105 hover:bg-primary"
          >
            İletişime Geç
          </Link>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Güncelleme Notu"
        icon={<Info className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Bu garanti koşulları {lastUpdated} tarihinde güncellenmiştir. Politika üzerinde yapılacak değişiklikler web sitemizde yayınlanacak ve yürürlük tarihiyle birlikte duyurulacaktır.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default GenelGarantiKosullari
