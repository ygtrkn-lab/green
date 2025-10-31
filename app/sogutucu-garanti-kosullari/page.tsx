import {
  Droplet,
  Fan,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  ClipboardList,
  PackageCheck,
  Thermometer,
  Gauge,
  Sparkles,
  Settings,
  Clock,
  Headphones,
  Mail,
  Phone,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const SogutucuGarantiKosullari = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const garantiKapsami = [
    'Pompa, fan ve radyatör bileşenlerinde üretim kaynaklı arızalar',
    'Sızdırmazlık ve hortum bağlantılarında fabrika kusurundan doğan problemler',
    'AIO blok üzerindeki elektronik kontrol devreleri ve RGB hataları',
    'Hava soğutucularda montaj mekanizması ve fan rulman arızaları'
  ]

  const garantiHaric = [
    'Sistemde yapılan yetkisiz modifikasyonlar ve sıvı değişimleri',
    'Yanlış montaj veya aşırı sıkma sonucu blok/anakart zararları',
    'Kullanıcı kaynaklı darbe, bükülme ve hortum ezilmesi',
    'Toz, kir ve kimyasal temizleyici nedeniyle oluşan korozyon',
    'Önerilen sıcaklık aralıklarının üzerinde kullanım sonucu performans kaybı'
  ]

  const kurulumBeklentileri = [
    {
      title: 'Yetkili Montaj',
      description:
        'Blok montajı ve termal macun uygulaması yalnızca yetkin teknik personel tarafından yapılmalıdır.',
      icon: <Wrench className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Termal Pasta',
      description:
        'Üretici tarafından önerilen termal macun kullanılmalı; her sökme işleminde macun yenilenmelidir.',
      icon: <Thermometer className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'Radyatör Konumu',
      description:
        'AIO radyatörü, kabarcık oluşumunu önlemek için pompa altında konumlandırılmamalıdır.',
      icon: <Gauge className="h-5 w-5" />,
      accent: 'amber' as const
    }
  ]

  const bakimRutini = [
    {
      title: 'Toz Yönetimi',
      description:
        'Radyatör ve fan yüzeyleri aylık periyotlarla basınçsız hava ile temizlenmeli; filtreler düzenli kontrol edilmelidir.',
      icon: <Fan className="h-5 w-5" />,
      accent: 'blue' as const
    },
    {
      title: 'Pompa Sağlığı',
      description:
        'Pompa sesi, titreşim veya performans düşüşü fark edildiğinde kullanım durdurulmalı ve servis bilgilendirilmelidir.',
      icon: <Activity className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Termal Performans',
      description:
        'CPU sıcaklıkları düzenli olarak izlenmeli; olağan dışı değerlerde sistem test edilerek servisle paylaşılmalıdır.',
      icon: <Thermometer className="h-5 w-5" />,
      accent: 'emerald' as const
    }
  ]

  const servisAdimlari = [
    'Seri numarası, fatura bilgisi ve arızanın detaylı açıklamasını hazırlayın.',
    'Yetkili destek hattı veya çevrimiçi form üzerinden garanti talebi oluşturun.',
    'Onaylanan paketleme prosedürüne göre radyatör, blok ve aksesuarları korumalı şekilde paketleyin.',
    'Servis merkezine ulaşan ürünler basınç testi ve termal performans analizlerinden geçirilir.',
    'Onarım veya değişim sonucu, tüm test raporları ile birlikte tarafınıza bildirilir.'
  ]

  return (
    <CorporateLayout
      title="Soğutucular Garanti Koşulları"
      subtitle="Green Planet Gaming sıvı ve hava soğutma çözümleriniz için kapsam, bakım ve servis süreçlerini aktaran rehber."
      heroImage="/images/hero/warranty.png"
      heroBadge="Soğutma Garanti"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Soğutma Garanti Yaklaşımımız"
        icon={<Droplet className="h-5 w-5" />}
        description="AIO ve hava soğutma çözümlerimizi, uzun ömürlü performans için premium garanti prosedürleriyle koruyoruz."
      >
        <p>
          Tüm soğutma çözümlerimiz, yüksek sıcaklık ve uzun süreli stres testlerinden geçirilir.{' '}
          <strong>Fatura tarihinden itibaren 24 ay</strong> boyunca üretim kaynaklı arızalarda ücretsiz teknik destek sağlarız. Garanti sürecinin kesintiye uğramaması için yetkili montaj ve bakım yönergelerine uyulması önerilir.
        </p>
        <div className="not-prose mt-8 grid gap-6 md:grid-cols-3">
          {kurulumBeklentileri.map(oner => (
            <CorporateInfoCard
              key={oner.title}
              title={oner.title}
              icon={oner.icon}
              accent={oner.accent}
            >
              <p>{oner.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Garanti Kapsamı ve Hariç Durumlar"
        icon={<ShieldCheck className="h-5 w-5" />}
        description="Soğutma sistemlerinizin garanti haklarından eksiksiz yararlanmak için kapsam dahilindeki ve dışındaki durumları inceleyin."
      >
        <div className="not-prose grid gap-6 lg:grid-cols-2">
          <CorporateInfoCard
            title="Garanti Kapsamında"
            icon={<PackageCheck className="h-5 w-5" />}
            accent="emerald"
          >
            <ul className="space-y-2 text-sm">
              {garantiKapsami.map(madde => (
                <li key={madde}>• {madde}</li>
              ))}
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Garanti Haricinde"
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
        title="Bakım & Performans Rutini"
        icon={<Fan className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-3">
          {bakimRutini.map(ipucu => (
            <CorporateInfoCard
              key={ipucu.title}
              title={ipucu.title}
              icon={ipucu.icon}
              accent={ipucu.accent}
            >
              <p>{ipucu.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Garanti Servis Süreci"
        icon={<ClipboardList className="h-5 w-5" />}
        description="Talep oluşturduğunuz andan test sonuçlarına kadar takip edilen standart adımlar."
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          {servisAdimlari.map(adim => (
            <li key={adim}>{adim}</li>
          ))}
        </ol>
        <div className="not-prose mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary">
          Soğutucu üzerinde yapılacak sıvı değişimi, blok açma veya kablo modifikasyonlarının yetkili servis tarafından yapılması gerekir; aksi durumda garanti geçersiz olur.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Sık Karşılaşılan Servis Senaryoları"
        icon={<Settings className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-2">
          <CorporateInfoCard
            title="Pompa Sesi / Titreşim"
            icon={<Droplet className="h-5 w-5" />}
            accent="primary"
          >
            <p>
              Pompa veya bloktan gelen alışılmadık seslerde cihazı kapatın, kullanım süresi ve sıcaklık değerleriyle beraber servis talebi oluşturun.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Sıcaklık Artışı"
            icon={<Thermometer className="h-5 w-5" />}
            accent="emerald"
          >
            <p>
              CPU sıcaklıkları normalin üzerine çıktığında fan eğrilerini kontrol edin, termal macun durumunu değerlendirin ve servis formuna test sonuçlarını ekleyin.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Sızıntı Şüphesi"
            icon={<Gauge className="h-5 w-5" />}
            accent="amber"
          >
            <p>
              Hortum bağlantılarında nem veya sıvı kalıntısı fark ederseniz cihazı kullanmayı bırakın, fotoğraf ve video dokümantasyonuyla birlikte servis kaydı açın.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Fan Gürültüsü"
            icon={<Fan className="h-5 w-5" />}
            accent="blue"
          >
            <p>
              Fan hızında ani değişimler veya sürtünme sesi algıladığınızda fan bağlantılarını kontrol edin, sorun devam ederse fan modülünü servis incelemesine gönderin.
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Yetkili Servis ile İletişim"
        icon={<Headphones className="h-5 w-5" />}
      >
        <p>
          Soğutma çözümlerinizle ilgili garanti desteği almak için aşağıdaki iletişim kanallarından müşteri hizmetlerimizle bağlantı kurabilirsiniz.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">destek@green.net.tr</p>
            <p className="text-xs text-slate-500">Arıza videoları ve sıcaklık loglarını eklemek değerlendirmeyi hızlandırır.</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<Phone className="h-5 w-5" />} accent="emerald">
            <p className="text-sm font-semibold text-slate-900">Telefon</p>
            <p className="text-sm text-slate-600">+90 216 473 36 01</p>
            <p className="text-sm text-slate-600">+90 216 GREEN 01</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<Clock className="h-5 w-5" />} accent="blue">
            <p className="text-sm font-semibold text-slate-900">Servis Çalışma Saatleri</p>
            <p className="text-sm text-slate-600">Hafta içi 09.00 - 18.00</p>
            <p className="text-sm text-slate-600">Cumartesi ve resmi tatillerde kapalıdır.</p>
          </CorporateInfoCard>
        </div>
        <div className="not-prose mt-8 flex justify-center">
          <Link
            href="/iletisim"
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/25 transition hover:scale-105 hover:bg-primary"
          >
            İletişim Formuna Git
          </Link>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Güncelleme Notu"
        icon={<ShieldCheck className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Soğutucular Garanti Koşulları {lastUpdated} tarihinde güncellenmiştir. Güncellemeler web sitemizde yayımlanır ve yürürlük tarihleri paylaşılır.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default SogutucuGarantiKosullari
