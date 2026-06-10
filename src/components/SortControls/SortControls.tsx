import type { SortField, SortOrder } from '../../types/product'
import styles from './SortControls.module.scss'

interface SortControlsProps {
  sortBy: SortField
  order: SortOrder
  onSortChange: (sortBy: SortField, order: SortOrder) => void
}

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'title', label: 'По названию' },
  { value: 'price', label: 'По цене' },
  { value: 'stock', label: 'По количеству' },
]

export const SortControls = ({ sortBy, order, onSortChange }: SortControlsProps) => (
  <div className={styles.controls}>
    <label className={styles.label}>
      Сортировка
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortField, order)}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
    <label className={styles.label}>
      Порядок
      <select
        className={styles.select}
        value={order}
        onChange={(e) => onSortChange(sortBy, e.target.value as SortOrder)}
      >
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </label>
  </div>
)
