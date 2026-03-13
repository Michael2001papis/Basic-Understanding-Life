const sections = [
  { id: 'hero', label: 'הבית' },
  { id: 'intro', label: 'למה האתר קיים' },
  { id: 'body-mind', label: 'מה עובר על אדם במצוקה' },
  { id: 'anger', label: 'למה הכאב יוצא ככעס' },
  { id: 'mistakes', label: 'טעויות נפוצות' },
  { id: 'correct-response', label: 'מה נכון לעשות' },
  { id: 'patterns', label: 'מתי זה דפוס' },
  { id: 'needs', label: 'צרכים רגשיים' },
  { id: 'faq', label: 'שאלות ותשובות' },
  { id: 'final-message', label: 'מסר מסכם' },
  { id: 'contact', label: 'שיתוף מחשבה' },
]

export function Header() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-main">להיות שם באמת</span>
          <span className="logo-sub">נוכחות, תמיכה ותגובה ברגעים קשים</span>
        </div>
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

