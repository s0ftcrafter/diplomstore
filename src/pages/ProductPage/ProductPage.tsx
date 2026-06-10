import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ROUTES } from '../../router/paths'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getProductById } from '../../api/productsApi'
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'
import { Loader } from '../../components/Loader/Loader'
import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { formatPriceSum } from '../../utils/price'
import '../../styles/swiper.scss'
import styles from './ProductPage.module.scss'

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const addToCart = useCartStore((state) => state.addToCart)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef(0)

  const fetchProduct = useCallback(async () => {
    const productId = Number(id)
    if (!id || Number.isNaN(productId)) {
      setError('Некорректный идентификатор товара')
      setLoading(false)
      return
    }

    const requestId = ++requestIdRef.current
    setLoading(true)
    setError(null)
    try {
      const data = await getProductById(productId)
      if (requestId !== requestIdRef.current) return
      setProduct(data)
    } catch (err) {
      if (requestId !== requestIdRef.current) return
      setProduct(null)
      setError(err instanceof Error ? err.message : 'Не удалось загрузить товар')
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }, [id])

  useEffect(() => {
    void fetchProduct()
  }, [fetchProduct])

  if (loading) return <Loader />

  if (error || !product) {
    return (
      <div className={styles.page}>
        <Link to={ROUTES.home} className={styles.back}>
          ← Назад к каталогу
        </Link>
        <ErrorMessage message={error ?? 'Товар не найден'} onRetry={fetchProduct} />
      </div>
    )
  }

  const hasDiscount = product.discountPercentage > 0
  const price = formatPriceSum(product.price, product.discountPercentage)
  const originalPrice = formatPriceSum(product.price)

  return (
    <div className={styles.page}>
      <Link to={ROUTES.home} className={styles.back}>
        ← Назад к каталогу
      </Link>

      <div className={styles.content}>
        <div className={styles.gallery}>
          {product.images.length > 0 ? (
            <Swiper
              key={product.id}
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className={styles.swiper}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={`${product.id}-${index}`}>
                  <img
                    src={image}
                    alt={`${product.title} — фото ${index + 1}`}
                    className={styles.slideImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.slideImage}
            />
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.prices}>
            {hasDiscount ? (
              <>
                <span className={styles.oldPrice}>{originalPrice}</span>
                <span className={styles.price}>{price}</span>
                <span className={styles.discount}>-{product.discountPercentage}%</span>
              </>
            ) : (
              <span className={styles.price}>{price}</span>
            )}
          </div>

          <p className={styles.stock}>В наличии: {product.stock} шт.</p>

          <button
            type="button"
            className={styles.addToCart}
            onClick={() => addToCart(product)}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}
