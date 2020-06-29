const user_logic = require('../BisnisLogic/api')
const logic_token = require('../Token/authtoken')


module.exports = exports = function (server) {
  //login
// server.get('/api/login', logic_api.read)
server.post('/api/login', user_logic.login)
}