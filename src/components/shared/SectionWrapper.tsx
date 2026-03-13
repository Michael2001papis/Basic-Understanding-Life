import type { ReactNode } from 'react'

type SectionWrapperProps = {
  id: string
  title: string
  eyebrow?: string
  children: ReactNode
}

export function SectionWrapper({ id, title, eyebrow, children }: SectionWrapperProps) {
  return (
    <section id={id} className="page-section" aria-labelledby={`${id}-title`}>
      <div className="section-inner">
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        <div className="section-content">{children}</div>
      </div>
    </section>
  )
}

