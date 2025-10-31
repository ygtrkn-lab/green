import { MetadataRoute } from 'next'
import { getAllProducts, type ProductRecord } from '@/app/utils/productFeed'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.green.net.tr';
  const currentDate = new Date().toISOString();

  // 1. Ana sayfa - En yüksek öncelik
  const homeRoute = {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily' as 'daily',
    priority: 1.0,
  };

  // 2. Önemli statik sayfalar - Yüksek öncelik
  const highPriorityRoutes = [
    '/kategoriler',
    '/green-hakkinda',
    '/iletisim',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.9,
  }));

  // 3. Kurumsal sayfalar - Orta öncelik
  const corporateRoutes = [
    '/banka-hesap-bilgileri',
    '/cerez-politikasi',
    '/genel-garanti-kosullari',
    '/gizlilik-politikasi',
    '/iade-kosullari',
    '/satis-sozlesmesi',
    '/sirket-bilgileri',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }));

  // 4. Dinamik kategori sayfalarını ekliyoruz
  let products: ProductRecord[] = []
  try {
    products = await getAllProducts()
  } catch (error) {
    console.error('[sitemap] Failed to load products from feed', error)
    products = []
  }

  const categorySlugs = Array.from(new Set(products.map((product) => product.categorySlug)))

  const dynamicCategoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/kategoriler/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/kategoriler/${product.categorySlug}/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 5. SEO odaklı ek sayfalar (gelecekte eklenebilir)
  const _seoRoutes = [
    // Gaming PC alt kategorileri
    '/gaming-pc-fiyatlari',
    '/rtx-4090-gaming-pc',
    '/rtx-4080-gaming-pc',
    '/i7-gaming-pc',
    '/i5-gaming-pc',
    
    // Gaming aksesuarları
    '/gaming-klavye-fiyatlari',
    '/mekanik-klavye',
    '/gaming-mouse-fiyatlari',
    '/gaming-kulaklik-fiyatlari',
    
    // Marka sayfaları
    '/green-gaming-urunleri',
    '/gaming-pc-tavsiyeleri',
    '/gaming-setup-rehberi',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.5,
  }));

  // Tüm rotaları birleştir ve sırala
  const allRoutes = [
    homeRoute,
    ...highPriorityRoutes,
    ...dynamicCategoryRoutes,
    ...productRoutes,
    ...corporateRoutes,
    // ..._seoRoutes, // Şimdilik yorum satırında, gerektiğinde açılabilir
  ];

  // Öncelik sırasına göre sırala
  return allRoutes.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
