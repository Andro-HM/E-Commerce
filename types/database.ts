export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
        }
      }
      products: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          category_id: string | null
          stock_quantity: number
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          category_id?: string | null
          stock_quantity?: number
          image_url?: string | null
          created_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          price?: number
          category_id?: string | null
          stock_quantity?: number
          image_url?: string | null
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity?: number
          created_at?: string
        }
        Update: {
          quantity?: number
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total_price: number
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Json
          payment_method: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_price: number
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: Json
          payment_method: string
          created_at?: string
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          price_at_purchase: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          quantity: number
          price_at_purchase: number
          created_at?: string
        }
        Update: never
      }
    }
  }
}
