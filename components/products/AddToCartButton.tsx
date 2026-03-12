'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/lib/actions/cart'
import { createClient } from '@/lib/supabase/client'

interface Props {
  productId: string
  outOfStock: boolean
}

export default function AddToCartButton({ productId, outOfStock }: Props) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  async function handleAddToCart() {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    setLoading(true)
    try {
      await addToCart(productId, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={outOfStock || loading}
        className="w-full h-12 text-base"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        {outOfStock ? 'Out of Stock' : added ? '✓ Added to Cart' : loading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  )
}
