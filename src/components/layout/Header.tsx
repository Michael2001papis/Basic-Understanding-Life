import { useState } from 'react'
import { navItems } from '../../navigationConfig'

type HeaderProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <nav className="main-nav" aria-label="ניווט ראשי">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => handleScroll(item.id)}>
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

