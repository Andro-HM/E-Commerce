export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  category_id: string | null
  stock_quantity: number
  image_url: string | null
  created_at: string
  category?: Category
}
