import { createContext, useReducer, useContext } from 'react'
import { STEPS } from './constants'

const initialState = {
  step: STEPS.READY,
  ping: null,
  download: null,
  upload: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'start': {
      return {
        ...state,
        step: STEPS.PING,
      }
    }
    case 'setPing': {
      return {
        ...state,
        ping: action.value,
        step: STEPS.DOWNLOAD,
      }
    }
    case 'setDownload': {
      return {
        ...state,
        download: action.value,
        step: STEPS.UPLOAD,
      }
    }
    case 'setUpload': {
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
