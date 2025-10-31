'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Package, ShoppingCart, Wrench, ArrowRight, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<typeof messageOptions[0] | null>(null)
  const [formData, setFormData] = useState({
    message: '',
    orderNumber: ''
  })
  const pathname = usePathname()

  const phoneNumber = '+905438414655'
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

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

  const handleOptionClick = (option: typeof messageOptions[0]) => {
    setSelectedOption(option)
    setFormData({ message: '', orderNumber: '' })
  }

  const handleSubmit = () => {
    if (!selectedOption || !formData.message) return

    const orderInfo = formData.orderNumber ? `\nSipariş Numarası: ${formData.orderNumber}` : ''
    const fullMessage = `${selectedOption.message}\n\n${formData.message}${orderInfo}\n\nSayfa: ${currentUrl}`
    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
    setSelectedOption(null)
    setFormData({ message: '', orderNumber: '' })
  }

  const handleBack = () => {
    setSelectedOption(null)
    setFormData({ message: '', orderNumber: '' })
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
            className="absolute bottom-16 right-0 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100/20 overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-white">
                    {selectedOption ? selectedOption.title : 'WhatsApp Destek'}
                  </h3>
                  <p className="text-green-50 text-sm mt-0.5">
                    {selectedOption ? 'Lütfen detayları doldurun' : 'Size nasıl yardımcı olabiliriz?'}
                  </p>
                </div>
                <button
                  onClick={() => selectedOption ? handleBack() : setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {!selectedOption ? (
                // Options List
                messageOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="group w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-full flex items-center justify-between p-4 rounded-xl text-white transition-all duration-300 bg-gradient-to-r ${option.color} hover:shadow-lg hover:shadow-${option.color}/25 hover:bg-gradient-to-r ${option.hoverColor}`}>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {option.icon}
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">{option.title}</h4>
                        <p className="text-xs text-white/90">Hemen yardım alın</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.button>
                ))
              ) : (
                // Form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sipariş Numarası (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                      placeholder="Sipariş numaranızı girin..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mesajınız <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder={selectedOption.placeholder}
                      rows={4}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent transition-all duration-200 outline-none resize-none"
                    />
                  </div>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!formData.message}
                    className={`w-full flex items-center justify-center space-x-2 p-3 rounded-xl text-white transition-all duration-300 bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] hover:from-[#7ab32f] hover:to-[#698f29] disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={{ scale: formData.message ? 1.02 : 1 }}
                    whileTap={{ scale: formData.message ? 0.98 : 1 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>WhatsApp'ta Devam Et</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Footer */}
            {!selectedOption && (
              <div className="px-4 pb-4">
                <div className="text-center text-xs text-gray-500">
                  <div>Genellikle birkaç dakika içinde yanıtlıyoruz</div>
                  <div className="mt-1">Çalışma Saatleri: 09:00 - 18:00 (Pzt-Cuma)</div>
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
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-r from-[#8dc63f] to-[#7ab32f] hover:from-[#7ab32f] hover:to-[#698f29] text-white p-4 rounded-full shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-[#a5d455] rounded-full animate-ping opacity-20"></div>
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible -translate-x-2 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
          WhatsApp Destek
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-gray-900/90"></div>
        </div>
      </motion.button>

      {/* Floating notification dot */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </motion.div>
    </div>
  )
}

export default WhatsAppButton
