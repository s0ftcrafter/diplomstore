import { useEffect } from 'react'
import { AppPagination } from '../../components/AppPagination/AppPagination'
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'
import { FilterDropdown } from '../../components/FilterDropdown/FilterDropdown'
import { Loader } from '../../components/Loader/Loader'
import { ProductList } from '../../components/ProductList/ProductList'
import { PAGE_SIZE_CONST, useProductsStore } from '../../store/productsStore'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const {
    products,
    total,
    skip,
    pendingFilter,
    loading,
    error,
    fetchProducts,
    setPage,
    setPendingFilter,
    applyFilter,
  } = useProductsStore()

  useEffect(() => {
    void useProductsStore.getState().fetchProducts()
  }, [])

  const currentPage = Math.floor(skip / PAGE_SIZE_CONST)
  const pageCount = Math.ceil(total / PAGE_SIZE_CONST)
  const showLoader = loading && products.length === 0
  const showEmpty = !loading && !error && products.length === 0

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <FilterDropdown
          pendingFilter={pendingFilter}
          onSelect={setPendingFilter}
          onApply={applyFilter}
        />

        <div className={styles.totalBox}>
          Общее кол-во товаров-{total}
        </div>
      </div>

      {showLoader && <Loader />}

      {error && (
        <ErrorMessage message={error} onRetry={() => void fetchProducts()} />
      )}

      {showEmpty && (
        <p className={styles.empty}>Товары не найдены. Попробуйте другой фильтр.</p>
      )}

      {products.length > 0 && (
        <div className={loading ? styles.contentLoading : undefined}>
          <ProductList products={products} />
          <AppPagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
