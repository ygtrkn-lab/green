import type { Metadata } from 'next'
import GirisClientPage from './GirisClientPage'

export const metadata: Metadata = {
  title: 'Green | Giriş',
  description: 'Green giriş sayfası üzerinden hesabınıza bağlanarak sipariş takibi, ödeme geçmişi ve kargo bildirimlerini anında kontrol edin.'
}

export default function GirisPage() {
  return <GirisClientPage />
}
