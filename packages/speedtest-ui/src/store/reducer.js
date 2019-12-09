import { createContext, useReducer, useContext } from 'react'
import { STEPS } from '../constants'

const initialState = {
  step: STEPS.READY,
  host: '',
  ping: null,
  download: null,
  upload: null,
  error: null,
}

const reducer = (state, action) => {
  const fail = (message) => ({
    ...state,
    error: message,
    step: STEPS.READY,
  })

  switch (action.type) {
    case 'ready': {
      return {
        ...state,
        step: STEPS.READY,
      }
    }
    case 'start': {
      return {
        ...state,
        error: null,
        host: action.host,
        step: STEPS.PING,
      }
    }
    case 'setHost': {
      return {
        ...state,
        ping: action.value,
      }
    }
    case 'setPing': {
      if (!action.value) {
        return fail('Unable to connect to the server.')
      }
      return {
        ...state,
        ping: action.value,
        step: STEPS.DOWNLOAD,
      }
    }
    case 'setDownload': {
      if (!action.value) {
        return fail('Unable to connect to the server.')
      }
      return {
        ...state,
        download: action.value,
        step: STEPS.UPLOAD,
      }
    }
    case 'setUpload': {
      if (!action.value) {
        return fail('Unable to connect to the server.')
      }
      return {
        ...state,
        upload: action.value,
        step: STEPS.FINISH,
      }
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
