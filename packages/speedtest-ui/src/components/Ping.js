import React, { useEffect } from 'react'
import { useContextReducer } from '../store/reducer'
import usePing from '../apis/ping'

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
