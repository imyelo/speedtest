import React, { useEffect } from 'react'
import keymirror from 'keymirror'
import pTimeout from 'p-timeout'
import olt from 'olt'
import Timing from './common/timing'
import { useContextReducer } from './reducer'

const PING_RESPONSE_TIMEOUT = 5 * 1000 // 5s
const PING_TIME = 8

const PING_ENDPOING = 'http://${host}/ping'

const TIMING_MARKS = keymirror({
  REQUEST: null,
  RESPONSE: null,
})

function usePing () {
  const request = async ({ host }) => {
    let timing = new Timing()
    try {
      const controller = new AbortController()
      timing.mark(TIMING_MARKS.REQUEST)
      await pTimeout(fetch(olt(PING_ENDPOING)({ host }), {
        signal: controller.signal,
      }), PING_RESPONSE_TIMEOUT, () => controller.abort())
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
      let ms = await request({ host })
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

  return {
    ping,
  }
}

const Ping = () => {
  const [ state, dispatch ] = useContextReducer()
  const { ping } = usePing()

  useEffect(() => {
    ;(async () => {
      let result = await ping({ host: state.host })
      dispatch({ type: 'setPing', value: result.duration })
    })()
  }, [])

  return (
    <div className="ping">
      <h3>Testing Ping Speed ...</h3>
    </div>
  )
}

export default Ping
