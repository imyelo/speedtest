const serve = require('serve-handler')
const path = require('path')

module.exports = async (req, res) => {
  await serve(req, res, {
    public: path.resolve(__dirname, '../packages/speedtest-ui/dist'),
  })
}
