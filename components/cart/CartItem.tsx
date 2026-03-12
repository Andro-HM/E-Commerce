'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateCartQuantity, removeFromCart } from '@/lib/actions/cart'
import { useState } from 'react'
import type { CartItem } from '@/types/order'

interface Props {
  item: CartItem
}

export default function CartItemRow({ item }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleQuantity(newQty: number) {
    setLoading(true)
    try {
      await updateCartQuantity(item.id, newQty)
    } finally {
      setLoading(false)
    }
  }

  async function handleRemove() {
    setLoading(true)
    try {
      await removeFromCart(item.id)
    } finally {
      setLoading(false)
    }
  }

  const product = item.product
  if (!product) return null

  return (
    <div className={`flex gap-4 p-4 bg-white rounded-xl border ${loading ? 'opacity-50' : ''}`}>
      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
        <img
          src={product.image_url ?? 'https://placehold.co/96x96?text=Product'}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2">
          {product.title}
        </h3>
        {product.category && (
          <p className="text-xs text-gray-400 mt-1">{product.category.name}</p>
        )}
        <p className="text-base font-bold text-gray-900 mt-2">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500"
          onClick={handleRemove}
          disabled={loading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => handleQuantity(item.quantity - 1)}
            className="px-2 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantity(item.quantity + 1)}
            className="px-2 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        <p className="text-sm font-semibold text-gray-700">
          ${(product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  )
}
