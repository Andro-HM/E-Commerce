'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ShippingAddress } from '@/types/order'

export async function placeOrder(
  shippingAddress: ShippingAddress,
  paymentMethod: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 1. Get cart items with product details
  const { data: cartItems, error: cartError } = await supabase
    .from('cart_items')
    .select('*, product:products(id, price, stock_quantity, title)')
    .eq('user_id', user.id)

  if (cartError) throw new Error(cartError.message)
  if (!cartItems || cartItems.length === 0) throw new Error('Cart is empty')

  // 2. Validate stock for all items
  for (const item of cartItems) {
    if (!item.product) throw new Error('Product not found')
    if (item.product.stock_quantity < item.quantity) {
      throw new Error(`Insufficient stock for "${item.product.title}"`)
    }
  }

  // 3. Calculate total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product!.price * item.quantity, 0
  )
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  // 4. Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_price: total,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      status: 'confirmed',
    })
    .select()
    .single()

  if (orderError) throw new Error(orderError.message)

  // 5. Create order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.product!.price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) throw new Error(itemsError.message)

  // 6. Decrement stock for each product
  for (const item of cartItems) {
    await supabase.rpc('decrement_stock', {
      product_id: item.product_id,
      amount: item.quantity,
    })
  }

  // 7. Clear cart
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)

  revalidatePath('/cart')
  revalidatePath('/profile')

  return order
}

export async function getOrders() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, product:products(id, title, image_url, price))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
