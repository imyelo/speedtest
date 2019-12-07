const { send } = require('micro')

const MAX_UPLOAD_SIZE = 100 * 1024 * 1024 // 100mb

module.exports = function(req, res) {
  req.on('data', () => {
    if (req.socket.bytesRead >= MAX_UPLOAD_SIZE) {
      req.connection.destroy()
    }
  })
  req.on('end', () => {
    send(res, 200, '')
  })
  req.resume()
}
