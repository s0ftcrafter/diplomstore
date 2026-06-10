import { Component, type ErrorInfo, type ReactNode } from 'react'
import styles from './ErrorBoundary.module.scss'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.wrap}>
          <h1>Ошибка приложения</h1>
          <p>{this.state.error.message}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Перезагрузить
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
