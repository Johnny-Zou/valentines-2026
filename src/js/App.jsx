import PolaroidStack from './PolaroidStack'
import '../css/App.css'

function App() {
  return (
    <div className="container">
      <PolaroidStack />
      <p className="question">Will you be my valentine?</p>
      <div className="buttons">
        <button className="yes-button">Yes</button>
        <button className="no-button">No</button>
      </div>
    </div>
  )
}

export default App
