import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BottomNavigation from './components/BottomNavigation'
import ClientLayout from './components/ClientLayout'
import EnhancedWhatsAppButton from './components/EnhancedWhatsAppButton'
import { LanguageProvider } from './context/LanguageContext'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export { metadata, viewport } from './metadata'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Gelişmiş Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Store"],
    "name": "Green Planet Gaming",
    "alternateName": ["Green Gaming", "Green Planet", "GPG"],
    "description": "Türkiye'nin en kapsamlı gaming PC ve oyuncu ekipmanları mağazası. Yüksek performanslı gaming bilgisayarları, RTX ekran kartları, gaming aksesuarları.",
    "url": "https://www.green.net.tr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.green.net.tr/images/kurumsal-logo/green-logo.svg",
      "width": 300,
      "height": 100
    },
    "image": [
      "https://www.green.net.tr/images/social/opengraph-gaming-pc.jpg",
      "https://www.green.net.tr/images/categories/gaming-pc.jpg"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+90-216-473-36-01",
        "contactType": "Müşteri Hizmetleri",
        "areaServed": "TR",
        "availableLanguage": ["Turkish"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "email": "info@green.net.tr",
        "contactType": "Satış Desteği",
        "areaServed": "TR"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressRegion": "İstanbul",
      "addressLocality": "Türkiye"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.0082",
      "longitude": "28.9784"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "₺₺",
    "currenciesAccepted": "TRY",
    "paymentAccepted": ["Kredi Kartı", "Banka Havalesi", "Kapıda Ödeme", "Taksit"],
    "foundingDate": "2020",
    "numberOfEmployees": "10-50",
    "slogan": "Türkiye'nin Gaming Merkezi",
    "keywords": "gaming pc, oyuncu bilgisayarı, gaming ekipmanları, rtx, gaming mouse, gaming klavye",
    "serviceArea": {
      "@type": "Country",
      "name": "Turkey"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Gaming PC ve Ekipmanları",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Gaming Bilgisayarları",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "RTX 4090 Gaming PC",
                "category": "Gaming Bilgisayar"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog", 
          "name": "Gaming Aksesuarları",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Gaming Klavye",
                "category": "Gaming Aksesuar"
              }
            }
          ]
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/greenplanetgaming",
      "https://www.facebook.com/greenplanetgaming",
      "https://www.twitter.com/greenplanetgaming",
      "https://www.youtube.com/greenplanetgaming"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Green Planet Gaming",
    "alternateName": "Green Gaming Türkiye",
    "url": "https://www.green.net.tr",
    "description": "Türkiye'nin en kapsamlı gaming PC ve oyuncu ekipmanları online mağazası",
    "inLanguage": "tr-TR",
    "isAccessibleForFree": true,
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.green.net.tr/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "mainEntity": {
      "@id": "https://www.green.net.tr/#organization"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://www.green.net.tr"
      }
    ]
  };

  return (
    <html lang="tr" className={`${poppins.variable}`}>
      <head>
        {/* Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="TR" />
        <meta name="geo.placename" content="Türkiye" />
        <meta name="geo.position" content="41.0082;28.9784" />
        <meta name="ICBM" content="41.0082, 28.9784" />
        
        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="İstanbul, Türkiye" />
        <meta name="business:contact_data:locality" content="İstanbul" />
        <meta name="business:contact_data:region" content="İstanbul" />
        <meta name="business:contact_data:postal_code" content="34000" />
        <meta name="business:contact_data:country_name" content="Turkey" />
        <meta name="business:contact_data:email" content="info@green.net.tr" />
        <meta name="business:contact_data:phone_number" content="+90-216-473-36-01" />
        <meta name="business:contact_data:website" content="https://www.green.net.tr" />
        
        {/* Additional Performance and SEO */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.green.net.tr" />
        
        {/* Hreflang for Turkish */}
        <link rel="alternate" hrefLang="tr" href="https://www.green.net.tr" />
        <link rel="alternate" hrefLang="tr-TR" href="https://www.green.net.tr" />
        <link rel="alternate" hrefLang="x-default" href="https://www.green.net.tr" />
      </head>
      <body className={`${poppins.className} font-sans`}>
        <LanguageProvider>
          <ClientLayout>
            <div id="scroll-progress" className="scroll-progress"></div>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            <ScrollToTop />
            <BottomNavigation />
            <EnhancedWhatsAppButton />
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
