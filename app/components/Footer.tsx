'use client'

import { useTranslation } from '../hooks/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  ChevronDown,
  ChevronUp,
  Send,
  Building2,
  ShoppingBag,
  Shield,
  Users
} from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({})
  const [email, setEmail] = useState('')

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter signup logic here
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const footerSections = {
    company: {
      title: 'Green Bilişim',
      icon: Building2,
      links: [
        { name: 'Green Hakkında', href: '/green-hakkinda' },
        { name: 'Şirket Bilgileri', href: '/sirket-bilgileri' },
        { name: 'Banka Hesap Bilgileri', href: '/banka-hesap-bilgileri' },
        { name: 'İletişim', href: '/iletisim' }
      ]
    },
    products: {
      title: 'Ürünler & Kategoriler',
      icon: ShoppingBag,
      links: [
        { name: 'Tüm Kategoriler', href: '/kategoriler' },
        { name: 'Gaming PC', href: '/kategoriler/gaming-pc' },
        { name: 'Sıvı Soğutma', href: '/kategoriler/sivi-sogutma' },
        { name: 'Gaming Mouse', href: '/kategoriler/gaming-mouse' },
        { name: 'Gaming Klavye', href: '/kategoriler/gaming-klavye' },
        { name: 'Gaming Kulaklık', href: '/kategoriler/gaming-kulaklik' }
      ]
    },
    support: {
      title: 'Green Garanti',
      icon: Shield,
      links: [
        { name: 'Genel Garanti Koşulları', href: '/genel-garanti-kosullari' },
        { name: 'AIO Garanti Koşulları', href: '/aio-garanti-kosullari' },
        { name: 'Güç Kaynakları Garanti Koşulları', href: '/guc-kaynaklari-garanti-kosullari' },
        { name: 'Mouse ve Klavye Garanti Koşulları', href: '/mouse-klavye-garanti-kosullari' },
        { name: 'Soğutucular Garanti Koşulları', href: '/sogutucu-garanti-kosullari' }
      ]
    },
    legal: {
      title: 'KVKK ve Yasal Haklar',
      icon: Shield,
      links: [
        { name: 'KVKK Aydınlatma Metni', href: '/kvkk-aydinlatma-metni' },
        { name: 'Çerez Politikası', href: '/cerez-politikasi' },
        { name: 'Mesafeli Satış Sözleşmesi', href: '/satis-sozlesmesi' },
        { name: 'Teslimat ve İade Şartları', href: '/iade-kosullari' }
      ]
    },
    dealers: {
      title: 'Green Bayileri',
      icon: Users,
      links: [
        { name: 'Kullanıcı Bilgilerim', href: '/kullanici-bilgilerim' },
        { name: 'Bayi Belge Yükleme', href: '/bayi-belge-yukleme' },
        { name: 'Bayi Ödemesi', href: '/bayi-odemesi' },
        { name: 'XML Bayilik', href: '/xml-bayilik' }
      ]
    }
  }

  const socialLinks = [
    { 
      icon: Instagram,
      href: 'https://instagram.com/greenbilisim',
      name: 'Instagram',
      color: 'hover:text-pink-400'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/green-bilisim',
      name: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/greenbilisim',
      name: 'X-Twitter',
      color: 'hover:text-blue-300'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/greenbilisim',
      name: 'Youtube',
      color: 'hover:text-red-400'
    }
  ]

  const contactInfo = [
    { 
      icon: Phone, 
      text: '+90 216 473 36 01', 
      href: 'tel:+902164733601',
      label: 'Telefon'
    },
    { 
      icon: Mail, 
      text: 'info@green.net.tr', 
      href: 'mailto:info@green.net.tr',
      label: 'E-posta'
    },
    { 
      icon: MapPin,
      text: 'Finanskent Mah. Finans Cad. Sarphan Finanspark Sit. C Blok No: 5/23 Ümraniye – İstanbul',
      href: 'https://maps.google.com',
      label: 'Adres'
    }
  ]

  return (
    <footer className="bg-[#1d1d1f] text-[#f5f5f7] relative">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c2c2e]/80 to-[#1d1d1f] opacity-50"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="w-full lg:w-[1273px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:w-[1416px] lg:gap-[57px] gap-6 lg:mx-auto lg:-ml-12">
            {/* Company Info */}
            <div className="space-y-1">
              <Link href="/" className="inline-block" style={{ marginTop: '-10px' }}>
                <div className="relative w-32 h-10">
                  <Image
                    src="/images/kurumsal-logo/green-logo.svg"
                    alt="Green Logo"
                    fill
                    sizes="(max-width: 128px) 100vw, 128px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <p className="text-xs text-white leading-relaxed">
                Gaming ve bilgisayar donanımları konusunda güvenilir çözümler.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.slice(0, 2).map((item, index) => (
                  <a 
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-xs text-white hover:text-[#8dc63f] transition-colors duration-200 group"
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0 text-white group-hover:text-[#8dc63f] transition-colors" />
                    <span className="font-light">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className="space-y-4">
                {/* Header */}
                <h3 className="text-sm font-medium text-white tracking-wide mb-3">
                  {section.title}
                </h3>

                {/* Links */}
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href}
                      className="block text-xs text-white/80 hover:text-[#8dc63f] transition-colors duration-200 leading-relaxed"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#424245]">
          <div className="w-full lg:w-[1273px] mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              {/* ETBIS - Sol */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.eticaret.gov.tr/siteprofil/7313533570088467/greennettr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  style={{ marginTop: '-10px' }}
                >
                  <Image
                    src="/images/imp/etbis.jpg"
                    alt="ETBIS Logo"
                    width={50}
                    height={25}
                    className="object-contain"
                  />
                </a>
                <div className="text-[11px] text-white">
                  <p>Kayıtlı E-Ticaret Sitesi</p>
                </div>
              </div>

              {/* Orta - Social Media ve Legal Links */}
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-[11px] text-white">
                {/* Social Media */}
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] flex items-center justify-center text-white hover:text-[#8dc63f] transition-all duration-200"
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                
                {/* Legal Links */}
                <div className="flex items-center space-x-6">
                  <Link href="/gizlilik-politikasi" className="hover:text-[#8dc63f] transition-colors duration-200">
                    Gizlilik
                  </Link>
                  <Link href="/satis-sozlesmesi" className="hover:text-[#8dc63f] transition-colors duration-200">
                    Sözleşme
                  </Link>
                  <Link href="/cerez-politikasi" className="hover:text-[#8dc63f] transition-colors duration-200">
                    Çerezler
                  </Link>
                </div>
              </div>

              {/* Sağ - Copyright */}
              <div className="text-[11px] text-white">
                <p className="font-light">© {currentYear} Green Bilişim. Tüm hakları saklıdır.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
