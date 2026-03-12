import { Suspense } from 'react'
import { getProducts, getCategories } from '@/lib/actions/products'
import ProductGrid from '@/components/products/ProductGrid'
import FilterSidebar from '@/components/products/FilterSidebar'
import SearchBar from '@/components/products/SearchBar'

interface SearchParams {
  search?: string
  category?: string
  minPrice?: string
  maxPrice?: string
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const [products, categories] = await Promise.all([
    getProducts({
      search: params.search,
      category: params.category,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    }),
    getCategories(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-500">{products.length} products found</p>
      </div>

      <div className="mb-6">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      <div className="flex gap-8">
        <Suspense>
          <FilterSidebar categories={categories} />
        </Suspense>

        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}
