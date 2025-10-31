'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Heart, Zap, Award, Shield, Cpu } from 'lucide-react'
import { useCart } from '../context/CartContext'

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const { addItem, isInCart } = useCart()

  const products = [
    {
      id: 1,
      name: 'Ultimate Gaming PC RTX 4090',
      category: 'Gaming PC',
      price: 45999,
      oldPrice: 49999,
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Yeni',
      badgeColor: 'bg-primary',
      specs: [
        'RTX 4090 24GB',
        'Intel i9-13900K',
        '64GB DDR5 RAM',
        '2TB NVMe SSD'
      ],
      stock: 15
    },
    {
      id: 2,
      name: 'Pro Gaming Mekanik Klavye',
      category: 'Klavye',
      price: 2499,
      oldPrice: 2999,
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'İndirim',
      badgeColor: 'bg-red-500',
      specs: [
        'Cherry MX Blue',
        'RGB Aydınlatma',
        'Alüminyum Kasa',
        'USB-C'
      ],
      stock: 45
    },
    {
      id: 3,
      name: 'Elite Gaming Mouse 25K DPI',
      category: 'Mouse',
      price: 1299,
      oldPrice: 1599,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Çok Satan',
      badgeColor: 'bg-yellow-500',
      specs: [
        '25.600 DPI',
        'Wireless',
        'RGB Lighting',
        '100hr Batarya'
      ],
      stock: 28
    },
    {
      id: 4,
      name: 'Premium AIO Sıvı Soğutma',
      category: 'Soğutma',
      price: 3299,
      oldPrice: 3799,
      rating: 4.9,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
      specs: [
        '360mm Radyatör',
        'ARGB Fanlar',
        'LCD Ekran',
        'Sessiz'
      ],
      stock: 8
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Öne Çıkan Ürünler</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
            En Çok Tercih Edilen Gaming Ürünleri
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Profesyonel oyuncuların tercihi, en yüksek performanslı gaming ürünleri 
            özel fiyatlarla sizleri bekliyor.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const cartId = String(product.id)
            const inCart = isInCart(cartId)
            const handleAddToCart = () => {
              if (product.stock <= 0) {
                return
              }

              const categorySlug = product.category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') || 'featured'

              addItem({
                id: cartId,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image,
                slug: `featured-${product.id}`,
                categorySlug,
                stock: product.stock
              })
            }

            return (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Product Image */}
              <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-sm font-medium px-3 py-1 rounded-full`}>
                  {product.badge}
                </div>

                {/* Quick Actions */}
                <div className={`absolute right-4 flex flex-col space-y-2 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'top-4 opacity-100' : '-top-20 opacity-0'
                }`}>
                  <button className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors duration-200 group">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors duration-200 group"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                {/* Hover Content */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center">
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {product.specs.map((spec, idx) => (
                        <span 
                          key={idx}
                          className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                      disabled={product.stock <= 0}
                    >
                      {product.stock > 0 ? (inCart ? 'Sepette' : 'Sepete Ekle') : 'Stokta Yok'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
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
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews} değerlendirme)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">
                      {product.stock} adet
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>2 Yıl Garanti</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span>Ücretsiz Kargo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(141,198,63,0.3)]"></div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="btn btn-primary hover:scale-105 transform transition-all duration-300">
            Tüm Ürünleri Gör
          </button>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute left-20 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute right-20 bottom-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  )
}

export default FeaturedProducts
