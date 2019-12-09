import keymirror from 'keymirror'
import pTimeout from 'p-timeout'
import olt from 'olt'
import Timing from '../common/timing'

const PING_RESPONSE_TIMEOUT = 5 * 1000 // 5s
const PING_TIME = 8

const PING_ENDPOING = 'http://${host}/ping'

const TIMING_MARKS = keymirror({
  REQUEST: null,
  RESPONSE: null,
})

const request = async ({ url, timeout }) => {
  const controller = new AbortController()
  return await pTimeout(fetch(url, {
    signal: controller.signal,
  }), timeout, () => controller.abort())
}

const doPing = async ({ host }) => {
  let timing = new Timing()
  try {
    timing.mark(TIMING_MARKS.REQUEST)
    await request({
      url: olt(PING_ENDPOING)({ host }),
      timeout: PING_RESPONSE_TIMEOUT,
    })
    timing.mark(TIMING_MARKS.RESPONSE)
  } catch (error) {
    console.error(error)
    return
  }
  return timing.duration(TIMING_MARKS.REQUEST, TIMING_MARKS.RESPONSE)
}

const ping = async ({ host }) => {
  let durations = []
  for (let i = 0; i < PING_TIME; i++) {
    let ms = await doPing({ host })
    if (ms) {
      durations.push(ms)
    }
  }
  if (!durations.length) {
    return {
      duration: null,
    }
  }
  return {
    duration: durations.reduce((memo, ms) => memo + ms, 0) / durations.length,
  }
}

export default ping
