import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.green.net.tr'),
  title: {
    default: 'Gaming PC Türkiye | Oyuncu Bilgisayarı ve Ekipmanları | Green Planet Gaming',
    template: `%s | Green Planet Gaming - Türkiye'nin Gaming Merkezi`,
  },
  description: "Türkiye'nin en kapsamlı gaming PC ve oyuncu ekipmanları mağazası. Yüksek performanslı gaming bilgisayarları, RTX ekran kartları, mekanik klavyeler, gaming mouse ve kulaklıklar. Ücretsiz kargo, 2 yıl garanti, taksit imkanı.",
  keywords: [
    // Ana hedef kelimeler
    'gaming pc türkiye',
    'oyuncu bilgisayarı',
    'gaming bilgisayar',
    'oyuncu pc',
    'gaming ekipmanları',
    'gaming donanım',
    
    // Ürün kategorileri
    'rtx 4090 pc',
    'rtx 4080 gaming pc',
    'i7 gaming pc',
    'i5 oyuncu bilgisayarı',
    'gaming klavye mekanik',
    'gaming mouse rgb',
    'gaming kulaklık',
    'gaming monitör',
    
    // Marka ve özel terimler
    'Green Planet Gaming',
    'green gaming türkiye',
    'sıvı soğutma sistemi',
    'hava soğutma',
    'all in one pc',
    'gaming kasa',
    'gaming psu',
    'rgb gaming setup',
    
    // Yerel SEO
    'istanbul gaming pc',
    'ankara oyuncu bilgisayarı',
    'izmir gaming ekipman',
    'türkiye gaming mağaza',
    'gaming pc satış',
    'oyuncu ekipmanları online',
    
    // Long-tail keywords
    'en iyi gaming pc 2024',
    'uygun fiyatlı gaming bilgisayar',
    'profesyonel gaming setup',
    'yüksek fps gaming pc',
    '4k gaming bilgisayar',
    'streaming için gaming pc',
    'esports gaming ekipman'
  ],
  authors: [{ name: 'Green Planet Gaming', url: 'https://www.green.net.tr' }],
  creator: 'Green Planet Gaming',
  publisher: 'Green Planet Gaming',
  category: 'Gaming Equipment & Computers',
  classification: 'E-commerce, Gaming, Technology',
  openGraph: {
    title: 'Gaming PC Türkiye | Oyuncu Bilgisayarı ve Ekipmanları | Green Planet Gaming',
    description: "Türkiye'nin en kapsamlı gaming PC mağazası. RTX 4090, RTX 4080 gaming bilgisayarları, mekanik klavyeler, gaming mouse ve kulaklıklar. Ücretsiz kargo, 2 yıl garanti.",
    url: 'https://www.green.net.tr',
    siteName: 'Green Planet Gaming',
    images: [
      {
        url: 'https://www.green.net.tr/images/social/opengraph-gaming-pc.jpg',
        width: 1200,
        height: 630,
        alt: 'Green Planet Gaming - Türkiye\'nin Gaming PC ve Oyuncu Ekipmanları Merkezi',
      },
      {
        url: 'https://www.green.net.tr/images/social/opengraph-gaming-setup.jpg',
        width: 1200,
        height: 630,
        alt: 'Gaming Setup ve Oyuncu Bilgisayarları - Green Planet Gaming',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
    countryName: 'Turkey',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@GreenPlanetGaming',
    creator: '@GreenPlanetGaming',
    title: 'Gaming PC Türkiye | Oyuncu Bilgisayarı ve Ekipmanları | Green Planet Gaming',
    description: "Türkiye'nin en kapsamlı gaming PC mağazası. RTX gaming bilgisayarları, mekanik klavyeler, gaming mouse. Ücretsiz kargo, 2 yıl garanti.",
    images: ['https://www.green.net.tr/images/social/twitter-gaming-pc.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.green.net.tr',
    languages: {
      'tr-TR': 'https://www.green.net.tr',
    },
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console verification
    yandex: 'yandex-verification-code', // Yandex Webmaster verification
  },
  other: {
    'msapplication-TileColor': '#8dc63f',
    'theme-color': '#8dc63f',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8dc63f' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}
