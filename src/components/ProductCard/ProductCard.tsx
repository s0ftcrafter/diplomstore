import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../router/paths'
import { useCartStore } from '../../store/cartStore'
import type { Product } from '../../types/product'
import { formatPriceSum } from '../../utils/price'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const price = formatPriceSum(product.price, product.discountPercentage)

  const handleBuyClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    addToCart(product)
  }

  return (
    <Link to={ROUTES.product(product.id)} className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{product.title}</h2>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          <button type="button" className={styles.buy} onClick={handleBuyClick}>
            <span className={styles.buyDefault}>Купить</span>
            <span className={styles.buyHover}>Добавить в корзину</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
