import React, { useState, useEffect } from 'react'
import keymirror from 'keymirror'
import classnames from 'classnames'
import bus from './common/bus'
import Ping from './Ping'
import Download from './Download'
import Upload from './Upload'
import './App.less'

const STEPS = keymirror({
  READY: null,
  PING: null,
  DOWNLOAD: null,
  UPLOAD: null,
})

const App = () => {
  const [step, setStep] = useState(STEPS.READY)
  const [pingDuration, setPingDuration] = useState(null)
  const [downloadSpeed, setDownloadSpeed] = useState(null)
  const [uploadSpeed, setUploadSpeed] = useState(null)

  const onClick = async () => {
    setPingDuration(null)
    setDownloadSpeed(null)
    setUploadSpeed(null)
    setStep(STEPS.UPLOAD)
  }

  useEffect(() => {
    bus.on('result:ping', (data) => {
      setStep(STEPS.DOWNLOAD)
      setPingDuration(data.duration)
    })
    bus.on('result:download', (data) => {
      setStep(STEPS.UPLOAD)
      setDownloadSpeed(data.speed)
    })
    bus.on('result:upload', (data) => {
      setStep(STEPS.READY)
      setUploadSpeed(data.speed)
    })
  }, [])

  const isTesting = step !== STEPS.READY

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
              {
                step === STEPS.PING
                  ? <Ping />
                  : step === STEPS.DOWNLOAD
                    ? <Download />
                    : step === STEPS.UPLOAD
                      ? <Upload />
                      : null
              }
            </div>
          : null
      }
    </div>
  )
}

export default App
