import { useState, useEffect, useRef } from 'react'
import '../css/NameEntry.css'
import confusedImage from '../assets/johnny_cartoon/confused.png'

function NameEntry({ onNameSubmit }) {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const inputRef = useRef(null)
  const measureRef = useRef(null)
  const fullText = "What is your name?"

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => setShowInput(true), 500)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  useEffect(() => {
    if (measureRef.current) {
      setCursorPosition(measureRef.current.offsetWidth)
    }
  }, [name])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.toLowerCase() === 'yunni') {
      onNameSubmit(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="name-entry">
      <div className="name-entry-line">
        <h1 className="name-entry-title">
          {displayText}
          <span className="typing-cursor" style={{ opacity: showInput ? 0 : 1, animation: showInput ? 'none' : 'blink 1s infinite' }}>|</span>
        </h1>
        <form onSubmit={handleSubmit} className={showInput ? 'form-visible' : 'form-hidden'}>
          <div className="input-wrapper">
            <span ref={measureRef} className="text-measure">{name}</span>
            <input
              ref={inputRef}
              type="text"
              className="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              style={{ width: `${Math.max(20, cursorPosition)}px` }}
            />
            <span className="input-cursor" style={{ left: `${cursorPosition}px` }}>|</span>
          </div>
        </form>
      </div>
      <div className="error-section">
        <p className="error-message" style={{ opacity: error ? 1 : 0 }}>Hmm, I wasn't expecting you...</p>
        <img
          src={confusedImage}
          alt="Confused"
          className="error-image"
          style={{ opacity: error ? 1 : 0 }}
        />
      </div>
    </div>
  )
}

export default NameEntry
