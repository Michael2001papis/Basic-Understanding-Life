import { useState } from 'react'
import { WaitingGame } from './WaitingGame'
import './maintenance.css'

export function MaintenanceScreen() {
  const [showGame, setShowGame] = useState(false)

  if (showGame) {
    return (
      <WaitingGame
        onBack={() => setShowGame(false)}
      />
    )
  }

  return (
    <div className="maintenance-wrap">
      <div className="maintenance-card">
        <div className="maintenance-icon" aria-hidden="true">
          🔧
        </div>
        <h1 className="maintenance-title">האתר בשיפוצים</h1>
        <p className="maintenance-text">
          אנחנו מתעדכנים ומשדרגים את האתר. נשוב לפעילות מלאה בהקדם.
        </p>
        <p className="maintenance-sub">
          תודה על הסבלנות – בינתיים אפשר להעביר את הזמן עם משחק קצר.
        </p>
        <button
          type="button"
          className="maintenance-cta"
          onClick={() => setShowGame(true)}
        >
          משחק להעברת הזמן
        </button>
      </div>
    </div>
  )
}
