"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { ChevronDown, XCircle } from "lucide-react"
import { useComparison } from "../context/ComparisonContext"
import ComparisonHero from "./ComparisonHero"

const ModernProductComparison = () => {
  const {
    selectedProducts,
    selectedCategory,
    selectedCategoryLabel,
    categoryWarning,
    clearSelection,
    selectionLimit
  } = useComparison()
  const [showSpecs, setShowSpecs] = useState(true)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(price)

  const specKeys = useMemo(() => {
    return Array.from(
      new Set(
        selectedProducts.flatMap((product) =>
          product.specs ? Object.keys(product.specs) : []
        )
      )
    )
  }, [selectedProducts])

  const performanceMetrics = useMemo(() => {
    return Array.from(
      new Set(
        selectedProducts.flatMap((product) =>
          product.performance ? Object.keys(product.performance) : []
        )
      )
    )
  }, [selectedProducts])

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500"
    if (score >= 75) return "bg-amber-500"
    return "bg-orange-500"
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <ComparisonHero
        productCount={selectedProducts.length}
        activeCategoryName={selectedCategoryLabel}
        activeCategorySlug={selectedCategory}
      />

      {selectedProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 sm:text-2xl">
            Karşılaştırma listeniz boş
          </h2>
          <p className="text-sm text-gray-600 sm:text-base">
            Ürün kartlarındaki Karşılaştır butonu ile aynı kategoriden en fazla {selectionLimit} ürünü ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {selectedCategory && (
              <motion.div
                key="category-lock"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-center text-primary sm:flex-row sm:text-left"
              >
                <span className="text-sm font-semibold sm:text-base">
                  {selectedCategory ? (
                    <span>
                      Seçili kategori:{' '}
                      <a
                        href={`/kategoriler/${selectedCategory}`}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {selectedCategoryLabel || selectedCategory}
                      </a>
                      .
                    </span>
                  ) : (
                    'Kategori seçilmedi.'
                  )}
                </span>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs font-semibold underline underline-offset-4"
                >
                  Seçimi sıfırla
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {categoryWarning && (
              <motion.div
                key="category-warning"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-red-600 sm:flex-row sm:text-left"
              >
                <XCircle className="w-5 h-5" />
                <span className="text-sm font-medium sm:text-base">{categoryWarning}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.section
            id="comparison-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl bg-white shadow-xl"
          >
            <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-5 text-white sm:px-6 sm:py-6">
              <h3 className="text-xl font-semibold mb-1 sm:text-2xl">Karşılaştırma Tablosu</h3>
              <p className="text-xs text-white/80 sm:text-sm">
                {selectedProducts.length} ürün seçildi. Kategori:{' '}
                {selectedCategory ? (
                  <a
                    href={`/kategoriler/${selectedCategory}`}
                    className="font-semibold text-white underline-offset-4 hover:underline"
                  >
                    {selectedCategoryLabel || selectedCategory}
                  </a>
                ) : (
                  'Belirtilmedi'
                )}
                .
              </p>
            </div>

            <div className="space-y-10 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {selectedProducts.map((product) => (
                  <div key={`summary-${product.id}`} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl border border-gray-200 bg-white sm:h-14 sm:w-14">
                        <Image
                          src={product.image ?? "/images/products/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="line-clamp-2 text-sm font-semibold leading-tight text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-xs font-semibold text-primary">
                          {product.categoryLabel || selectedCategoryLabel || 'Kategori yok'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Fiyat</span>
                      <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                    </div>
                    {typeof product.rating === "number" && (
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>Puan</span>
                        <span className="font-medium text-gray-900">{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowSpecs((prev) => !prev)}
                  className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-6"
                >
                  <span className="text-base font-semibold text-gray-900 sm:text-lg">Teknik Özellikler</span>
                  <motion.span animate={{ rotate: showSpecs ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {showSpecs && (
                    <motion.div
                      key="specs"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-xs sm:text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6">
                                Özellik
                              </th>
                              {selectedProducts.map((product) => (
                                <th
                                  key={`spec-head-${product.id}`}
                                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:px-6"
                                >
                                  {product.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 bg-white">
                            {specKeys.length === 0 && (
                              <tr>
                                <td className="px-4 py-4 text-center text-xs text-gray-500 sm:px-6 sm:text-sm" colSpan={selectedProducts.length + 1}>
                                  Seçilen ürünler için ortak özellik bulunamadı.
                                </td>
                              </tr>
                            )}
                            {specKeys.map((specKey) => (
                              <tr key={`spec-row-${specKey}`}>
                                <td className="px-4 py-4 text-xs font-medium text-gray-700 sm:px-6 sm:text-sm">{specKey}</td>
                                {selectedProducts.map((product) => (
                                  <td key={`spec-${product.id}-${specKey}`} className="px-4 py-4 text-xs text-gray-600 sm:px-6 sm:text-sm">
                                    {product.specs?.[specKey] ?? "-"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {performanceMetrics.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-base font-semibold text-gray-900 sm:text-lg">Performans Karşılaştırması</h4>
                  <div className="space-y-6">
                    {performanceMetrics.map((metric) => (
                      <div key={`metric-${metric}`} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">
                        <h5 className="mb-4 text-sm font-semibold text-gray-800">{metric}</h5>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {selectedProducts.map((product) => {
                            const score = product.performance?.[metric]
                            return (
                              <div key={`metric-${metric}-${product.id}`} className="space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-medium text-gray-600 sm:text-xs">
                                  <span className="truncate pr-2">{product.name}</span>
                                  <span className="text-gray-900">
                                    {typeof score === "number" ? `${score}%` : "-"}
                                  </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                  {typeof score === "number" ? (
                                    <motion.span
                                      className={`block h-full ${getPerformanceColor(score)}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${score}%` }}
                                      transition={{ duration: 0.6, ease: "easeOut" }}
                                    />
                                  ) : (
                                    <span className="block h-full bg-gray-100" />
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        </>
      )}
    </div>
  )
}

export default ModernProductComparison
