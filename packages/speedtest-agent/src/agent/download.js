const { readableNoopStream } = require('noop-stream')

const DOWNLOAD_SIZE = 100 * 1024 * 1024 // 100mb

module.exports = (req, res) => {
  return readableNoopStream({size: DOWNLOAD_SIZE })
}
