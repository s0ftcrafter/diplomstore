export const ROUTES = {
  home: '/home',
  contacts: '/contacts',
  about: '/about',
  cart: '/cart',
  product: (id: number | string) => `/products/${id}`,
} as const
