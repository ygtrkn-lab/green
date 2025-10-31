'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
}

interface CategoryShowcaseProps {
  categories: Category[]
  currentCategory?: string
}

export default function CategoryShowcase({ categories, currentCategory }: CategoryShowcaseProps) {
  // Mevcut kategoriyi filtrele ve diğerlerini göster
  const otherCategories = categories.filter(cat => cat.slug !== currentCategory)

  return (
    <div className="hidden lg:block">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Diğer Kategorileri Keşfet</h2>
      <div className="grid grid-cols-3 gap-6">
        {otherCategories.map((category) => (
          <Link
            key={category.id}
            href={`/kategoriler/${category.slug}`}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Görsel */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* İçerik */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#8dc63f] transition-colors">
                {category.name}
              </h3>
              <p className="text-white/90 text-sm line-clamp-2 mb-4">
                {category.description}
              </p>
              <div className="flex items-center text-[#8dc63f] text-sm font-medium">
                <span>Kategoriyi İncele</span>
                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
