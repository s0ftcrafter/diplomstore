import { useEffect, useState } from 'react'
import ReactPaginateModule from 'react-paginate'
import type { ComponentType } from 'react'
import type { ReactPaginateProps } from 'react-paginate'
import styles from './AppPagination.module.scss'

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

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

export const AppPagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: AppPaginationProps) => {
  const isMobile = useIsMobile()

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
      breakClassName={styles.break}
      breakLinkClassName={styles.pageLink}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={({ selected }) => {
        if (selected !== currentPage) onPageChange(selected)
      }}
      previousLabel={isMobile ? '←' : '← Назад'}
      nextLabel={isMobile ? '→' : 'Вперёд →'}
      marginPagesDisplayed={isMobile ? 0 : 1}
      pageRangeDisplayed={isMobile ? 2 : 3}
    />
  )
}
