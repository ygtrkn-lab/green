'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Building2,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  CheckCircle,
  Globe2
} from 'lucide-react'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const quickContacts = [
  {
    title: 'Müşteri Destek',
  description: 'Pazartesi - Cuma - 09:00 - 18:00',
    value: '+90 216 473 36 01',
    href: 'tel:+902164733601',
    icon: <Phone className="h-5 w-5" />,
    accent: 'primary' as const
  },
  {
    title: 'Kurumsal E-posta',
    description: 'Tüm talepleriniz için 24 saat cevap',
    value: 'info@green.net.tr',
    href: 'mailto:info@green.net.tr',
    icon: <Mail className="h-5 w-5" />,
    accent: 'emerald' as const
  }
]

const locations = [
  {
    title: 'Merkez Ofis',
    address: 'Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23',
  city: 'Ümraniye - İstanbul',
    type: 'Genel Merkez'
  },
  {
    title: 'Satış Merkezi',
    address: 'Atatürk Mah. Ertuğrul Gazi Sok. Metropol İstanbul Sitesi C1 Blok',
  city: 'Ataşehir - İstanbul',
    type: 'Satış & Pazarlama'
  },
  {
    title: 'Showroom & Servis',
    address: 'Şerifali Mah. Hattat Sok. No:19',
  city: 'Ümraniye - İstanbul',
    type: 'Deneyim Merkezi'
  }
]

const workingHours = [
  { label: 'Pazartesi - Cuma', value: '09:00 - 18:00', status: 'open' as const },
  { label: 'Cumartesi', value: 'Kapalı', status: 'closed' as const },
  { label: 'Pazar', value: 'Kapalı', status: 'closed' as const }
]

const socialLinks = [
  {
    name: 'Instagram',
    description: 'Yeni ürün lansmanlarını yakalayın.',
    href: 'https://instagram.com/greenbilisim',
    icon: <Instagram className="h-5 w-5" />,
    accent: 'primary' as const
  },
  {
    name: 'LinkedIn',
    description: 'Kurumsal gelişmeleri ve kariyer fırsatlarını takip edin.',
    href: 'https://linkedin.com/company/green-bilisim',
    icon: <Linkedin className="h-5 w-5" />,
    accent: 'blue' as const
  },
  {
    name: 'X (Twitter)',
    description: 'Teknoloji gündemi ve anlık duyurular.',
    href: 'https://twitter.com/greenbilisim',
    icon: <Twitter className="h-5 w-5" />,
    accent: 'slate' as const
  },
  {
    name: 'YouTube',
    description: 'Ürün incelemeleri ve kurulum rehberleri.',
    href: 'https://youtube.com/greenbilisim',
    icon: <Youtube className="h-5 w-5" />,
    accent: 'amber' as const
  }
]

