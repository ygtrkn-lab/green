import {
  BatteryCharging,
  Plug,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  ClipboardList,
  PackageCheck,
  Gauge,
  Settings,
  Power,
  Clock,
  Headphones,
  Mail,
  Phone
} from 'lucide-react'
import Link from 'next/link'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const GucKaynaklariGarantiKosullari = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const garantiKapsami = [
    'Üretim kaynaklı komponent arızaları ve malzeme kusurları',
    'Yük altında voltaj dalgalanmalarına bağlı performans kayıpları',
    'Fan ve soğutma bileşenlerindeki fabrika kaynaklı sorunlar',
    'Onaylı testlerde tespit edilen güç çıkış dengesizlikleri'
  ]

  const garantiHaric = [
    'Elektrik tesisatındaki kaçak akım ve yıldırım düşmesi kaynaklı hasarlar',
    'Yetkisiz modifikasyonlar, kesilen kablolar veya lehim müdahaleleri',
    'Toz, nem ve aşırı ısılı ortamlarda kullanım sonucu oksidasyon',
    'Standart dışı yükleme (mining, endüstriyel cihaz) nedeniyle oluşan arızalar',
    'Yanlış watt seçimi sonucu aşırı yüklenmeden doğan bileşen hasarları'
  ]

  const kurulumOnerileri = [
    {
      title: 'Yetkili Montaj',
      description:
        'PSU montajı sırasında topraklama bağlantıları ve kablo yönetimi, yetkili teknik personel kontrolünde gerçekleştirilmelidir.',
      icon: <Wrench className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Doğru Güç Planlaması',
      description:
        'Sistemin toplam watt ihtiyacının en az %20 üzerinde değer sunan PSU modelleri tercih edilerek stabil çalışma sağlanmalıdır.',
      icon: <Gauge className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'UPS ve Koruma Kullanımı',
      description:
        'Şebeke kaynaklı ani dalgalanmaları minimize etmek için akım korumalı priz veya UPS kullanımı tavsiye edilir.',
      icon: <Plug className="h-5 w-5" />,
      accent: 'amber' as const
    }
  ]

  const periyodikBakim = [
    {
      title: 'Hava Akışı Kontrolü',
      description:
        'PSU hava çıkış ızgaraları düzenli olarak tozdan arındırılmalı; kasanın negatif/pozitif basınç dengesi korunmalıdır.',
      icon: <BatteryCharging className="h-5 w-5" />,
      accent: 'blue' as const
    },
    {
      title: 'Kablo Sağlığı',
      description:
        'Modüler kabloların bağlantıları her 6 ayda bir gözden geçirilmeli, bükülme ve sıkışma olmamasına dikkat edilmelidir.',
      icon: <Settings className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Yük Denetimi',
      description:
        'Yeni donanım eklendiğinde sistem güç tüketimi ölçülmeli; PSU kapasitesinin üzerine çıkılması engellenmelidir.',
      icon: <Power className="h-5 w-5" />,
      accent: 'emerald' as const
    }
  ]

  const servisAdimlari = [
    'Seri numarası, fatura tarihi ve arızanın ortaya çıkış koşullarını içeren kısa raporu hazırlayın.',
    'Yetkili destek hattı veya çevrimiçi form üzerinden garanti talebi oluşturun.',
    'Onaylanan paketleme talimatlarına göre PSU ve aksesuarlarını antistatik koruma ile paketleyin.',
    'Servis merkezine ulaştırılan ürün uzman ekip tarafından elektriksel testlere tabi tutulur.',
    'Onarım, değişim veya üst modele yükseltme kararı tarafınıza yazılı olarak bildirilir.'
  ]

  return (
    <CorporateLayout
      title="Güç Kaynakları Garanti Koşulları"
      subtitle="Green Planet Gaming güç kaynakları için kapsam, bakım ve uzun süreli performans beklentilerini içeren garanti rehberi."
      heroImage="/images/hero/warranty.png"
      heroBadge="PSU Garanti"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="PSU Garanti Yaklaşımımız"
        icon={<BatteryCharging className="h-5 w-5" />}
        description="Yüksek verimlilikli güç kaynaklarımızı, uzun ömürlü kullanım için premium garanti prosedürleriyle destekliyoruz."
      >
        <p>
          Green Planet Gaming güç kaynakları, 80 PLUS verimlilik standartlarını aşan testlerden geçirilerek kullanıcılara ulaştırılır.{' '}
          <strong>Fatura tarihinden itibaren modele göre 36 ile 60 ay arasında</strong> değişen garanti süresi boyunca, üretimden kaynaklı arızalarda ücretsiz teknik destek sunuyoruz. Garanti haklarının kesintiye uğramaması için yetkili servis süreçlerine uyulması beklenir.
        </p>
        <div className="not-prose mt-8 grid gap-6 md:grid-cols-3">
          {kurulumOnerileri.map(oner => (
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
        description="Güç kaynaklarınızın garanti haklarından eksiksiz yararlanabilmek için kapsam dahilindeki ve dışındaki senaryoları inceleyin."
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
        title="Premium Garanti Programları"
        icon={<Power className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-3">
          <CorporateInfoCard
            title="Standart Seriler"
            icon={<BatteryCharging className="h-5 w-5" />}
            accent="blue"
          >
            <p>
              Bronze ve Silver PSU modellerimiz 36 ay garanti ile sunulur. Ürün kaydınızı 30 gün içinde tamamladığınızda ek 6 ay destek uygulanır.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Gold & Platinum"
            icon={<Gauge className="h-5 w-5" />}
            accent="emerald"
          >
            <p>
              Yüksek verimlilikli Gold/Platinum serilerde 60 aya kadar uzatılmış garanti geçerlidir. Her yıl yapılan bakım kayıtlarıyla garanti süresini koruyun.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="10 Yıl 10 Ay Programı"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="primary"
          >
            <p>
              Seçilmiş üst seviye modellerde 10 yıl + 10 ay kapsam sağlayan ek garanti seçeneği bulunur. Kapsam, yalnızca kayıtlı son kullanıcılar için geçerlidir.
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Garanti Servis Süreci"
        icon={<ClipboardList className="h-5 w-5" />}
        description="Talep oluşturmadan ürün teslimine kadar takip edilen standardize edilmiş adımlar."
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          {servisAdimlari.map(adim => (
            <li key={adim}>{adim}</li>
          ))}
        </ol>
        <div className="not-prose mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary">
          PSU üzerinde yapılacak tüm test ve müdahaleler yetkili servis tarafından gerçekleştirilmelidir; cihazın açılması garanti kapsamını sonlandırır.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Sık Karşılaşılan Servis Senaryoları"
        icon={<Settings className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-2">
          <CorporateInfoCard
            title="Başlatma Sorunları"
            icon={<Power className="h-5 w-5" />}
            accent="primary"
          >
            <p>
              Sistem anlık kapanıyor veya hiç açılmıyorsa, anakart ve GPU bağlantılarını kontrol ederek sorunu raporlayın. Tekrarlayan durumda servis kaydı oluşturun.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Gürültü ve Fan"
            icon={<BatteryCharging className="h-5 w-5" />}
            accent="emerald"
          >
            <p>
              Fan hızında ani artış, titreşim ya da tıkırtı duyarsanız cihazı kapatıp güç bağlantısını kesin. Ortam sıcaklığı ve kullanım süresini servis formuna ekleyin.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Koku veya Isınma"
            icon={<AlertTriangle className="h-5 w-5" />}
            accent="amber"
          >
            <p>
              PSU üzerinde yanık kokusu veya aşırı ısınma fark edildiğinde ürün kullanılmaya devam edilmemeli; iç bileşenlere müdahale edilmeden servisle iletişime geçilmelidir.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Modüler Kablolar"
            icon={<Plug className="h-5 w-5" />}
            accent="blue"
          >
            <p>
              Kablo uçlarında gevşeme veya oksitlenme varsa temiz, kuru bir bez ile nazikçe temizleyip sorun sürüyorsa kablo setini servis incelemesine gönderin.
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Yetkili Servis ile İletişim"
        icon={<Headphones className="h-5 w-5" />}
      >
        <p>
          Güç kaynaklarınızla ilgili garanti talepleriniz için aşağıdaki iletişim kanallarımızdan müşteri hizmetlerine ulaşabilirsiniz.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">destek@green.net.tr</p>
            <p className="text-xs text-slate-500">Arıza videoları ve güç ölçüm raporlarını eklemeniz süreci hızlandırır.</p>
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
          Güç Kaynakları Garanti Koşulları {lastUpdated} tarihinde güncellenmiştir. Yapılan değişiklikler web sitemizde duyurular ile paylaşılır.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default GucKaynaklariGarantiKosullari
