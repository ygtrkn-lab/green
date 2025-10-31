import {
  Keyboard,
  Mouse,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  ClipboardList,
  PackageCheck,
  Sparkles,
  Target,
  Cable,
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

const MouseKlavyeGarantiKosullari = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const garantiKapsami = [
    'Switch, tuş mekanizması ve sensörlerde üretim kaynaklı arızalar',
    'PCB ve kablolarda malzeme kusuruna bağlı temassızlık sorunları',
    'Kablosuz modellerde anten, dongle ve batarya bileşeni hataları',
    'RGB aydınlatma devrelerindeki fabrika çıkışlı arızalar'
  ]

  const garantiHaric = [
    'Düşme, darbe, sıvı teması ve aşırı basınç kaynaklı fiziksel hasarlar',
    'Keycap veya mouse tekeri gibi sarf parçalarının kullanıcı kaynaklı kırılması',
    'Yetkisiz firmware yükleme ve donanımsal modifikasyonlar',
    'Standart dışı yüzeylerde (cam, metal ızgara vb.) kullanımda oluşan sensör hataları',
    'Yanlış temizlik kimyasalları nedeniyle oluşan yüzey deformasyonları'
  ]

  const kullaniciOnerileri = [
    {
      title: 'Profesyonel Kalibrasyon',
      description:
        'Gaming mouse sensör kalibrasyonu yazılım üzerinden yapılmalı, manuel modifikasyonlardan kaçınılmalıdır.',
      icon: <Target className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Anahtar Ömrü',
      description:
        'Mekanik anahtarlar belirli tıklama ömrüne sahiptir; aşırı kuvvet uygulamak uzun vadeli performansı düşürür.',
      icon: <Sparkles className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'Kablo Yönetimi',
      description:
        'Paracord ve braided kabloları keskin köşelerden uzak tutun; mouse bungee kullanımı kablo sağlığını korur.',
      icon: <Cable className="h-5 w-5" />,
      accent: 'amber' as const
    }
  ]

  const bakimRutini = [
    {
      title: 'Yüzey Temizliği',
      description:
        'Klavye ve mouse yüzeylerini haftalık olarak mikrofiber bez ve izopropil alkol içermeyen çözücülerle temizleyin.',
      icon: <Sparkles className="h-5 w-5" />,
      accent: 'blue' as const
    },
    {
      title: 'Switch Kontrolü',
      description:
        'Tuş veya tıklama hissinde farklılık gözlemlendiğinde kullanıma ara verip servisle iletişime geçin; yağlama işlemleri yalnızca yetkili hizmette yapılmalıdır.',
      icon: <Settings className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Kablosuz Performans',
      description:
        'Batarya verimliliğini korumak için cihazınızı ayda bir kez %20 seviyesine düşürüp tam şarj edin, dongle için 2.4 GHz parazitini azaltacak konumlandırma yapın.',
      icon: <Activity className="h-5 w-5" />,
      accent: 'emerald' as const
    }
  ]

  const servisAdimlari = [
    'Cihaz seri numarası, fatura tarihi ve yaşadığınız sorunun detaylı açıklamasını hazırlayın.',
    'Destek portalı veya müşteri hizmetleri üzerinden garanti talep formu oluşturun.',
    'Onaylanan paketleme talimatlarına göre cihazı çizilmeyecek şekilde korumalı kılıfa yerleştirin.',
    'Servis merkezine ulaşan ürünler elektronik anahtar ve sensör testlerinden geçirildikten sonra değerlendirilir.',
    'Onarım veya değişim sonucu, kargo takip bilgileri ile birlikte tarafınıza iletilir.'
  ]

  return (
    <CorporateLayout
      title="Mouse ve Klavye Garanti Koşulları"
      subtitle="Green Planet Gaming çevresel ürünleriniz için garanti kapsamı, bakım rutinleri ve servis süreçlerini kapsayan rehber."
      heroImage="/images/hero/warranty.png"
      heroBadge="Çevresel Garanti"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Çevresel Ürün Garantisi"
        icon={<Keyboard className="h-5 w-5" />}
        description="Mekanik klavyeler ve yüksek hassasiyetli mouse modellerimizi uzun ömürlü kullanım için premium garanti prosedürleriyle destekliyoruz."
      >
        <p>
          Tüm periferik ürünlerimiz, pro oyuncu standartlarını karşılayacak dayanıklılık testlerinden geçer.{' '}
          <strong>Fatura tarihinden itibaren 24 ay boyunca</strong> üretim kaynaklı arızalarda ücretsiz teknik destek ve yedek parça değişimi sağlanır. Garanti haklarınızın korunması için orijinal yazılım ve aksesuarlarla kullanım önemlidir.
        </p>
        <div className="not-prose mt-8 grid gap-6 md:grid-cols-3">
          {kullaniciOnerileri.map(oner => (
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
        description="Garanti haklarından eksiksiz yararlanmak için kapsam dahilindeki ve dışındaki durumları dikkatlice inceleyin."
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
        icon={<Mouse className="h-5 w-5" />}
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
        description="Talep oluşturmanızdan ürününüzün teslimine kadar geçen tüm adımlar."
      >
        <ol className="list-decimal space-y-3 pl-5 text-sm">
          {servisAdimlari.map(adim => (
            <li key={adim}>{adim}</li>
          ))}
        </ol>
        <div className="not-prose mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary">
          Cihaz üzerinde yetkisiz switch değişimi, kablo modifikasyonu veya firmware yüklemesi yapılması garanti kapsamını geçersiz hale getirir.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Sık Karşılaşılan Servis Senaryoları"
        icon={<Settings className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-6 md:grid-cols-2">
          <CorporateInfoCard
            title="Çift Tıklama / Ghosting"
            icon={<Mouse className="h-5 w-5" />}
            accent="primary"
          >
            <p>
              Çift tıklama, ghosting veya tuş boşa basma problemi oluştuğunda yazılımı güncelleyip test edin. Sorun devam ederse kullanım sürelerini not ederek servis kaydı açın.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Bağlantı Kopmaları"
            icon={<Cable className="h-5 w-5" />}
            accent="emerald"
          >
            <p>
              Kablosuz bağlantıda kopma yaşıyorsanız dongle mesafesini azaltın ve yoğun RF sinyallerden uzaklaştırın. Kablolu kullanımda kabloyu değiştirerek test edin.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Aydınlatma Sorunları"
            icon={<Sparkles className="h-5 w-5" />}
            accent="blue"
          >
            <p>
              RGB bölgelerinde yanıp sönme veya renk sapması fark edildiğinde yazılım profillerini sıfırlayıp tekrar deneyin; devam eden durumlarda video kaydıyla servis formu gönderin.
            </p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Keycap & Kaplama"
            icon={<Keyboard className="h-5 w-5" />}
            accent="amber"
          >
            <p>
              PBT keycap üzerinde renk solması veya kaplama soyulması gözlemlerseniz fotoğraf ile destek talebi açın. Fiziksel kırıklar kullanıcı kaynaklı olarak değerlendirilir.
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Yetkili Servis ile İletişim"
        icon={<Headphones className="h-5 w-5" />}
      >
        <p>
          Mouse ve klavye ürünleriniz için garanti sürecini başlatmak üzere aşağıdaki iletişim kanallarından müşteri hizmetlerimize ulaşabilirsiniz.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">destek@green.net.tr</p>
            <p className="text-xs text-slate-500">Arıza videosu ve yazılım sürüm bilgisini eklemeyi unutmayın.</p>
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
          Mouse ve Klavye Garanti Koşulları {lastUpdated} tarihinde güncellenmiştir. Tüm değişiklikler web sitemizde duyurulur ve yürürlük tarihleri belirtilir.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default MouseKlavyeGarantiKosullari
