import type { Product } from '../../types/product'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './ProductList.module.scss'

interface ProductListProps {
  products: Product[]
}

export const ProductList = ({ products }: ProductListProps) => (
  <div className={styles.grid}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)
