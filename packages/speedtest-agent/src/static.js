const serve = require('serve-handler')
const path = require('path')

const getAgentAddress = (meta) => {
  if (!meta.ip) {
    return ''
  }
  return `${meta.ip}:${meta.agentPort}`
}

module.exports = (meta) => async (req, res) => {
  if (req.url === '/agent.txt') {
    return getAgentAddress(meta)
  }
  await serve(req, res, {
    public: path.resolve(__dirname, '../../speedtest-ui/dist'),
  })
}
