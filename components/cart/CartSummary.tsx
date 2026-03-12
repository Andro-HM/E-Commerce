import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface Props {
  subtotal: number
  itemCount: number
}

export default function CartSummary({ subtotal, itemCount }: Props) {
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div className="bg-white rounded-xl border p-6 sticky top-24">
      <h2 className="font-semibold text-gray-900 text-lg mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        {shipping === 0 && (
          <p className="text-xs text-green-600 font-medium">
            ✓ You qualify for free shipping
          </p>
        )}
        {shipping > 0 && (
          <p className="text-xs text-gray-400">
            Free shipping on orders over $50
          </p>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link href="/checkout">
        <Button className="w-full h-12 text-base">
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/">
        <Button variant="ghost" className="w-full mt-2">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
