'use client'

import { useState } from 'react'
import { BarChart3, Zap, Award, CheckCircle, XCircle, Cpu, Monitor, HardDrive, MemoryStick, Gamepad2, Headphones } from 'lucide-react'

const PerformanceComparison = () => {
  const [activeCategory, setActiveCategory] = useState('gpu')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const categories = [
    { id: 'gpu', name: 'Ekran Kartları', icon: Monitor, description: 'RTX 50 Serisi 2025' },
    { id: 'cpu', name: 'İşlemciler', icon: Cpu, description: 'Intel vs AMD 2025' },
    { id: 'ram', name: 'RAM', icon: MemoryStick, description: 'DDR5 Teknolojileri' },
    { id: 'storage', name: 'Depolama', icon: HardDrive, description: 'NVMe Gen5 SSD' },
    { id: 'peripherals', name: 'Çevre Birimleri', icon: Gamepad2, description: 'Gaming Aksesuarları' },
    { id: 'audio', name: 'Ses Sistemleri', icon: Headphones, description: 'Gaming Kulaklıklar' }
  ]

  const productComparisons = {
    gpu: {
      title: 'Ekran Kartları - RTX 50 Serisi 2025',
      subtitle: '2025\'in devrim niteliğindeki gaming ekran kartları',
      products: [
        {
          id: 'rtx5090',
          name: 'RTX 5090',
          brand: 'NVIDIA',
          price: '₺55.999',
          image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'FLAGSHIP',
          badgeColor: 'bg-purple-600',
          specs: {
            'CUDA Cores': '18.432',
            'Base Clock': '2.400 MHz',
            'Boost Clock': '2.700 MHz',
            'Memory': '32GB GDDR7X',
            'Memory Bus': '384-bit',
            'TDP': '500W',
            'Ray Tracing': '4. Nesil RT',
            'DLSS': 'DLSS 4'
          },
          performance: {
            '4K Gaming': 99,
            '1440p Gaming': 100,
            'Ray Tracing': 98,
            'Content Creation': 99,
            'VR Gaming': 100,
            'Power Efficiency': 78
          },
          pros: ['En yüksek performans', '32GB VRAM', 'DLSS 4 desteği', '8K gaming'],
          cons: ['Çok yüksek fiyat', 'Yüksek güç tüketimi', 'Büyük boyut']
        },
        {
          id: 'rtx5080',
          name: 'RTX 5080 Super',
          brand: 'NVIDIA',
          price: '₺39.999',
          image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'EN POPÜLER',
          badgeColor: 'bg-primary',
          specs: {
            'CUDA Cores': '12.288',
            'Base Clock': '2.400 MHz',
            'Boost Clock': '2.650 MHz',
            'Memory': '20GB GDDR7X',
            'Memory Bus': '256-bit',
            'TDP': '350W',
            'Ray Tracing': '4. Nesil RT',
            'DLSS': 'DLSS 4'
          },
          performance: {
            '4K Gaming': 88,
            '1440p Gaming': 99,
            'Ray Tracing': 90,
            'Content Creation': 92,
            'VR Gaming': 96,
            'Power Efficiency': 88
          },
          pros: ['Mükemmel 4K performansı', 'İyi fiyat/performans', 'DLSS 4', 'Dengeli güç tüketimi'],
          cons: ['5090\'a göre düşük VRAM', 'Hala pahalı']
        },
        {
          id: 'rtx5070',
          name: 'RTX 5070 Super',
          brand: 'NVIDIA',
          price: '₺24.999',
          image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'EN İYİ DEĞER',
          badgeColor: 'bg-green-600',
          specs: {
            'CUDA Cores': '8.192',
            'Base Clock': '2.100 MHz',
            'Boost Clock': '2.500 MHz',
            'Memory': '16GB GDDR7X',
            'Memory Bus': '192-bit',
            'TDP': '250W',
            'Ray Tracing': '4. Nesil RT',
            'DLSS': 'DLSS 4'
          },
          performance: {
            '4K Gaming': 75,
            '1440p Gaming': 95,
            'Ray Tracing': 85,
            'Content Creation': 85,
            'VR Gaming': 90,
            'Power Efficiency': 95
          },
          pros: ['Mükemmel 1440p', 'İyi fiyat', 'Düşük güç tüketimi', 'DLSS 4'],
          cons: ['4K sınırlı', '16GB VRAM']
        }
      ]
    },
    cpu: {
      title: 'İşlemciler - Intel vs AMD 2025',
      subtitle: '2025\'in en yeni gaming ve üretkenlik işlemcileri',
      products: [
        {
          id: 'i9-15900k',
          name: 'Core i9-15900K',
          brand: 'Intel',
          price: '₺22.999',
          image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'INTEL FLAGSHIP',
          badgeColor: 'bg-blue-600',
          specs: {
            'Cores': '28 (10P+18E)',
            'Threads': '36',
            'Base Clock': '3.4 GHz',
            'Boost Clock': '6.5 GHz',
            'Cache': '40MB L3',
            'TDP': '135W',
            'Socket': 'LGA1800',
            'Memory': 'DDR5-6000'
          },
          performance: {
            'Gaming': 97,
            'Single Thread': 99,
            'Multi Thread': 95,
            'Content Creation': 93,
            'Power Efficiency': 78,
            'Overclocking': 90
          },
          pros: ['En yüksek gaming performansı', 'Güçlü single-thread', 'DDR5 desteği'],
          cons: ['Yüksek güç tüketimi', 'Pahalı', 'Sıcaklık sorunu']
        },
        {
          id: 'ryzen9-8950x',
          name: 'Ryzen 9 8950X',
          brand: 'AMD',
          price: '₺20.999',
          image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'AMD FLAGSHIP',
          badgeColor: 'bg-red-600',
          specs: {
            'Cores': '24',
            'Threads': '48',
            'Base Clock': '4.7 GHz',
            'Boost Clock': '6.0 GHz',
            'Cache': '72MB L3',
            'TDP': '180W',
            'Socket': 'AM6',
            'Memory': 'DDR5-5800'
          },
          performance: {
            'Gaming': 95,
            'Single Thread': 92,
            'Multi Thread': 99,
            'Content Creation': 99,
            'Power Efficiency': 85,
            'Overclocking': 93
          },
          pros: ['Mükemmel multi-thread', 'Content creation', 'AM6 platform', 'İyi verimlilik'],
          cons: ['Gaming\'de Intel gerisinde', 'Pahalı anakart']
        },
        {
          id: 'i7-15700k',
          name: 'Core i7-15700K',
          brand: 'Intel',
          price: '₺16.999',
          image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'EN POPÜLER',
          badgeColor: 'bg-primary',
          specs: {
            'Cores': '24 (8P+16E)',
            'Threads': '32',
            'Base Clock': '3.6 GHz',
            'Boost Clock': '6.0 GHz',
            'Cache': '36MB L3',
            'TDP': '125W',
            'Socket': 'LGA1800',
            'Memory': 'DDR5-6000'
          },
          performance: {
            'Gaming': 95,
            'Single Thread': 97,
            'Multi Thread': 90,
            'Content Creation': 88,
            'Power Efficiency': 82,
            'Overclocking': 87
          },
          pros: ['Mükemmel gaming', 'İyi fiyat/performans', 'Dengeli yapı'],
          cons: ['Multi-thread sınırlı', 'Güç tüketimi']
        }
      ]
    },
    ram: {
      title: 'RAM - DDR5 Teknolojileri 2025',
      subtitle: '2025\'in en yeni bellek teknolojileri',
      products: [
        {
          id: 'ddr5-7000',
          name: 'DDR5-7000 32GB',
          brand: 'Corsair',
          price: '₺5.999',
          image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'YENİ NESİL',
          badgeColor: 'bg-purple-600',
          specs: {
            'Capacity': '32GB (2x16GB)',
            'Speed': 'DDR5-7000',
            'Latency': 'CL28',
            'Voltage': '1.25V',
            'RGB': 'RGB Aydınlatma',
            'Heatsink': 'Alüminyum',
            'XMP': 'XMP 4.0',
            'Warranty': 'Ömür Boyu'
          },
          performance: {
            'Gaming': 97,
            'Bandwidth': 99,
            'Latency': 88,
            'Overclocking': 95,
            'Power Efficiency': 90,
            'Future Proof': 99
          },
          pros: ['En yüksek bandwidth', 'Gelecek garantili', 'XMP 4.0', 'RGB'],
          cons: ['Pahalı', 'Platform desteği']
        },
        {
          id: 'ddr5-6000',
          name: 'DDR5-6000 32GB',
          brand: 'G.Skill',
          price: '₺4.499',
          image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          badge: 'EN İYİ DEĞER',
          badgeColor: 'bg-green-600',
          specs: {
            'Capacity': '32GB (2x16GB)',
            'Speed': 'DDR5-6000',
            'Latency': 'CL30',
            'Voltage': '1.35V',
            'RGB': 'RGB Aydınlatma',
            'Heatsink': 'Alüminyum',
            'XMP': 'XMP 3.0',
            'Warranty': 'Ömür Boyu'
          },
          performance: {
            'Gaming': 92,
            'Bandwidth': 95,
            'Latency': 90,
            'Overclocking': 90,
            'Power Efficiency': 92,
            'Future Proof': 95
          },
          pros: ['Düşük latency', 'Uygun fiyat', 'Geniş uyumluluk', 'Stabil'],
          cons: ['Pahalı', 'Platform desteği']
        }
      ]
    }
  }

  const currentData = productComparisons[activeCategory as keyof typeof productComparisons]

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 80) return 'bg-blue-500'
    if (score >= 70) return 'bg-yellow-500'
    if (score >= 60) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getPerformanceGrade = (score: number) => {
    if (score >= 95) return 'S+'
    if (score >= 90) return 'S'
    if (score >= 85) return 'A+'
    if (score >= 80) return 'A'
    if (score >= 75) return 'B+'
    return 'B'
  }

  return (
    <section id="compare" className="relative w-full py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-16 left-8 w-56 h-56 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-8 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Modern Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-white rounded-full px-5 py-2 mb-6 border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold tracking-wide text-sm md:text-base">Teknoloji Karşılaştırması</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              2025'in En İyi
              <span className="text-primary"> Gaming Teknolojileri</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              RTX 50 serisi, Intel vs AMD, DDR5 ve NVMe Gen5 SSD gibi 2025'in trend gaming parçalarının detaylı karşılaştırması.
            </p>
          </div>

          {/* Category Selector */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
              Karşılaştırma Kategorisi Seçin
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 md:p-5 rounded-xl border-2 transition-all duration-300 group ${
                      activeCategory === category.id
                        ? 'border-primary bg-primary text-white shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 md:w-7 md:h-7 mx-auto mb-2 md:mb-3 ${
                      activeCategory === category.id ? 'text-white' : 'text-primary'
                    }`} />
                    <h4 className={`font-semibold text-xs md:text-sm mb-1 ${
                      activeCategory === category.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h4>
                    <p className={`text-[10px] md:text-xs ${
                      activeCategory === category.id ? 'text-primary-light' : 'text-gray-500'
                    }`}>
                      {category.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Product Cards */}
          <div className="mb-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                {currentData.title}
              </h3>
              <p className="text-gray-600 text-base md:text-lg">{currentData.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentData.products.map((product) => (
                <div
                  key={product.id}
                  className={`group relative cursor-pointer transition-transform duration-300 ${
                    hoveredProduct === product.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-40 md:h-44">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      
                      {/* Badge */}
                      <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm`}>
                        {product.badge}
                      </div>

                      {/* Brand */}
                      <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-xs font-semibold">{product.brand}</span>
                      </div>

                      {/* Price */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-base font-bold">{product.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-5">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>

                      {/* Performance Scores */}
                      <div className="space-y-2 mb-5">
                        {Object.entries(product.performance).slice(0, 3).map(([metric, score]) => (
                          <div key={metric} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-600">{metric}</span>
                              <span className="text-xs font-bold text-gray-900">{score}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-1000 ${getPerformanceColor(score)}`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Overall Grade */}
                      <div className="text-center mb-3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getPerformanceColor(Object.values(product.performance).reduce((a, b) => a + b, 0) / Object.values(product.performance).length)} text-white mb-1`}>
                          <span className="text-base font-bold">
                            {getPerformanceGrade(Object.values(product.performance).reduce((a, b) => a + b, 0) / Object.values(product.performance).length)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">Genel Not</div>
                      </div>

                      {/* Pros and Cons */}
                      <div className="space-y-3">
                        <div>
                          <h6 className="font-bold text-green-700 mb-1 flex items-center text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Artılar
                          </h6>
                          <ul className="space-y-1">
                            {product.pros.slice(0, 2).map((pro, idx) => (
                              <li key={idx} className="text-[10px] text-gray-600 flex items-center">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-bold text-red-700 mb-1 flex items-center text-xs">
                            <XCircle className="w-3 h-3 mr-1" />
                            Eksiler
                          </h6>
                          <ul className="space-y-1">
                            {product.cons.slice(0, 2).map((con, idx) => (
                              <li key={idx} className="text-[10px] text-gray-600 flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-12">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Detaylı Teknik Karşılaştırma</h3>
              <p className="text-gray-300 text-base md:text-lg">{currentData.subtitle}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 md:p-6 font-bold text-gray-800">Özellikler</th>
                    {currentData.products.map(product => (
                      <th key={product.id} className="text-center p-4 md:p-6 font-bold text-gray-800 min-w-[150px]">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currentData.products[0].specs).map((spec, index) => (
                    <tr key={spec} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                      <td className="p-4 md:p-6 font-semibold text-gray-900">{spec}</td>
                      {currentData.products.map(product => (
                        <td key={product.id} className="p-4 md:p-6 text-center text-gray-700 font-medium">
                          {product.specs[spec as keyof typeof product.specs]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-primary rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                En İyi Gaming Deneyimi için GREEN'i Seçin!
              </h3>
              <p className="text-primary-light mb-4 md:mb-6 max-w-xl mx-auto text-sm md:text-base">
                Trend teknolojileri en uygun fiyatlarla GREEN'de bulun. 
                Uzman ekibimizden ücretsiz danışmanlık alın.
              </p>
              <button className="bg-white text-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-md">
                Ürünleri İncele
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PerformanceComparison
