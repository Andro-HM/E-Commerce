import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Order } from '@/types/order'

interface Props {
  order: Order & {
    order_items: Array<{
      id: string
      quantity: number
      price_at_purchase: number
      product: {
        id: string
        title: string
        image_url: string | null
        price: number
      } | null
    }>
  }
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function OrderCard({ order }: Props) {
  const address = order.shipping_address

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      {/* Order Header */}
      <div className="px-6 py-4 bg-gray-50 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs text-gray-400 font-mono">Order #{order.id.slice(0, 8).toUpperCase()}</p>
          <p className="text-sm text-gray-600">
            {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
            {order.status}
          </span>
          <p className="text-base font-bold text-gray-900">
            ${order.total_price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="px-6 py-4 space-y-4">
        {order.order_items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
              <img
                src={item.product?.image_url ?? 'https://placehold.co/56x56?text=?'}
                alt={item.product?.title ?? 'Product'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                {item.product?.title ?? 'Product unavailable'}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Qty: {item.quantity} × ${item.price_at_purchase.toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-700 shrink-0">
              ${(item.quantity * item.price_at_purchase).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Shipping Info */}
      <div className="px-6 py-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Shipped to
        </p>
        <p className="text-sm text-gray-700">{address.full_name}</p>
        <p className="text-sm text-gray-500">
          {address.address_line1}{address.address_line2 ? `, ${address.address_line2}` : ''}
        </p>
        <p className="text-sm text-gray-500">
          {address.city}, {address.state} {address.postal_code}, {address.country}
        </p>
      </div>
    </div>
  )
}
