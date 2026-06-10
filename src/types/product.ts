export interface Product {
  id: number
  title: string
  description: string
  thumbnail: string
  images: string[]
  price: number
  discountPercentage: number
  stock: number
  category?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type SortField = 'title' | 'price' | 'stock' | 'id'
export type SortOrder = 'asc' | 'desc'
export type FilterOption = 'all' | 'mens' | 'womens' | 'new'

export interface ProductsQueryParams {
  limit?: number
  skip?: number
  sortBy?: SortField
  order?: SortOrder
  category?: string
}
