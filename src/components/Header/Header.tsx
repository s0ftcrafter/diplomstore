import { useEffect, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const itemsCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  )

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTES.home} className={styles.logo} aria-label="Nike" onClick={closeMenu}>
          <img src="/nike-logo.png" alt="" className={styles.logoImage} width={138} height={105} />
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to={ROUTES.cart} className={styles.cart} aria-label="Корзина" onClick={closeMenu}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            {itemsCount > 0 && <span className={styles.badge}>{itemsCount}</span>}
          </Link>

          <button
            type="button"
            className={styles.menuBtn}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={menuOpen ? styles.iconClose : styles.iconOpen} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={menuOpen ? styles.mobileNavOpen : styles.mobileNav}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileOverlay} onClick={closeMenu} aria-hidden="true" />
        <nav className={styles.mobilePanel} aria-label="Мобильная навигация">
          <ul className={styles.mobileList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === ROUTES.home}
                  className={({ isActive }) =>
                    isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to={ROUTES.cart} className={styles.mobileLink} onClick={closeMenu}>
                Корзина {itemsCount > 0 && `(${itemsCount})`}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
