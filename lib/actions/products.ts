'use server'

import { createClient } from '@/lib/supabase/server'
import type { Product, Category } from '@/types/product'

export async function getProducts(params: {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, category:categories(id, name, slug, created_at)')
    .order('created_at', { ascending: false })

  if (params.search) {
    query = query.ilike('title', `%${params.search}%`)
  }

  if (params.category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.category)
      .single()

    if (cat) query = query.eq('category_id', cat.id)
  }

  if (params.minPrice !== undefined) {
    query = query.gte('price', params.minPrice)
  }

  if (params.maxPrice !== undefined) {
    query = query.lte('price', params.maxPrice)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data as Product[]
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw new Error(error.message)
  return data as Category[]
}

export async function getProductById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug, created_at)')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data as Product
}
