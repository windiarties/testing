const logic_api = require('../BisnisLogic/api')
const logic_token = require('../Token/authtoken')


module.exports = exports = function (server) {
  //login
server.get('/api/login', logic_api.read)
server.post('/api/login', logic_token.checkToken)
}