import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getProductById } from '@/lib/actions/products'
import AddToCartButton from '@/components/products/AddToCartButton'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let product
  try {
    product = await getProductById(id)
  } catch {
    notFound()
  }

  const outOfStock = product.stock_quantity === 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image_url ?? 'https://placehold.co/600x600?text=Product'}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center space-y-6">
          {product.category && (
            <Badge variant="secondary" className="w-fit">
              {product.category.name}
            </Badge>
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.title}
            </h1>
            <p className="text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${outOfStock ? 'bg-red-400' : 'bg-green-400'}`} />
            <span className={`text-sm font-medium ${outOfStock ? 'text-red-600' : 'text-green-600'}`}>
              {outOfStock ? 'Out of Stock' : `${product.stock_quantity} in stock`}
            </span>
          </div>

          <AddToCartButton productId={product.id} outOfStock={outOfStock} />
        </div>
      </div>
    </div>
  )
}
