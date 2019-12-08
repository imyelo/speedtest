import React, { useState, useEffect } from 'react'
import keymirror from 'keymirror'
import pTimeout from 'p-timeout'
import bus from './common/bus'
import Timing from './common/timing'

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
      const response = await pTimeout(fetch(DOWNLOAD_ENDPOING, {
        signal,
      }), DOWNLOAD_RESPONSE_TIMEOUT, () => controller.abort())
      timing.mark(TIMING_MARKS.RESPONSE)
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
      return {
        size: null,
        duration: null,
        speed: null,
      }
    }
    return {
      size,
      duration,
      speed,
    }
  }

  return {
    download,
  }
}

const Download = () => {
  const { download } = useDownload()

  useEffect(() => {
    ;(async () => {
      let result = await download()
      bus.emit('result:download', result)
    })()
  }, [])

  return (
    <div className="download">
      <h3>Downloading ...</h3>
    </div>
  )
}

export default Download
