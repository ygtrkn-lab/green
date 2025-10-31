import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductPageClient from './ProductPageClient'
import { generateProductImages } from '../../../utils/imageUtils'
import { getAllProducts, getProductBySlug } from '@/app/utils/productFeed'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const products = await getAllProducts()
    return products.map((product) => ({
      category: product.categorySlug,
      slug: product.slug,
    }))
  } catch (error) {
    console.error('[ProductPage] Failed to generate static params', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  try {
    const product = await getProductBySlug(params.category, params.slug)

    if (!product) {
      return {
        title: 'Ürün Bulunamadı | Green Computer Gaming',
        description: 'Aradığınız ürün bulunamadı.',
      }
    }

    return {
      title: `${product.name} | Green Computer Gaming`,
      description: product.shortDescription,
      keywords: `${product.name}, gaming, bilgisayar, oyun, ekipman`,
    }
  } catch (error) {
    console.error('[ProductPage] Failed to generate metadata', error)
    return {
      title: 'Ürün | Green Computer Gaming',
      description: 'Ürün bilgilerine şu anda ulaşılamıyor.',
    }
  }
}

export default async function ProductPage({ params }: { params: { category: string; slug: string } }) {
  try {
    const product = await getProductBySlug(params.category, params.slug)

    if (!product) {
      notFound()
    }

    const productImages = product.images?.length
      ? product.images
      : generateProductImages(product.id, params.category, 4)

    return (
      <ProductPageClient
        product={product}
        category={params.category}
        productImages={productImages}
      />
    )
  } catch (error) {
    console.error('[ProductPage] Failed to load product data', error)
    notFound()
  }
}
