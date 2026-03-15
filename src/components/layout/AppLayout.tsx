import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { ViewId } from '../../viewConfig'
import { Header } from './Header'
import { Footer } from './Footer'

type AppLayoutProps = {
  children: ReactNode
  currentView: ViewId
  onNavigate: (viewId: ViewId) => void
}

export function AppLayout({ children, currentView, onNavigate }: AppLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="app-root">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        currentView={currentView}
        onNavigate={onNavigate}
      />
      <main>{children}</main>
      <Footer />
      <button
        type="button"
        className={`back-to-top ${showBackToTop ? '' : 'hidden'}`}
        onClick={scrollToTop}
        aria-label="חזרה לראש העמוד"
      >
        ↑
      </button>
    </div>
  )
}

