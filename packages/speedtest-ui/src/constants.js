import keymirror from 'keymirror'

export const PROJECT_URL = 'https://github.com/imyelo/speedtest'
export const AUTHOR_URL = 'https://yelo.cc'

export const STEPS = keymirror({
  READY: null,
  PING: null,
  DOWNLOAD: null,
  UPLOAD: null,
  FINISH: null,
})

const CACHE_PREFIX = 'speedtest:'
export const CACHE_KEYS = (() => {
  let keys = {
    HOST: 'host',
  }
  for (let name in keys) {
    keys[name] = `${CACHE_PREFIX}${keys[name]}`
  }
  return keys
})()
