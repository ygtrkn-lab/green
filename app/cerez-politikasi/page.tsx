import {
  Cookie,
  Layers,
  LineChart,
  Settings,
  Megaphone,
  BookMarked,
  SlidersHorizontal,
  Globe,
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const CookiePolicyPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <CorporateLayout
      title="Çerez Politikası"
      subtitle="Web sitemizde kullanılan çerezlerin türleri, amaçları ve kontrol yöntemleri hakkında bilgilendirme."
      heroImage="/images/hero/cookies.jpg"
      heroBadge="Çerez Politikası"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Çerez Nedir?"
        icon={<Cookie className="h-5 w-5" />}
      >
        <p>
          Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Green Planet Gaming olarak çerezleri, sitemizin doğru şekilde çalışmasını sağlamak, deneyiminizi kişiselleştirmek ve performansımızı analiz etmek için kullanıyoruz.
        </p>
        <p>
          Çerez politikamız, hangi çerezleri ne amaçla kullandığımızı ve dilerseniz bu tercihleri nasıl yönetebileceğinizi açıklamaktadır.
        </p>
      </CorporateSection>

      <CorporateSection
        title="Çerez Türleri"
        icon={<Layers className="h-5 w-5" />}
        description="Sitemizde kullanılan tüm çerez kategorileri, kullanım amaçlarına göre sınıflandırılmıştır."
      >
        <div className="not-prose mt-6 grid gap-5 sm:grid-cols-2">
          <CorporateInfoCard
            title="Zorunlu Çerezler"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="primary"
          >
            Web sitesinin güvenlik, oturum yönetimi ve alışveriş sepeti gibi temel işlevlerini sorunsuz şekilde çalıştırmak için gereklidir.
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Performans Çerezleri"
            icon={<LineChart className="h-5 w-5" />}
            accent="blue"
          >
            Ziyaret istatistiklerini toplayarak hangi sayfaların ilgi gördüğünü ve kullanıcıların sitede ne kadar zaman geçirdiğini analiz eder.
          </CorporateInfoCard>
          <CorporateInfoCard
            title="İşlevsellik Çerezleri"
            icon={<Settings className="h-5 w-5" />}
            accent="emerald"
          >
            Dil seçimi, tema tercihi gibi kullanıcı ayarlarını hatırlayarak sonraki ziyaretlerinizde kişiselleştirilmiş bir deneyim sunar.
          </CorporateInfoCard>
          <CorporateInfoCard
            title="Pazarlama Çerezleri"
            icon={<Megaphone className="h-5 w-5" />}
            accent="amber"
          >
            İlgi alanlarınıza göre daha alakalı kampanya ve ürün önerileri sunabilmek için reklam platformlarıyla birlikte çalışır.
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Kullandığımız Çerezler"
        icon={<BookMarked className="h-5 w-5" />}
        description="Sık kullanılan çerezlerimizin kapsamlı listesi ve kullanım amaçları aşağıda yer almaktadır."
      >
        <div className="not-prose overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-sm">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-900/5 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Çerez Adı</th>
                <th className="px-6 py-4 font-semibold">Türü</th>
                <th className="px-6 py-4 font-semibold">Süre</th>
                <th className="px-6 py-4 font-semibold">Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">session_id</td>
                <td className="px-6 py-4">Zorunlu</td>
                <td className="px-6 py-4">Oturum</td>
                <td className="px-6 py-4">Kullanıcı oturumunu yönetir ve güvenli oturum geçişlerini sağlar.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">cart_items</td>
                <td className="px-6 py-4">Zorunlu</td>
                <td className="px-6 py-4">7 gün</td>
                <td className="px-6 py-4">Sepet içeriğini saklayarak alışveriş deneyiminizin kesintisiz devam etmesini sağlar.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">user_preferences</td>
                <td className="px-6 py-4">İşlevsellik</td>
                <td className="px-6 py-4">1 yıl</td>
                <td className="px-6 py-4">Dil, tema ve diğer kullanıcı tercihlerinizi hatırlar.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-slate-900">analytics</td>
                <td className="px-6 py-4">Performans</td>
                <td className="px-6 py-4">2 yıl</td>
                <td className="px-6 py-4">Site kullanımı ve etkileşimleri analiz ederek iyileştirme yapılmasına yardımcı olur.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Çerez Yönetimi"
        icon={<SlidersHorizontal className="h-5 w-5" />}
      >
        <p>
          Çerez tercihlerinizi istediğiniz zaman tarayıcı ayarlarınızdan değiştirebilir ya da çerezleri tamamen devre dışı bırakabilirsiniz. Ancak bazı çerezleri kapatmanız durumunda, sitemizin belirli özellikleri beklendiği gibi çalışmayabilir.
        </p>
        <div className="not-prose mt-6 rounded-2xl border border-blue-200 bg-blue-50/80 p-6 text-sm text-blue-900">
          <h3 className="mb-3 text-base font-semibold">Tarayıcı Bazında Çerez Yönetimi</h3>
          <ul className="space-y-2">
            <li>• <strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
            <li>• <strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
            <li>• <strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
            <li>• <strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
          </ul>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Üçüncü Taraf Çerezleri"
        icon={<Globe className="h-5 w-5" />}
      >
        <p>
          Web sitemizde Google Analytics, Facebook Pixel ve YouTube gibi üçüncü taraf hizmet sağlayıcılarının çerezleri kullanılabilmektedir. Bu sağlayıcıların kendi gizlilik ve çerez politikaları geçerlidir.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
          <li>
            <a href="#" className="text-primary hover:text-primary/80 hover:underline">
              Google Analytics Çerez Politikası
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:text-primary/80 hover:underline">
              Facebook Çerez Politikası
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:text-primary/80 hover:underline">
              YouTube Çerez Politikası
            </a>
          </li>
        </ul>
      </CorporateSection>

      <CorporateSection
        title="İletişim"
        icon={<Mail className="h-5 w-5" />}
      >
        <p>
          Çerez politikamızla ilgili sorularınızı ve taleplerinizi bizimle paylaşabilirsiniz. Tercihlerinizi özelleştirmenize yardımcı olmaktan memnuniyet duyacağız.
        </p>
        <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
          <CorporateInfoCard icon={<Mail className="h-5 w-5" />} accent="primary">
            <p className="text-sm font-semibold text-slate-900">E-posta</p>
            <p className="text-sm text-slate-600">info@green.net.tr</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<Phone className="h-5 w-5" />} accent="emerald">
            <p className="text-sm font-semibold text-slate-900">Telefon</p>
            <p className="text-sm text-slate-600">+90 212 555 0123</p>
          </CorporateInfoCard>
          <CorporateInfoCard icon={<MapPin className="h-5 w-5" />} accent="blue">
            <p className="text-sm font-semibold text-slate-900">Adres</p>
            <p className="text-sm text-slate-600">
              Teknoloji Mahallesi, Gaming Caddesi No: 123, Şişli / İstanbul
            </p>
          </CorporateInfoCard>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Güncelleme Notu"
        icon={<BookMarked className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Bu çerez politikası son olarak {lastUpdated} tarihinde güncellenmiştir. Yapılacak değişiklikler bu sayfada yayınlanarak kullanıcılara duyurulacaktır.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default CookiePolicyPage
