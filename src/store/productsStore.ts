import { create } from 'zustand'
import { getProducts } from '../api/productsApi'
import type { FilterOption, Product } from '../types/product'

const PAGE_SIZE = 12
let fetchRequestId = 0

const FILTER_CATEGORY: Record<Exclude<FilterOption, 'all' | 'new'>, string> = {
  mens: 'mens-shirts',
  womens: 'womens-dresses',
}

const getQueryParams = (filter: FilterOption, skip: number) => {
  if (filter === 'new') {
    return { limit: PAGE_SIZE, skip, sortBy: 'id' as const, order: 'desc' as const }
  }

  if (filter === 'mens' || filter === 'womens') {
    return {
      limit: PAGE_SIZE,
      skip,
      category: FILTER_CATEGORY[filter],
      sortBy: 'price' as const,
      order: 'asc' as const,
    }
  }

  return {
    limit: PAGE_SIZE,
    skip,
    sortBy: 'price' as const,
    order: 'asc' as const,
  }
}

interface ProductsState {
  products: Product[]
  total: number
  skip: number
  filter: FilterOption
  pendingFilter: FilterOption
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  setPage: (page: number) => void
  setPendingFilter: (filter: FilterOption) => void
  applyFilter: () => void
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  total: 0,
  skip: 0,
  filter: 'all',
  pendingFilter: 'all',
  loading: true,
  error: null,

  fetchProducts: async () => {
    const requestId = ++fetchRequestId
    const { skip, filter } = get()
    set({ loading: true, error: null })

    try {
      const data = await getProducts(getQueryParams(filter, skip))

      if (requestId !== fetchRequestId) return

      set({
        products: data.products,
        total: data.total,
        loading: false,
        error: null,
      })
    } catch (error) {
      if (requestId !== fetchRequestId) return

      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Не удалось загрузить товары',
      })
    }
  },

  setPage: (page: number) => {
    set({ skip: page * PAGE_SIZE })
    void get().fetchProducts()
  },

  setPendingFilter: (filter: FilterOption) => {
    set({ pendingFilter: filter })
  },

  applyFilter: () => {
    const { pendingFilter } = get()
    set({ filter: pendingFilter, skip: 0 })
    void get().fetchProducts()
  },
}))

export const PAGE_SIZE_CONST = PAGE_SIZE
