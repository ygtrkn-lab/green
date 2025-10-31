'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { X, Package, ShoppingCart, Wrench, ArrowRight, Send, Camera, HelpCircle, FileText, Clock, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const EnhancedWhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<typeof messageOptions[0] | null>(null)
  const [showFAQ, setShowFAQ] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [formData, setFormData] = useState({
    message: '',
    orderNumber: '',
    productName: ''
  })
  const [isOnline, setIsOnline] = useState(true)
  const [responseTime, setResponseTime] = useState('')
  const pathname = usePathname()

  const phoneNumber = '+905438414655'
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Çalışma saatleri kontrolü
  useEffect(() => {
    const checkWorkingHours = () => {
      const now = new Date()
      const hour = now.getHours()
      const day = now.getDay() // 0 = Pazar, 1 = Pazartesi, ..., 6 = Cumartesi
      
      // Pazartesi-Cuma (1-5) ve 09:00-18:00 arası
      const isWorkingDay = day >= 1 && day <= 5
      const isWorkingHour = hour >= 9 && hour < 18
      const isOnlineNow = isWorkingDay && isWorkingHour
      
      setIsOnline(isOnlineNow)
      
      if (isOnlineNow) {
        if (hour >= 9 && hour < 11) {
          setResponseTime('Hızlı yanıt alabilirsiniz (~2-5 dakika)')
        } else if (hour >= 12 && hour < 14) {
          setResponseTime('Yoğun saatler, yanıt süremiz 15-20 dakika olabilir')
        } else {
          setResponseTime('Normal yoğunluk (~5-10 dakika)')
        }
      } else {
        setResponseTime('Mesai saatleri dışında - Pazartesi 09:00\'da yanıtlayacağız')
      }
    }

    checkWorkingHours()
    const interval = setInterval(checkWorkingHours, 60000) // Her dakika kontrol et
    
    return () => clearInterval(interval)
  }, [])

  // Ürün adını otomatik algıla
  useEffect(() => {
    const detectProductName = () => {
      // Ürün sayfası kontrolü
      if (pathname.includes('/kategoriler/') && pathname.split('/').length >= 4) {
        const productSlug = pathname.split('/').pop()
        const productName = productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        setFormData(prev => ({ ...prev, productName: productName || '' }))
      }
    }

    detectProductName()
  }, [pathname])

  // Local storage'dan taslak yükle
  useEffect(() => {
    const savedDraft = localStorage.getItem('whatsapp-draft')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setFormData(prev => ({ ...prev, ...draft }))
      } catch (e) {
        console.error('Draft yüklenirken hata:', e)
      }
    }
  }, [])

  // Taslağı kaydet
  const saveDraft = () => {
    if (formData.message || formData.orderNumber) {
      localStorage.setItem('whatsapp-draft', JSON.stringify({
        message: formData.message,
        orderNumber: formData.orderNumber
      }))
    }
  }

  // Klavye kısayolları
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        setSelectedOption(null)
        setShowFAQ(false)
        setShowTemplates(false)
      }
      if (e.key === 'Enter' && e.ctrlKey && selectedOption && formData.message) {
        handleSubmit()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedOption, formData.message])

  const messageOptions = [
    {
      id: 'product',
      title: 'Ürün Yardımı',
      message: 'Merhaba! Ürünleriniz hakkında yardıma ihtiyacım var.',
      placeholder: 'Ürün hakkında yaşadığınız sorunu özetleyin...',
      icon: <Package className="w-5 h-5" />,
      color: 'from-[#8dc63f] to-[#7ab32f]',
      hoverColor: 'from-[#7ab32f] to-[#698f29]'
    },
    {
      id: 'order',
      title: 'Sipariş Yardımı',
      message: 'Merhaba! Siparişim hakkında yardıma ihtiyacım var.',
      placeholder: 'Sipariş ile ilgili yaşadığınız sorunu özetleyin...',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'from-[#8dc63f] to-[#7ab32f]',
      hoverColor: 'from-[#7ab32f] to-[#698f29]'
    },
    {
      id: 'support',
      title: 'Teknik Destek',
      message: 'Merhaba! Teknik destek için yardıma ihtiyacım var.',
      placeholder: 'Yaşadığınız teknik sorunu özetleyin...',
      icon: <Wrench className="w-5 h-5" />,
      color: 'from-[#8dc63f] to-[#7ab32f]',
      hoverColor: 'from-[#7ab32f] to-[#698f29]'
    }
  ]

  const messageTemplates = {
    product: [
      'Ürün özellikleri hakkında bilgi almak istiyorum',
      'Ürün stok durumunu öğrenmek istiyorum',
      'Ürün garantisi hakkında bilgi almak istiyorum',
      'Ürün kurulumu konusunda yardıma ihtiyacım var'
    ],
    order: [
      'Siparişimin durumunu öğrenmek istiyorum',
      'Kargo takip numarası almak istiyorum',
      'Sipariş iptali yapmak istiyorum',
      'Teslimat adresimi değiştirmek istiyorum'
    ],
    support: [
      'Ürün çalışmıyor, teknik destek istiyorum',
      'Kurulum sorunu yaşıyorum',
      'Yazılım güncellemesi gerekiyor',
      'Performans sorunu yaşıyorum'
    ]
  }

  const faqItems = [
    {
      question: 'Kargo süresi ne kadar?',
      answer: 'Siparişleriniz 1-3 iş günü içinde kargoya verilir.'
    },
    {
      question: 'İade koşulları nelerdir?',
      answer: '14 gün içinde iade edebilirsiniz. Ürün orijinal ambalajında olmalıdır.'
    },
    {
      question: 'Garanti süresi ne kadar?',
      answer: 'Tüm ürünlerimizde 2 yıl garanti bulunmaktadır. Bazı ürünlerde (özellikle power supply\'lerde) 10 yıl 10 aya varan garantiler mevcuttur.'
    },
    {
      question: 'Ödeme seçenekleri nelerdir?',
      answer: 'Kredi kartı ve havale/EFT seçenekleri mevcuttur.'
    }
  ]

  const handleOptionClick = (option: typeof messageOptions[0]) => {
    setSelectedOption(option)
    setShowFAQ(false)
    setShowTemplates(false)
    setFormData(prev => ({ ...prev, message: '', orderNumber: prev.orderNumber }))
  }

  const handleTemplateClick = (template: string) => {
    setFormData(prev => ({ ...prev, message: template }))
    setShowTemplates(false)
  }

  const handleSubmit = () => {
    if (!selectedOption || !formData.message) return

    const orderInfo = formData.orderNumber ? `\nSipariş Numarası: ${formData.orderNumber}` : ''
    const productInfo = formData.productName ? `\nÜrün: ${formData.productName}` : ''
    const fullMessage = `${selectedOption.message}\n\n${formData.message}${orderInfo}${productInfo}\n\nSayfa: ${currentUrl}`
    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    
    // Taslağı temizle
    localStorage.removeItem('whatsapp-draft')
    
    setIsOpen(false)
    setSelectedOption(null)
    setShowFAQ(false)
    setShowTemplates(false)
    setFormData({ message: '', orderNumber: '', productName: formData.productName })
  }

  const handleBack = () => {
    saveDraft()
    setSelectedOption(null)
    setShowFAQ(false)
    setShowTemplates(false)
  }

  const handleClose = () => {
    saveDraft()
    setIsOpen(false)
    setSelectedOption(null)
    setShowFAQ(false)
    setShowTemplates(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'dan küçük olmalıdır')
        return
      }

      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen geçerli bir görsel dosyası seçin')
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result as string
        // Burada imageUrl'i WhatsApp mesajına ekleyebilir veya başka bir şekilde kullanabilirsiniz
        alert('Görsel başarıyla yüklendi!')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.15)] border border-gray-200/30 overflow-hidden mb-4"
            role="dialog"
            aria-label="WhatsApp Destek"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8dc63f]/90 to-[#7ab32f]/90 backdrop-blur-sm"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-white shadow-lg' : 'bg-red-300'} ${isOnline ? 'animate-pulse' : ''}`}></div>
                    <div>
                      <h3 className="font-semibold text-lg text-white tracking-tight">
                        {showFAQ ? 'Sık Sorulan Sorular' : selectedOption ? selectedOption.title : 'WhatsApp Destek'}
                      </h3>
                      <p className="text-white/80 text-sm mt-0.5 font-medium">
                        {showFAQ ? 'Hızlı yanıtlar için' : selectedOption ? 'Lütfen detayları doldurun' : (isOnline ? 'Çevrimiçi' : 'Çevrimdışı')}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
                  aria-label="Kapat"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {showFAQ ? (
                // FAQ Section
                <div className="space-y-3">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-gray-50/80 rounded-xl p-4 border border-gray-100">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">{item.question}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                  <div className="flex space-x-3 pt-3">
                    <button
                      onClick={() => setShowFAQ(false)}
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      Geri
                    </button>
                    <a
                      href="/iade-kosullari"
                      className="flex-1 px-4 py-3 bg-[#8dc63f] text-white rounded-xl text-sm font-medium hover:bg-[#7ab32f] transition-all duration-200 text-center"
                    >
                      İade Politikası
                    </a>
                  </div>
                </div>
              ) : !selectedOption ? (
                // Options List
                <div className="space-y-4">
                  {messageOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="group w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-full flex items-center justify-between p-5 rounded-2xl text-white transition-all duration-300 bg-gradient-to-r ${option.color} hover:shadow-xl hover:shadow-${option.color}/30 hover:bg-gradient-to-r ${option.hoverColor} border border-white/10`}>
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            {option.icon}
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-base">{option.title}</h4>
                            <p className="text-sm text-white/90 mt-0.5">Hemen yardım alın</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </motion.button>
                  ))}
                  
                  {/* FAQ Button */}
                  <motion.button
                    onClick={() => setShowFAQ(true)}
                    className="w-full flex items-center justify-center space-x-3 p-4 bg-gray-50/80 hover:bg-gray-100/80 rounded-2xl transition-all duration-200 border border-gray-200/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HelpCircle className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-semibold">Sık Sorulan Sorular</span>
                  </motion.button>
                </div>
              ) : (
                // Form
                <div className="space-y-4">
                  {/* Product Name (if detected) */}
                  {formData.productName && (
                    <div className="bg-blue-50/80 border border-blue-200/50 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Algılanan Ürün: {formData.productName}</span>
                      </div>
                    </div>
                  )}

                  {/* Templates */}
                  {!showTemplates ? (
                    <button
                      onClick={() => setShowTemplates(true)}
                      className="w-full flex items-center justify-center space-x-3 p-3 bg-yellow-50/80 hover:bg-yellow-100/80 border border-yellow-200/50 rounded-xl transition-all duration-200"
                    >
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Hazır Mesaj Şablonları</span>
                    </button>
                  ) : (
                    <div className="bg-yellow-50/80 border border-yellow-200/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-yellow-800">Mesaj Şablonları</span>
                        <button
                          onClick={() => setShowTemplates(false)}
                          className="text-yellow-600 hover:text-yellow-800 p-1 rounded-lg hover:bg-yellow-100/50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {messageTemplates[selectedOption.id as keyof typeof messageTemplates]?.map((template, index) => (
                          <button
                            key={index}
                            onClick={() => handleTemplateClick(template)}
                            className="w-full text-left p-3 text-sm text-yellow-700 hover:bg-yellow-100/80 rounded-lg transition-all duration-200 border border-yellow-200/30"
                          >
                            {template}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sipariş Numarası (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                      placeholder="Sipariş numaranızı girin..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-[#8dc63f]/50 focus:border-[#8dc63f] transition-all duration-200 outline-none bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mesajınız <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={selectedOption.placeholder}
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-[#8dc63f]/50 focus:border-[#8dc63f] transition-all duration-200 outline-none resize-none bg-gray-50/50"
                      aria-describedby="message-help"
                    />
                    <p id="message-help" className="text-xs text-gray-500 mt-2 font-medium">
                      Ctrl+Enter ile hızlı gönderim
                    </p>
                  </div>
                  
                  {/* Image Upload Button */}
                  <label className="w-full flex items-center justify-center space-x-3 p-3 bg-gray-50/80 hover:bg-gray-100/80 rounded-xl transition-all duration-200 cursor-pointer border border-gray-200/50">
                    <Camera className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Görsel Ekle</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 px-4 py-3 bg-gray-100/80 text-gray-700 rounded-xl hover:bg-gray-200/80 transition-all duration-200 font-medium"
                    >
                      Geri
                    </button>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!formData.message}
                      className={`flex-2 flex items-center justify-center space-x-2 p-3 rounded-xl text-white transition-all duration-300 bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] hover:from-[#7ab32f] hover:to-[#698f29] disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg`}
                      whileHover={{ scale: formData.message ? 1.02 : 1 }}
                      whileTap={{ scale: formData.message ? 0.98 : 1 }}
                    >
                      <Send className="w-5 h-5" />
                      <span>WhatsApp'ta Devam Et</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!selectedOption && !showFAQ && (
              <div className="px-6 pb-6">
                <div className="text-center text-xs text-gray-500 bg-gray-50/50 rounded-xl p-4 border border-gray-200/30">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{responseTime}</span>
                  </div>
                  <div className="font-medium">Çalışma Saatleri: 09:00 - 18:00 (Pzt-Cuma)</div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        aria-label="WhatsApp Destek"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] hover:from-[#7ab32f] hover:to-[#698f29] text-white p-4 rounded-full shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-[#a5d455] rounded-full animate-ping opacity-20"></div>
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          )}
        </div>
        
        {/* Status Indicator */}
        <div className={`absolute -top-1 -left-1 w-4 h-4 ${isOnline ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center shadow-lg`}>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible -translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
          {isOnline ? 'WhatsApp Destek - Çevrimiçi' : 'WhatsApp Destek - Çevrimdışı'}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-gray-900/90"></div>
        </div>
      </motion.button>
    </div>
  )
}

export default EnhancedWhatsAppButton
