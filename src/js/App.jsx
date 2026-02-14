import { useState } from 'react'
import PolaroidStack from './PolaroidStack'
import NameEntry from './NameEntry'
import '../css/App.css'
import heartEyesImage from '../assets/johnny_cartoon/heart_eyes.png'
import celebrationImage from '../assets/johnny_cartoon/celebration.png'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccepted, setHasAccepted] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="container">
        <NameEntry onNameSubmit={setIsAuthenticated} />
      </div>
    )
  }

  const handleYesClick = () => {
    setHasAccepted(true)
  }

  return (
    <div className="container">
      <div className={`polaroid-wrapper ${hasAccepted ? 'celebration' : ''}`}>
        <img
          src={hasAccepted ? celebrationImage : heartEyesImage}
          alt={hasAccepted ? "Celebration" : "Heart Eyes"}
          className="johnny-cartoon-bg"
        />
        <PolaroidStack hasAccepted={hasAccepted} />
      </div>
      <p className={`question ${hasAccepted ? 'celebration' : ''}`}>
        {hasAccepted ? 'YAY!!!' : 'Will you be my valentine?'}
      </p>
      {!hasAccepted && (
        <div className="buttons">
          <button className="yes-button" onClick={handleYesClick}>Yes</button>
          <button className="no-button">No</button>
        </div>
      )}
    </div>
  )
}

export default App
