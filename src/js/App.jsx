import { useState, useRef } from 'react'
import PolaroidStack from './PolaroidStack'
import NameEntry from './NameEntry'
import YesButton from './YesButton'
import NoButton from './NoButton'
import JohnnyCartoonBg from './JohnnyCartoonBg'
import '../css/App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)
  const [showMad, setShowMad] = useState(false)
  const madTimeoutRef = useRef(null)
  if (!isAuthenticated) {
    return (
      <div className="container">
        <NameEntry onNameSubmit={setIsAuthenticated} />
      </div>
    )
  }

  const handleYesClick = () => {
    // Clear any existing mad timeout
    if (madTimeoutRef.current) {
      clearTimeout(madTimeoutRef.current)
    }

    setHasAccepted(true)
    setShowMad(false)
  }

  const handleMad = () => {
    // Switch to mad image for 3 seconds
    if (!showMad) {
      setShowMad(true)

      // Clear any existing timeout
      if (madTimeoutRef.current) {
        clearTimeout(madTimeoutRef.current)
      }

      // Reset after 3 seconds
      madTimeoutRef.current = setTimeout(() => {
        setShowMad(false)
      }, 500)
    }
  }

  return (
    <div className="container">
      <div className={`polaroid-wrapper ${hasAccepted ? 'celebration' : ''}`}>
        <JohnnyCartoonBg hasAccepted={hasAccepted} showMad={showMad} />
        <PolaroidStack hasAccepted={hasAccepted} />
      </div>
      <p className={`question ${hasAccepted ? 'celebration' : ''}`}>
        {hasAccepted ? 'YAY!!!' : 'Will you be my valentine?'}
      </p>
      {!hasAccepted && (
        <div className="buttons">
          <YesButton onClick={handleYesClick} />
          <NoButton onMad={handleMad} />
        </div>
      )}
    </div>
  )
}

export default App
