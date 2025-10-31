import { NextResponse } from 'next/server'
import {
  getAllProducts,
  getCategoryData,
  getProductBySlug,
} from '@/app/utils/productFeed'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')

  try {
    if (category && slug) {
      const product = await getProductBySlug(category, slug)
      if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    if (category) {
      const categoryData = await getCategoryData(category)
      if (!categoryData) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 })
      }
      return NextResponse.json(categoryData)
    }

    const products = await getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('[api/products] Failed to load product data', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
