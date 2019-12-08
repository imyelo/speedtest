import React, { useState, useEffect } from 'react'
import keymirror from 'keymirror'
import Debug from 'debug'
import bus from './common/bus'
import Timing from './common/timing'

const debug = Debug('speedtest:upload')

const UPLOAD_SIZE = 50 * 1024 * 1024 // 50mb
const UPLOAD_TIMEOUT = 30 * 1000 // 20s

const UPLOAD_ENDPOING = 'http://localhost:3001/upload'

const TIMING_MARKS = keymirror({
  START: null,
  END: null,
})

const post = async ({ url, body, timeout, onProgress }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.onload = (event) => resolve(event)
    xhr.onerror = (error) => reject(error)
    xhr.upload.onprogress = onProgress
    xhr.timeout = timeout
    xhr.send(body)
  })
}

function useUpload () {
  const upload = async () => {
    let timing = new Timing()
    let size
    try {
      const payload = new Uint8Array(UPLOAD_SIZE)
      timing.mark(TIMING_MARKS.START)
      await post({
        url: UPLOAD_ENDPOING,
        body: payload.buffer,
        timeout: UPLOAD_TIMEOUT,
        onProgress (event) {
          size = event.loaded
        },
      })
      size = payload.byteLength
    } catch (error) {
      debug(error)
    }
    timing.mark(TIMING_MARKS.END)
    const duration = timing.duration(TIMING_MARKS.START, TIMING_MARKS.END)
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
    upload,
  }
}

const Upload = () => {
  const { upload } = useUpload()

  useEffect(() => {
    ;(async () => {
      let result = await upload()
      bus.emit('result:upload', result)
    })()
  }, [])

  return (
    <div className="upload">
      <h3>Uploading ...</h3>
    </div>
  )
}

export default Upload
