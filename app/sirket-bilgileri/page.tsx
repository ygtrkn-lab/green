import {
  Building2,
  Landmark,
  FileText,
  MapPin,
  Phone,
  Mail,
  ShieldAlert,
  Calendar,
  DollarSign
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const CompanyInfoPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const companyDetails = [
    {
      title: 'Şirket Unvanı',
      value: 'Green Planet Gaming Teknoloji A.Ş.',
      icon: <Building2 className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'Vergi Dairesi',
      value: 'Ümraniye Vergi Dairesi',
      icon: <FileText className="h-5 w-5" />,
      accent: 'blue' as const
    },
    {
      title: 'Vergi No',
      value: '1234567890',
      icon: <FileText className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'Ticaret Sicil No',
      value: '123456',
      icon: <FileText className="h-5 w-5" />,
      accent: 'amber' as const
    },
    {
      title: 'Mersis No',
      value: '0123456789012345',
      icon: <FileText className="h-5 w-5" />,
      accent: 'slate' as const
    },
    {
      title: 'Faaliyet Konusu',
      value: 'Bilgisayar ve Gaming Ekipmanları Satışı',
      icon: <Landmark className="h-5 w-5" />,
      accent: 'emerald' as const
    },
    {
      title: 'Kuruluş Tarihi',
      value: '2020',
      icon: <Calendar className="h-5 w-5" />,
      accent: 'blue' as const
    },
    {
      title: 'Sermaye',
      value: '1.000.000 TL',
      icon: <DollarSign className="h-5 w-5" />,
      accent: 'primary' as const
    }
  ]

  const offices = [
    {
      title: 'Merkez Ofis',
      address: 'Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23 Ümraniye – İstanbul / TÜRKİYE',
      accent: 'primary' as const
    },
    {
      title: 'Satış ve Pazarlama Ofisi',
      address: 'Atatürk Mah. Ertuğrul Gazi Sok. Metropol İstanbul Sitesi C1 Blok Apt. No:2B 375 Ataşehir – İstanbul / TÜRKİYE',
      accent: 'blue' as const
    },
    {
      title: 'Showroom ve Satış Mağazası',
      address: 'Şerifali Mah. Hattat Sk. No:19 Ümraniye – İstanbul / TÜRKİYE',
      accent: 'emerald' as const
    }
  ]

  const contacts = [
    {
      title: 'Telefon',
      lines: ['+90 216 473 36 01', '+90 216 GREEN 01'],
      icon: <Phone className="h-5 w-5" />,
      accent: 'primary' as const
    },
    {
      title: 'E-posta',
      lines: ['info@green.net.tr', 'destek@green.net.tr'],
      icon: <Mail className="h-5 w-5" />,
      accent: 'blue' as const
    }
  ]

  return (
    <CorporateLayout
      title="Şirket Bilgileri"
      subtitle="Green Planet Gaming Teknoloji A.Ş.'nin resmi kurumsal verileri, yasal kayıtları ve iletişim detayları."
      heroImage="/images/hero/company.jpg"
      heroBadge="Kurumsal"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Kurumsal Kimlik"
        icon={<Building2 className="h-5 w-5" />}
        description="Şirketimize ait hukuki kayıtlar, faaliyet kapsamı ve ticari kimlik numaraları."
      >
        <div className="not-prose grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {companyDetails.map(detail => (
            <CorporateInfoCard
              key={detail.title}
              title={detail.title}
              icon={detail.icon}
              accent={detail.accent}
            >
              <p className="text-sm font-medium text-slate-700">{detail.value}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Ofis Lokasyonları"
        icon={<MapPin className="h-5 w-5" />}
        description="Türkiye genelindeki operasyon noktalarımız ve iletişim adreslerimiz."
      >
        <div className="not-prose grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {offices.map(ofis => (
            <CorporateInfoCard
              key={ofis.title}
              title={ofis.title}
              icon={<MapPin className="h-5 w-5" />}
              accent={ofis.accent}
            >
              <p className="text-sm text-slate-600">{ofis.address}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="İletişim Kanalları"
        icon={<Phone className="h-5 w-5" />}
        description="Müşteri hizmetleri ve kurumsal iletişim hatlarımız."
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          {contacts.map(contact => (
            <CorporateInfoCard
              key={contact.title}
              title={contact.title}
              icon={contact.icon}
              accent={contact.accent}
            >
              <div className="space-y-1 text-sm text-slate-600">
                {contact.lines.map(line => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Yasal Uyarı"
        icon={<ShieldAlert className="h-5 w-5" />}
        tone="subtle"
      >
        <p className="text-sm text-slate-600">
          Bu sitede yer alan tüm bilgiler, ürün ve hizmetler Green Planet Gaming Teknoloji A.Ş. tarafından sunulmaktadır. Site içeriğinin tamamı telif hakkı ile korunmakta olup izinsiz kullanımı yasaktır. Ürün fiyatları ve kampanyalar haber verilmeksizin değiştirilebilir.
        </p>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default CompanyInfoPage
