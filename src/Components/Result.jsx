import React from 'react'
import ReactDOM from 'react-dom'

export default function Result({correct, handleRestart}) {
  return ReactDOM.createPortal(
    <div className='overlay'>
        <h1 className='result'>Result: {correct}/5</h1>
        <button onClick={handleRestart}>Restart</button>
    </div>, document.getElementById("portal")
  )
}
