import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import bus from './common/bus'
import Download from './Download'
import './App.less'

const App = () => {
  const [isTesting, setIsTesting] = useState(false)
  const [downloadSpeed, setDownloadSpeed] = useState(null)

  const onClick = async () => {
    setDownloadSpeed(null)
    setIsTesting(true)
  }

  useEffect(() => {
    bus.on('result:download', (data) => {
      setIsTesting(false)
      setDownloadSpeed(data.speed)
    })
  }, [])

  return (
    <div className={classnames('screen', { testing: isTesting })}>
      <div className="control">
        <h1>Speed Test</h1>
        <button className="primary-button" onClick={onClick} disabled={isTesting}>
          { isTesting ? 'Testing...' : 'Start' }
        </button>
      </div>
      {
        isTesting
          ? <div className="status">
              <Download />
            </div>
          : null
      }
    </div>
  )
}

export default App
