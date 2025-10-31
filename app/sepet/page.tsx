import CheckoutClient from './CheckoutClient'

export const metadata = {
  title: 'Sepetim | Green Bilgisayar',
  description: 'Green Bilgisayar alışveriş sepetinizdeki ürünleri yönetin, adres ve ödeme adımlarını tamamlayın.'
}

export default function CartPage() {
  return <CheckoutClient />
}
