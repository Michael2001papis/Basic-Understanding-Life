/**
 * תצורת תצוגות SPA – לשוניות / חלונות פנימיים (16.5)
 */
export type ViewId =
  | 'home'
  | 'quiz'
  | 'scenario-quiz'
  | 'life-situations'
  | 'patterns-needs'
  | 'faq-final'

export type ViewItem = {
  id: ViewId
  label: string
}

export const viewItems: ViewItem[] = [
  { id: 'home', label: 'הבית' },
  { id: 'quiz', label: 'חידון' },
  { id: 'scenario-quiz', label: 'חידון תרחישים' },
  { id: 'life-situations', label: 'סיטואציות מהחיים' },
  { id: 'patterns-needs', label: 'דפוסים וצרכים' },
  { id: 'faq-final', label: 'FAQ ומסר' },
]

const HASH_PREFIX = 'v'

export function viewIdToHash(id: ViewId): string {
  return `#${HASH_PREFIX}-${id}`
}

export function hashToViewId(hash: string): ViewId | null {
  const rest = hash.slice(1)
  if (!rest.startsWith(HASH_PREFIX + '-')) return null
  const match = rest.slice(HASH_PREFIX.length + 1)
  const valid = viewItems.some((v) => v.id === match)
  return valid ? (match as ViewId) : null
}

export function getInitialViewId(): ViewId {
  if (typeof window === 'undefined') return 'home'
  const fromHash = hashToViewId(window.location.hash)
  return fromHash ?? 'home'
}
