import React, { useEffect } from 'react'
import { useContextReducer } from '../store/reducer'
import ApiWorker from 'worker-loader!../workers/ApiWorker'

const Ping = () => {
  const [ state, dispatch ] = useContextReducer()

  useEffect(() => {
    const worker = new ApiWorker()
    worker.addEventListener('message', ({ data }) => {
      dispatch({ type: 'setPing', value: data.payload.duration })
      worker.terminate()
    })
    worker.postMessage({ api: 'ping', payload: { host: state.host } })
  }, [])

  return (
    <div className="ping">
      <h3>Testing Ping Speed ...</h3>
    </div>
  )
}

export default Ping
