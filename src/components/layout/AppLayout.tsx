import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { navItems } from '../../navigationConfig'
import { Header } from './Header'
import { Footer } from './Footer'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const intersectingRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids: string[] = navItems.map((item) => item.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (entry.isIntersecting) {
            intersectingRef.current.add(id)
          } else {
            intersectingRef.current.delete(id)
          }
        }
        const first: string | null = ids.find((id: string) => intersectingRef.current.has(id)) ?? null
        setActiveSectionId(first)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )
    ids.forEach((id: string) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="app-root">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        activeSectionId={activeSectionId}
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

