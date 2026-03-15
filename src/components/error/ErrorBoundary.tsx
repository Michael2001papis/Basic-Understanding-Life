import { Component, type ErrorInfo, type ReactNode } from 'react'
import './error.css'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

/**
 * תופס שגיאות React ומציג הודעה ידידותית במקום קריסת העמוד.
 * תואם סעיף 15.6 – טיפול בשגיאות והודעות מערכת ברורות.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-wrap">
          <div className="error-fallback-card">
            <p className="error-fallback-title">אירעה תקלה זמנית</p>
            <p className="error-fallback-text">
              לא ניתן להציג את התוכן כרגע. נסה לרענן את הדף.
            </p>
            <button
              type="button"
              className="error-fallback-btn"
              onClick={() => window.location.reload()}
            >
              רענן את הדף
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
