import React, { useEffect } from 'react'
import { useContextReducer } from '../store/reducer'
import upload from '../apis/upload'

const Upload = () => {
  const [ state, dispatch ] = useContextReducer()

  useEffect(() => {
    ;(async () => {
      let result = await upload({ host: state.host })
      dispatch({ type: 'setUpload', value: result.speed })
    })()
  }, [])

  return (
    <div className="upload">
      <h3>Testing Upload Speed ...</h3>
    </div>
  )
}

export default Upload
