import { createContext, useReducer, useContext } from 'react'
import cache from 'yields-store'
import { CACHE_KEYS, STEPS } from '../constants'

const initialState = {
  step: STEPS.READY,
  host: cache(CACHE_KEYS.HOST),
  ping: null,
  download: null,
  upload: null,
  error: null,
}

const reducer = (state, action) => {
  const patch = (obj) => ({
    ...state,
    ...obj,
  })
  const fail = (message) => patch({
    error: message,
    step: STEPS.READY,
  })

  switch (action.type) {
    case 'ready': {
      return patch({
        step: STEPS.READY,
      })
    }
    case 'start': {
      if (!action.host) {
        return fail('Please enter your agent\'s address.')
      }
      cache(CACHE_KEYS.HOST, action.host)
      return patch({
        error: null,
        host: action.host,
        step: STEPS.PING,
      })
    }
    case 'setHost': {
      return patch({
        ping: action.value,
      })
    }
    case 'setPing': {
      if (!action.value) {
        return fail('Unable to connect to the server.')
      }
      return patch({
        ping: action.value,
        step: STEPS.DOWNLOAD,
      })
    }
    case 'setDownload': {
      if (!action.value) {
        return fail('Unable to connect to the server.')
      }
      return patch({
        download: action.value,
        step: STEPS.UPLOAD,
      })
    }
    case 'setUpload': {
      if (!action.value) {
        return fail('Unable to connect to the server.')
      }
      return patch({
        upload: action.value,
        step: STEPS.FINISH,
      })
    }
    default: {
      throw new Error('Unexpected action')
    }
  }
}

const Context = createContext()

export const ReducerProvider = ({ children }) => {
  const value = useReducer(reducer, initialState)
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export const useContextReducer = () => {
  const value = useContext(Context)
  return value
}
