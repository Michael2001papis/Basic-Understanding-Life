import './error.css'

/**
 * דף 404 – עמוד לא נמצא.
 * תואם סעיף 15.6.1 – הודעה ברורה, חזרה לעמוד הראשי או הקודם.
 */
export function NotFoundPage() {
  return (
    <div className="error-fallback-wrap not-found-wrap">
      <div className="error-fallback-card">
        <p className="error-fallback-title">הדף המבוקש אינו קיים</p>
        <p className="error-fallback-text">
          ייתכן שהקישור שבור, שהכתובת שגויה, או שהעמוד הוסר. אפשר לחזור לעמוד
          הראשי או לדף הקודם.
        </p>
        <div className="error-fallback-actions">
          <button
            type="button"
            className="error-fallback-btn"
            onClick={() => (window.location.href = '/')}
          >
            חזרה לעמוד הראשי
          </button>
          <button
            type="button"
            className="error-fallback-btn secondary"
            onClick={() => window.history.back()}
          >
            חזרה לעמוד הקודם
          </button>
        </div>
      </div>
    </div>
  )
}
