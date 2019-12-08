import React from 'react'
import Animate from 'rc-animate'
import classnames from 'classnames'
import Ping from './Ping'
import Download from './Download'
import Upload from './Upload'
import Result from './Result'
import { useContextReducer, ReducerProvider } from './reducer'
import { STEPS } from './constants'
import './App.less'

const App = () => {
  const [ state, dispatch ] = useContextReducer()
  const { step } = state

  const onClick = () => dispatch({ type: 'start' })

  const isTesting = step !== STEPS.READY

  return <Animate transitionName="transition-view">
    {
      step !== STEPS.FINISH
      ? (
        <div className={classnames('screen', { testing: isTesting })} key="control">
          <div className="control">
            <h1>Speed Test</h1>
            <button className="primary-button" onClick={onClick} disabled={isTesting}>
              { isTesting ? 'Testing...' : 'Start' }
            </button>
          </div>
          {
            isTesting
              ? <div className="status">
                  {
                    step === STEPS.PING
                      ? <Ping />
                      : step === STEPS.DOWNLOAD
                        ? <Download />
                        : step === STEPS.UPLOAD
                          ? <Upload />
                          : null
                  }
                </div>
              : null
          }
        </div>
      )
      : <Result key="result" />
    }
  </Animate>
}

const AppWithContext = () => (
  <ReducerProvider>
    <App />
  </ReducerProvider>
)

export default AppWithContext
