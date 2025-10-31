"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { BarChart3, Trash2 } from "lucide-react"
import { useComparison } from "../context/ComparisonContext"

export default function ComparisonDock() {
  const { selectedProducts, clearSelection, selectedCategory, selectedCategoryLabel } = useComparison()
  const router = useRouter()

  const handleViewComparison = useCallback(() => {
    const element = document.querySelector("#comparison-section")

    if (element) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
      return
    }

    router.push("/karsilastirma")
  }, [router])

  if (selectedProducts.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {selectedProducts.length > 0 && (
        <motion.div
          key="comparison-dock"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-1/2 z-[1900] w-full max-w-xl -translate-x-1/2 px-4 sm:bottom-6"
        >
          <div className="flex flex-col gap-4 rounded-3xl border border-primary/20 bg-white/95 px-5 py-4 text-center shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center sm:justify-center sm:text-center">
            <div className="flex w-full flex-col items-center gap-3 text-sm text-gray-700 sm:w-auto sm:flex-row">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </span>
              <div className="leading-tight text-center sm:text-center">
                <p className="text-sm font-semibold text-gray-900">
                  {selectedProducts.length} ürün karşılaştırmada
                </p>
                <p className="text-xs text-gray-500">
                  {selectedCategory ? (
                    <span>
                      Kategori:{" "}
                      <a
                        href={`/kategoriler/${selectedCategory}`}
                        className="font-semibold text-primary hover:text-primary/80"
                      >
                        {selectedCategoryLabel || selectedCategory}
                      </a>
                    </span>
                  ) : (
                    "Farklı kategoriler"
                  )}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              <button
                type="button"
                onClick={clearSelection}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 transition hover:border-gray-300 hover:text-gray-700 sm:w-auto"
              >
                <Trash2 className="h-4 w-4" />
                Temizle
              </button>
              <button
                type="button"
                onClick={handleViewComparison}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 sm:w-auto"
              >
                Karşılaştırmayı Gör
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
