import {
  ShieldCheck,
  FileText,
  UserCheck,
  Globe,
  Database,
  Lock,
  Scale,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const KvkkAydinlatmaMetniPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const islenenVeriKategorileri = [
    'Kimlik bilgileri (ad, soyad, T.C. kimlik numarası, vergi numarası)',
    'İletişim bilgileri (adres, e-posta, telefon, IP bilgisi)',
    'Müşteri işlem bilgileri (sipariş, talep, destek kayıtları)',
    'Finansal bilgiler (fatura, ödeme ve iade kayıtları)',
    'Pazarlama bilgileri (kampanya tercihleri, çerez verileri)'
  ]

  const veriIslemeAmaclari = [
    {
      title: 'Hizmet Sunumu',
      description:
        'Ürün ve hizmet satış süreçlerinin yürütülmesi, teslimat, iade ve teknik destek işlemlerinin tamamlanması.',
      accent: 'primary' as const
    },
    {
      title: 'Müşteri İlişkileri',
      description:
        'Müşteri memnuniyetinin ölçülmesi, talep ve şikâyet yönetimi, sözleşme süreçlerinin yürütülmesi.',
      accent: 'emerald' as const
    },
    {
      title: 'Pazarlama ve Analiz',
      description:
        'Kampanya ve promosyonların duyurulması, kullanıcı deneyimlerinin iyileştirilmesi, istatistiki değerlendirmeler.',
      accent: 'amber' as const
    },
    {
      title: 'Yasal Yükümlülükler',
      description:
        'Vergi mevzuatı, tüketici kanunu ve diğer yasal yükümlülüklere uyum amacıyla gerekli kayıt ve bildirimlerin yapılması.',
      accent: 'blue' as const
    }
  ]

  const veriAktarimAdresleri = [
    {
      title: 'Yurt İçi Aktarımlar',
      description:
        'Lojistik iş ortakları, finans kuruluşları, müşteri hizmetleri sağlayıcıları ve teknik destek ekipleri ile paylaşım yapılabilir.',
      icon: <FileText className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'Yurt Dışı Aktarımlar',
      description:
        'Bulut hizmetleri ve altyapı sağlayıcıları ile sözleşmeler kapsamında KVKK ve GDPR uyumluluk kriterlerine uygun şekilde veri aktarımı yapılır.',
  icon: <Globe className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Kamu Kurumlarına Aktarım',
      description:
        'Yasal zorunluluklar kapsamında yetkili kamu kurum ve kuruluşlarına ilgili mevzuat çerçevesinde veri paylaşımı yapılabilir.',
      icon: <Scale className="h-5 w-5" />,
      accent: 'amber' as const
    }
  ]

  return (
    <CorporateLayout
      title="KVKK Aydınlatma Metni"
      subtitle="Kişisel verilerinizin hangi amaçlarla işlendiği, hangi taraflarla paylaşıldığı ve KVKK kapsamında sahip olduğunuz haklar hakkında bilgilendirme."
      heroImage="/images/hero/privacy.jpg"
      heroBadge="KVKK"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Veri Sorumlusu"
        icon={<ShieldCheck className="h-5 w-5" />}
        description="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla bilgilendirme."
      >
        <p>
          Green Planet Gaming olarak kişisel verilerinizi KVKK ve ilgili mevzuata uygun şekilde işliyor, saklıyor ve koruyoruz. Bu aydınlatma metni, veri sorumlusu olarak sorumluluklarımızı ve verilerinizi işleme şekillerimizi şeffaf biçimde açıklamaktadır.
        </p>
        <p>
          Kişisel verilerinizin güvenliği, gizliliği ve bütünlüğü bizim için önceliklidir. Veri işleme faaliyetlerimizi yalnızca belirtilen amaçlar doğrultusunda ve hukuki yükümlülüklerimiz kapsamında gerçekleştiriyoruz.
        </p>
      </CorporateSection>

      <CorporateSection
        title="İşlenen Kişisel Veri Kategorileri"
        icon={<Database className="h-5 w-5" />}
      >
        <ul className="space-y-2 text-sm">
          {islenenVeriKategorileri.map(madde => (
            <li key={madde}>• {madde}</li>
          ))}
        </ul>
      </CorporateSection>

      <CorporateSection
        title="Veri İşleme Amaçları"
        icon={<FileText className="h-5 w-5" />}
        description="Kişisel verileriniz aşağıdaki amaçlar doğrultusunda işlenmektedir."
      >
        <div className="not-prose grid gap-6 md:grid-cols-2">
          {veriIslemeAmaclari.map(amac => (
            <CorporateInfoCard
              key={amac.title}
              title={amac.title}
              accent={amac.accent}
            >
              <p>{amac.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Verilerin Toplanma Yöntemleri"
        icon={<UserCheck className="h-5 w-5" />}
      >
        <ul className="space-y-2 text-sm">
          <li>• Web sitemiz, mobil uygulamalar ve online işlemler sırasında iletilen bilgiler</li>
          <li>• Müşteri hizmetleri iletişimleri, destek talepleri ve kayıtlı telefon görüşmeleri</li>
          <li>• Kampanya ve etkinliklere katılım, bülten üyelikleri, yarışmalar</li>
          <li>• Fiziksel mağaza, fuar ve etkinliklerde alınan başvuru iletümleri</li>
        </ul>
      </CorporateSection>

      <CorporateSection
        title="Verilerin Saklanma Süresi"
        icon={<Lock className="h-5 w-5" />}
        description="Kişisel verileriniz, yürürlükteki mevzuat hükümleri ve şirket politikalarımız doğrultusunda saklanır."
      >
        <p>
          Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca; böyle bir süre öngörülmemişse işleme amaçları ile sınırlı olmak kaydıyla uygun süre boyunca saklanacaktır. Veriler, yasal zamanaşımı süreleri ve sözleşmesel yükümlülükler dikkate alınarak arşivlenir.
        </p>
        <p>
          Saklama süresi sona eren veriler, periyodik imha süreçleri kapsamında KVKK ve ilgili yönetmeliklere uygun şekilde anonimleştirilir veya silinir.
        </p>
      </CorporateSection>

      <CorporateSection
        title="Veri Aktarımı"
  icon={<Globe className="h-5 w-5" />}
        description="Kişisel verilerin paylaşılabileceği taraflar ve aktarım şartları."
      >
        <div className="not-prose grid gap-6 md:grid-cols-3">
          {veriAktarimAdresleri.map(kanal => (
            <CorporateInfoCard
              key={kanal.title}
              title={kanal.title}
              icon={kanal.icon}
              accent={kanal.accent}
            >
              <p>{kanal.description}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="KVKK Madde 11 Kapsamındaki Haklarınız"
        icon={<Scale className="h-5 w-5" />}
      >
        <ul className="space-y-2 text-sm">
          <li>• Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>• İşlenen verilerinizle ilgili bilgi talep etme</li>
          <li>• Verilerinizin amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>• Yurt içinde veya yurt dışında verilerinizin aktarıldığı üçüncü kişileri bilme</li>
          <li>• Verilerinizin eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme</li>
          <li>• KVKK ve ilgili mevzuata aykırı olarak işlenmesi durumunda verilerinizin silinmesini veya yok edilmesini isteme</li>
          <li>• İşlemenin kanuna aykırı olması sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>
      </CorporateSection>

      <CorporateSection
        title="Haklarınız İçin Başvuru Kanalları"
        icon={<Mail className="h-5 w-5" />}
      >
        <p>
          KVKK kapsamındaki taleplerinizi, kimlik teyidi sağlayacak belgelerle birlikte aşağıdaki iletişim kanalları üzerinden iletebilirsiniz.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">kvkk@green.net.tr</p>
            <p className="text-xs text-slate-500">Islak imzalı başvurularınızı tarayarak e-posta ile iletebilirsiniz.</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<Phone className="h-5 w-5" />} accent="emerald">
            <p className="text-sm font-semibold text-slate-900">Telefon</p>
            <p className="text-sm text-slate-600">+90 216 473 36 01</p>
            <p className="text-sm text-slate-600">+90 216 GREEN 01</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<MapPin className="h-5 w-5" />} accent="blue">
            <p className="text-sm font-semibold text-slate-900">Adres</p>
            <p className="text-sm text-slate-600">
              Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23 Ümraniye – İstanbul / TÜRKİYE
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Başvuru Süreci"
        icon={<Clock className="h-5 w-5" />}
      >
        <p>
          Başvurularınızı en geç 30 gün içerisinde değerlendiriyoruz. Başvurunuzun karmaşıklığına göre ek bilgi talep edebilir veya süreyi 30 gün daha uzatabiliriz. Tüm süreçler KVKK ve ikincil düzenlemelere uygun şekilde yürütülür.
        </p>
        <div className="not-prose mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-primary">
          Veri güvenliğinizi sağlamak amacıyla başvuruların şahsen veya noter onaylı vekâletname ile yapılması durumlarını dikkate alıyoruz.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Veri Güvenliği"
        icon={<ShieldCheck className="h-5 w-5" />}
        description="Teknik ve idari tedbirlerimiz hakkında özet bilgiler."
      >
        <p>
          Verilerinizi saklarken şifreleme, erişim kontrolü, iki faktörlü kimlik doğrulama ve ağ segmentasyonu gibi teknik güvenlik önlemleri uyguluyoruz. İdari tedbirler kapsamında çalışanlarımız için düzenli KVKK farkındalık eğitimleri düzenliyor, iç denetim ve politika yönetim süreçleri yürütüyoruz.
        </p>
        <p>
          Üçüncü taraflarla yapılan sözleşmelerde veri işleme şartlarını açıkça belirtiyor, iş ortaklarımızın KVKK uyumluluğunu denetliyoruz. Güvenlik ihlallerinde yasal bildirim yükümlülüklerini yerine getiriyor, etkilenen kişileri bilgilendiriyoruz.
        </p>
      </CorporateSection>

      <CorporateSection
        title="Güncelleme Notu"
        icon={<AlertCircle className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          KVKK Aydınlatma Metni {lastUpdated} tarihinde güncellenmiştir. Düzenlemelerde yapılacak değişiklikler web sitemiz üzerinden duyurulacak ve yürürlük tarihleriyle birlikte paylaşılarak şeffaflık esas alınacaktır.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default KvkkAydinlatmaMetniPage
