const { readableNoopStream } = require('noop-stream')
// const randomBytesReadableStream = require('random-bytes-readable-stream')

const DOWNLOAD_SIZE = 1 * 1024 * 1024 // 1mb
const MAX_DOWNLOAD_SIZE = 2 * 1024 * 1024 * 1024 // 2gb

module.exports = (req, res) => {
  return readableNoopStream({size: DOWNLOAD_SIZE })
}
