import { useState } from 'react'

const sections = [
  { id: 'hero', label: 'הבית' },
  { id: 'intro', label: 'למה האתר קיים' },
  { id: 'quiz', label: 'משחקון קצר' },
  { id: 'body-mind', label: 'מה עובר על אדם במצוקה' },
  { id: 'anger', label: 'למה הכאב יוצא ככעס' },
  { id: 'mistakes', label: 'טעויות נפוצות' },
  { id: 'correct-response', label: 'מה נכון לעשות' },
  { id: 'patterns', label: 'מתי זה דפוס' },
  { id: 'needs', label: 'צרכים רגשיים' },
  { id: 'faq', label: 'שאלות ותשובות' },
  { id: 'final-message', label: 'מסר מסכם' },
]

export function Header() {
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
            {sections.map((section) => (
              <li key={section.id}>
                <button type="button" onClick={() => handleScroll(section.id)}>
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

