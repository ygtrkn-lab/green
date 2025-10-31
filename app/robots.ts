import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/kategoriler/',
          '/green-hakkinda',
          '/iletisim',
          '/gaming-pc-*',
          '/rtx-*',
          '/gaming-*'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/temp/',
          '/*.json$',
          '/*/preview',
          '/debug/',
          '/test/',
          '/internal/',
          '/checkout/success',
          '/checkout/error',
          '/user/*',
          '/cart',
          '/search?*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        crawlDelay: 2,
      }
    ],
    sitemap: 'https://www.green.net.tr/sitemap.xml',
    host: 'https://www.green.net.tr'
  }
}
