import { useState } from 'react'
import VideoBackground from './components/VideoBackground.jsx'
import LogoField from './components/LogoField.jsx'
import InfoPanel from './components/InfoPanel.jsx'

export default function App() {
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <main className="stage">
      <VideoBackground />
      <LogoField />
      <InfoPanel
        open={infoOpen}
        onOpen={() => setInfoOpen(true)}
        onClose={() => setInfoOpen(false)}
      />
      <h1 className="sr-only">Brooklyn Choir Project</h1>
    </main>
  )
}
