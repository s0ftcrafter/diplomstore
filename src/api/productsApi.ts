import { isAxiosError } from 'axios'
import { apiClient } from './client'
import type { Product, ProductsQueryParams, ProductsResponse } from '../types/product'

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string') return message
    if (error.response?.status === 404) return 'Товар не найден'
    return error.message || 'Не удалось загрузить данные'
  }
  if (error instanceof Error) return error.message
  return 'Неизвестная ошибка'
}

export const getProducts = async (
  params: ProductsQueryParams,
): Promise<ProductsResponse> => {
  try {
    const { category, ...queryParams } = params
    const url = category ? `/products/category/${category}` : '/products'
    const { data } = await apiClient.get<ProductsResponse>(url, {
      params: queryParams,
    })
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const { data } = await apiClient.get<Product>(`/products/${id}`)
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}
