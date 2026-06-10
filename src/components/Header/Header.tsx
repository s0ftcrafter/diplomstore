import { Link, NavLink } from 'react-router-dom'
import { ROUTES } from '../../router/paths'
import { useCartStore } from '../../store/cartStore'
import styles from './Header.module.scss'

const NAV_ITEMS = [
  { label: 'Главная', to: ROUTES.home },
  { label: 'Контакты', to: ROUTES.contacts },
  { label: 'О нас', to: ROUTES.about },
]

export const Header = () => {
  const itemsCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  )

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTES.home} className={styles.logo} aria-label="Nike">
          <img src="/nike-logo.png" alt="" className={styles.logoImage} width={138} height={105} />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to={ROUTES.cart} className={styles.cart} aria-label="Корзина">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6L5 3H2" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          {itemsCount > 0 && <span className={styles.badge}>{itemsCount}</span>}
        </Link>
      </div>
    </header>
  )
}
