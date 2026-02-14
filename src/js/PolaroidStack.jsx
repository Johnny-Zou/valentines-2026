import { useState, useRef } from 'react'
import photo1 from '../assets/1.jpg'
import photo2 from '../assets/2.JPG'
import photo3 from '../assets/3.JPG'
import photo4 from '../assets/4.JPG'
import photo5 from '../assets/5.JPG'
import Polaroid from './Polaroid'
import '../css/PolaroidStack.css'

const photos = [
  { id: 1, src: photo1, alt: 'Photo 1' },
  { id: 2, src: photo2, alt: 'Photo 2' },
  { id: 3, src: photo3, alt: 'Photo 3' },
  { id: 4, src: photo4, alt: 'Photo 4' },
  { id: 5, src: photo5, alt: 'Photo 5' },
]

function PolaroidStack() {
  const stackRef = useRef(null)

  // Generate initial positions dynamically
  const [positions, setPositions] = useState(() => {
    const initialPositions = {}
    photos.forEach((photo, index) => {
      initialPositions[photo.id] = { x: index * 5, y: index * 5 }
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
        />
      ))}
    </div>
  )
}

export default PolaroidStack
