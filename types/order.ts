import { Product } from './product'

export interface ShippingAddress {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  quantity: number
  price_at_purchase: number
  created_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total_price: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: ShippingAddress
  payment_method: string
  created_at: string
  order_items?: OrderItem[]
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}
