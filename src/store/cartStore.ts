import { create } from 'zustand'
import type { Product } from '../types/product'
import { toSumPrice } from '../utils/price'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  setQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalSum: () => number
  getItemsCount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id)

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return { items: [...state.items, { product, quantity: 1 }] }
    })
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }))
  },

  setQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeFromCart(productId)
      return
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    }))
  },

  clearCart: () => set({ items: [] }),

  getTotalSum: () =>
    get().items.reduce(
      (sum, item) =>
        sum + toSumPrice(item.product.price, item.product.discountPercentage) * item.quantity,
      0,
    ),

  getItemsCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
}))
