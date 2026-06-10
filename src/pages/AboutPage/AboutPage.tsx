import styles from './AboutPage.module.scss'

export const AboutPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>О нас</h1>
    <div className={styles.card}>
      <p className={styles.text}>
        Мы — официальный интернет-магазин спортивной одежды и обуви Nike в Узбекистане.
        Предлагаем оригинальную продукцию, быструю доставку и удобную оплату.
      </p>
      <p className={styles.text}>
        Наша миссия — делать спорт и активный образ жизни доступными каждому.
        В каталоге вы найдёте новинки, популярные модели и товары со скидкой.
      </p>
      <p className={styles.text}>
        Спасибо, что выбираете нас!
      </p>
    </div>
  </div>
)
