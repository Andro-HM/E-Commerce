import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const outOfStock = product.stock_quantity === 0

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl border hover:shadow-md transition-shadow duration-200 overflow-hidden group">
        <div className="relative aspect-square bg-gray-100">
          <img
            src={product.image_url ?? 'https://placehold.co/400x400?text=Product'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {outOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          {product.category && (
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.category.name}
            </Badge>
          )}
          <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {outOfStock ? 'Out of stock' : `${product.stock_quantity} in stock`}
          </p>
        </div>
      </div>
    </Link>
  )
}
