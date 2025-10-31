'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const TONE_ICON = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info
} as const

const TONE_STYLES = {
  success: {
    icon: 'text-emerald-600',
    chip: 'bg-emerald-50 border-emerald-200'
  },
  warning: {
    icon: 'text-amber-600',
    chip: 'bg-amber-50 border-amber-200'
  },
  info: {
    icon: 'text-sky-600',
    chip: 'bg-sky-50 border-sky-200'
  }
} as const

const CartToast = () => {
  const { feedback, dismissFeedback } = useCart()

  useEffect(() => {
    if (!feedback) {
      return
    }

    const timer = window.setTimeout(() => dismissFeedback(feedback.id), 3600)
    return () => window.clearTimeout(timer)
  }, [feedback, dismissFeedback])

  return (
    <AnimatePresence>
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto fixed bottom-24 left-1/2 z-[95] w-[92vw] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border border-black/5 bg-white/95 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:bottom-16"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3 px-4 py-3.5">
            <span className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${TONE_STYLES[feedback.tone].chip}`}>
              {(() => {
                const Icon = TONE_ICON[feedback.tone]
                return <Icon className={`h-5 w-5 ${TONE_STYLES[feedback.tone].icon}`} />
              })()}
            </span>
            <div className="flex-1 text-sm font-medium leading-relaxed text-slate-900">
              {feedback.message}
            </div>
            <button
              type="button"
              onClick={() => dismissFeedback(feedback.id)}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Bildirimi kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartToast
