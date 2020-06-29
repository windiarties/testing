const user_logic = require('../BisnisLogic/api')
const logic_token = require('../Token/authtoken')


module.exports = exports = function (server) {
  //login
server.get('/api/read', user_logic.read)
server.post('/api/login', user_logic.login)
server.post('/api/user', logic_token.checkToken, user_logic.createUser)
}