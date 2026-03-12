import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCartItems } from '@/lib/actions/cart'
import CartItemRow from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'

export default async function CartPage() {
  const cartItems = await getCartItems()

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price ?? 0) * item.quantity
  }, 0)

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Add some products to get started</p>
          <Link href="/">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart
        <span className="text-lg font-normal text-gray-400 ml-3">
          ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItemRow key={item.id} item={item as any} />
          ))}
        </div>

        <div>
          <CartSummary subtotal={subtotal} itemCount={itemCount} />
        </div>
      </div>
    </div>
  )
}
