import React, { useEffect } from 'react'
import { useContextReducer } from '../store/reducer'
import ApiWorker from 'worker-loader!../workers/ApiWorker'

const Upload = () => {
  const [ state, dispatch ] = useContextReducer()

  useEffect(() => {
    const worker = new ApiWorker()
    worker.addEventListener('message', ({ data }) => {
      dispatch({ type: 'setUpload', value: data.payload.speed })
      worker.terminate()
    })
    worker.postMessage({ api: 'upload', payload: { host: state.host } })
  }, [])

  return (
    <div className="upload">
      <h3>Testing Upload Speed ...</h3>
    </div>
  )
}

export default Upload
