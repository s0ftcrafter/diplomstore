import styles from './ContactsPage.module.scss'

export const ContactsPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>Контакты</h1>
    <div className={styles.card}>
      <p className={styles.item}>
        <span className={styles.label}>Телефон:</span>
        <a href="tel:+998901234567">+998 90 123 45 67</a>
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Email:</span>
        <a href="mailto:info@nike-store.uz">info@nike-store.uz</a>
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Адрес:</span>
        г. Ташкент, ул. Амира Темура, 15
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Время работы:</span>
        Пн–Вс: 10:00 – 22:00
      </p>
    </div>
  </div>
)
