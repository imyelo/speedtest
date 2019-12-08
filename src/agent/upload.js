const { send } = require('micro')

const MAX_UPLOAD_SIZE = 100 * 1024 * 1024 // 100mb

module.exports = function(req, res) {
  let chunks = Buffer.alloc(0)
  req.on('data', (chunk) => {
    chunks = Buffer.concat([chunks, chunk])
    if (req.socket.bytesRead >= MAX_UPLOAD_SIZE) {
      req.connection.destroy()
    }
  })
  req.on('end', () => {
    console.log(chunks.length)
    send(res, 200, '')
  })
  req.resume()
}
