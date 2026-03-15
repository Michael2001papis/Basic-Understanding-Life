import { useState } from 'react'
import { viewItems } from '../../viewConfig'
import type { ViewId } from '../../viewConfig'

type HeaderProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  currentView: ViewId
  onNavigate: (viewId: ViewId) => void
}

export function Header({ theme, onToggleTheme, currentView, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const handleView = (viewId: ViewId) => {
    onNavigate(viewId)
    setOpen(false)
  }

  return (
    <header className={`site-header ${open ? 'nav-open' : ''}`}>
      <div className="header-inner">
        <div className="logo">
          <span className="logo-main">להיות שם באמת</span>
          <span className="logo-sub">נוכחות, תמיכה ותגובה ברגעים קשים</span>
        </div>
        <button
          type="button"
          className="theme-toggle"
          aria-label={theme === 'dark' ? 'מעבר למצב בהיר' : 'מעבר למצב כהה'}
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="main-nav nav-tabs" aria-label="ניווט ראשי">
          <ul>
            {viewItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={currentView === item.id ? 'nav-item-active' : ''}
                  onClick={() => handleView(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
