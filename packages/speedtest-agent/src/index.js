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

  if (!options.get('agentOnly')) {
    const clientServer = micro(client(meta))
    clientServer.listen(options.get('clientPort'), () => {
      const address = clientServer.address()
      console.log(`Client server is ready: http://${meta.ip || 'localhost'}:${address.port}`)
    })
  }

  const agentServer = micro(agent(meta))
  agentServer.listen(options.get('agentPort'), () => {
    const address = agentServer.address()
    console.log(`Agent server is ready:  http://${meta.ip || 'localhost'}:${address.port}`)
  })
}

module.exports = launch
