'use client'

import Link from 'next/link'
import { Star, ShoppingCart, Heart, ZoomIn, Zap, X, ChevronLeft, ChevronRight, Minus, Plus, GitCompare, Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useComparison } from '../context/ComparisonContext'
import { useCart } from '../context/CartContext'

interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: string
  badgeColor?: string
  stock: number
  images?: Array<{
    id: number
    url: string
    alt: string
  }>
  categoryLabel?: string
  categorySlug?: string
}

interface ProductCardProps {
  product: Product
  categorySlug: string
  categoryLabel?: string
  viewMode?: 'grid' | 'list'
}

const CATEGORY_LABEL_MAP: Record<string, string> = {
  'gaming-pc': 'Gaming PC',
  'gaming-mouse': 'Gaming Mouse',
  'gaming-klavye': 'Gaming Klavye',
  'gaming-kulaklik': 'Gaming Kulaklık',
  'sivi-sogutma': 'Sıvı Soğutma',
  'hava-sogutucu': 'Hava Soğutucu',
  'kasa-fani': 'Kasa Fanı',
  'pc-kasasi': 'PC Kasası',
  'gaming-psu': 'Gaming PSU',
  'askeri-psu': 'Askeri PSU',
  'aio-pc': 'All-in-One PC',
  'klavye': 'Klavye',
  'mouse': 'Mouse',
  'kulaklik': 'Kulaklık',
  'diger': 'Diğer Ürünler'
}

const fallbackCategoryLabel = (slug: string) =>
  slug
    .split('-')
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ')

