import {
  Monitor,
  Cpu,
  Fan,
  Droplet,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  ClipboardList,
  PackageCheck,
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

const AioGarantiKosullari = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const garantiKapsami = [
    'Panel, anakart, güç modülü ve entegre bileşenlerdeki üretim kaynaklı arızalar',
    'LCD/LED panelde piksel kaybı, ışık sızması gibi fabrika kusurlarına bağlı sorunlar',
    'Harici güç adaptörlerinde komponent hataları ve standart dışı çalışma',
    'Normal kullanımda ortaya çıkan fan, pompa, termal devre aksaklıkları'
  ]

  const garantiHaric = [
    'Panel kırığı, çizik, kasa çatlağı gibi fiziksel darbeler',
    'Sıvı, kimyasal veya aşırı nem temasına bağlı oksidasyon',
    'Yetkisiz müdahale, overclock veya standart dışı yazılım/BIOS güncellemeleri',
    'Elektrik altyapısındaki dalgalanmalardan doğan yanık ve kısa devre hasarları',
    'Endüstriyel ortamlarda hatalı havalandırma ve toz yükünden kaynaklı arızalar'
  ]

  const kurulumBeklentileri = [
    {
      title: 'Profesyonel Montaj',
      description:
        'AIO sistemlerinin kurulumu, panel ve bağlantıların hasar görmemesi için yetkili teknik personel tarafından yapılmalıdır.',
      icon: <Wrench className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Orijinal Adaptör Kullanımı',
      description:
        'Enerji dalgalanmalarını önlemek amacıyla kutu içeriğinde gelen adaptör dışındaki güç kaynaklarının kullanımı tavsiye edilmez.',
      icon: <Cpu className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'Stabil Çalışma Ortamı',
      description:
        'Cihaz, hava sirkülasyonu güçlü, direkt güneş almayan ve 5°C - 35°C aralığındaki ortamlarda konumlandırılmalıdır.',
      icon: <Thermometer className="h-5 w-5" />,
      accent: 'amber' as const
    }
  ]

  const termalBakim = [
    {
      title: 'Toz ve Hava Kanalları',
      description:
        'Fan girişleri ve radyatör kanatçıkları, ayda bir basınçsız hava ile temizlenmeli; tıkanıklık oluşması engellenmelidir.',
      icon: <Fan className="h-5 w-5" />,
      accent: 'blue' as const
    },
    {
      title: 'Termal İzleme',
      description:
        'Sistem sıcaklıkları üretici tavsiyesinin üzerine çıktığında cihaz kullanımına ara verip servis ile iletişime geçiniz.',
      icon: <Activity className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Sıvı Devresi Sağlığı',
      description:
        'Pompa sesi, mikro titreşim veya performans düşüşü fark edildiğinde gecikmeden teknik servis formu doldurulmalıdır.',
      icon: <Droplet className="h-5 w-5" />,
      accent: 'emerald' as const
    }
  ]

  const servisAdimlari = [
    'Seri numarası, fatura tarihi, kısa arıza açıklaması ve kullanım ortamı bilgilerini hazırlayın.',
    'Garanti talep formunu doldurun veya destekte kayıt oluşturmak için müşteri hizmetleri ile görüşün.',
    'Yetkili ekip tarafından onaylanan paketleme talimatlarına uygun şekilde cihazı korumalı gönderim kutusuna alın.',
    'Lojistik süreci tamamlandıktan sonra teknik ekip testleri yapar, onarım/değişim sonucu tarafınıza raporlanır.',
    'Onaylanan işlem sonrası cihaz, orijinal aksesuarlarıyla birlikte sigortalı olarak adresinize gönderilir.'
  ]

  return (
    <CorporateLayout
      title="AIO Garanti Koşulları"
      subtitle="Green Planet Gaming All-in-One bilgisayarlarınız için garanti kapsamı, bakım beklentileri ve servis süreçleri hakkında tüm detaylar."
      heroImage="/images/hero/warranty.png"
      heroBadge="AIO Garanti"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="AIO Sistemlerine Özel Garanti Yaklaşımımız"
        icon={<Monitor className="h-5 w-5" />}
        description="Panel, işlemci ve sıvı soğutmanın tek gövdede birleştiği All-in-One platformlarımızı premium garanti prosedürleriyle koruyoruz."
      >
        <p>
          Green Planet Gaming AIO cihazları, üretim süreçlerinin her aşamasında dayanıklılık ve sürdürülebilirlik odaklı testlerden geçirilir.{' '}
          <strong>Fatura tarihinden itibaren 24 ay süreyle</strong> donanım bileşenlerinde oluşabilecek üretim kaynaklı arızalar için kapsamlı bir garanti sunuyoruz. Garanti haklarınızın kesintisiz devamı için yetkili servis ağımızla koordineli çalışmanız önerilir.
        </p>
        <div className="not-prose mt-8 grid gap-6 md:grid-cols-3">
          {kurulumBeklentileri.map(kural => (
            <CorporateInfoCard
              key={kural.title}
              title={kural.title}
              icon={kural.icon}
              accent={kural.accent}
            >
              <p>{kural.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Garanti Kapsamı ve Hariç Durumlar"
        icon={<ShieldCheck className="h-5 w-5" />}
        description="AIO sistemlerinizin garanti haklarından hızlıca yararlanabilmeniz için kapsam dahilindeki ve dışındaki durumları inceleyin."
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
        title="Termal Performans ve Bakım"
        icon={<Thermometer className="h-5 w-5" />}
        description="All-in-One platformlarda yüksek performansın sürdürülebilmesi için düzenli bakım ve izlemeyi önemsiyoruz."
      >
        <div className="not-prose grid gap-6 md:grid-cols-3">
          {termalBakim.map(ipucu => (
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
        description="Talep oluşturduğunuz andan cihazınızın teslimine kadar geçen süreçte takip edilen adımlar."
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          {servisAdimlari.map(adim => (
            <li key={adim}>{adim}</li>
          ))}
        </ol>
        <div className="not-prose mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary">
          Garanti süresince cihazın kapak ve panel bağlantılarına müdahalede bulunmayın; yapılacak her işlem öncesinde yetkili servis onayı alınız.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Sık Karşılaşılan Servis Senaryoları"
        icon={<Cpu className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-2">
          <CorporateInfoCard
            title="Görüntü ve Panel"
            icon={<Monitor className="h-5 w-5" />}
            accent="blue"
          >
            <p>
              Panelde ölü piksel, ışık sızması veya ani parlaklık değişimi fark ettiğinizde kullanım süresini not ederek servis formuna ekleyiniz. İlk 30 gün içinde tespit edilen panel hatalarında birebir değişim prosedürü uygulanır.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Isı ve Performans"
            icon={<Thermometer className="h-5 w-5" />}
            accent="amber"
          >
            <p>
              CPU/GPU sıcaklık değerleri sürekli yüksek seyrediyorsa ortam havalandırmasını gözden geçirip kısa süreli kullanım testi yapın. Problem devam ederse log çıktılarıyla birlikte teknik hizmet birimine aktarın.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Fan ve Pompa Sesleri"
            icon={<Fan className="h-5 w-5" />}
            accent="emerald"
          >
            <p>
              Ses seviyesinde artış, titreşim veya düzensiz çalışma belirtileri için cihazı kapatıp güç bağlantısını kesin. Servis kaydında sesin ne zaman başladığını ve ortam koşullarını belirtmek incelemeyi hızlandırır.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Klavye & Portlar"
            icon={<Wrench className="h-5 w-5" />}
            accent="primary"
          >
            <p>
              Entegre klavye, USB veya görüntü çıkışlarında temas problemi varsa temizlik esnasında sıvı kullanılmadığından emin olun. Bağlantı sorunu sürüyorsa cihazı yeniden başlatıp test ederek raporlayın.
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Yetkili Servis ile İletişim"
        icon={<Headphones className="h-5 w-5" />}
      >
        <p>
          AIO sistemlerinizle ilgili garanti kapsamında destek almak için aşağıdaki iletişim kanallarından müşteri hizmetlerimizle bağlantıya geçebilirsiniz.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">destek@green.net.tr</p>
            <p className="text-xs text-slate-500">Servis formu ve arıza videolarını eklemeyi unutmayın.</p>
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
          AIO Garanti Koşulları {lastUpdated} tarihinde revize edilmiştir. Politika değişiklikleri web sitemizde yayınlanır ve yürürlük tarihleriyle beraber duyurulur.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default AioGarantiKosullari
