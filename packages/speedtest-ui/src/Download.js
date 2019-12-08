import React, { useState, useEffect } from 'react'
import keymirror from 'keymirror'
import pTimeout from 'p-timeout'
import bus from './common/bus'
import Timing from './common/timing'
import { prettySpeed } from './common/pretty'

const DOWNLOAD_RESPONSE_TIMEOUT = 5 * 1000 // 5s
const DOWNLOAD_CONTENT_TIMEOUT = 20 * 1000 // 20s

const DOWNLOAD_ENDPOING = 'http://localhost:3001/download'

const TIMING_MARKS = keymirror({
  REQUEST: null,
  RESPONSE: null,
  CONTENT: null,
})

const STEPS = {
  REQUESTING: 'requesting ...',
  FETCHING: 'fetching content ...',
}

function useDownload () {
  const [step, setStep] = useState(null)

  const download = async () => {
    let timing = new Timing()
    let content = []
    const receive = async (reader) => {
      const next = async () => {
        let { done, value } = await reader.read()
        if (done) {
          return
        }
        content.push(value)
        await next()
      }
      await next()
    }

    try {
      const controller = new AbortController()
      const signal = controller.signal
      timing.mark(TIMING_MARKS.REQUEST)
      setStep(STEPS.REQUESTING)
      const response = await pTimeout(fetch(DOWNLOAD_ENDPOING, {
        signal,
      }), DOWNLOAD_RESPONSE_TIMEOUT, () => controller.abort())
      timing.mark(TIMING_MARKS.RESPONSE)
      setStep(STEPS.FETCHING)
      await pTimeout(receive(response.body.getReader()), DOWNLOAD_CONTENT_TIMEOUT, () => controller.abort())
    } catch (error) {
      console.error(error)
    } finally {
      timing.mark(TIMING_MARKS.CONTENT)
    }
    const size = content.reduce((memo, bytes) => memo + bytes.byteLength, 0)
    const duration = timing.duration(TIMING_MARKS.RESPONSE, TIMING_MARKS.CONTENT)
    const speed = size / (duration / 1000) // bytes/s
    if (!size) {
      console.log('failed')
    } else {
      console.log(size, duration, speed, prettySpeed(speed))
    }
    setStep(null)
    return {
      size,
      duration,
      speed,
    }
  }

  return {
    step,
    download,
  }
}

const Download = () => {
  const { step, download } = useDownload()

  useEffect(() => {
    ;(async () => {
      let result = await download()
      bus.emit('result:download', result)
    })()
  }, [])

  return (
    <div className="download">
      <h3>Downloading ...</h3>
      <p>{ step }</p>
    </div>
  )
}

export default Download
