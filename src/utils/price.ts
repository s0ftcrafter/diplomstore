const SUM_RATE = 25000

export const calcDiscountedPrice = (
  price: number,
  discountPercentage: number,
): number => price * (1 - discountPercentage / 100)

export const toSumPrice = (priceUsd: number, discountPercentage = 0): number => {
  const discounted = calcDiscountedPrice(priceUsd, discountPercentage)
  return Math.round(discounted * SUM_RATE)
}

export const formatPriceSum = (priceUsd: number, discountPercentage = 0): string => {
  const sum = toSumPrice(priceUsd, discountPercentage)
  return `${sum.toLocaleString('ru-RU')} сум`
}

export const formatPrice = (price: number): string => formatPriceSum(price)

export const formatSumAmount = (sum: number): string =>
  `${sum.toLocaleString('ru-RU')} сум`
