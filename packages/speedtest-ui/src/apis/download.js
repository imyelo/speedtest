import keymirror from 'keymirror'
import pTimeout from 'p-timeout'
import olt from 'olt'
import Timing from '../common/timing'

const DOWNLOAD_RESPONSE_TIMEOUT = 5 * 1000 // 5s
const DOWNLOAD_CONTENT_TIMEOUT = 20 * 1000 // 20s

const DOWNLOAD_ENDPOING = 'http://${host}/download'

const TIMING_MARKS = keymirror({
  REQUEST: null,
  RESPONSE: null,
  CONTENT: null,
})

const request = async ({ url, responseTimeout, contentTimeout, onResponse, onProgress }) => {
  const receive = async (reader) => {
    const next = async () => {
      let { done, value } = await reader.read()
      if (done) {
        return
      }
      onProgress({ value })
      await next()
    }
    await next()
  }
  const controller = new AbortController()
  const response = await pTimeout(fetch(url, {
    signal: controller.signal,
  }), responseTimeout, () => controller.abort())
  onResponse()
  await pTimeout(receive(response.body.getReader()), contentTimeout, () => controller.abort())
}

const download = async ({ host }) => {
  let timing = new Timing()
  let size = 0

  try {
    timing.mark(TIMING_MARKS.REQUEST)
    await request({
      url: olt(DOWNLOAD_ENDPOING)({ host }),
      responseTimeout: DOWNLOAD_RESPONSE_TIMEOUT,
      contentTimeout: DOWNLOAD_CONTENT_TIMEOUT,
      onResponse () {
        timing.mark(TIMING_MARKS.RESPONSE)
      },
      onProgress ({ value }) {
        size += value.byteLength
      },
    })
  } catch (error) {
    console.error(error)
  } finally {
    timing.mark(TIMING_MARKS.CONTENT)
  }
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

export default download
