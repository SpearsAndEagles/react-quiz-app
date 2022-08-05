import React from 'react'
import ReactDOM from 'react-dom'

export default function Result({correct}) {
  return ReactDOM.createPortal(
    <h1 className='result'>Result: {correct}/5</h1>, document.getElementById("portal")
  )
}
