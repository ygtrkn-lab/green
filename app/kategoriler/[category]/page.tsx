import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPageClient from './CategoryPageClient'
import { getAllCategorySlugs, getCategoryData } from '@/app/utils/productFeed'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs()
    return slugs.map((slug) => ({ category: slug }))
  } catch (error) {
    console.error('[CategoryPage] Failed to generate static params', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  try {
    const categoryData = await getCategoryData(params.category)
    const categoryName = categoryData?.category || params.category

    return {
      title: `${categoryName} | Green Computer Gaming`,
      description: `${categoryName} kategorisindeki güncel ürünleri inceleyin.`,
      keywords: `${categoryName.toLowerCase()}, gaming, bilgisayar, oyun, ekipman`,
    }
  } catch (error) {
    console.error('[CategoryPage] Failed to generate metadata', error)
    return {
      title: 'Kategori | Green Computer Gaming',
      description: 'Aradığınız kategoriye şu anda ulaşılamıyor.',
    }
  }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  try {
    const data = await getCategoryData(params.category)

    if (!data) {
      notFound()
    }

    return <CategoryPageClient category={params.category} initialData={data} />
  } catch (error) {
    console.error('[CategoryPage] Failed to load category data', error)
    notFound()
  }
}
