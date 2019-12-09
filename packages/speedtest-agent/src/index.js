const micro = require('micro')
const static = require('./static')
const agent = require('./agent')

const DEFAULT_AGENT_PORT = 3001
const DEFAULT_PUBLIC_PORT = 3000

const staticServer = micro(static)
const agentServer = micro(agent)

staticServer.listen(DEFAULT_PUBLIC_PORT, () => {
  const address = staticServer.address()
  console.log(`Static server is listening on ${address.port}.`)
})
agentServer.listen(DEFAULT_AGENT_PORT, () => {
  const address = agentServer.address()
  console.log(`Agent server is listening on ${address.port}.`)
})
