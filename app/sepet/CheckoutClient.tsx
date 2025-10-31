'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CreditCard,
  Lock,
  LogIn,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Trash2,
  Truck,
  User,
  UserPlus
} from 'lucide-react'
import { CartItem, useCart } from '../context/CartContext'

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount)

type NoticeTone = 'info' | 'success' | 'warning'

interface SurfaceNotice {
  id: number
  tone: NoticeTone
  title: string
  message: string
}

interface ShippingOption {
  id: string
  label: string
  description: string
  price: number
  eta: string
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    label: 'Standart Teslimat',
    description: 'Türkiye geneli 1-3 iş günü',
    price: 0,
    eta: 'Ücretsiz'
  },
  {
    id: 'express',
    label: 'Ekspres Teslimat',
    description: 'İstanbul içi aynı gün akşam',
    price: 149,
    eta: '18:00 öncesi sipariş'
  },
  {
    id: 'pickup',
    label: 'Mağazadan Teslim Al',
    description: 'Green Ataşehir Deneyim Merkezi',
    price: 0,
    eta: 'Randevu ile'
  }
]

const STEPS = [
  { id: 'cart', label: 'Sepetiniz' },
  { id: 'address', label: 'Teslimat' },
  { id: 'account', label: 'Üyelik' },
  { id: 'payment', label: 'Ödeme' }
] as const

type AccountMode = 'guest' | 'login' | 'register'
type PaymentMethod = 'card' | 'transfer'

type AddressForm = {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  district: string
  postalCode: string
  notes: string
}

type LoginForm = {
  email: string
  password: string
}

type RegisterForm = {
  name: string
  surname: string
  email: string
  password: string
  marketing: boolean
}

type CardForm = {
  number: string
  name: string
  expiry: string
  cvc: string
}

