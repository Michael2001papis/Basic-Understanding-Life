import { useEffect, useRef, useState } from 'react'
import { viewItems } from '../../viewConfig'
import type { ViewId } from '../../viewConfig'
import type { SiteSettings } from '../../settingsConfig'
import type { FontSizePref, ContrastPref } from '../../settingsConfig'

type HeaderProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  settings: SiteSettings
  onSettingsChange: (s: SiteSettings) => void
  currentView: ViewId
  onNavigate: (viewId: ViewId) => void
}

export function Header({ theme, onToggleTheme, settings, onSettingsChange, currentView, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  const handleView = (viewId: ViewId) => {
    onNavigate(viewId)
    setOpen(false)
  }

  useEffect(() => {
    if (!settingsOpen) return
    const handleClick = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setSettingsOpen(false)
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false)
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [settingsOpen])

  const setFontSize = (v: FontSizePref) => onSettingsChange({ ...settings, fontSize: v })
  const setContrast = (v: ContrastPref) => onSettingsChange({ ...settings, contrast: v })
  const setQuickUI = (v: boolean) => onSettingsChange({ ...settings, quickUI: v })

  return (
    <header className={`site-header ${open ? 'nav-open' : ''}`}>
      <div className="header-inner">
        <div className="logo">
          <span className="logo-main">להיות שם באמת</span>
          <span className="logo-sub">נוכחות, תמיכה ותגובה ברגעים קשים</span>
        </div>
        <div className="header-actions" ref={settingsRef}>
          <button
            type="button"
            className="settings-toggle"
            aria-label="הגדרות נגישות והעדפות"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((prev) => !prev)}
          >
            ⚙️
          </button>
          {settingsOpen && (
            <div className="settings-panel" role="dialog" aria-label="הגדרות אתר">
              <p className="settings-panel-title">הגדרות</p>
              <div className="settings-group">
                <span className="settings-label">גודל אותיות</span>
                <div className="settings-buttons">
                  <button
                    type="button"
                    className={settings.fontSize === 'default' ? 'settings-btn active' : 'settings-btn'}
                    onClick={() => setFontSize('default')}
                  >
                    ברירת מחדל
                  </button>
                  <button
                    type="button"
                    className={settings.fontSize === 'large' ? 'settings-btn active' : 'settings-btn'}
                    onClick={() => setFontSize('large')}
                  >
                    הגדלה
                  </button>
                  <button
                    type="button"
                    className={settings.fontSize === 'small' ? 'settings-btn active' : 'settings-btn'}
                    onClick={() => setFontSize('small')}
                  >
                    הקטנה
                  </button>
                </div>
              </div>
              <div className="settings-group">
                <span className="settings-label">ניגודיות צבעים</span>
                <div className="settings-buttons">
                  <button
                    type="button"
                    className={settings.contrast === 'normal' ? 'settings-btn active' : 'settings-btn'}
                    onClick={() => setContrast('normal')}
                  >
                    רגיל
                  </button>
                  <button
                    type="button"
                    className={settings.contrast === 'brown' ? 'settings-btn active' : 'settings-btn'}
                    onClick={() => setContrast('brown')}
                  >
                    חום
                  </button>
                  <button
                    type="button"
                    className={settings.contrast === 'blue' ? 'settings-btn active' : 'settings-btn'}
                    onClick={() => setContrast('blue')}
                  >
                    כחול
                  </button>
                </div>
              </div>
              <div className="settings-group settings-group-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.quickUI}
                    onChange={(e) => setQuickUI(e.target.checked)}
                    aria-describedby="quick-ui-desc"
                  />
                  <span>ממשק מהיר</span>
                </label>
                <span id="quick-ui-desc" className="settings-desc">הפחתת אפקטים, תצוגה נקייה יותר</span>
              </div>
            </div>
          )}
          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'מעבר למצב בהיר' : 'מעבר למצב כהה'}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
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
