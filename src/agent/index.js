const { send } = require('micro')
const cors = require('micro-cors')()

const routes = [
  ['GET', '/ping', require('./ping')],
  ['GET', '/download', require('./download')],
  ['POST', '/upload', require('./upload')],
]

const notfound = (req, res) => send(res, 404, 'not found')

module.exports = cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return send(res, 200, 'OK')
  }
  for (let i = 0; i < routes.length; i++) {
    let [ method, url, fn ] = routes[i]
    if (req.method === method && req.url === url) {
      return await fn(req, res)
    }
  }
  return notfound(req, res)
})
