const logic_api = require('../BisnisLogic/api')


module.exports = exports = function (server) {
  //login
  server.get('/api/login', logic_api.read)
 // server.post('/api/login', logic_api.login)
}