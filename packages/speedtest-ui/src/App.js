import React from 'react'
import './App.less'

const App = () => {
  const onClick = () => {
    console.log('test')
  }

  return (
    <div className="app">
      <h1>Speed Test</h1>
      <button className="primary-button" onClick={onClick}>Start</button>
    </div>
  )
}

export default App
