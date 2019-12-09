import keymirror from 'keymirror'
import Debug from 'debug'
import olt from 'olt'
import Timing from '../common/timing'

const debug = Debug('speedtest:upload')

const UPLOAD_SIZE = 20 * 1024 * 1024 // 50mb
const UPLOAD_TIMEOUT = 20 * 1000 // 20s

const UPLOAD_ENDPOING = 'http://${host}/upload'

const TIMING_MARKS = keymirror({
  START: null,
  END: null,
})

const post = async ({ url, body, timeout, onProgress }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = (event) => resolve(event)
    xhr.onerror = (error) => reject(error)
    xhr.ontimeout = (event) => reject(new Error('timeout'))
    xhr.upload.onprogress = onProgress
    xhr.timeout = timeout
    xhr.open('POST', url)
    xhr.send(body)
  })
}

function useUpload () {
  const upload = async ({ host }) => {
    let timing = new Timing()
    let size
    try {
      const payload = new Uint8Array(UPLOAD_SIZE)
      timing.mark(TIMING_MARKS.START)
      await post({
        url: olt(UPLOAD_ENDPOING)({ host }),
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

export default useUpload