const CheckoutClient = () => {
  const {
    items,
    totalPrice,
    totalCount,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart()

  const [stepIndex, setStepIndex] = useState(0)
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0])
  const [addressForm, setAddressForm] = useState<AddressForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    notes: ''
  })
  const [accountMode, setAccountMode] = useState<AccountMode>('guest')
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: '',
    surname: '',
    email: '',
    password: '',
    marketing: true
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [cardForm, setCardForm] = useState<CardForm>({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  })
  const [surfaceNotice, setSurfaceNotice] = useState<SurfaceNotice | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shippingPrice = selectedShipping.price
  const estimatedTotal = totalPrice + shippingPrice

  const showNotice = (notice: Omit<SurfaceNotice, 'id'>) => {
    setSurfaceNotice({ id: Date.now(), ...notice })
  }

  useEffect(() => {
    if (!surfaceNotice) {
      return
    }

    const timer = window.setTimeout(() => setSurfaceNotice(null), 3600)
    return () => window.clearTimeout(timer)
  }, [surfaceNotice])

  const handleQuantityChange = (item: CartItem, delta: number) => {
    const nextQuantity = item.quantity + delta
    if (nextQuantity <= 0) {
      removeItem(item.id)
      return
    }

    const max = item.stock ?? Number.POSITIVE_INFINITY
    updateQuantity(item.id, Math.min(Math.max(1, nextQuantity), max))
  }

  const validateStep = () => {
    switch (stepIndex) {
      case 0: {
        if (!items.length) {
          showNotice({
            tone: 'warning',
            title: 'Sepetiniz boş',
            message: 'Devam etmeden önce sepetinize ürün ekleyin.'
          })
          return false
        }
        return true
      }
      case 1: {
        const required = ['fullName', 'phone', 'address', 'city', 'district'] as const
        const missing = required.filter((key) => !addressForm[key]?.trim())
        if (missing.length) {
          showNotice({
            tone: 'warning',
            title: 'Teslimat bilgileri eksik',
            message: 'Lütfen ad, telefon, adres, şehir ve ilçe alanlarını doldurun.'
          })
          return false
        }
        return true
      }
      case 2: {
        if (accountMode === 'login') {
          if (!loginForm.email.trim() || !loginForm.password.trim()) {
            showNotice({
              tone: 'warning',
              title: 'Giriş bilgileri eksik',
              message: 'E-posta ve şifrenizi girerek devam edin veya misafir seçeneğini kullanın.'
            })
            return false
          }
        }
        if (accountMode === 'register') {
          if (!registerForm.name.trim() || !registerForm.surname.trim() || !registerForm.email.trim() || !registerForm.password.trim()) {
            showNotice({
              tone: 'warning',
              title: 'Üyelik bilgileri eksik',
              message: 'Üyelik oluşturmak için ad, soyad, e-posta ve şifre alanlarını doldurun.'
            })
            return false
          }
        }
        return true
      }
      case 3: {
        if (paymentMethod === 'card') {
          if (!cardForm.number.trim() || !cardForm.name.trim() || !cardForm.expiry.trim() || !cardForm.cvc.trim()) {
            showNotice({
              tone: 'warning',
              title: 'Kart bilgileri eksik',
              message: 'Ödeme adımını tamamlamak için kart bilgilerinizi girin veya EFT/Havale seçeneğini seçin.'
            })
            return false
          }
        }
        return true
      }
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateStep()) {
      return
    }
    setStepIndex((current) => Math.min(current + 1, STEPS.length - 1))
  }

  const handlePrev = () => {
    setStepIndex((current) => Math.max(current - 1, 0))
  }

  const handlePlaceOrder = () => {
    if (!validateStep()) {
      return
    }
    setOrderPlaced(true)
    showNotice({
      tone: 'success',
      title: 'Siparişiniz alındı',
      message: 'Ödeme onaylandıktan sonra siparişiniz hazırlanmaya başlayacak.'
    })
    clearCart()
  }

  const renderCartItems = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Sepet Özeti</p>
          <h2 className="text-2xl font-semibold text-slate-900">{totalCount} ürün</h2>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#8dc63f]/60 hover:text-slate-900"
          >
            <Trash2 className="h-4 w-4" />
            Sepeti Temizle
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#e7f6cc] text-[#6ea82a]">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Sepetiniz boş</h3>
          <p className="mt-2 text-sm text-slate-600">
            Favori ürünlerinizi sepete ekleyin, modern kasa deneyimlerini kaçırmayın.
          </p>
          <Link
            href="/kategoriler"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8dc63f] px-6 py-3 text-sm font-semibold text-[#0b140a] transition hover:bg-[#7ab82f]"
          >
            <Sparkles className="h-4 w-4" />
            Keşfe devam et
          </Link>
        </motion.div>
      ) : (
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const lineTotal = item.price * item.quantity
            const atLimit = item.stock !== undefined && item.quantity >= item.stock
            const imageUrl =
              item.image || `https://via.placeholder.com/300x300/f6f7f8/1f1f1f?text=${encodeURIComponent(item.name.slice(0, 12))}`

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                  <div className="relative mx-auto h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:mx-0">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.categorySlug || 'GREEN'}</p>
                          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                          {item.slug && (
                            <Link
                              href={`/kategoriler/${item.categorySlug ?? 'urunler'}/${item.slug}`}
                              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#6ea82a] hover:text-[#4f7d19]"
                            >
                              Detaya git
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full border border-slate-200 p-2 text-slate-400 transition hover:border-red-200 hover:text-red-500"
                          aria-label="Ürünü sepetten çıkar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-500">Toplam: <span className="font-semibold text-slate-900">{formatPrice(lineTotal)}</span></p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="rounded-l-full p-2 hover:bg-slate-100"
                          aria-label="Adet azalt"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="rounded-r-full p-2 hover:bg-slate-100"
                          aria-label="Adet artır"
                          disabled={atLimit}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-[#6ea82a]" />
                        2 yıl Green resmi garanti
                      </div>
                    </div>

                    {atLimit && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-xs font-medium text-amber-600"
                      >
                        <AlertCircle className="h-4 w-4" />
                        Bu üründen stokta {item.stock} adet mevcut. Daha fazla ekleyemezsiniz.
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm">
        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-[#6ea82a]" />
          <span>1500₺ üzeri alışverişlerde ekspres teslimat %50 indirimli.</span>
        </div>
        <Link
          href="/kategoriler"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#8dc63f]/60 hover:text-slate-900"
        >
          <ShoppingBag className="h-4 w-4" />
          Alışverişe devam et
        </Link>
      </div>
    </div>
  )

  const renderAddressForm = () => (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Teslimat bilgileri</p>
        <h2 className="text-2xl font-semibold text-slate-900">Adres ve iletişim</h2>
        <p className="text-sm text-slate-600">
          Siparişinizi kusursuz ulaştırmak için iletişim ve adres bilgilerinizi girin. Tüm bilgiler SSL ile korunur.
        </p>
      </header>

      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          İsim Soyisim
          <input
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
            value={addressForm.fullName}
            onChange={(event) => setAddressForm((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="Adınız Soyadınız"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Telefon
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
            <Phone className="h-4 w-4 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              value={addressForm.phone}
              onChange={(event) => setAddressForm((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="05xx xxx xx xx"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          E-posta
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
            <Mail className="h-4 w-4 text-slate-400" />
            <input
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              value={addressForm.email}
              onChange={(event) => setAddressForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="ornek@green.net"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          İlçe / Şehir
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
              value={addressForm.district}
              onChange={(event) => setAddressForm((prev) => ({ ...prev, district: event.target.value }))}
              placeholder="İlçe"
            />
            <input
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
              value={addressForm.city}
              onChange={(event) => setAddressForm((prev) => ({ ...prev, city: event.target.value }))}
              placeholder="Şehir"
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
          Adres
          <textarea
            className="min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
            value={addressForm.address}
            onChange={(event) => setAddressForm((prev) => ({ ...prev, address: event.target.value }))}
            placeholder="Mahalle, cadde, bina ve daire numarası"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600">
          Posta Kodu
          <input
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
            value={addressForm.postalCode}
            onChange={(event) => setAddressForm((prev) => ({ ...prev, postalCode: event.target.value }))}
            placeholder="34000"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-600 md:col-span-2">
          Teslimat Notu
          <textarea
            className="min-h-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
            value={addressForm.notes}
            onChange={(event) => setAddressForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Kurye için notunuz (isteğe bağlı)"
          />
        </label>
      </div>

      <div className="rounded-3xl border border-[#d9efb8] bg-[#f3fbe3] p-5 text-sm text-slate-700">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-[#6ea82a]" />
          <div className="space-y-2">
            <p className="font-semibold text-slate-900">Green Teslimat Güvencesi</p>
            <p>Adresiniz teslimat partnerlerimizle şifrelenmiş olarak paylaşılır. Teslimat sırasında SMS ve WhatsApp bilgilendirmesi yapılır.</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAccountStep = () => (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Üyelik seçenekleri</p>
        <h2 className="text-2xl font-semibold text-slate-900">Nasıl devam etmek istersiniz?</h2>
        <p className="text-sm text-slate-600">
          Green hesabınıza giriş yapabilir, yeni bir üyelik oluşturabilir veya misafir olarak ödeme adımına geçebilirsiniz.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <button
          onClick={() => setAccountMode('guest')}
          className={`flex flex-col gap-4 rounded-3xl border p-6 text-left transition shadow-sm ${
            accountMode === 'guest'
              ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-slate-900'
              : 'border-slate-200 bg-white text-slate-600 hover:border-[#8dc63f]/30 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">Misafir</span>
            <BadgeCheck className={`h-5 w-5 ${accountMode === 'guest' ? 'text-[#6ea82a]' : 'text-slate-300'}`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Hızlı ödeme</h3>
            <p className="text-sm text-slate-600">Üyelik oluşturmadan siparişinizi tamamlayın.</p>
          </div>
        </button>

        <button
          onClick={() => setAccountMode('login')}
          className={`flex flex-col gap-4 rounded-3xl border p-6 text-left transition shadow-sm ${
            accountMode === 'login'
              ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-slate-900'
              : 'border-slate-200 bg-white text-slate-600 hover:border-[#8dc63f]/30 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">Mevcut</span>
            <LogIn className={`h-5 w-5 ${accountMode === 'login' ? 'text-[#6ea82a]' : 'text-slate-300'}`} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Hesabınla devam et</h3>
            <p className="text-sm text-slate-600">Önceki siparişlerini görüntüleyin, kaydedilmiş adresleri seçin.</p>
            {accountMode === 'login' && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <label className="flex items-center gap-3 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <input
                      className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      value={loginForm.email}
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="E-posta adresiniz"
                    />
                  </label>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <label className="flex items-center gap-3 text-sm text-slate-600">
                    <Lock className="h-4 w-4 text-slate-400" />
                    <input
                      className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      value={loginForm.password}
                      type="password"
                      onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                      placeholder="Şifreniz"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </button>

        <button
          onClick={() => setAccountMode('register')}
          className={`flex flex-col gap-4 rounded-3xl border p-6 text-left transition shadow-sm ${
            accountMode === 'register'
              ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-slate-900'
              : 'border-slate-200 bg-white text-slate-600 hover:border-[#8dc63f]/30 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">Yeni</span>
            <UserPlus className={`h-5 w-5 ${accountMode === 'register' ? 'text-[#6ea82a]' : 'text-slate-300'}`} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Üyelik oluştur</h3>
            <p className="text-sm text-slate-600">Sipariş geçmişi, hızlı iade, özel kampanyalara erişim.</p>
            {accountMode === 'register' && (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                    value={registerForm.name}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Ad"
                  />
                  <input
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                    value={registerForm.surname}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, surname: event.target.value }))}
                    placeholder="Soyad"
                  />
                </div>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                  value={registerForm.email}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="E-posta"
                />
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                  value={registerForm.password}
                  type="password"
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="Şifre"
                />
                <label className="flex items-center gap-3 text-xs text-slate-500">
                  <input
                    type="checkbox"
                    checked={registerForm.marketing}
                    onChange={(event) => setRegisterForm((prev) => ({ ...prev, marketing: event.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 bg-white text-[#6ea82a] focus:ring-0"
                  />
                  Green kampanya ve güncellemelerini almak istiyorum.
                </label>
              </div>
            )}
          </div>
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        <div className="flex items-start gap-3">
          <Smartphone className="h-5 w-5 text-[#6ea82a]" />
          <p>
            Misafir siparişlerde bile tüm kargo güncellemeleri SMS ve e-posta ile paylaşılır. Hesabınız varsa siparişinizi Green uygulamasından canlı takip edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Ödeme seçenekleri</p>
        <h2 className="text-2xl font-semibold text-slate-900">Ödemenizi tamamlayın</h2>
        <p className="text-sm text-slate-600">
          Ödemeleriniz 256-bit SSL ile korunur. Kartınız kayıt edilmez, veriler gelişmiş şifreleme ile işlenir.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`flex h-full flex-col gap-4 rounded-3xl border p-6 text-left transition shadow-sm ${
            paymentMethod === 'card'
              ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-slate-900 shadow-[0_18px_60px_rgba(141,198,63,0.18)]'
              : 'border-slate-200 bg-white text-slate-600 hover:border-[#8dc63f]/30 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">Kart</span>
            <CreditCard className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-[#6ea82a]' : 'text-slate-300'}`} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Kredi / Banka Kartı</h3>
            <p className="text-sm text-slate-600">Tüm bankaların 3D Secure destekli kartlarıyla ödeme.</p>
          </div>

          {paymentMethod === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <label className="flex flex-col gap-2 text-xs text-slate-500">
                  Kart Numarası
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                    value={cardForm.number}
                    onChange={(event) => setCardForm((prev) => ({ ...prev, number: event.target.value }))}
                    placeholder="**** **** **** 4090"
                  />
                </label>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <label className="flex flex-col gap-2 text-xs text-slate-500">
                  Kart Üzerindeki İsim
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                    value={cardForm.name}
                    onChange={(event) => setCardForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Ad Soyad"
                  />
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-[repeat(2,minmax(0,1fr))_100px]">
                <label className="flex flex-col gap-2 text-xs text-slate-500">
                  Son Kullanma
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                    value={cardForm.expiry}
                    onChange={(event) => setCardForm((prev) => ({ ...prev, expiry: event.target.value }))}
                    placeholder="AA/YY"
                  />
                </label>
                <label className="flex flex-col gap-2 text-xs text-slate-500">
                  Güvenlik Kodu
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#8dc63f] focus:bg-white focus:outline-none"
                    value={cardForm.cvc}
                    onChange={(event) => setCardForm((prev) => ({ ...prev, cvc: event.target.value }))}
                    placeholder="CVV"
                  />
                </label>
                <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                  <ShieldCheck className="mr-2 h-4 w-4 text-[#6ea82a]" />
                  3D Secure aktif
                </div>
              </div>
            </motion.div>
          )}
        </button>

        <button
          onClick={() => setPaymentMethod('transfer')}
          className={`flex h-full flex-col gap-4 rounded-3xl border p-6 text-left transition shadow-sm ${
            paymentMethod === 'transfer'
              ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-slate-900 shadow-[0_18px_60px_rgba(141,198,63,0.18)]'
              : 'border-slate-200 bg-white text-slate-600 hover:border-[#8dc63f]/30 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">EFT / Havale</span>
            <Banknote className={`h-6 w-6 ${paymentMethod === 'transfer' ? 'text-[#6ea82a]' : 'text-slate-300'}`} />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Banka Transferi</h3>
            <p className="text-sm text-slate-600">GREEN hesaplarına 7/24 FAST ile ödeme yapabilirsiniz.</p>
            {paymentMethod === 'transfer' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Banka Bilgileri</p>
                  <p>Garanti BBVA - Green Bilişim</p>
                  <p>IBAN: TR00 0000 0000 0000 0000 0000</p>
                  <p className="text-xs text-slate-400">Açıklama: Sipariş numaranız ve adınız.</p>
                </div>
                <label className="flex items-center gap-3 text-xs text-slate-500">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-white text-[#6ea82a] focus:ring-0" defaultChecked />
                  EFT ile ödeme tercihini hatırla.
                </label>
              </motion.div>
            )}
          </div>
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#6ea82a]" />
          <p>Green ödeme altyapısı BKM Express ve MasterCard güvenlik standartları ile uyumludur. Kart bilgileriniz saklanmaz.</p>
        </div>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return renderCartItems()
      case 1:
        return renderAddressForm()
      case 2:
        return renderAccountStep()
      case 3:
        return renderPaymentStep()
      default:
        return null
    }
  }

  const timelineProgress = (stepIndex / (STEPS.length - 1)) * 100

  const buttonLabel = stepIndex === STEPS.length - 1 ? 'Siparişi Tamamla' : `${STEPS[stepIndex + 1].label} →`

  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-24 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 shadow-sm">
            <ShoppingCart className="h-4 w-4 text-[#6ea82a]" />
            Green Checkout
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Sepetiniz, teslimatınız ve ödemeniz tek sayfada. Her adım sade ve net.
            </h1>
            <p className="text-base text-slate-600">
              Adımları izleyerek sepetinizi düzenleyin, adresinizi girin, hesabınızla veya misafir olarak ilerleyin. Ödemeleriniz gelişmiş güvenlik standartlarıyla korunur.
            </p>
          </div>
        </header>

        <div className="space-y-6">
          <div className="relative rounded-3xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.28em]">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
                    index <= stepIndex ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-[#3f6510]' : 'border-slate-200 text-slate-400'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-slate-400">{step.label}</span>
                </div>
              ))}
            </div>
            <motion.span
              className="absolute left-10 right-10 top-1/2 h-px origin-left bg-gradient-to-r from-transparent via-[#6ea82a]/60 to-transparent"
              animate={{ scaleX: timelineProgress / 100 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {surfaceNotice && (
            <motion.div
              key={surfaceNotice.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm shadow-sm ${
                surfaceNotice.tone === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : surfaceNotice.tone === 'warning'
                    ? 'border-amber-200 bg-amber-50 text-amber-700'
                    : 'border-sky-200 bg-sky-50 text-sky-700'
              }`}
            >
              {surfaceNotice.tone === 'success' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : surfaceNotice.tone === 'warning' ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
              <div>
                <p className="font-semibold">{surfaceNotice.title}</p>
                <p className="text-xs">{surfaceNotice.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <motion.div
            key={STEPS[stepIndex].id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {renderStepContent()}
          </motion.div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-400">Sipariş özeti</span>
                  <span className="text-lg font-semibold text-slate-900">{totalCount} ürün</span>
                </div>
                <Sparkles className="h-5 w-5 text-[#6ea82a]" />
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Ürün toplamı</span>
                  <span className="font-semibold text-slate-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kargo</span>
                  <span className="font-semibold text-slate-900">{formatPrice(shippingPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>KDV</span>
                  <span className="font-semibold text-slate-900">Dahil</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-slate-900">Tahmini toplam</span>
                  <span className="text-xl font-semibold text-[#6ea82a]">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Teslimat tercihi</p>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedShipping(option)}
                      className={`flex w-full flex-col gap-1 rounded-2xl border p-4 text-left transition ${
                        selectedShipping.id === option.id
                          ? 'border-[#6ea82a]/60 bg-[#f2fbe6] text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-[#8dc63f]/30 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900">{option.label}</span>
                        <span className="text-sm font-semibold text-[#6ea82a]">{option.price === 0 ? 'Ücretsiz' : formatPrice(option.price)}</span>
                      </div>
                      <span className="text-xs text-slate-500">{option.description}</span>
                      <span className="text-[11px] text-slate-400">{option.eta}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-[#6ea82a]" />
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">Müşteri deneyimi</p>
                  <p>Green müşteri ekibi siparişinizin her adımında yanınızda. 7/24 canlı destek WhatsApp hattımızla aklınızdaki soruları iletebilirsiniz.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Sonraki adım: {STEPS[Math.min(stepIndex + 1, STEPS.length - 1)].label}</span>
            <span>Siparişinizi tamamlamadan önce tüm bilgilerinizi kontrol edin.</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#8dc63f]/50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />
              Geri
            </button>
            {stepIndex === STEPS.length - 1 ? (
              <button
                onClick={handlePlaceOrder}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#8dc63f] px-6 py-3 text-sm font-semibold text-[#0b140a] transition hover:bg-[#7ab82f]"
              >
                <BadgeCheck className="h-4 w-4" />
                Siparişi tamamla
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b140a] transition hover:bg-slate-100"
              >
                {buttonLabel}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {orderPlaced && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative overflow-hidden rounded-3xl border border-[#d9efb8] bg-[#f1fadf] p-8 text-center text-slate-900 shadow-lg"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(141,198,63,0.18),_transparent_60%)]" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#4d7c1d] shadow-[0_0_30px_rgba(141,198,63,0.25)]">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold">Siparişiniz alındı!</h3>
                <p className="max-w-2xl text-sm text-slate-600">
                  Teşekkür ederiz. Siparişiniz onay için sıraya alındı. Green deneyim ekibi kısa süre içinde sizinle iletişime geçecek. Hesabınız varsa siparişlerim bölümünden anlık olarak takip edebilirsiniz.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/kategoriler"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#8dc63f]/50 hover:text-slate-900"
                  >
                    Keşfe devam et
                  </Link>
                  <button
                    onClick={() => setOrderPlaced(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b140a] transition hover:bg-slate-100"
                  >
                    Yeni sipariş planla
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default CheckoutClient