// Quick Preview Modal Component
function QuickPreviewModal({ product, categorySlug, categoryLabel, isOpen, onClose, onAddToCart, isInCart }: {
  product: Product
  categorySlug: string
  categoryLabel?: string
  isOpen: boolean
  onClose: () => void
  onAddToCart: (quantity: number, image?: string | null) => void
  isInCart: boolean
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const getDiscountPercentage = () => {
    if (product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    }
    return 0
  }

  // Create multiple images if only one exists
  const productImages = product.images?.length ? product.images : [
    {
      id: 1,
      url: `https://via.placeholder.com/600x600/f3f4f6/9ca3af?text=${encodeURIComponent(product.name.slice(0, 15))}`,
      alt: product.name
    }
  ]

  // Add additional placeholder images for better gallery effect
  const allImages = productImages.length < 3 ? [
    ...productImages,
    {
      id: productImages.length + 1,
      url: `https://via.placeholder.com/600x600/e5e7eb/6b7280?text=Detay+1`,
      alt: `${product.name} - Detay 1`
    },
    {
      id: productImages.length + 2,
      url: `https://via.placeholder.com/600x600/d1d5db/4b5563?text=Detay+2`,
      alt: `${product.name} - Detay 2`
    }
  ] : productImages

  const handleAddToCart = () => {
    if (product.stock === 0) {
      return
    }

    const image = allImages[selectedImage]?.url ?? null
    const safeQuantity = Math.min(quantity, product.stock)
    onAddToCart(safeQuantity, image)
    setQuantity(1)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 bg-white/95 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col lg:flex-row">
                {/* Image Gallery */}
                <div className="lg:w-3/5 p-8">
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
                      <img
                        src={allImages[selectedImage]?.url}
                        alt={allImages[selectedImage]?.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Image Navigation */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : allImages.length - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setSelectedImage(selectedImage < allImages.length - 1 ? selectedImage + 1 : 0)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.badge && (
                          <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${product.badgeColor} text-white shadow-lg backdrop-blur-sm`}>
                            {product.badge}
                          </span>
                        )}
                        {getDiscountPercentage() > 0 && (
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 text-sm font-bold rounded-full shadow-lg backdrop-blur-sm">
                            %{getDiscountPercentage()} İNDİRİM
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {allImages.length > 1 && (
                      <div className="flex space-x-3 overflow-x-auto pb-2">
                        {allImages.map((image, index) => (
                          <button
                            key={image.id}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                              selectedImage === index 
                                ? 'border-primary shadow-lg scale-105' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="lg:w-2/5 p-8 lg:border-l border-gray-100">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">{product.shortDescription}</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-900 font-semibold">{product.rating}</span>
                      <span className="text-gray-500">({product.reviews} değerlendirme)</span>
                    </div>

                    {/* Price */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-baseline space-x-3 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xl text-gray-400 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                      {getDiscountPercentage() > 0 && (
                        <div className="text-green-600 font-semibold">
                          {formatPrice((product.oldPrice || 0) - product.price)} tasarruf ediyorsunuz!
                        </div>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {product.stock > 0 ? (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            {product.stock} adet stokta - Hızlı teslimat
                          </>
                        ) : (
                          'Stokta yok'
                        )}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    {product.stock > 0 && (
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-900">Miktar</label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded-xl">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-3 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-3 min-w-[60px] text-center font-semibold">{quantity}</span>
                            <button
                              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                              className="p-3 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-sm text-gray-600">
                            Toplam: <span className="font-semibold text-gray-900">{formatPrice(product.price * quantity)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button 
                        disabled={product.stock === 0}
                        onClick={handleAddToCart}
                        className={`w-full py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-semibold text-lg ${
                          product.stock > 0
                            ? 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-6 h-6" />
                        <span>{product.stock > 0 ? (isInCart ? 'Sepette' : 'Sepete Ekle') : 'Stokta Yok'}</span>
                      </button>
                      
                      <Link 
                        href={`/kategoriler/${categorySlug}/${product.slug}`}
                        className="w-full block"
                      >
                        <button className="w-full py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-900 rounded-xl transition-all duration-200 font-semibold text-lg hover:bg-gray-50">
                          Detaylı Bilgi
                        </button>
                      </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-6 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Ücretsiz kargo (150₺ üzeri siparişlerde)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Aynı gün teslimat (stoklu ürünlerde)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>2 yıl resmi distribütör garantisi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ProductCard({ product, categorySlug, categoryLabel, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showQuickPreview, setShowQuickPreview] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const imageElementRef = useRef<HTMLImageElement | null>(null)
  const {
    toggleProduct,
    isSelected,
    selectedProducts,
    selectedCategory,
    selectionLimit,
    triggerToast
  } = useComparison()
  const { addItem, isInCart } = useCart()

  const resolvedCategorySlug = product.categorySlug || categorySlug
  const resolvedCategoryLabel = product.categoryLabel
    || categoryLabel
    || CATEGORY_LABEL_MAP[resolvedCategorySlug]
    || fallbackCategoryLabel(resolvedCategorySlug)

  const defaultCartImage = product.images?.[0]?.url
    || `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name.slice(0, 20))}`

  const addToCart = (qty = 1, image?: string | null) => {
    if (product.stock === 0) {
      return
    }

    const safeQuantity = Math.max(1, Math.round(qty))

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: safeQuantity,
      image: image ?? defaultCartImage,
      slug: product.slug,
      categorySlug: resolvedCategorySlug,
      stock: product.stock
    })
  }

  const inCart = isInCart(product.id)

  const isSelectedForComparison = isSelected(product.id)
  const selectionLocked = selectedCategory !== null && selectedCategory !== resolvedCategorySlug
  const limitReached = !isSelectedForComparison && selectedProducts.length >= selectionLimit
  const compareDisabled = !isSelectedForComparison && (selectionLocked || limitReached)
  const compareTitle = selectionLocked
    ? 'Sadece aynı kategori ürünleri karşılaştırabilirsiniz.'
    : limitReached
      ? `En fazla ${selectionLimit} ürün karşılaştırabilirsiniz.`
      : undefined

  const handleToggleCompare = () => {
    const result = toggleProduct({
      id: product.id,
      name: product.name,
      categorySlug: resolvedCategorySlug,
      categoryLabel: resolvedCategoryLabel,
      category: resolvedCategorySlug,
      price: product.price,
      rating: product.rating,
      image:
        product.images?.[0]?.url ??
        `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name.slice(0, 20))}`
    })

    if (result === 'added') {
      triggerToast(`"${product.name}" karşılaştırma listesine eklendi.`)
    } else if (result === 'removed') {
      triggerToast(`"${product.name}" listeden çıkarıldı.`, 'info')
    } else if (result === 'rejected-category') {
      triggerToast('Karşılaştırma için aynı kategoriden ürün seçmelisiniz.', 'warning')
    } else if (result === 'rejected-limit') {
      triggerToast(`En fazla ${selectionLimit} ürün karşılaştırabilirsiniz.`, 'warning')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const getDiscountPercentage = () => {
    if (product.oldPrice) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    }
    return 0
  }

  // Ürün resimlerini al, en az 2 resim olduğundan emin ol
  const productImages = product.images?.length ? product.images : [
    { id: 1, url: `https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name.slice(0, 20))}`, alt: product.name },
    { id: 2, url: `https://via.placeholder.com/300x300/e5e7eb/6b7280?text=${encodeURIComponent(product.name.slice(0, 15))}+2`, alt: `${product.name} - 2` }
  ]

  // Aktif gösterilecek görseli al
  const currentImage = productImages[currentImageIndex]?.url || productImages[0]?.url

  // Hover olaylarını yönet
  useEffect(() => {
    const img = imageElementRef.current
    if (!img) return

    if (img.complete && img.naturalWidth > 0) {
      setImageLoaded(true)
      return
    }

    setImageLoaded(false)

    const handleLoad = () => setImageLoaded(true)
    const handleError = () => setImageLoaded(true)

    img.addEventListener('load', handleLoad)
    img.addEventListener('error', handleError)

    return () => {
      img.removeEventListener('load', handleLoad)
      img.removeEventListener('error', handleError)
    }
  }, [currentImage])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || productImages.length < 2) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    if (!rect.width) return
    const relativeX = event.clientX - rect.left
    const clampedX = Math.max(0, Math.min(relativeX, rect.width))
    const ratio = clampedX / rect.width
    const nextIndex = Math.min(productImages.length - 1, Math.round(ratio * (productImages.length - 1)))
    if (nextIndex !== currentImageIndex) {
      setCurrentImageIndex(nextIndex)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCurrentImageIndex(0) // İlk resme geri dön
  }

  if (viewMode === 'list') {
    return (
      <>
        <motion.div 
          className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 p-8 border group ${
            isSelectedForComparison ? 'border-primary/80 ring-2 ring-primary/30' : 'border-white/40'
          }`}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        <div className="flex gap-8">
          <div className="relative w-48 h-48 flex-shrink-0">
            <div
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-3xl bg-gray-50"
              onPointerMove={handlePointerMove}
            >
            <img
              ref={imageElementRef}
              src={currentImage}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
            )}
            {productImages.length > 1 && isHovered && (
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 px-2 py-1 rounded-full bg-gray-900/70 text-white/90 text-[10px]"
                onPointerMove={handlePointerMove}
              >
                <div className="flex items-center gap-0.5 mr-1.5">
                  {productImages.map((image, index) => (
                    <span
                      key={image.id}
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                        currentImageIndex === index ? 'bg-white w-3' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold tracking-wide">{currentImageIndex + 1}/{productImages.length}</span>
              </div>
            )}
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${product.badgeColor} text-white shadow-sm backdrop-blur-sm`}>
                  {product.badge}
                </span>
              )}
              {getDiscountPercentage() > 0 && (
                <span className="bg-red-500 text-white px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm backdrop-blur-sm">
                  -{getDiscountPercentage()}%
                </span>
              )}
            </div>

            {/* Quick Actions - sadece hover edilen ürün için göster */}
            <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 transform-none' : 'opacity-0 transform translate-x-2'
            }`}>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full shadow-sm transition-all duration-200 backdrop-blur-sm ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => setShowQuickPreview(true)}
                className="p-2 rounded-full shadow-sm transition-all duration-200 backdrop-blur-sm bg-white/90 text-gray-600 hover:text-primary"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleToggleCompare}
                title={compareTitle}
                aria-disabled={compareDisabled}
                className={`p-2 rounded-full shadow-sm transition-all duration-200 backdrop-blur-sm ${
                  isSelectedForComparison
                    ? 'bg-primary text-white'
                    : 'bg-white/90 text-gray-600 hover:text-primary'
                } ${compareDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isSelectedForComparison ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <Link href={`/kategoriler/${resolvedCategorySlug}/${product.slug}`}>
                <h3 className="text-2xl font-medium text-gray-900 hover:text-gray-600 transition-colors mb-4 line-clamp-2 tracking-tight">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 mb-6 line-clamp-2 text-base leading-relaxed">{product.shortDescription}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 ml-3 font-medium text-sm">
                  {product.rating} ({product.reviews} değerlendirme)
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  product.stock > 0 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {product.stock > 0 ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      {product.stock} adet stokta
                    </>
                  ) : (
                    'Stokta yok'
                  )}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-3 mb-1">
                  <span className="text-3xl font-medium text-gray-900 tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                {getDiscountPercentage() > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    {formatPrice(product.oldPrice! - product.price)} tasarruf
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleCompare}
                  title={compareTitle}
                  aria-disabled={compareDisabled}
                  className={`px-4 py-3 rounded-2xl border-2 transition-all duration-200 font-medium text-sm flex items-center space-x-2 ${
                    isSelectedForComparison
                      ? 'border-primary text-primary'
                      : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                  } ${compareDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {isSelectedForComparison ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
                  <span>{isSelectedForComparison ? 'Çıkar' : 'Karşılaştır'}</span>
                </button>
                <button 
                  onClick={() => setShowQuickPreview(true)}
                  className="p-3 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-2xl transition-all duration-200"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => addToCart()}
                  disabled={product.stock === 0}
                  className={`px-8 py-3 rounded-2xl transition-all duration-200 flex items-center space-x-2 font-medium ${
                    product.stock > 0
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.stock > 0 ? (inCart ? 'Sepette' : 'Sepete Ekle') : 'Stokta Yok'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
        <QuickPreviewModal
          product={product}
          categorySlug={resolvedCategorySlug}
          categoryLabel={resolvedCategoryLabel}
          isOpen={showQuickPreview}
          onClose={() => setShowQuickPreview(false)}
          onAddToCart={addToCart}
          isInCart={inCart}
        />
    </>
    )
  }

  return (
    <>
      <motion.div 
        className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border ${
          isSelectedForComparison ? 'border-primary/80 ring-2 ring-primary/30' : 'border-gray-100'
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      <div className="relative overflow-hidden">
        <div
          ref={imageContainerRef}
          className="relative bg-gray-50 aspect-square"
          onPointerMove={handlePointerMove}
        >
          <img
            ref={imageElementRef}
            src={currentImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          )}
          {productImages.length > 1 && isHovered && (
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 px-2 py-1 rounded-full bg-gray-900/70 text-white/90 text-[10px]"
              onPointerMove={handlePointerMove}
            >
              <div className="flex items-center gap-0.5 mr-1.5">
                {productImages.map((image, index) => (
                  <span
                    key={image.id}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                      currentImageIndex === index ? 'bg-white w-3' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold tracking-wide">{currentImageIndex + 1}/{productImages.length}</span>
            </div>
          )}
        </div>
        
        {/* Overlay - sadece hover edilen ürün için göster */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-all duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
          onPointerMove={handlePointerMove}
        >
          <div className={`flex space-x-2 transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-2'
          }`}>
            <button 
              onClick={() => setShowQuickPreview(true)}
              className="bg-white/95 backdrop-blur-sm text-gray-900 p-2 rounded-full hover:bg-white transition-all duration-200 shadow-sm"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`backdrop-blur-sm p-2 rounded-full transition-all duration-200 shadow-sm ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/95 text-gray-900 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleToggleCompare}
              title={compareTitle}
              aria-disabled={compareDisabled}
              className={`backdrop-blur-sm p-2 rounded-full transition-all duration-200 shadow-sm ${
                isSelectedForComparison
                  ? 'bg-primary text-white'
                  : 'bg-white/95 text-gray-900 hover:bg-white'
              } ${compareDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSelectedForComparison ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.badgeColor} text-white shadow-sm`}>
              {product.badge}
            </span>
          )}
          {getDiscountPercentage() > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
              -{getDiscountPercentage()}%
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
            product.stock > 0 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {product.stock > 0 ? 'Stokta' : 'Tükendi'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
  <Link href={`/kategoriler/${resolvedCategorySlug}/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors mb-2 line-clamp-2 min-h-[2.5rem] leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 min-h-[2rem] leading-relaxed">
          {product.shortDescription}
        </p>
        
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-xs ml-1 font-medium">
              {product.rating > 0 ? product.rating : ''}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {product.reviews > 0 ? `${product.reviews}` : ''}
          </span>
        </div>
        
        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline space-x-1 mb-1">
            <span className="text-lg font-semibold text-gray-900 leading-none">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.oldPrice!)}
              </span>
            )}
          </div>
          {getDiscountPercentage() > 0 && (
            <span className="text-xs text-green-600 font-medium">
              {formatPrice(product.oldPrice! - product.price)} tasarruf
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.stock > 0 && (
          <div className="mb-3">
            <span className="inline-flex items-center text-xs text-green-600 font-medium">
              <Zap className="w-3 h-3 mr-1" />
              {product.stock} adet
            </span>
          </div>
        )}
        
        {/* Actions */}
        <div className="space-y-2">
          <button 
            onClick={() => addToCart()}
            disabled={product.stock === 0}
            className={`w-full py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 font-medium text-sm ${
              product.stock > 0
                ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.stock > 0 ? (inCart ? 'Sepette' : 'Sepete Ekle') : 'Stokta Yok'}</span>
          </button>
          <button
            onClick={handleToggleCompare}
            title={compareTitle}
            aria-disabled={compareDisabled}
            className={`w-full py-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm ${
              isSelectedForComparison
                ? 'border-primary text-primary bg-primary/5'
                : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
            } ${compareDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isSelectedForComparison ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
            <span>{isSelectedForComparison ? 'Çıkar' : 'Karşılaştır'}</span>
          </button>
        </div>
      </div>
    </motion.div>
    
      <QuickPreviewModal
        product={product}
        categorySlug={resolvedCategorySlug}
        categoryLabel={resolvedCategoryLabel}
        isOpen={showQuickPreview}
        onClose={() => setShowQuickPreview(false)}
        onAddToCart={addToCart}
        isInCart={inCart}
      />
  </>
  )
}
