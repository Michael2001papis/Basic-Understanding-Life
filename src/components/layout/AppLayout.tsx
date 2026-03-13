import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type AppLayoutProps = {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

