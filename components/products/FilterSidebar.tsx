'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Category } from '@/types/product'

interface Props {
  categories: Category[]
}

const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 – $50', min: 25, max: 50 },
  { label: '$50 – $100', min: 50, max: 100 },
  { label: '$100 – $250', min: 100, max: 250 },
  { label: 'Over $250', min: 250, max: 99999 },
]

export default function FilterSidebar({ categories }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get('category') ?? ''
  const activeMin = searchParams.get('minPrice') ?? ''
  const activeMax = searchParams.get('maxPrice') ?? ''

  const updateParam = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key)
      else params.set(key, value)
    })
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, router, pathname])

  function handleCategory(slug: string) {
    updateParam({ category: activeCategory === slug ? null : slug })
  }

  function handlePrice(min: number, max: number) {
    const isActive = activeMin === String(min) && activeMax === String(max)
    if (isActive) {
      updateParam({ minPrice: null, maxPrice: null })
    } else {
      updateParam({ minPrice: String(min), maxPrice: String(max) })
    }
  }

  function handleClear() {
    router.push(pathname)
  }

  const hasFilters = activeCategory || activeMin || activeMax

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-white rounded-xl border p-5 sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Filters</h2>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={handleClear} className="text-xs text-gray-400">
              Clear all
            </Button>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.slug)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => {
              const isActive = activeMin === String(range.min) && activeMax === String(range.max)
              return (
                <button
                  key={range.label}
                  onClick={() => handlePrice(range.min, range.max)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
