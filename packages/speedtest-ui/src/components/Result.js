import React from 'react'
import { prettyDuration, prettySpeed } from '../common/pretty'
import { useContextReducer } from '../store/reducer'

const Result = () => {
  const [ state, dispatch ] = useContextReducer()

  const onClickButton = () => dispatch({ type: 'ready' })

  return (
    <div className="screen">
      <div className="result">
        <h1>Result</h1>
        <div className="information">
          <div className="item">
            <div className="name">Ping</div>
            <div className="value">{prettyDuration(state.ping)}</div>
          </div>
          <div className="item">
            <div className="name">Download</div>
            <div className="value">{prettySpeed(state.download)}</div>
          </div>
          <div className="item">
            <div className="name">Upload</div>
            <div className="value">{prettySpeed(state.upload)}</div>
          </div>
        </div>
        <button className="primary-button" onClick={onClickButton}>
          Test Again
        </button>
      </div>
    </div>
  )
}

export default Result
