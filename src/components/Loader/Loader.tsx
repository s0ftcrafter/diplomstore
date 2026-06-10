import styles from './Loader.module.scss'

export const Loader = () => (
  <div className={styles.loader} role="status" aria-label="Загрузка">
    <div className={styles.spinner} />
    <p>Загрузка...</p>
  </div>
)
