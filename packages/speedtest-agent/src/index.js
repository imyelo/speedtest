const micro = require('micro')
const publicIp = require('public-ip')
const client = require('./client')
const agent = require('./agent')

const getIp = async (options) => {
  const option = options.get('publicIp')
  if (option === true) {
    try {
      return await publicIp.v4({ onlyHttps: true })
    } catch (error) {
      console.error(error)
    }
  } else if (option) {
    return option
  }
  return null
}

const getMeta = async (options) => {
  let ip = await getIp(options)
  return {
    ip,
    clientPort: options.get('clientPort'),
    agentPort: options.get('agentPort'),
  }
}

const launch = async (options) => {
  const meta = await getMeta(options)

  const agentServer = micro(agent(meta))
  agentServer.listen(options.get('agentPort'), () => {
    const address = agentServer.address()
    console.log(`Agent :     http://${meta.ip || 'localhost'}:${address.port}`)
  })

  if (!options.get('agentOnly')) {
    const clientServer = micro(client(meta))
    clientServer.listen(options.get('clientPort'), () => {
      const address = clientServer.address()
      console.log(`GUI Client: http://${meta.ip || 'localhost'}:${address.port}`)
    })
  }
}

module.exports = launch
