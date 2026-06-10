import { Link } from 'react-router-dom'
import { ROUTES } from '../../router/paths'
import { useCartStore } from '../../store/cartStore'
import { formatPriceSum, formatSumAmount } from '../../utils/price'
import styles from './CartPage.module.scss'

export const CartPage = () => {
  const { items, removeFromCart, setQuantity, clearCart, getTotalSum } = useCartStore()
  const total = getTotalSum()

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Корзина</h1>
        <p className={styles.empty}>Корзина пуста</p>
        <Link to={ROUTES.home} className={styles.backLink}>
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Корзина</h1>
        <button type="button" className={styles.clearBtn} onClick={clearCart}>
          Очистить
        </button>
      </div>

      <ul className={styles.list}>
        {items.map(({ product, quantity }) => {
          const itemPrice = formatPriceSum(product.price, product.discountPercentage)

          return (
            <li key={product.id} className={styles.item}>
              <Link to={ROUTES.product(product.id)} className={styles.imageLink}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.image}
                />
              </Link>

              <div className={styles.info}>
                <Link to={ROUTES.product(product.id)} className={styles.itemTitle}>
                  {product.title}
                </Link>
                <span className={styles.itemPrice}>{itemPrice}</span>

                <div className={styles.quantity}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFromCart(product.id)}
                aria-label="Удалить товар"
              >
                ✕
              </button>
            </li>
          )
        })}
      </ul>

      <div className={styles.totalBox}>
        <span className={styles.totalLabel}>Общая сумма:</span>
        <span className={styles.totalValue}>{formatSumAmount(total)}</span>
      </div>

      <Link to={ROUTES.home} className={styles.backLink}>
        ← Продолжить покупки
      </Link>
    </div>
  )
}
