import type { Metadata } from 'next'
import ResetPasswordClientPage from './ResetPasswordClientPage'

export const metadata: Metadata = {
  title: 'Green | Şifre Sıfırlama',
  description: 'Green hesabınız için şifre sıfırlama talebi oluşturun. Sipariş erişimini geri kazanın, ödeme kayıtlarını kontrol edin ve kargo bildirimlerini yeniden alın.'
}

export default function SifremiUnuttumPage() {
  return <ResetPasswordClientPage />
}
