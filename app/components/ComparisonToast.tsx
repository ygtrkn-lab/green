"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useComparison } from "../context/ComparisonContext"

const TOAST_DURATION = 4000

export default function ComparisonToast() {
  const { toast, dismissToast } = useComparison()

  useEffect(() => {
    if (!toast) return
    const timeoutId = window.setTimeout(() => {
      dismissToast()
    }, TOAST_DURATION)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toast, dismissToast])

  return (
    <div className="fixed inset-x-0 bottom-4 z-[2000] flex justify-center px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:justify-end sm:px-0">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full max-w-sm rounded-2xl border px-5 py-4 text-sm text-gray-900 shadow-2xl backdrop-blur-sm bg-white/95 ${
              toast.type === "warning"
                ? "border-amber-200"
                : toast.type === "error"
                  ? "border-red-200"
                  : "border-emerald-200"
            }`}
          >
            <button
              type="button"
              onClick={dismissToast}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="font-medium leading-relaxed">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
