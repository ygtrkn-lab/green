"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

export interface ComparisonProduct {
  id: string
  name: string
  categorySlug: string
  categoryLabel: string
  price: number
  rating: number
  image?: string
  specs?: Record<string, string>
  features?: string[]
  performance?: Record<string, number>
  pros?: string[]
  cons?: string[]
  /** @deprecated */
  category?: string
}

export const COMPARISON_SELECTION_LIMIT = 3
const STORAGE_KEY = "comparison-state-v1"

export type ComparisonToggleResult =
  | "added"
  | "removed"
  | "rejected-category"
  | "rejected-limit"
  | "unchanged"

export type ComparisonToastType = "success" | "info" | "warning" | "error"

export interface ComparisonToast {
  id: number
  message: string
  type: ComparisonToastType
}

interface ComparisonContextValue {
  selectedProducts: ComparisonProduct[]
  selectedCategory: string | null
  selectedCategoryLabel: string | null
  categoryWarning: string | null
  toggleProduct: (product: ComparisonProduct) => ComparisonToggleResult
  clearSelection: () => void
  isSelected: (id: string) => boolean
  dismissWarning: () => void
  selectionLimit: number
  toast: ComparisonToast | null
  triggerToast: (message: string, type?: ComparisonToastType) => void
  dismissToast: () => void
}

const ComparisonContext = createContext<ComparisonContextValue | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<ComparisonProduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string | null>(null)
  const [categoryWarning, setCategoryWarning] = useState<string | null>(null)
  const [toast, setToast] = useState<ComparisonToast | null>(null)
  const hasHydratedStorage = useRef(false)

  useEffect(() => {
    if (hasHydratedStorage.current) return
    if (typeof window === "undefined") return

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        hasHydratedStorage.current = true
        return
      }

      const parsed = JSON.parse(raw) as {
        selectedProducts?: ComparisonProduct[]
        selectedCategory?: string | null
        selectedCategoryLabel?: string | null
      }

      const restoredProducts = Array.isArray(parsed?.selectedProducts)
        ? parsed.selectedProducts.map((product) => ({
            ...product,
            categorySlug: product.categorySlug ?? product.category ?? "",
            categoryLabel: product.categoryLabel ?? product.category ?? "",
          }))
        : []

      if (restoredProducts.length > 0) {
        setSelectedProducts(restoredProducts)
        const restoredSlug =
          typeof parsed.selectedCategory === "string" && parsed.selectedCategory.length > 0
            ? parsed.selectedCategory
            : restoredProducts[0]?.categorySlug || null
        const restoredLabel =
          typeof parsed.selectedCategoryLabel === "string" && parsed.selectedCategoryLabel.length > 0
            ? parsed.selectedCategoryLabel
            : restoredProducts[0]?.categoryLabel || null

        setSelectedCategory(restoredSlug)
        setSelectedCategoryLabel(restoredLabel)
      } else {
        setSelectedProducts([])
        setSelectedCategory(null)
        setSelectedCategoryLabel(null)
      }
    } catch (error) {
      console.warn("Failed to restore comparison state", error)
      setSelectedProducts([])
      setSelectedCategory(null)
      setSelectedCategoryLabel(null)
    } finally {
      hasHydratedStorage.current = true
    }
  }, [])

  useEffect(() => {
    if (!hasHydratedStorage.current) return
    if (typeof window === "undefined") return

    try {
      const payload = JSON.stringify({
        selectedProducts,
        selectedCategory,
        selectedCategoryLabel
      })
      window.localStorage.setItem(STORAGE_KEY, payload)
    } catch (error) {
      console.warn("Failed to persist comparison state", error)
    }
  }, [selectedCategory, selectedProducts])

  const clearSelection = useCallback(() => {
    setSelectedProducts([])
    setSelectedCategory(null)
    setSelectedCategoryLabel(null)
    setCategoryWarning(null)
  }, [])

  const toggleProduct = useCallback(
    (product: ComparisonProduct): ComparisonToggleResult => {
      let action: ComparisonToggleResult = "unchanged"

      setSelectedProducts((prev) => {
        const exists = prev.some((item) => item.id === product.id)

        if (exists) {
          action = "removed"
          const updated = prev.filter((item) => item.id !== product.id)
          if (updated.length === 0) {
            setSelectedCategory(null)
            setSelectedCategoryLabel(null)
          }
          setCategoryWarning(null)
          return updated
        }

        if (prev.length >= COMPARISON_SELECTION_LIMIT) {
          action = "rejected-limit"
          setCategoryWarning(`En fazla ${COMPARISON_SELECTION_LIMIT} ürün karşılaştırabilirsiniz.`)
          return prev
        }

        if (selectedCategory && product.categorySlug !== selectedCategory) {
          action = "rejected-category"
          const allowedLabel = selectedCategoryLabel || "bu kategori"
          setCategoryWarning(`Karşılaştırma için yalnızca "${allowedLabel}" kategorisinden ürün seçebilirsiniz.`)
          return prev
        }

        if (!selectedCategory) {
          setSelectedCategory(product.categorySlug)
          setSelectedCategoryLabel(product.categoryLabel)
        }

        action = "added"
        setCategoryWarning(null)
        return [...prev, product]
      })

      return action
    },
    [selectedCategory, selectedCategoryLabel]
  )

  const isSelected = useCallback(
    (id: string) => selectedProducts.some((item) => item.id === id),
    [selectedProducts]
  )

  const dismissWarning = useCallback(() => {
    setCategoryWarning(null)
  }, [])

  const triggerToast = useCallback(
    (message: string, type: ComparisonToastType = "success") => {
      setToast({ id: Date.now(), message, type })
    },
    []
  )

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  const value = useMemo<ComparisonContextValue>(
    () => ({
      selectedProducts,
      selectedCategory,
  selectedCategoryLabel,
      categoryWarning,
      toggleProduct,
      clearSelection,
      isSelected,
      dismissWarning,
      selectionLimit: COMPARISON_SELECTION_LIMIT,
      toast,
      triggerToast,
      dismissToast
    }),
    [
      categoryWarning,
      clearSelection,
      dismissToast,
      dismissWarning,
      isSelected,
      selectedCategory,
      selectedCategoryLabel,
      selectedProducts,
      toggleProduct,
      toast,
      triggerToast
    ]
  )

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>
}

export function useComparison(): ComparisonContextValue {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider")
  }
  return context
}
