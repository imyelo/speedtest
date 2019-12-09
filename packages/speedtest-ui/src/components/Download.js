import React, { useEffect } from 'react'
import { useContextReducer } from '../store/reducer'
import download from '../apis/download'

const Download = () => {
  const [ state, dispatch ] = useContextReducer()

  useEffect(() => {
    ;(async () => {
      let result = await download({ host: state.host })
      dispatch({ type: 'setDownload', value: result.speed })
    })()
  }, [])

  return (
    <div className="download">
      <h3>Testing Download Speed ...</h3>
    </div>
  )
}

export default Download
