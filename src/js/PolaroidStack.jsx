import { useState, useRef, useEffect } from 'react'
import photo1 from '../assets/polaroid/1.jpg'
import photo2 from '../assets/polaroid/2.JPG'
import photo3 from '../assets/polaroid/3.JPG'
import photo4 from '../assets/polaroid/4.JPG'
import photo5 from '../assets/polaroid/5.JPG'
import Polaroid from './Polaroid'
import '../css/PolaroidStack.css'

const photos = [
  { id: 1, src: photo1, alt: 'Photo 1' },
  { id: 2, src: photo2, alt: 'Photo 2' },
  { id: 3, src: photo3, alt: 'Photo 3' },
  { id: 4, src: photo4, alt: 'Photo 4' },
  { id: 5, src: photo5, alt: 'Photo 5' },
]

function PolaroidStack({ hasAccepted }) {
  const stackRef = useRef(null)

  // Generate initial positions dynamically (centered in the 400px container)
  const [positions, setPositions] = useState(() => {
    const initialPositions = {}
    // Polaroid dimensions: 300px image + 2rem (32px) horizontal padding = 332px wide
    //                      300px image + 4rem (64px) vertical padding = 364px tall
    // Center in 400px container: (400 - 332) / 2 = 34px, (400 - 364) / 2 = 18px
    const centerX = 34
    const centerY = 18
    photos.forEach((photo, index) => {
      initialPositions[photo.id] = {
        x: centerX + index * 5,
        y: centerY + index * 5
      }
    })
    return initialPositions
  })

  // Generate random rotations dynamically
  const [rotations] = useState(() => {
    const initialRotations = {}
    photos.forEach((photo) => {
      initialRotations[photo.id] = Math.random() * 10 - 5
    })
    return initialRotations
  })

  const [dragging, setDragging] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Generate z-indices dynamically (reverse order so first photo is on top)
  const [zIndices, setZIndices] = useState(() => {
    const initialZIndices = {}
    photos.forEach((photo, index) => {
      initialZIndices[photo.id] = photos.length - index
    })
    return initialZIndices
  })

  const [maxZIndex, setMaxZIndex] = useState(photos.length)

  // Scatter polaroids when accepted
  useEffect(() => {
    if (hasAccepted) {
      const scatteredPositions = {}
      const centerX = 200 // Center of the 400px container
      const centerY = 200

      photos.forEach((photo) => {
        const currentPos = positions[photo.id]

        // Check if polaroid is covering the center (where celebration.png is)
        // A polaroid is ~320px wide, so if its center is within ~260px of the center, it's covering
        const distanceFromCenter = Math.sqrt(
          Math.pow(currentPos.x + 160 - centerX, 2) +
          Math.pow(currentPos.y + 160 - centerY, 2)
        )

        // Only scatter if covering the celebration image
        if (distanceFromCenter < 260) {
          // Generate random offset - scatter 300-500px away
          const direction = Math.random() > 0.5 ? 1 : -1
          const xOffset = direction * (Math.random() * 200 + 300) // 300-500px
          const yOffset = (Math.random() - 0.5) * 500 // -150 to 150px

          scatteredPositions[photo.id] = {
            x: currentPos.x + xOffset,
            y: currentPos.y + yOffset
          }
        } else {
          // Keep position if not covering
          scatteredPositions[photo.id] = currentPos
        }
      })
      setPositions(scatteredPositions)
    }
  }, [hasAccepted])

  const handleDragStart = (e, photoId) => {
    e.preventDefault()
    if (!stackRef.current) return

    const stackRect = stackRef.current.getBoundingClientRect()
    const currentPos = positions[photoId]

    setDragOffset({
      x: e.clientX - stackRect.left - currentPos.x,
      y: e.clientY - stackRect.top - currentPos.y,
    })
    setDragging(photoId)

    // Bring to front
    setMaxZIndex(prev => prev + 1)
    setZIndices(prev => ({
      ...prev,
      [photoId]: maxZIndex + 1
    }))
  }

  const handleMouseMove = (e) => {
    if (dragging !== null && stackRef.current) {
      const rect = stackRef.current.getBoundingClientRect()

      setPositions(prev => ({
        ...prev,
        [dragging]: {
          x: e.clientX - rect.left - dragOffset.x,
          y: e.clientY - rect.top - dragOffset.y,
        }
      }))
    }
  }

  const handleMouseUp = () => {
    setDragging(null)
  }

  return (
    <div
      className="polaroid-stack"
      ref={stackRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {photos.map(photo => (
        <Polaroid
          key={photo.id}
          photo={photo}
          position={positions[photo.id]}
          onDragStart={handleDragStart}
          zIndex={zIndices[photo.id]}
          rotation={rotations[photo.id]}
          isDragging={dragging === photo.id}
        />
      ))}
    </div>
  )
}

export default PolaroidStack
