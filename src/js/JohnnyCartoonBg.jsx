import '../css/JohnnyCartoonBg.css'
import heartEyesImage from '../assets/johnny_cartoon/heart_eyes.png'
import celebrationImage from '../assets/johnny_cartoon/celebration.png'
import madImage from '../assets/johnny_cartoon/mad.png'

function JohnnyCartoonBg({ hasAccepted, showMad }) {
  const getImageSrc = () => {
    if (showMad) return madImage
    if (hasAccepted) return celebrationImage
    return heartEyesImage
  }

  const getAltText = () => {
    if (hasAccepted) return "Celebration"
    return "Heart Eyes"
  }

  return (
    <img
      src={getImageSrc()}
      alt={getAltText()}
      className="johnny-cartoon-bg"
    />
  )
}

export default JohnnyCartoonBg
