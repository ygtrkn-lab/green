import {
  RotateCcw,
  Truck,
  Clock3,
  PackageCheck,
  PackageX,
  ShieldCheck,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const stats = [
  {
    value: '14',
    label: 'Gün İade Hakkı',
    description: 'Teslimat tarihinden itibaren 14 gün içinde cayma hakkınızı kullanabilirsiniz.',
    accent: 'blue' as const,
    icon: <RotateCcw className="h-5 w-5" />
  },
  {
    value: '0₺',
    label: 'Ücretsiz İade',
    description: 'İade kargo bedelleri Green Planet Gaming tarafından karşılanır.',
    accent: 'emerald' as const,
    icon: <Truck className="h-5 w-5" />
  },
  {
    value: '3',
    label: 'İş Günü',
    description: 'İade onayı sonrası ücret iadesi en geç 3 iş gününde tamamlanır.',
    accent: 'amber' as const,
    icon: <Clock3 className="h-5 w-5" />
  }
]

const ReturnPolicyPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <CorporateLayout
      title="İade Koşulları"
      subtitle="6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında iade süreçlerimiz, şartlarımız ve işlem adımlarımız."
      heroImage="/images/hero/return.jpg"
      heroBadge="İade"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="İade Sürecine Genel Bakış"
        icon={<RotateCcw className="h-5 w-5" />}
      >
        <p>
          Mesafeli Satış Sözleşmesi hükümleri doğrultusunda, satın aldığınız ürünleri belirtilen koşullar dahilinde kolayca iade edebilirsiniz. Aşağıdaki özet rakamlar iade deneyiminizi planlamanıza yardımcı olur.
        </p>
        <div className="not-prose mt-6 grid gap-5 md:grid-cols-3">
          {stats.map(item => (
            <CorporateInfoCard
              key={item.label}
              title={item.label}
              icon={item.icon}
              accent={item.accent}
            >
              <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="İade Koşulları"
        icon={<ShieldCheck className="h-5 w-5" />}
        description="İade edilebilecek ürünler ile iade kapsamı dışında kalan istisnaları inceleyin."
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <CorporateInfoCard
            title="İade Edilebilir Ürünler"
            icon={<PackageCheck className="h-5 w-5" />}
            accent="emerald"
          >
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Kullanılmamış ve orijinal ambalajında teslim edilen ürünler</li>
              <li>• Fiziksel hasar görmemiş ve çalışır durumda olan ürünler</li>
              <li>• Tüm aksesuar ve parçaları eksiksiz ürünler</li>
              <li>• Fatura ve garanti belgesi bulunan siparişler</li>
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="İade Edilemeyen Ürünler"
            icon={<PackageX className="h-5 w-5" />}
            accent="amber"
          >
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Kişiselleştirilmiş veya özel üretim siparişleri</li>
              <li>• Ambalajı açılmış yazılım ve lisans ürünleri</li>
              <li>• Kullanılmış, hasar görmüş veya hijyen koşullarına uygun olmayan ürünler</li>
              <li>• Kurulum sonrası teknik müdahale gerektiren ürünler</li>
            </ul>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="İade Süreci Adımları"
        icon={<RotateCcw className="h-5 w-5" />}
      >
        <ol className="mt-4 space-y-5 border-l border-primary/30 pl-6 text-sm text-slate-600">
          <li className="relative">
            <span className="absolute -left-[13px] top-1.5 h-3 w-3 rounded-full bg-primary" />
            <p className="font-semibold text-slate-900">İade Talebi Oluşturma</p>
            <p>Hesabınıza giriş yaparak ya da müşteri hizmetlerine ulaşarak iade kaydınızı başlatın.</p>
          </li>
          <li className="relative">
            <span className="absolute -left-[13px] top-1.5 h-3 w-3 rounded-full bg-primary" />
            <p className="font-semibold text-slate-900">İade Kargo Kodu</p>
            <p>Anlaşmalı kargo firması ile paylaşılacak iade kodu tarafınıza iletilir.</p>
          </li>
          <li className="relative">
            <span className="absolute -left-[13px] top-1.5 h-3 w-3 rounded-full bg-primary" />
            <p className="font-semibold text-slate-900">Depo Kontrolü</p>
            <p>Ürününüz depoya ulaştığında yetkili ekibimiz tarafından durum değerlendirmesi yapılır.</p>
          </li>
          <li className="relative">
            <span className="absolute -left-[13px] top-1.5 h-3 w-3 rounded-full bg-primary" />
            <p className="font-semibold text-slate-900">İade Onayı & Ödeme</p>
            <p>Olumlu sonuçlanan iade işlemleri 3 iş gününde ödeme kanalınıza yansıtılır.</p>
          </li>
        </ol>
      </CorporateSection>

      <CorporateSection
        title="Sık Sorulan Sorular"
        icon={<MessageCircle className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-4 md:grid-cols-2">
          <CorporateInfoCard accent="slate">
            <h3 className="text-base font-semibold text-slate-900">İade kargo ücreti ödenir mi?</h3>
            <p className="mt-2 text-sm text-slate-600">Hayır. İade gönderileri için kargo bedelleri firmamız tarafından karşılanmaktadır.</p>
          </CorporateInfoCard>
          <CorporateInfoCard accent="slate">
            <h3 className="text-base font-semibold text-slate-900">Ödeme iadesi süresi nedir?</h3>
            <p className="mt-2 text-sm text-slate-600">İade onayını takiben en geç 3 iş günü içerisinde ödemeniz tarafınıza iade edilir.</p>
          </CorporateInfoCard>
          <CorporateInfoCard accent="slate">
            <h3 className="text-base font-semibold text-slate-900">Ürünü nasıl paketlemeliyim?</h3>
            <p className="mt-2 text-sm text-slate-600">Orijinal ambalaj, aksesuar ve belgeler eksiksiz olacak şekilde, sağlam bir paket içerisinde gönderim yapın.</p>
          </CorporateInfoCard>
          <CorporateInfoCard accent="slate">
            <h3 className="text-base font-semibold text-slate-900">İade sürecini nereden takip edebilirim?</h3>
            <p className="mt-2 text-sm text-slate-600">Hesabım {'>'} Siparişlerim menüsünden veya müşteri temsilcimiz üzerinden süreci takip edebilirsiniz.</p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="İade Destek Kanalları"
        icon={<Phone className="h-5 w-5" />}
      >
        <p className="mb-4 text-sm text-slate-600">
          İade süreci boyunca destek almak için aşağıdaki iletişim kanallarımızı kullanabilirsiniz.
        </p>
        <div className="not-prose grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Phone className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">Telefon</p>
            <p className="text-sm text-slate-600">+90 212 555 0123</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="blue">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">info@green.net.tr</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<MessageCircle className="h-5 w-5" />} accent="emerald">
            <p className="text-sm font-semibold text-slate-900">WhatsApp</p>
            <p className="text-sm text-slate-600">+90 532 555 0123</p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Güncelleme Notu"
        icon={<ShieldCheck className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Bu iade koşulları {lastUpdated} tarihinde güncellenmiştir. Yapılacak değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default ReturnPolicyPage
