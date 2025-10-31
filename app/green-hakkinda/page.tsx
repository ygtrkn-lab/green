import { Building2, Target, Rocket, Heart, Shield, Lightbulb, Users, Award } from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const values = [
  {
    icon: Award,
    title: 'Kalite',
    description: 'Sadece en kaliteli ve güvenilir ürünleri müşterilerimizle buluşturuyoruz.',
    accent: 'primary' as const
  },
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Müşterilerimizin güvenini kazanmak ve korumak en önemli önceliğimizdir.',
    accent: 'emerald' as const
  },
  {
    icon: Lightbulb,
    title: 'Yenilikçilik',
    description: 'Teknolojinin gelişimini yakından takip eder, yenilikçi çözümler sunarız.',
    accent: 'blue' as const
  },
  {
    icon: Users,
    title: 'Müşteri Odaklılık',
    description: 'Müşteri memnuniyeti bizim için her şeyden önce gelir.',
    accent: 'amber' as const
  }
]

const GreenAboutPage = () => {
  return (
    <CorporateLayout
      title="Green Planet Gaming"
      subtitle="Gaming dünyasının en kaliteli ürünlerini Türkiye'deki oyunculara ulaştırmak için çalışıyoruz."
      heroImage="/images/hero/about.jpg"
      heroBadge="Hakkımızda"
    >
      <CorporateSection
        title="Şirket Hikayemiz"
        icon={<Building2 className="h-5 w-5" />}
        description="Türkiye'deki oyunculara dünya standartlarında gaming deneyimi sunma tutkusu ile yola çıktık."
      >
        <p>
          Green Planet Gaming, gaming dünyasının en kaliteli ürünlerini Türkiye'deki oyunculara ulaştırmak amacıyla kurulmuş bir teknoloji şirketidir. Sektördeki deneyimimiz ve müşteri memnuniyetine verdiğimiz önemle, gaming ekipmanları alanında güvenilir bir marka haline geldik.
        </p>
        <p>
          Kuruluşumuzdan bu yana, en son teknoloji ürünleri ve yenilikçi çözümlerle gaming deneyimini bir üst seviyeye taşımayı hedefliyoruz. Kurumsal kültürümüzü, uzun vadeli güven ve yüksek performans odaklı çözümler üzerine inşa ediyoruz.
        </p>
      </CorporateSection>

      <div className="grid gap-6 md:grid-cols-2">
        <CorporateSection
          title="Vizyonumuz"
          icon={<Target className="h-5 w-5" />}
          tone="subtle"
        >
          <p>
            Gaming dünyasında Türkiye'nin lider markası olmak ve her seviyedeki oyuncuya en uygun çözümleri sunarak, gaming kültürünün gelişimine katkıda bulunmak. Sürdürülebilir büyüme stratejileri ile global rekabette adımızı güçlendirmeyi hedefliyoruz.
          </p>
        </CorporateSection>

        <CorporateSection
          title="Misyonumuz"
          icon={<Rocket className="h-5 w-5" />}
          tone="subtle"
        >
          <p>
            Kaliteli ürünler, güvenilir hizmet ve rekabetçi fiyatlarla müşterilerimizin gaming deneyimini en üst seviyeye çıkarmak. Sürekli gelişen teknoloji dünyasında, müşterilerimize en yeni ve en iyi çözümleri sunarken, satış sonrası desteğiyle tam memnuniyet sağlamak için çalışıyoruz.
          </p>
        </CorporateSection>
      </div>

      <CorporateSection
        title="Değerlerimiz"
        icon={<Heart className="h-5 w-5" />}
        description="Yönetim anlayışımızı belirleyen, tüm süreçlerimize yön veren temel ilkeler."
      >
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {values.map(value => {
            const Icon = value.icon
            return (
              <CorporateInfoCard
                key={value.title}
                title={value.title}
                icon={<Icon className="h-5 w-5" />}
                accent={value.accent}
              >
                {value.description}
              </CorporateInfoCard>
            )
          })}
        </div>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default GreenAboutPage
