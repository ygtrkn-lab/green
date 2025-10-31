'use client'

import { useState } from 'react'
import { Mail, Bell, CheckCircle, AlertCircle } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      if (email.includes('@')) {
        setStatus('success')
        setMessage('Bültenimize başarıyla kaydoldunuz!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Geçerli bir e-posta adresi giriniz.')
      }
    }, 1000)
  }

  return (
    <section className="relative w-full py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Compact Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gray-100/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gray-200/50">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm tracking-wide">Fırsatları Kaçırma!</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
            Gaming Dünyasının<br />
            <span className="text-primary font-normal">En Yeni Haberleri</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            En yeni ürünler, özel indirimler ve gaming dünyasının güncel haberleri için bültenimize abone olun.
          </p>
        </div>

        {/* Compact Form */}
        <div className="mb-12">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className={`w-full pl-10 pr-4 py-3 text-base rounded-xl border bg-white/80 backdrop-blur-sm ${
                    status === 'error' 
                      ? 'border-red-300 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                  } focus:outline-none focus:ring-3 transition-all duration-200`}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`px-6 py-3 text-base font-medium rounded-xl min-w-[120px] transition-all duration-200 ${
                  status === 'success'
                    ? 'bg-green-600 text-white'
                    : status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {status === 'loading' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                    <span>Bekleyin...</span>
                  </div>
                ) : status === 'success' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Başarılı!</span>
                  </div>
                ) : status === 'error' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Tekrar Dene</span>
                  </div>
                ) : (
                  'Abone Ol'
                )}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className={`mt-4 text-center p-3 rounded-lg text-sm ${
                status === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Abone olarak{' '}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">
                Gizlilik Politikamızı
              </a>
              {' '}kabul etmiş olursunuz.
            </p>
          </form>
        </div>

        {/* Compact Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900">Anlık Bildirimler</h4>
                <p className="text-sm text-gray-600">Yeni ürün ve kampanyalardan ilk siz haberdar olun</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900">Özel İndirimler</h4>
                <p className="text-sm text-gray-600">Abonelere özel indirim ve fırsatlar</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900">Haftalık Bülten</h4>
                <p className="text-sm text-gray-600">Gaming dünyasının en güncel haberleri</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
