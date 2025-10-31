'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

const ScrollToTop = () => {
  const { tString } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed lg:bottom-8 lg:right-8 bottom-20 right-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label={tString('common.goUp')}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  )
}

export default ScrollToTop
