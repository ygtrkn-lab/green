import { XMLParser } from 'fast-xml-parser'

const PRODUCT_FEED_URL = 'https://xml1.xmlbankasi.com/p1/wqoxujkvzitm/image/data/xml/urunler.xml'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

interface RawValue {
  [key: string]: unknown
}

export interface ProductImage {
  id: number
  url: string
  alt: string
}

export interface ProductRecord {
  id: string
  code: string
  name: string
  slug: string
  shortDescription: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: string
  badgeColor?: string
  specs: Record<string, string>
  stock: number
  images: ProductImage[]
  features: string[]
  highlightedFeatures: Array<{ title: string; value: string; description: string }>
  description: string
  warranty: string
  shipping: string
  currency: string
  brand: string
  categorySlug: string
  categoryLabel: string
  originalPrice: number
  originalCurrency: string
}

export interface CategoryData {
  slug: string
  category: string
  filters: {
    priceRange: {
      min: number
      max: number
    }
    specs: Record<string, string[]>
  }
  products: ProductRecord[]
}

const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '__cdata',
  trimValues: true,
})

const HTML_ENTITY_MAP: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&quot;': '"',
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
}

const CATEGORY_MAP: Record<string, { slug: string; label: string }> = {
  'AIO PC': { slug: 'aio-pc', label: 'AIO PC' },
  'GÜÇ KAYNAĞI': { slug: 'gaming-psu', label: 'Güç Kaynağı' },
  'KASA FANI': { slug: 'kasa-fani', label: 'Kasa Fanı' },
  'CPU HAVA SOĞUTUCU': { slug: 'hava-sogutucu', label: 'CPU Hava Soğutucu' },
  'CPU SIVI SOĞUTUCU': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'CPU SIVI SOĞUTMA': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'CPU SIVI SOGUTUCU': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'CPU SIVI SOGUTMA': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'PC KASASI': { slug: 'pc-kasasi', label: 'PC Kasası' },
  'SIVI SOĞUTMA': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'SIVI SOĞUTUCU': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'SIVI SOGUTMA': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'SIVI SOGUTUCU': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'Sıvı Soğutma': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  'Sıvı Soğutucu': { slug: 'sivi-sogutma', label: 'Sıvı Soğutma' },
  MOUSE: { slug: 'mouse', label: 'Mouse' },
  KLAVYE: { slug: 'klavye', label: 'Klavye' },
  Diğer: { slug: 'diger', label: 'Diğer Ürünler' },
}

type StaticCategoryProduct = {
  id: string
  name: string
  slug: string
  shortDescription?: string
  price?: number
  oldPrice?: number
  rating?: number
  reviews?: number
  badge?: string
  badgeColor?: string
  specs?: Record<string, string | undefined>
  stock?: number
  features?: string[]
  highlightedFeatures?: Array<{ title: string; value: string; description: string }>
  description?: string
  warranty?: string
  shipping?: string
  currency?: string
  brand?: string
  images?: Array<{ url: string; alt?: string }>
}

type StaticCategoryFile = {
  category: string
  filters: CategoryData['filters']
  products: StaticCategoryProduct[]
}

const CURRENCY_CONVERSION: Record<string, number> = {
  TRL: 1,
  TRY: 1,
  TL: 1,
  USD: 35,
  EUR: 38,
}

let cachedProducts: ProductRecord[] | null = null
let cachedAt = 0

const ensureArray = <T>(value: T | T[] | undefined | null): T[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const toText = (value: unknown): string => {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value).trim()
  }

  if (typeof value === 'object') {
    const record = value as RawValue

    if (record.__cdata !== undefined) {
      return toText(record.__cdata)
    }

    if ((record as RawValue)['#text'] !== undefined) {
      return toText((record as RawValue)['#text'])
    }

    if ((record as RawValue).value !== undefined) {
      return toText((record as RawValue).value)
    }

    const keys = Object.keys(record)
    if (keys.length === 1) {
      return toText(record[keys[0]])
    }
  }

  return ''
}

