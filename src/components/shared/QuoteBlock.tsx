import type { ReactNode } from 'react'

type QuoteBlockProps = {
  children: ReactNode
}

export function QuoteBlock({ children }: QuoteBlockProps) {
  return <blockquote className="quote-block">{children}</blockquote>
}

