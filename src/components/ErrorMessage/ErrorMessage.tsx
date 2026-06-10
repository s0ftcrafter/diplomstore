import styles from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className={styles.error} role="alert">
    <p className={styles.message}>{message}</p>
    {onRetry && (
      <button type="button" className={styles.retry} onClick={onRetry}>
        Повторить
      </button>
    )}
  </div>
)
