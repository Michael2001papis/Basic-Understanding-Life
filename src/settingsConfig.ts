/**
 * הגדרות נגישות והעדפות משתמש (18.20.2)
 * גודל טקסט, ניגודיות, ממשק מהיר – נשמר ב־localStorage
 */
export type FontSizePref = 'default' | 'large' | 'small'
export type ContrastPref = 'normal' | 'brown' | 'blue'
export type QuickUIPref = boolean

export const SETTINGS_STORAGE_KEY = 'siteSettings'

export type SiteSettings = {
  fontSize: FontSizePref
  contrast: ContrastPref
  quickUI: QuickUIPref
}

export const defaultSettings: SiteSettings = {
  fontSize: 'default',
  contrast: 'normal',
  quickUI: false,
}

export function loadSettings(): SiteSettings {
  if (typeof window === 'undefined') return defaultSettings
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return defaultSettings
    const parsed = JSON.parse(raw) as Partial<SiteSettings>
    return {
      fontSize: parsed.fontSize === 'large' || parsed.fontSize === 'small' ? parsed.fontSize : 'default',
      contrast: parsed.contrast === 'brown' || parsed.contrast === 'blue' ? parsed.contrast : 'normal',
      quickUI: typeof parsed.quickUI === 'boolean' ? parsed.quickUI : false,
    }
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}

export function applySettingsToDocument(settings: SiteSettings): void {
  const doc = typeof document !== 'undefined' ? document.documentElement : null
  if (!doc) return
  doc.setAttribute('data-font-size', settings.fontSize)
  doc.setAttribute('data-contrast', settings.contrast)
  doc.setAttribute('data-quick-ui', settings.quickUI ? 'true' : 'false')
}
