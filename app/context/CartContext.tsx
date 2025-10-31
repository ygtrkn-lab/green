'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'

const STORAGE_KEY = 'green-cart-state-v1'

type CartFeedbackTone = 'success' | 'warning' | 'info'
type CartFeedbackAction = 'added' | 'updated' | 'maxed' | 'removed' | 'cleared'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string | null
  slug?: string
  categorySlug?: string
  stock?: number
}

export interface CartItemInput {
  id: string
  name: string
  price: number
  quantity?: number
  image?: string | null
  slug?: string
  categorySlug?: string
  stock?: number
}

interface CartFeedback {
  id: number
  message: string
  tone: CartFeedbackTone
  action: CartFeedbackAction
}

interface CartContextValue {
  items: CartItem[]
  totalCount: number
  totalPrice: number
  addItem: (item: CartItemInput) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  feedback: CartFeedback | null
  dismissFeedback: (id: number) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const normalizeStoredItem = (candidate: unknown): CartItem | null => {
  if (!candidate || typeof candidate !== 'object') {
    return null
  }

  const value = candidate as Partial<CartItem>
  if (typeof value.id !== 'string' || !value.id) {
    return null
  }
  if (typeof value.name !== 'string' || !value.name) {
    return null
  }

  const price = typeof value.price === 'number' ? value.price : Number(value.price)
  const quantity = typeof value.quantity === 'number' ? value.quantity : Number(value.quantity)

  if (!Number.isFinite(price) || !Number.isFinite(quantity) || quantity <= 0) {
    return null
  }

  return {
    id: value.id,
    name: value.name,
    price,
    quantity: Math.max(1, Math.round(quantity)),
    image: typeof value.image === 'string' ? value.image : null,
    slug: typeof value.slug === 'string' ? value.slug : undefined,
    categorySlug: typeof value.categorySlug === 'string' ? value.categorySlug : undefined,
    stock: typeof value.stock === 'number' ? value.stock : undefined
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [feedback, setFeedback] = useState<CartFeedback | null>(null)
  const isHydrated = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as unknown
        if (Array.isArray(parsed)) {
          const normalized = parsed
            .map((entry) => normalizeStoredItem(entry))
            .filter((entry): entry is CartItem => entry !== null)
          if (normalized.length) {
            setItems(normalized)
          }
        }
      }
    } catch (error) {
      console.warn('Cart storage parse failed', error)
    } finally {
      isHydrated.current = true
    }
  }, [])

  useEffect(() => {
    if (!isHydrated.current || typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.warn('Cart storage write failed', error)
    }
  }, [items])

  const addItem = useCallback((payload: CartItemInput) => {
    let nextFeedback: CartFeedback | null = null

    setItems((prev) => {
      const quantityToAdd = Math.max(1, Math.round(payload.quantity ?? 1))
      const stockLimit = typeof payload.stock === 'number' ? payload.stock : undefined
      const existingIndex = prev.findIndex((item) => item.id === payload.id)

      if (existingIndex !== -1) {
        const existing = prev[existingIndex]
        const effectiveStock = stockLimit ?? existing.stock ?? Number.POSITIVE_INFINITY
        const nextQuantity = Math.min(effectiveStock, existing.quantity + quantityToAdd)

        if (nextQuantity === existing.quantity) {
          nextFeedback = {
            id: Date.now(),
            message: 'Bu ürün için daha fazla stok bulunmuyor.',
            tone: 'warning',
            action: 'maxed'
          }
          return prev
        }

        const updatedItem: CartItem = {
          ...existing,
          quantity: nextQuantity,
          stock: stockLimit ?? existing.stock
        }

        nextFeedback = {
          id: Date.now(),
          message: `"${existing.name}" sepetinizde güncellendi.`,
          tone: 'success',
          action: 'updated'
        }

        const cloned = [...prev]
        cloned[existingIndex] = updatedItem
        return cloned
      }

      const newItem: CartItem = {
        id: payload.id,
        name: payload.name,
        price: payload.price,
        quantity: quantityToAdd,
        image: payload.image ?? null,
        slug: payload.slug,
        categorySlug: payload.categorySlug,
        stock: stockLimit
      }

      nextFeedback = {
        id: Date.now(),
        message: `"${payload.name}" sepetinize eklendi.`,
        tone: 'success',
        action: 'added'
      }

      return [...prev, newItem]
    })

    if (nextFeedback) {
      setFeedback(nextFeedback)
    }
  }, [])

  const removeItem = useCallback((id: string) => {
    let nextFeedback: CartFeedback | null = null

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (!existing) {
        return prev
      }

      nextFeedback = {
        id: Date.now(),
        message: `"${existing.name}" sepetten çıkarıldı.`,
        tone: 'info',
        action: 'removed'
      }

      return prev.filter((item) => item.id !== id)
    })

    if (nextFeedback) {
      setFeedback(nextFeedback)
    }
  }, [])

  const updateQuantity = useCallback((id: string, requestedQuantity: number) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === id)
      if (index === -1) {
        return prev
      }

      const nextQuantity = Math.max(1, Math.round(requestedQuantity))
      const item = prev[index]
      const max = item.stock ?? Number.POSITIVE_INFINITY
      const clampedQuantity = Math.min(nextQuantity, max)

      if (clampedQuantity === item.quantity) {
        return prev
      }

      const updated = [...prev]
      updated[index] = {
        ...item,
        quantity: clampedQuantity
      }
      return updated
    })
  }, [])

  const clearCart = useCallback(() => {
    let shouldNotify = false

    setItems((prev) => {
      if (!prev.length) {
        return prev
      }
      shouldNotify = true
      return []
    })

    if (shouldNotify) {
      setFeedback({
        id: Date.now(),
        message: 'Sepetiniz temizlendi.',
        tone: 'info',
        action: 'cleared'
      })
    }
  }, [])

  const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  const isInCart = useCallback((itemId: string) => items.some((item) => item.id === itemId), [items])

  const dismissFeedback = useCallback((feedbackId: number) => {
    setFeedback((current) => {
      if (!current || current.id !== feedbackId) {
        return current
      }
      return null
    })
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalCount,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
      feedback,
      dismissFeedback
    }),
    [items, totalCount, totalPrice, addItem, removeItem, updateQuantity, clearCart, isInCart, feedback, dismissFeedback]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
