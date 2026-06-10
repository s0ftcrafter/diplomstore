import ReactPaginateModule from 'react-paginate'
import type { ComponentType } from 'react'
import type { ReactPaginateProps } from 'react-paginate'
import styles from './AppPagination.module.scss'

// Vite + CJS: default export может быть вложенным объектом { default: Component }
const ReactPaginate = (
  typeof ReactPaginateModule === 'function'
    ? ReactPaginateModule
    : (ReactPaginateModule as { default: ComponentType<ReactPaginateProps> }).default
) as ComponentType<ReactPaginateProps>

interface AppPaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const AppPagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: AppPaginationProps) => {
  if (pageCount <= 1) return null

  return (
    <ReactPaginate
      className={styles.pagination}
      pageClassName={styles.page}
      pageLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      previousClassName={styles.nav}
      nextClassName={styles.nav}
      previousLinkClassName={styles.navLink}
      nextLinkClassName={styles.navLink}
      disabledClassName={styles.disabled}
      breakClassName={styles.page}
      breakLinkClassName={styles.pageLink}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={({ selected }) => {
        if (selected !== currentPage) onPageChange(selected)
      }}
      previousLabel="← Назад"
      nextLabel="Вперёд →"
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  )
}