const decodeHtmlEntities = (value: string): string => {
  if (!value) {
    return ''
  }

  let decoded = value

  decoded = decoded.replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) => {
    const codePoint = Number.parseInt(hex, 16)
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : ''
  })

  decoded = decoded.replace(/&#(\d+);?/g, (_, num) => {
    const codePoint = Number.parseInt(num, 10)
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : ''
  })

  decoded = decoded.replace(/&(nbsp|amp|quot|apos|lt|gt);?/gi, (_, entity: string) => {
    const key = `&${entity.toLowerCase()};`
    if (key === '&nbsp;') {
      return ' '
    }
    return HTML_ENTITY_MAP[key as keyof typeof HTML_ENTITY_MAP] ?? `&${entity};`
  })

  return decoded
    .replace(/\u00a0/gi, ' ')
    .replace(/\bnbsp\b/gi, ' ')
}

const cleanText = (value: unknown): string => {
  return decodeHtmlEntities(toText(value))
}

const parsePrice = (raw: string): number => {
  if (!raw) {
    return 0
  }

  const compact = raw
    .replace(/\u00a0/g, '')
    .replace(/[^0-9,.-]/g, '')
    .trim()

  if (!compact) {
    return 0
  }

  const hasComma = compact.includes(',')
  const hasDot = compact.includes('.')

  let normalized = compact

  if (hasComma && hasDot) {
    if (compact.lastIndexOf(',') > compact.lastIndexOf('.')) {
      normalized = compact.replace(/\./g, '').replace(/,/g, '.')
    } else {
      normalized = compact.replace(/,/g, '')
    }
  } else if (hasComma) {
    normalized = compact.replace(/,/g, '.')
  }

  const value = Number.parseFloat(normalized)
  return Number.isFinite(value) ? value : 0
}

const stripHtml = (value: string): string => {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

const slugify = (value: string, fallback: string): string => {
  const base = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/ı/g, 'i')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return base || fallback
}

const convertCurrencyToTry = (price: number, currencyRaw: string): { price: number; currency: string } => {
  const currency = currencyRaw ? currencyRaw.toUpperCase() : 'TRL'
  const rate = CURRENCY_CONVERSION[currency] || 1
  const converted = price * rate
  return {
    price: Number.isFinite(converted) ? Math.round(converted * 100) / 100 : 0,
    currency,
  }
}

const buildSpecs = (values: Array<[string, string]>): Record<string, string> => {
  return values.reduce<Record<string, string>>((acc, [key, value]) => {
    if (key && value) {
      acc[key] = value
    }
    return acc
  }, {})
}

const buildStaticProductRecord = (
  categorySlug: string,
  categoryLabel: string,
  product: StaticCategoryProduct
): ProductRecord => {
  const {
    id,
    name,
    slug,
    shortDescription = '',
    price = 0,
    oldPrice,
    rating = 0,
    reviews = 0,
    badge,
    badgeColor,
  specs: rawSpecs = {},
    stock = 0,
    features = [],
    highlightedFeatures = [],
    description = shortDescription,
    warranty = 'Green güvencesiyle 2 yıl resmi distribütör garantisi.',
    shipping = 'Siparişler stok durumuna göre aynı gün kargoya verilir.',
    currency = 'TRY',
    brand = 'Green',
    images = [],
  } = product

  const imageObjects: ProductImage[] = images.map((img, index) => ({
    id: index + 1,
    url: img.url,
    alt: img.alt || name,
  }))

  const specs = Object.entries(rawSpecs)
    .filter(([, value]) => typeof value === 'string' && value.trim() !== '')
    .reduce<Record<string, string>>((acc, [key, value]) => {
      acc[key] = value as string
      return acc
    }, {})

  return {
    id,
    code: id,
    name,
    slug,
    shortDescription,
    price,
    oldPrice,
    rating,
    reviews,
    badge,
    badgeColor,
    specs,
    stock,
    images: imageObjects,
    features,
    highlightedFeatures,
    description,
    warranty,
    shipping,
    currency,
    brand,
    categorySlug,
    categoryLabel,
    originalPrice: price,
    originalCurrency: currency,
  }
}

