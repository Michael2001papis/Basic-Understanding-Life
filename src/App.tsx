/* Built by Michael Papismedov – MP */
import { useEffect, useState } from 'react'
import type { ViewId } from './viewConfig'
import { getInitialViewId, viewIdToHash, hashToViewId } from './viewConfig'
import { AppLayout } from './components/layout/AppLayout'
import { ViewContent } from './views/ViewContent'

export function App() {
  const [currentView, setCurrentView] = useState<ViewId>(getInitialViewId)

  useEffect(() => {
    const hash = viewIdToHash(currentView)
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash)
    }
  }, [currentView])

  useEffect(() => {
    const onHashChange = () => {
      const id = hashToViewId(window.location.hash)
      if (id) setCurrentView(id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <AppLayout currentView={currentView} onNavigate={setCurrentView}>
      <ViewContent viewId={currentView} />
    </AppLayout>
  )
}
