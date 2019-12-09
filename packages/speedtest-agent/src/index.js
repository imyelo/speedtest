const micro = require('micro')
const publicIp = require('public-ip')
const client = require('./client')
const agent = require('./agent')

const DEFAULT_PUBLIC_IP = '127.0.0.1'
const DEFAULT_AGENT_PORT = 3001
const DEFAULT_CLIENT_PORT = 3000

const getMeta = async () => {
  let ip
  if (DEFAULT_PUBLIC_IP === true) {
    try {
      ip = await publicIp.v4({ onlyHttps: true })
    } catch (error) {
      console.error(error)
    }
  } else if (DEFAULT_PUBLIC_IP) {
    ip = DEFAULT_PUBLIC_IP
  }

  const meta = {
    ip,
    agentPort: DEFAULT_AGENT_PORT,
    clientPort: DEFAULT_CLIENT_PORT,
  }
  return meta
}

const launch = async () => {
  const meta = await getMeta()

  const clientServer = micro(client(meta))
  const agentServer = micro(agent(meta))

  clientServer.listen(DEFAULT_CLIENT_PORT, () => {
    const address = clientServer.address()
    console.log(`Client server is listening on ${address.port}.`)
  })
  agentServer.listen(DEFAULT_AGENT_PORT, () => {
    const address = agentServer.address()
    console.log(`Agent server is listening on ${address.port}.`)
  })
}

module.exports = launch

if (!module.parent) {
  launch()
}