const subjects = [
  'Genel Bilgi',
  'Satış Desteği',
  'Teknik Destek',
  'Garanti İşlemleri',
  'İade & Değişim',
  'Şikayet & Öneri'
]

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <CorporateLayout
      title="İletişime Geçin"
      subtitle="Sorularınız, talepleriniz ve işbirliği fırsatları için Green Planet Gaming ekibiyle doğrudan bağlantı kurun."
      heroImage="/images/hero/contact.jpg"
      heroBadge="İletişim"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Hızlı İletişim Kanalları"
        icon={<Phone className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-5 md:grid-cols-2">
          {quickContacts.map(contact => (
            <CorporateInfoCard
              key={contact.title}
              title={contact.title}
              icon={contact.icon}
              accent={contact.accent}
            >
              <p className="text-sm text-slate-600">{contact.description}</p>
              <a
                href={contact.href}
                className="mt-3 inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-primary"
              >
                {contact.value}
              </a>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Ofis Lokasyonlarımız"
        icon={<Building2 className="h-5 w-5" />}
        description="Türkiye genelindeki merkezlerimizi ziyaret ederek ürünlerimizi deneyimleyebilir veya uzmanlarımızla yüz yüze görüşebilirsiniz."
      >
        <div className="not-prose grid gap-5 md:grid-cols-3">
          {locations.map(location => (
            <CorporateInfoCard
              key={location.title}
              title={location.title}
              icon={<MapPin className="h-5 w-5" />}
              accent="blue"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {location.type}
              </p>
              <p className="mt-3 text-sm text-slate-600">{location.address}</p>
              <p className="mt-1 text-sm text-slate-500">{location.city}</p>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Çalışma Saatleri"
        icon={<Clock3 className="h-5 w-5" />}
      >
        <CorporateInfoCard title="Haftalık Program" accent="slate">
          <ul className="space-y-3 text-sm">
            {workingHours.map(slot => (
              <li key={slot.label} className="flex items-center justify-between">
                <span className="text-slate-600">{slot.label}</span>
                <span
                  className={slot.status === 'closed' ? 'font-semibold text-rose-600' : 'font-semibold text-slate-900'}
                >
                  {slot.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-primary">
            Randevu ile hafta içi 19:30&apos;a kadar showroom deneyimi sunabiliyoruz. Lütfen ziyaret öncesinde ekip ile iletişime geçin.
          </p>
        </CorporateInfoCard>
      </CorporateSection>

      <CorporateSection
        title="Sosyal Medya & Topluluk"
        icon={<Instagram className="h-5 w-5" />}
      >
        <div className="not-prose grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {socialLinks.map(link => (
            <CorporateInfoCard
              key={link.name}
              title={link.name}
              icon={link.icon}
              accent={link.accent}
            >
              <p className="text-sm text-slate-600">{link.description}</p>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-primary"
              >
                Profili görüntüle
              </a>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Mesaj Gönderin"
        icon={<Mail className="h-5 w-5" />}
        description="Talebinizi birkaç kısa bilgi ile paylaşın; ekip arkadaşlarımız en geç 24 saat içinde size dönüş yapacaktır."
      >
        <div className="not-prose rounded-[28px] border border-slate-200/70 bg-white/80 p-8 shadow-sm shadow-slate-900/5">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="firstName" className="text-sm font-medium text-slate-900">Ad</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Adınız"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="lastName" className="text-sm font-medium text-slate-900">Soyad</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Soyadınız"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-900">E-posta</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ornek@email.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-900">Telefon</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+90 5XX XXX XX XX"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="subject" className="text-sm font-medium text-slate-900">Konu</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Konu seçiniz</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-900">Mesaj</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Mesajınızı buraya yazın..."
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 transition group-hover:opacity-100" />
              {isSubmitted ? <CheckCircle className="relative z-10 h-4 w-4" /> : <Send className="relative z-10 h-4 w-4" />}
              <span className="relative z-10">{isSubmitted ? 'Gönderildi' : 'Mesaj Gönder'}</span>
            </button>
          </form>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Bizi Ziyaret Edin"
        icon={<Globe2 className="h-5 w-5" />}
        tone="subtle"
      >
        <div className="not-prose space-y-8">
          <div className="overflow-hidden rounded-[32px] border border-slate-200/60 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-10 text-center shadow-lg shadow-slate-900/10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-slate-900">Green Planet Gaming Merkez Ofis</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
              Randevu oluşturarak merkezimizi ziyaret edebilir, showroom alanımızda ürünleri deneyimleyebilir ve uzman ekibimizle birebir görüşebilirsiniz. Yol tarifleri için aşağıdaki Google Haritalar bileşenini kullanabilirsiniz.
            </p>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-slate-200/70 shadow-lg shadow-slate-900/10">
            <div className="relative h-[450px] w-full">
              <iframe
                title="Green Planet Gaming Google Haritası"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.9435744642924!2d29.1080137!3d41.00460820000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9a1c0300e03%3A0x840448d477bb0721!2sGreen!5e0!3m2!1str!2str!4v1761293108913!5m2!1str!2str"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default ContactPage
