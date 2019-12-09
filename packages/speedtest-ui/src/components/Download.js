import React, { useEffect } from 'react'
import { useContextReducer } from '../store/reducer'
import ApiWorker from 'worker-loader!../workers/ApiWorker'

const Download = () => {
  const [ state, dispatch ] = useContextReducer()

  useEffect(() => {
    const worker = new ApiWorker()
    worker.addEventListener('message', ({ data }) => {
      dispatch({ type: 'setDownload', value: data.payload.speed })
      worker.terminate()
    })
    worker.postMessage({ api: 'download', payload: { host: state.host } })
  }, [])

  return (
    <div className="download">
      <h3>Testing Download Speed ...</h3>
    </div>
  )
}

export default Download
