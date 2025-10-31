import type { Metadata } from 'next'
import KayitClientPage from './KayitClientPage'

export const metadata: Metadata = {
  title: 'Green | Kayıt Ol',
  description: 'Green hesabınızı şimdi oluşturun. Sipariş planlarınızı yönetin, kargo entegrasyonlarını takip edin ve GreenCare destek avantajlarından yararlanın.'
}

export default function KayitPage() {
  return <KayitClientPage />
}