const loadStaticCategory = async (categorySlug: string): Promise<CategoryData | null> => {
  const loaders: Record<string, () => Promise<StaticCategoryFile>> = {
    'sivi-sogutma': async () =>
      ((await import('@/app/data/categories/sivi-sogutma.json')).default as StaticCategoryFile),
  }

  const loader = loaders[categorySlug]
  if (!loader) {
    return null
  }

  try {
    const staticData = await loader()
    const categoryLabel = staticData.category || categorySlug

    return {
      slug: categorySlug,
      category: categoryLabel,
      filters: staticData.filters,
      products: staticData.products.map((product) =>
        buildStaticProductRecord(categorySlug, categoryLabel, product)
      ),
    }
  } catch (error) {
    console.error('[ProductFeed] Failed to load static category', categorySlug, error)
    return null
  }
}

const buildProductRecord = (raw: Record<string, unknown>): ProductRecord | null => {
  const productId = cleanText(raw.Product_id)
  const productCode = cleanText(raw.Product_code)
  const name = cleanText(raw.Name)
  const mainCategory = cleanText(raw.mainCategory) || 'Diğer'
  const brand = cleanText(raw.Brand) || 'Green'
  const rawPriceString = cleanText(raw.Price)
  const rawPrice = parsePrice(rawPriceString)
  const rawCurrency = cleanText(raw.CurrencyType) || 'TRL'
  const stock = Number.parseInt(cleanText(raw.Stock), 10) || 0
  const descriptionHtml = cleanText(raw.Description)

  if (!name) {
    return null
  }

  const categoryInfo = CATEGORY_MAP[mainCategory] || {
    slug: slugify(mainCategory || 'diger', productId || 'urun'),
    label: mainCategory || 'Diğer Ürünler',
  }

  const slugBase = slugify(name, productCode || productId || 'urun')
  const slug = productCode ? `${slugBase}-${productCode}` : `${slugBase}-${productId || 'urun'}`

  const { price, currency } = convertCurrencyToTry(rawPrice, rawCurrency)

  const cleanedDescription = stripHtml(descriptionHtml)
  let shortDescription = cleanedDescription || name
  if (shortDescription.length > 180) {
    shortDescription = `${shortDescription.slice(0, 177).trimEnd()}...`
  }

  const images = ensureArray([
    cleanText(raw.Image1),
    cleanText(raw.Image2),
    cleanText(raw.Image3),
    cleanText(raw.Image4),
    cleanText(raw.Image5),
  ]).filter((url): url is string => Boolean(url))

  const imageObjects: ProductImage[] = images.map((url, index) => ({
    id: index + 1,
    url,
    alt: name,
  }))

  const specs = buildSpecs([
    ['Marka', brand],
    ['Ürün Kodu', productCode || productId],
    ['Kategori', categoryInfo.label],
    ['Para Birimi', rawCurrency.toUpperCase()],
    ['KDV', cleanText(raw.Tax) ? `${cleanText(raw.Tax)}%` : 'Belirtilmedi'],
    ['Stok', stock > 0 ? `${stock} adet` : 'Stokta yok'],
  ])

  const features = [
    brand ? `Marka: ${brand}` : null,
    categoryInfo.label ? `Kategori: ${categoryInfo.label}` : null,
    rawPrice ? `Liste Fiyatı (${rawCurrency.toUpperCase()}): ${rawPriceString || rawPrice}` : null,
    stock > 0 ? `Stok Adedi: ${stock}` : 'Stok Durumu: Tükendi',
  ].filter((item): item is string => Boolean(item))
  const highlightedFeatures: Array<{ title: string; value: string; description: string }> = []

  return {
    id: productId || productCode || slug,
    code: productCode || productId || slug,
    name,
    slug,
    shortDescription,
    price,
    oldPrice: undefined,
    rating: 0,
    reviews: 0,
    badge: stock === 0 ? 'Tükendi' : undefined,
    badgeColor: stock === 0 ? 'bg-red-500' : undefined,
    specs,
    stock,
    images: imageObjects,
    features,
    highlightedFeatures,
    description: descriptionHtml || cleanedDescription || name,
    warranty: 'Green güvencesiyle 2 yıl resmi distribütör garantisi.',
    shipping: 'Siparişler stok durumuna göre aynı gün kargoya verilir.',
    currency,
    brand,
    categorySlug: categoryInfo.slug,
    categoryLabel: categoryInfo.label,
    originalPrice: rawPrice,
    originalCurrency: rawCurrency.toUpperCase(),
  }
}

