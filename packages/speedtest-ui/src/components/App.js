import React, { useState, useEffect } from 'react'
import Animate from 'rc-animate'
import classnames from 'classnames'
import { useContextReducer, ReducerProvider } from '../store/reducer'
import { PROJECT_URL, AUTHOR_URL, STEPS } from '../constants'
import Ping from './Ping'
import Download from './Download'
import Upload from './Upload'
import Result from './Result'
import './App.less'

const useAppForm = (defaultValue) => {
  const [ host, setHost ] = useState(defaultValue.host || '')

  useEffect(() => {
    ;(async () => {
      let response = await fetch('/agent.txt')
      if (!response.ok) {
        return
      }
      let body = await response.text()
      let host = body.trim()
      if (!host) {
        return
      }
      setHost(host)
    })()
  }, [])

  return [
    [ host, setHost ],
  ]
}

const App = () => {
  const [ state, dispatch ] = useContextReducer()
  const { step } = state
  const [ [ host, setHost ]] = useAppForm({ host: state.host })

  const onChangeHost = (event) =>
    setHost(event.target.value)

  const onSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const host = form.get('host')
    dispatch({
      type: 'start',
      host,
    })
  }

  const isTesting = step !== STEPS.READY

  return <Animate transitionName="transition-view">
    {
      step !== STEPS.FINISH
      ? (
        <div className={classnames('screen', { testing: isTesting })} key="control">
          <div className="control">
            <h1>
              <a href={PROJECT_URL} target="_blank">Speed Test</a>
              <a className="author" href={AUTHOR_URL} target="_blank">
                &copy;yelo
              </a>
            </h1>
            <form className="form" onSubmit={onSubmit}>
              <input
                className="host"
                name="host"
                autoComplete="off"
                placeholder="Agent IP:PORT"
                value={host}
                onChange={onChangeHost}
                disabled={isTesting} />
              <button className="primary-button" type="submit" disabled={isTesting}>
                { isTesting ? 'Testing...' : 'Start' }
              </button>
            </form>
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
          <Animate transitionName="transition-error">
            {
              state.error
                ? <div className="error">
                  {state.error}
                </div>
                : null
            }
          </Animate>
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
