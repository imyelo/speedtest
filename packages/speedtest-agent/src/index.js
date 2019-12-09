const micro = require('micro')
const publicIp = require('public-ip')
const static = require('./static')
const agent = require('./agent')

const DEFAULT_PUBLIC_IP = '127.0.0.1'
const DEFAULT_AGENT_PORT = 3001
const DEFAULT_PUBLIC_PORT = 3000

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
    publicPort: DEFAULT_PUBLIC_PORT
  }
  return meta
}

;(async () => {
  const meta = await getMeta()

  const staticServer = micro(static(meta))
  const agentServer = micro(agent(meta))

  staticServer.listen(DEFAULT_PUBLIC_PORT, () => {
    const address = staticServer.address()
    console.log(`Static server is listening on ${address.port}.`)
  })
  agentServer.listen(DEFAULT_AGENT_PORT, () => {
    const address = agentServer.address()
    console.log(`Agent server is listening on ${address.port}.`)
  })

})()