async function fetchRemoteProducts(): Promise<ProductRecord[]> {
  const response = await fetch(PRODUCT_FEED_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/xml,text/xml,*/*;q=0.1',
    },
    next: {
      revalidate: 300,
    },
  })

  if (!response.ok) {
    throw new Error(`Product feed request failed with status ${response.status}`)
  }

  const xml = await response.text()
  const parsed = parser.parse(xml)
  const rawProducts = ensureArray(parsed?.Products?.Product)

  const products = rawProducts
    .map((item) => buildProductRecord(item as Record<string, unknown>))
    .filter((product): product is ProductRecord => Boolean(product))

  return products
}

export async function loadProducts(force = false): Promise<ProductRecord[]> {
  if (!force && cachedProducts && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedProducts
  }

  const products = await fetchRemoteProducts()
  cachedProducts = products
  cachedAt = Date.now()
  return products
}

export async function getAllProducts(): Promise<ProductRecord[]> {
  return loadProducts(false)
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const products = await loadProducts(false)
  const slugs = new Set<string>()

  products.forEach((product) => {
    if (product.categorySlug) {
      slugs.add(product.categorySlug)
    }
  })

  return Array.from(slugs)
}

export async function getCategoryData(categorySlug: string): Promise<CategoryData | null> {
  const products = await loadProducts(false)
  const categoryProducts = products.filter((product) => product.categorySlug === categorySlug)

  if (categoryProducts.length === 0) {
    const staticCategory = await loadStaticCategory(categorySlug)
    if (staticCategory) {
      return staticCategory
    }
    return null
  }

  const priceValues = categoryProducts
    .map((product) => product.price)
    .filter((value) => Number.isFinite(value) && value > 0)

  const minPrice = priceValues.length > 0 ? Math.min(...priceValues) : 0
  const maxPrice = priceValues.length > 0 ? Math.max(...priceValues) : 0

  const specOptions = categoryProducts.reduce<Record<string, Set<string>>>((acc, product) => {
    Object.entries(product.specs).forEach(([key, value]) => {
      if (!acc[key]) {
        acc[key] = new Set<string>()
      }
      if (value) {
        acc[key]!.add(value)
      }
    })
    return acc
  }, {})

  const filters = Object.fromEntries(
    Object.entries(specOptions).map(([key, values]) => [key, Array.from(values).sort()])
  )

  return {
    slug: categorySlug,
    category: categoryProducts[0]?.categoryLabel || categorySlug,
    filters: {
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
      specs: filters,
    },
    products: categoryProducts,
  }
}

export async function getProductBySlug(
  categorySlug: string,
  productSlug: string
): Promise<ProductRecord | null> {
  const products = await loadProducts(false)
  return (
    products.find(
      (product) => product.categorySlug === categorySlug && product.slug === productSlug
    ) || null
  )
}
