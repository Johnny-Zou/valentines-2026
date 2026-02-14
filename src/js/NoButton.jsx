import { useState, useRef, useEffect } from 'react'
import angryRunImage from '../assets/johnny_cartoon/angry_run.png'

function NoButton({ onMad }) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showAngryRun, setShowAngryRun] = useState(false)
  const [isMovingLeft, setIsMovingLeft] = useState(false)
  const noButtonRef = useRef(null)
  const angryRunTimeoutRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!noButtonRef.current) return

    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const buttonCenterX = buttonRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top + buttonRect.height / 2

    // Calculate distance from cursor to button center
    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) +
      Math.pow(e.clientY - buttonCenterY, 2)
    )

    // If cursor is within 2px of the button edge
    const detectionRadius = buttonRect.width / 2 + 50

    if (distance <= detectionRadius) {
      // Show angry run image
      setShowAngryRun(true)

      // Determine direction to move (away from cursor)
      const moveRight = e.clientX < buttonCenterX
      setIsMovingLeft(!moveRight)

      const horizontalDistance = 10 + Math.random() * 30 // 50-100px
      const verticalDistance = 10 + Math.random() * 30 // 10-150px
      const moveDown = Math.random() > 0.5

      const newX = moveRight ?
        noButtonPosition.x + horizontalDistance :
        noButtonPosition.x - horizontalDistance
      const newY = moveDown ?
        noButtonPosition.y + verticalDistance :
        noButtonPosition.y - verticalDistance

      setNoButtonPosition({ x: newX, y: newY })

      // Trigger mad image in parent
      onMad()

      if (angryRunTimeoutRef.current) {
        clearTimeout(angryRunTimeoutRef.current)
      }

      // Hide angry run after 500ms
      angryRunTimeoutRef.current = setTimeout(() => {
        setShowAngryRun(false)
      }, 500)
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [noButtonPosition])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={noButtonRef}
        className="no-button"
        style={{
          transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        No
      </button>
      <img
        src={angryRunImage}
        alt="Angry Run"
        className="angry-run"
        style={{
          transform: `translate(-50%, 0) translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scaleX(${isMovingLeft ? -1 : 1})`,
          opacity: showAngryRun ? 1 : 0,
        }}
      />
    </div>
  )
}

export default NoButton
