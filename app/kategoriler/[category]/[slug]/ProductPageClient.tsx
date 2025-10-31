'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Breadcrumb from '../../../components/Breadcrumb'
import ImageViewer from '../../../components/ImageViewer'
import CategoryShowcase from '../../../components/CategoryShowcase'
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, CheckCircle, MessageCircle, Facebook, Twitter, Linkedin, Copy, X, Instagram } from 'lucide-react'
import Link from 'next/link'
import { getCategories } from '../../../utils/categoryUtils'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../../context/CartContext'

interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  images?: Array<{
    id: number
    url: string
    alt: string
  }>
  badge?: string
  badgeColor?: string
  highlightedFeatures?: Array<{
    title: string
    value: string
    description: string
  }>
  specs: {
    [key: string]: string
  }
  features?: string[]
  stock: number
  description: string
  warranty: string
  shipping: string
}

interface ProductPageClientProps {
  product: Product
  category: string
  productImages: Array<{id: number, url: string, alt: string}>
}

export default function ProductPageClient({ product, category, productImages }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(product.price)
  const [activeTab, setActiveTab] = useState('description')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showStickyHeader, setShowStickyHeader] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
  const { addItem, isInCart } = useCart()
  const inCart = isInCart(product.id)
  const addToCartLabel = product.stock > 0 ? (inCart ? 'Sepette' : 'Sepete Ekle') : 'Stokta Yok'

  // Check if we're in the browser
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // Update total price when quantity changes
  useEffect(() => {
    setTotalPrice(product.price * quantity)
  }, [quantity, product.price])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  // Scroll handler for sticky header
  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowStickyHeader(scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isBrowser])

  // Toggle global header visibility when sticky product bar is active
  useEffect(() => {
    if (!isBrowser) return

    const body = document.body
    body.classList.toggle('product-sticky-active', showStickyHeader)
    window.dispatchEvent(new CustomEvent('product-sticky-change', { detail: { active: showStickyHeader } }))

    return () => {
      body.classList.remove('product-sticky-active')
      window.dispatchEvent(new CustomEvent('product-sticky-change', { detail: { active: false } }))
    }
  }, [showStickyHeader, isBrowser])

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: { [key: string]: string } = {
      'gaming-pc': 'Gaming PC',
      'gaming-mouse': 'Gaming Mouse',
      'gaming-klavye': 'Gaming Klavye',
      'gaming-kulaklik': 'Gaming Kulaklık',
      'sivi-sogutma': 'Sıvı Soğutma',
      'hava-sogutucu': 'Hava Soğutucu',
      'kasa-fani': 'Kasa Fanı',
      'pc-kasasi': 'PC Kasası',
      'gaming-psu': 'Güç Kaynağı',
      'askeri-psu': 'Askeri PSU',
      'aio-pc': 'AIO PC',
      'klavye': 'Klavye',
      'mouse': 'Mouse',
      'kulaklik': 'Kulaklık',
      'diger': 'Diğer Ürünler'
    }
    return categoryNames[category] || category
  }

  const getDiscountPercentage = () => {
    if (product?.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    }
    return 0
  }

  const productSubtitle = (() => {
    const short = product?.shortDescription?.trim()
    if (short) {
      return short
    }

    const plainDescription = product?.description
      ?.replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    if (plainDescription) {
      const firstSentence = plainDescription.split(/[.!?]/)[0]?.trim()
      if (firstSentence) {
        return firstSentence
      }
      return plainDescription
    }

    return 'Green oyuncu deneyimi için seçilmiş bileşenler'
  })()

  const stickyDescription = product?.shortDescription?.trim() || productSubtitle

  const handleAddToCart = () => {
    if (!product || product.stock === 0) {
      return
    }

    const primaryImage = product.images?.[selectedImage]?.url
      || product.images?.[0]?.url
      || productImages?.[selectedImage]?.url
      || productImages?.[0]?.url
      || null

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: primaryImage,
      slug: product.slug,
      categorySlug: category,
      stock: product.stock
    })
  }

  const handleWhatsAppSupport = () => {
    // EnhancedWhatsAppButton'u tetikle
    const whatsappButton = document.querySelector('[aria-label="WhatsApp Destek"]') as HTMLButtonElement
    if (whatsappButton) {
      whatsappButton.click()
    }
  }

  const handleShare = async () => {
    if (!isBrowser) return

    const shareData = {
      title: product.name,
      text: product.shortDescription,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (error) {
        if ((error as DOMException)?.name === 'AbortError') {
          return
        }
        console.error('Native share failed, falling back to modal.', error)
      }
    }

    setShowShareModal(true)
  }

  const buildShareParams = () => {
    if (!isBrowser) {
      return { url: '', text: '' }
    }

    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`${product.name} - ${product.shortDescription}`)
    return { url, text }
  }

  const shareToFacebook = () => {
    if (!isBrowser) return
    const { url } = buildShareParams()
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer')
    setShowShareModal(false)
  }

  const shareToTwitter = () => {
    if (!isBrowser) return
    const { url, text } = buildShareParams()
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer')
    setShowShareModal(false)
  }

  const shareToLinkedIn = () => {
    if (!isBrowser) return
    const { url } = buildShareParams()
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer')
    setShowShareModal(false)
  }

  const shareToWhatsApp = () => {
    if (!isBrowser) return
    const { url, text } = buildShareParams()
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'noopener,noreferrer')
    setShowShareModal(false)
  }

  const shareToInstagramDM = () => {
    if (!isBrowser) return;
    
    const { url, text } = buildShareParams()
    
    // Instagram URL şeması ile DM'e yönlendirme
    const instagramUrl = `instagram://direct/inbox`
    window.location.href = instagramUrl
    
    // Eğer Instagram uygulaması yüklü değilse veya desktop ise
    setTimeout(() => {
      if (typeof document !== 'undefined' && document.hasFocus()) {
        // Instagram web DM'e yönlendir
        window.open(`https://instagram.com/direct/inbox?text=${text}%20${url}`, '_blank')
      }
    }, 500)
    
    setShowShareModal(false)
  }

  const copyToClipboard = async () => {
    if (!isBrowser) return;
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link kopyalandı!')
        setShowShareModal(false)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = window.location.href
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Link kopyalandı!')
        setShowShareModal(false)
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err)
    }
  }

  // Separate HTML features from regular features
  const getHtmlFeatures = (features: string[] = []) => features?.filter(f => f.startsWith('<')) || []
  const getRegularFeatures = (features: string[] = []) => features?.filter(f => !f.startsWith('<')) || []

  return (
    <main className="min-h-screen bg-white overflow-x-hidden pt-20">
      {/* Sticky Product Bar */}
      <AnimatePresence>
        {showStickyHeader && (
          <motion.div
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:px-6"
          >
            <div className="pointer-events-auto w-full max-w-5xl rounded-3xl border border-gray-100/80 bg-white/90 shadow-[0_22px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl">
              <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex w-full items-start gap-3">
                  <div className="hidden h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#8dc63f]/15 via-white to-[#7ab32f]/20 shadow-inner sm:flex">
                    <Image
                      src="/images/kurumsal-logo/green-logo.svg"
                      alt="Green Bilgisayar Logo"
                      width={96}
                      height={28}
                      className="h-7 w-auto"
                      priority
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-5 text-slate-900 line-clamp-2">{product.name}</p>
                    {stickyDescription && (
                      <p className="mt-1 text-xs leading-5 text-slate-600 line-clamp-2">{stickyDescription}</p>
                    )}
                  </div>
                </div>

                <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                  <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8dc63f] to-[#6ea82a] px-3 py-1.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(141,198,63,0.28)]">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="group inline-flex items-center justify-center rounded-full border border-[#8dc63f]/40 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0f172a] transition-all duration-200 hover:border-[#8dc63f] hover:bg-[#8dc63f] hover:text-white disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <span className="mr-1.5 rounded-full bg-[#8dc63f]/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#7ab32f] transition-colors group-hover:bg-white/15 group-hover:text-white">
                      {addToCartLabel.toLocaleUpperCase('tr-TR')}
                    </span>
                    {addToCartLabel}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={[
          { label: 'Kategoriler', href: '/kategoriler' },
          { label: getCategoryDisplayName(category), href: `/kategoriler/${category}` },
          { label: product.name }
        ]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images */}
          <div className="lg:sticky lg:top-28 -mx-4 sm:-mx-6 lg:mx-0">
            <div className="bg-[#fafafa] overflow-hidden">
              <ImageViewer 
                images={productImages.map(img => ({ url: img.url, alt: img.alt }))} 
                onImageChange={setSelectedImage}
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4 lg:space-y-8">
            {/* Title and Basic Info */}
            <div className="bg-white p-4 lg:p-6">
              <h1 className="text-2xl lg:text-4xl font-light text-gray-900 mb-3 break-words">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{product.shortDescription}</p>
              
              {/* Rating and Stock */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`star-${i}`}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    ({product.reviews} değerlendirme)
                  </span>
                </div>
                
                {/* Stock Status */}
                {product.stock > 0 ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 text-sm font-medium">Stokta Mevcut</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 text-sm font-medium">Stokta Yok</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <span className="text-3xl font-light text-gray-900">
                        {formatPrice(totalPrice)}
                      </span>
                      {quantity > 1 && (
                        <div className="text-sm text-gray-500">
                          Birim fiyat: {formatPrice(product.price)}
                        </div>
                      )}
                    </div>
                    {product.oldPrice && (
                      <div className="flex items-center space-x-2">
                        <span className="text-base text-gray-500 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
        <span className="bg-[#8dc63f] text-white text-xs font-medium px-2 py-1 rounded">
                          %{getDiscountPercentage()} İndirim
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Ücretsiz Teslimat</div>
                    <div className="text-sm font-medium text-gray-900">1-2 İş Günü</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white p-6 mt-6 space-y-6">
              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Adet</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                    aria-label="Miktarı azalt"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center text-lg font-medium" aria-label={`Miktar: ${quantity}`}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={quantity >= product.stock}
                    aria-label="Miktarı artır"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="relative overflow-hidden group bg-[#8dc63f] text-white py-3 px-6 rounded-full font-medium text-base hover:bg-[#7ab82f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{addToCartLabel.toLocaleUpperCase('tr-TR')}</span>
                  </button>
                  
                  <button
                    onClick={handleWhatsAppSupport}
                    disabled={product.stock === 0}
                className="relative overflow-hidden group bg-[#8dc63f] text-white py-3 px-6 rounded-full font-medium text-base hover:bg-[#7ab82f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Destek Al</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`py-3 px-4 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 ${
                      isWishlisted 
                        ? 'bg-[#8dc63f]/10 text-[#8dc63f] border border-[#8dc63f]/30' 
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                    aria-label={isWishlisted ? "Favorilerden kaldır" : "Favorilere ekle"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>Favoriler</span>
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="py-3 px-4 rounded-full font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                    aria-label="Ürünü paylaş"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Paylaş</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-[#8dc63f] text-[#8dc63f]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Açıklama
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specs'
                    ? 'border-[#8dc63f] text-[#8dc63f]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Teknik Özellikler
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'features'
                    ? 'border-[#8dc63f] text-[#8dc63f]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Diğer Özellikler
              </button>
            </nav>
          </div>

          <div className="py-8">
            {/* Açıklama */}
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-700">
                {/* Display HTML features (images) first */}
                {getHtmlFeatures(product.features).map((feature, index) => (
                  <div key={`html-feature-${index}`} className="mb-6">
                    <div dangerouslySetInnerHTML={{ __html: feature }} />
                  </div>
                ))}
                {/* Then display the description */}
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            )}

            {/* Teknik Özellikler */}
            {activeTab === 'specs' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50/50 rounded-lg p-4 hover:bg-[#8dc63f]/5 transition-colors duration-200"
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 font-medium pl-4">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Diğer Özellikler */}
            {activeTab === 'features' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-w-full">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col style={{width: '40%'}} />
                    <col style={{width: '60%'}} />
                  </colgroup>
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Özellik
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                          Açıklama
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {getRegularFeatures(product.features).map((feature, index) => {
                        const parts = feature.split(':');
                        const title = parts[0]?.trim() || feature;
                        const description = parts[1]?.trim() || 'Mevcut';
                        
                        return (
                          <tr key={`feature-${index}`} className="hover:bg-[#8dc63f]/5 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-[#8dc63f] rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900">{title}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-gray-700">{description}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Showcase */}
        <div className="mt-20">
          <CategoryShowcase 
            categories={getCategories()} 
            currentCategory={category}
          />
        </div>
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-4 z-50 shadow-lg">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-[#8dc63f] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#7ab82f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>SATIN AL</span>
          </button>
          <button
            onClick={handleWhatsAppSupport}
            disabled={product.stock === 0}
            className="flex-1 bg-[#8dc63f] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#7ab82f] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Destek</span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ürünü Paylaş</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={shareToFacebook}
                className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-medium">Facebook</span>
              </button>
              
              <button
                onClick={shareToTwitter}
                className="flex items-center space-x-3 p-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
              >
                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                  <Twitter className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-medium">Twitter</span>
              </button>
              
              <button
                onClick={shareToLinkedIn}
                className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-medium">LinkedIn</span>
              </button>
              
              <button
                onClick={shareToWhatsApp}
                className="flex items-center space-x-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-medium">WhatsApp</span>
              </button>

              <button
                onClick={shareToInstagramDM}
                className="flex items-center space-x-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-medium">Instagram DM</span>
              </button>
            </div>
            
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200"
            >
              <Copy className="w-4 h-4" />
              <span className="font-medium">Linki Kopyala</span>
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
