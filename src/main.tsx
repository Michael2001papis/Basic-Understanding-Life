/* Built by Michael Papismedov – MP */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles/global.css'

// תיעוד בהפעלה – הפרדה ברורה בקונסול
const CONSOLE_SEP = '────────────────────────────────────────'
console.log(
  `\n${CONSOLE_SEP}\n  להיות שם באמת – נוכחות ברגעים קשים\n  Basic-Understanding-Life\n${CONSOLE_SEP}\n  Built by Michael Papismedov – MP\n${CONSOLE_SEP}\n`,
)

const rootElement = document.getElementById('app') as HTMLElement | null

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
