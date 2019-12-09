import Debug from 'debug'
import ping from '../apis/ping'
import download from '../apis/download'
import upload from '../apis/upload'

const debug = Debug('speedtest:worker')

const apis = {
  ping,
  download,
  upload,
}

self.addEventListener('message', async ({ data }) => {
  debug(data)
  const { api: name, payload } = data
  const api = apis[name]
  if (!api) {
    throw new Error('Unexpected api')
  }
  const result = await api(payload)
  self.postMessage({
    payload: result,
  })
})
