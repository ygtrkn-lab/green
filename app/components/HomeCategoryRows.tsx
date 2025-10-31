'use client'

import Link from 'next/link'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  badge?: string
  badgeColor?: string
  stock: number
  images?: Array<{
    id: number
    url: string
    alt: string
  }>
}

interface CategoryData {
  slug: string
  category: string
  products: Product[]
}

interface CategoryRowProps {
  category: CategoryData
}

function CategoryRow({ category }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHorizontalLayout, setIsHorizontalLayout] = useState(false)

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const updateLayout = () => {
      setIsHorizontalLayout(mediaQuery.matches)
      if (mediaQuery.matches) {
        checkScrollability()
      }
    }

    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)

    return () => {
      mediaQuery.removeEventListener('change', updateLayout)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -240, behavior: 'smooth' })
      setTimeout(checkScrollability, 300)
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 240, behavior: 'smooth' })
      setTimeout(checkScrollability, 300)
    }
  }

  const products = category.products.slice(0, 6)

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{category.category}</h2>
        <Link href={`/kategoriler/${category.slug}`} className="text-sm text-primary hover:underline">
          Tümünü gör →
        </Link>
      </div>

      <div className="relative group">
        {/* Left scroll button */}
        {isHorizontalLayout && canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Sola kaydır"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Right scroll button */}
        {isHorizontalLayout && canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Sağa kaydır"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Products container */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 gap-4 pb-2 md:grid-cols-none md:flex md:space-x-4 md:overflow-x-auto md:scrollbar-hide"
          onScroll={isHorizontalLayout ? checkScrollability : undefined}
          style={isHorizontalLayout ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full md:min-w-[220px] md:max-w-[220px] md:flex-shrink-0"
            >
              <ProductCard
                product={product}
                categorySlug={category.slug}
                categoryLabel={category.category}
                viewMode="grid"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Client component: renders horizontal rows of category products
export default function HomeCategoryRows() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all products from API
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const products = await response.json()
        
        // Group products by category (limit to 6 categories, 6 products each)
        const categoryMap = new Map<string, Product[]>()
        
        products.forEach((product: Product & { categorySlug: string; categoryLabel: string }) => {
          if (!categoryMap.has(product.categorySlug)) {
            categoryMap.set(product.categorySlug, [])
          }
          categoryMap.get(product.categorySlug)!.push(product)
        })
        
        // Convert to category data format and limit
        const categoryData: CategoryData[] = Array.from(categoryMap.entries())
          .slice(0, 6)
          .map(([slug, products]) => ({
            slug,
            category: products[0] ? (products[0] as any).categoryLabel || slug : slug,
            products: products.slice(0, 6)
          }))
        
        setCategories(categoryData)
      } catch (err) {
        console.error('[HomeCategoryRows] Failed to fetch categories', err)
        setError('Kategoriler yüklenemedi')
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-10">
              <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
              <div className="grid grid-cols-2 gap-4 md:flex md:space-x-4">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="h-64 rounded bg-gray-200 md:min-w-[220px]"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500">
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {categories.map((category) => (
        <CategoryRow key={category.slug} category={category} />
      ))}
      
      <style jsx global>{`
        .scrollbar-hide {
          -webkit-overflow-scrolling: touch;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
