import '../css/Polaroid.css'

function Polaroid({ photo, position, onDragStart, zIndex, rotation }) {
  return (
    <div
      className="polaroid"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
        transform: `rotate(${rotation}deg)`,
      }}
      onMouseDown={(e) => onDragStart(e, photo.id)}
    >
      <img src={photo.src} alt={photo.alt} className="photo" />
    </div>
  )
}

export default Polaroid
