import {
  FileText,
  Users,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Clock3,
  Building2,
  Phone
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const paymentMethods = [
  'Kredi Kartı (Tek çekim ve taksit seçenekleri)',
  'Banka Kartı',
  'Havale/EFT',
  'Kapıda Ödeme (Nakit veya Kredi Kartı)'
]

const deliveryHighlights = [
  {
    title: 'Ücretsiz Kargo',
    description: '500 TL ve üzeri alışverişlerde kargo ücretsizdir.',
    icon: <Truck className="h-5 w-5" />,
    accent: 'primary' as const
  },
  {
    title: 'Hızlı Teslimat',
    description: 'İstanbul içi siparişlerde aynı gün teslimat seçeneği.',
    icon: <Clock3 className="h-5 w-5" />,
    accent: 'blue' as const
  }
]

const nonReturnableItems = [
  'Özel olarak üretilen veya kişiselleştirilen ürünler',
  'Hijyen açısından uygun olmayan ürünler',
  'Ambalajı açılmış yazılım ürünleri',
  'Kullanılmış veya hasarlı ürünler'
]

const warrantyTable = [
  { category: 'Gaming PC', period: '2 Yıl', coverage: 'Üretici hatası' },
  { category: 'Klavye & Mouse', period: '1 Yıl', coverage: 'Üretici hatası' },
  { category: 'Soğutma Sistemleri', period: '3 Yıl', coverage: 'Üretici hatası' }
]

const SalesAgreementPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <CorporateLayout
      title="Satış Sözleşmesi"
      subtitle="www.green.net.tr üzerinden gerçekleştirilen tüm alışverişlerde geçerli olan satış sözleşmesi hükümleri ve tarafların yükümlülükleri."
      heroImage="/images/hero/agreement.jpg"
      heroBadge="Yasal"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Taraflar"
        icon={<Users className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <CorporateInfoCard
            title="SATICI"
            icon={<Building2 className="h-5 w-5" />}
            accent="primary"
          >
            <ul className="space-y-1 text-sm text-slate-600">
              <li><strong>Ünvan:</strong> Green Planet Gaming Teknoloji A.Ş.</li>
              <li><strong>Adres:</strong> Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23 Ümraniye – İstanbul / TÜRKİYE</li>
              <li><strong>Telefon:</strong> +90 216 473 36 01 / +90 216 GREEN 01</li>
              <li><strong>E-posta:</strong> info@green.net.tr</li>
              <li><strong>Vergi Dairesi:</strong> Ümraniye Vergi Dairesi</li>
              <li><strong>Vergi No:</strong> 1234567890</li>
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="ALICI"
            icon={<Users className="h-5 w-5" />}
            accent="slate"
          >
            <p className="text-sm text-slate-600">Sipariş sürecinde iletilen kişi veya kurum bilgileri alıcı olarak kabul edilir ve sözleşme hükümleri bu bilgiler üzerinden uygulanır.</p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Sözleşme Konusu"
        icon={<FileText className="h-5 w-5" />}
      >
        <p>
          Bu sözleşme, ALICI’nın www.green.net.tr adresinden sipariş ettiği ürünlerin satışı ve teslimine ilişkin usul ve esasları düzenler. Elektronik ortamda onaylanan siparişe dair ürün nitelikleri ve fiyat bilgileri sözleşmenin ayrılmaz parçasıdır.
        </p>
      </CorporateSection>

      <CorporateSection
        title="Ürün Bilgileri"
        icon={<Package className="h-5 w-5" />}
        description="Sipariş onay e-postasında ve ürün sayfalarında paylaşılan bilgiler bağlayıcıdır."
      >
        <div className="not-prose grid gap-3 md:grid-cols-2 text-sm text-slate-600">
          {['Ürün adı ve modeli', 'Teknik özellikler', 'Garanti süresi ve koşulları', 'Satış fiyatı (KDV dahil)', 'Teslimat süresi', 'Kargo ücreti (varsa)'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Fiyat ve Ödeme Koşulları"
        icon={<CreditCard className="h-5 w-5" />}
      >
        <p>
          Tüm fiyatlar Türk Lirası olarak KDV dahil biçimde belirtilir. Ödeme işlemleri SSL sertifikası ile korunan güvenli alanlarda gerçekleştirilir.
        </p>
        <CorporateInfoCard
          title="Kabul Edilen Ödeme Yöntemleri"
          icon={<CreditCard className="h-5 w-5" />}
          accent="primary"
        >
          <ul className="space-y-2 text-sm text-slate-600">
            {paymentMethods.map(method => (
              <li key={method} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{method}</span>
              </li>
            ))}
          </ul>
        </CorporateInfoCard>
      </CorporateSection>

      <CorporateSection
        title="Teslimat Koşulları"
        icon={<Truck className="h-5 w-5" />}
      >
        <p className="mb-4 text-sm text-slate-600">
          Siparişler, ödeme onaylandıktan sonra stok durumuna göre 3-5 iş günü içinde kargoya teslim edilir. Teslimat, anlaşmalı lojistik firmaları aracılığıyla gerçekleştirilir.
        </p>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          {deliveryHighlights.map(feature => (
            <CorporateInfoCard
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              accent={feature.accent}
            >
              <p className="text-sm text-slate-600">{feature.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="İptal ve İade Koşulları"
        icon={<RotateCcw className="h-5 w-5" />}
      >
        <p className="mb-4 text-sm text-slate-600">
          ALICI, ürünü teslim aldığı tarihten itibaren 14 gün içerisinde hiçbir gerekçe göstermeksizin cayma hakkını kullanabilir. İade süreçleri 6502 sayılı Kanun kapsamında yürütülür.
        </p>
        <CorporateInfoCard
          title="İade Edilemeyen Ürünler"
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="amber"
        >
          <ul className="space-y-2 text-sm text-slate-600">
            {nonReturnableItems.map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CorporateInfoCard>
      </CorporateSection>

      <CorporateSection
        title="Garanti Koşulları"
        icon={<ShieldCheck className="h-5 w-5" />}
      >
        <p className="mb-6 text-sm text-slate-600">
          Ürünler üretici veya ithalatçı garantisi altındadır. Garanti kapsamı; ürün kategorisine, kullanım koşullarına ve yetkili servis raporlarına göre değerlendirilir.
        </p>
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-primary/10 text-slate-900">
                <tr className="text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Ürün Kategorisi</th>
                  <th className="px-6 py-4 font-semibold">Garanti Süresi</th>
                  <th className="px-6 py-4 font-semibold">Kapsam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {warrantyTable.map(row => (
                  <tr key={row.category} className="transition hover:bg-primary/5">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.category}</td>
                    <td className="px-6 py-4 text-primary font-semibold">{row.period}</td>
                    <td className="px-6 py-4 text-slate-600">{row.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Mücbir Sebepler"
        icon={<AlertTriangle className="h-5 w-5" />}
      >
        <p>
          Doğal afetler, savaş, terör, grev, altyapı sorunları, internet kesintileri ve benzeri mücbir sebeplerden kaynaklanan gecikmelerde taraflar sorumluluk taşımaz. Bu durumun sürmesi halinde sözleşme askıya alınabilir.
        </p>
      </CorporateSection>

      <CorporateSection
        title="Uygulanacak Hukuk ve Yetki"
        icon={<Scale className="h-5 w-5" />}
      >
        <p>
          Sözleşmeden doğacak uyuşmazlıklarda İstanbul (Anadolu) Mahkemeleri ve İcra Müdürlükleri yetkilidir. Sözleşme hükümleri Türk Hukuku’na tabidir.
        </p>
      </CorporateSection>

      <CorporateSection
        title="Yürürlük"
        icon={<FileText className="h-5 w-5" />}
      >
        <p className="mb-6 text-sm text-slate-600">
          ALICI’nın elektronik ortamda onayı ile yürürlüğe giren bu sözleşme taraflar için bağlayıcıdır. Sözleşme hükümleri sipariş tamamlandığı anda kabul edilmiş sayılır.
        </p>
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <CorporateInfoCard
            title="Şirket Merkezi"
            icon={<Building2 className="h-5 w-5" />}
            accent="primary"
          >
            <p className="text-sm font-semibold text-slate-900">Green Planet Gaming Teknoloji A.Ş.</p>
            <p className="text-sm text-slate-600">Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23 Ümraniye – İstanbul / TÜRKİYE</p>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Müşteri İletişim"
            icon={<Phone className="h-5 w-5" />}
            accent="emerald"
          >
            <p className="text-sm font-semibold text-slate-900">İletişim</p>
            <p className="text-sm text-slate-600">Telefon: +90 216 473 36 01 / +90 216 GREEN 01</p>
            <p className="text-sm text-slate-600">E-posta: info@green.net.tr</p>
            <p className="text-sm text-slate-600">Web: www.green.net.tr</p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Güncelleme Notu"
        icon={<Clock3 className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Bu satış sözleşmesi {lastUpdated} tarihinde güncellenmiştir. Yapılacak değişiklikler web sitemizde duyurulacak olup yayınlandığı tarihte yürürlüğe girer.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default SalesAgreementPage
