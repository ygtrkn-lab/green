import {
  FileText,
  Database,
  ShieldCheck,
  Lock,
  Cookie,
  Clock3,
  Scale,
  Mail,
  Info,
  Phone,
  MapPin
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const PrivacyPolicyPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <CorporateLayout
      title="Gizlilik Politikası"
      subtitle="Kişisel verilerinizin korunması ve gizliliğiniz hakkında bilmeniz gereken tüm detaylar."
      heroImage="/images/hero/privacy.jpg"
      heroBadge="Gizlilik"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Giriş"
        icon={<FileText className="h-5 w-5" />}
      >
        <p>
          Green Planet Gaming olarak kişisel verilerinizin güvenliği konusunda en yüksek hassasiyeti gösteriyoruz. Bu gizlilik politikası, web sitemizi kullanırken kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu şeffaf biçimde açıklamaktadır.
        </p>
        <div className="not-prose mt-6 rounded-2xl border border-white/30 bg-slate-900/80 p-5 text-sm text-white/80 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.75)]">
          Gizlilik yaklaşımımız; kişisel verilerinizi yalnızca açık ve meşru amaçlar doğrultusunda işlemek, gerektiği kadar saklamak ve güvenliğini sağlamak üzerine kuruludur.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Toplanan Veriler"
        icon={<Database className="h-5 w-5" />}
        description="Verilerinizi yalnızca hizmetlerimizi sunmak ve deneyiminizi iyileştirmek amacıyla topluyoruz."
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          <CorporateInfoCard
            title="Otomatik Olarak Toplanan Veriler"
            icon={<Database className="h-5 w-5" />}
            accent="blue"
          >
            <ul className="space-y-1 text-sm">
              <li>• IP adresi</li>
              <li>• Tarayıcı türü ve versiyonu</li>
              <li>• İşletim sistemi bilgisi</li>
              <li>• Ziyaret edilen sayfalar</li>
              <li>• Ziyaret tarihi ve süresi</li>
            </ul>
          </CorporateInfoCard>

          <CorporateInfoCard
            title="Kullanıcı Tarafından Sağlanan Veriler"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="emerald"
          >
            <ul className="space-y-1 text-sm">
              <li>• Ad ve soyad</li>
              <li>• E-posta adresi</li>
              <li>• Telefon numarası</li>
              <li>• Teslimat adresi</li>
              <li>• Fatura bilgileri</li>
            </ul>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Verilerin Kullanımı"
        icon={<ShieldCheck className="h-5 w-5" />}
      >
        <p>
          Toplanan kişisel verileriniz, yalnızca hizmetlerimizi sunmak, geliştirmek ve size daha güvenli bir alışveriş deneyimi sağlamak için kullanılmaktadır.
        </p>
        <div className="not-prose mt-6 grid gap-5 md:grid-cols-2">
          <CorporateInfoCard
            title="Temel Hizmetler"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="primary"
          >
            <ul className="space-y-1 text-sm">
              <li>• Sipariş işlemlerinin yönetimi</li>
              <li>• Ürün teslimatı ve lojistik takibi</li>
              <li>• Müşteri hizmetleri desteği</li>
              <li>• Faturalama ve ödeme süreçleri</li>
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="İyileştirme & Analiz"
            icon={<Database className="h-5 w-5" />}
            accent="blue"
          >
            <ul className="space-y-1 text-sm">
              <li>• Site performans analizi</li>
              <li>• Kullanıcı deneyimi optimizasyonu</li>
              <li>• Hizmet kalitesi geliştirme</li>
              <li>• Güvenlik ihlallerini önleme</li>
            </ul>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Veri Güvenliği"
        icon={<Lock className="h-5 w-5" />}
      >
        <p>
          Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemleri birlikte uyguluyoruz. Bilgi güvenliği süreçlerimizi düzenli olarak gözden geçiriyoruz.
        </p>
        <div className="not-prose mt-6 grid gap-5 md:grid-cols-2">
          <CorporateInfoCard
            title="Teknik Önlemler"
            icon={<Lock className="h-5 w-5" />}
            accent="emerald"
          >
            <ul className="space-y-1 text-sm">
              <li>• SSL şifreleme ve HTTPS altyapısı</li>
              <li>• Güvenlik duvarları ve saldırı tespit sistemleri</li>
              <li>• Düzenli güvenlik güncellemeleri</li>
              <li>• Veri yedekleme ve felaket kurtarma planları</li>
            </ul>
          </CorporateInfoCard>
          <CorporateInfoCard
            title="İdari Önlemler"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="amber"
          >
            <ul className="space-y-1 text-sm">
              <li>• Personel yetkilendirme ve eğitimleri</li>
              <li>• Erişim kontrol politikaları</li>
              <li>• Düzenli iç denetimler</li>
              <li>• Veri işleme prosedürleri</li>
            </ul>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Çerezler ve Takip Teknolojileri"
        icon={<Cookie className="h-5 w-5" />}
      >
        <p>
          Web sitemizde çerezler ve benzer teknolojiler kullanılarak oturum bilgileri tutulur, tercihlerinizi hatırlanır ve site performansımız analiz edilir. Daha ayrıntılı bilgi için Çerez Politikamızı inceleyebilirsiniz.
        </p>
        <div className="not-prose mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-800">
          <h3 className="mb-2 text-base font-semibold">Çerez Tercihleri</h3>
          Tarayıcı ayarlarınız üzerinden çerez tercihlerinizi dilediğiniz zaman değiştirebilir veya çerez kullanımını tamamen devre dışı bırakabilirsiniz.
        </div>
      </CorporateSection>

      <CorporateSection
        title="Veri Saklama ve Silme"
        icon={<Clock3 className="h-5 w-5" />}
      >
        <p>
          Kişisel verileriniz, hizmet sunumunun gerektirdiği veya yasal yükümlülüklerimiz kapsamında zorunlu kılındığı süre boyunca saklanır. Bu sürelerin sonunda veriler güvenli yöntemlerle anonim hale getirilir veya silinir.
        </p>
        <div className="not-prose mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
          <h3 className="mb-2 text-base font-semibold text-slate-900">Veri Silme Talepleri</h3>
          <p className="text-sm text-slate-600">
            Kişisel verilerinizin silinmesini talep etmek için müşteri hizmetlerimizle iletişime geçebilirsiniz. Yasal saklama zorunluluğu bulunan veriler hariç olmak üzere, tüm kayıtlar talebiniz üzerine kalıcı olarak silinir.
          </p>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Yasal Haklar"
        icon={<Scale className="h-5 w-5" />}
      >
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>Verilerinizin işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmiş verilerinizin düzeltilmesini isteme</li>
          <li>Kişisel verilerinizin silinmesini veya yok edilmesini talep etme</li>
        </ul>
      </CorporateSection>

      <CorporateSection
        title="İletişim"
        icon={<Mail className="h-5 w-5" />}
      >
        <p>
          Gizlilik politikamız hakkında sorularınız ve veri koruma talepleriniz için bize ulaşabileceğiniz iletişim kanalları:
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">info@green.net.tr</p>
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
        title="Güncelleme Notu"
        icon={<Info className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Bu gizlilik politikası son olarak {lastUpdated} tarihinde güncellenmiştir. Politika üzerinde yapılacak değişiklikler web sitemizde yayınlanacak ve yürürlük tarihiyle birlikte duyurulacaktır.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default PrivacyPolicyPage
