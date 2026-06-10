import { useEffect, useRef, useState } from 'react'
import type { FilterOption } from '../../types/product'
import styles from './FilterDropdown.module.scss'

interface FilterDropdownProps {
  pendingFilter: FilterOption
  onSelect: (filter: FilterOption) => void
  onApply: () => void
}

const OPTIONS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'По цене' },
  { value: 'mens', label: 'Мужские' },
  { value: 'womens', label: 'Женские' },
  { value: 'new', label: 'Новинки' },
]

const getFilterLabel = (filter: FilterOption): string =>
  OPTIONS.find((option) => option.value === filter)?.label ?? 'По цене'

export const FilterDropdown = ({ pendingFilter, onSelect, onApply }: FilterDropdownProps) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: FilterOption) => {
    onSelect(value)
    setOpen(false)
  }

  const handleApply = () => {
    onApply()
    setOpen(false)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.controls} ref={rootRef}>
        <button
          type="button"
          className={styles.dropdown}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span>{getFilterLabel(pendingFilter)}</span>
          <span className={open ? styles.chevronUp : styles.chevronDown} aria-hidden="true" />
        </button>

        {open && (
          <ul className={styles.menu} role="listbox">
            {OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={pendingFilter === option.value}
                  className={pendingFilter === option.value ? styles.optionActive : styles.option}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="button" className={styles.apply} onClick={handleApply}>
        Применить
      </button>
    </div>
  )
}
