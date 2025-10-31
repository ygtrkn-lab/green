export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
}

export const categories: Category[] = [
  {
    id: 'gaming-pc',
    name: 'Gaming PC',
    slug: 'gaming-pc',
    image: '/images/header-categories/gaming-pc-category.jpg',
    description: 'En yüksek performanslı oyun bilgisayarları ve iş istasyonları'
  },
  {
    id: 'gaming-mouse',
    name: 'Gaming Mouse',
    slug: 'gaming-mouse',
    image: '/images/header-categories/mouse-category.jpg',
    description: 'Profesyonel oyuncular için özel tasarlanmış gaming mouse modelleri'
  },
  {
    id: 'gaming-klavye',
    name: 'Gaming Klavye',
    slug: 'gaming-klavye',
    image: '/images/header-categories/keyboard-category.jpg',
    description: 'Mekanik switchli profesyonel gaming klavyeler'
  },
  {
    id: 'gaming-kulaklik',
    name: 'Gaming Kulaklık',
    slug: 'gaming-kulaklik',
    image: '/images/header-categories/headset-category.jpg',
    description: '7.1 Surround ses sistemli gaming kulaklıklar'
  },
  {
    id: 'sivi-sogutma',
    name: 'Sıvı Soğutma',
    slug: 'sivi-sogutma',
    image: '/images/header-categories/liquid-cooler-category.jpg',
    description: 'AIO ve custom sıvı soğutma sistemleri'
  }
]

export function getCategories(): Category[] {
  return categories
}
