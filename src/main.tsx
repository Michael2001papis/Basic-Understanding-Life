/* Built by Michael Papismedov – MP */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MAINTENANCE_MODE } from './maintenanceConfig'
import { MaintenanceScreen } from './components/maintenance/MaintenanceScreen'
import { ErrorBoundary } from './components/error/ErrorBoundary'
import { NotFoundPage } from './components/error/NotFoundPage'
import { App } from './App'
import { loadSettings, applySettingsToDocument } from './settingsConfig'
import './styles/global.css'

// הפעלת הגדרות נגישות לפני רינדור (18.20.2) – מונע הבזק עיצוב
applySettingsToDocument(loadSettings())

// תיעוד בהפעלה – הפרדה ברורה בקונסול
const CONSOLE_SEP = '────────────────────────────────────────'
console.log(
  `\n${CONSOLE_SEP}\n  להיות שם באמת – נוכחות ברגעים קשים\n  Basic-Understanding-Life\n${CONSOLE_SEP}\n  Built by Michael Papismedov – MP\n${CONSOLE_SEP}\n`,
)

function RootContent() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const isHome = pathname === '' || pathname === '/'
  if (!isHome) return <NotFoundPage />
  if (MAINTENANCE_MODE) return <MaintenanceScreen />
  return <App />
}

const rootElement = document.getElementById('app') as HTMLElement | null

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <RootContent />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}
