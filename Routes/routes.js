const coverLogic = require('../BisnisLogic/cover')
const officialLogic = require('../BisnisLogic/official')


module.exports = exports = function (server) {
  //login
  server.get('/api/cover', coverLogic.readcover)
  server.get('/api/official', officialLogic.readofficial)
  server.post('/api/cover', coverLogic.cover)
  server.post('/api/tambah', coverLogic.tambahcover)
  server.post('/api/artist', coverLogic.tambahartist)
  server.get('/api/read', coverLogic.readartist)
  // server.get('api/hasilscrap', coverLogic.hasilscrap)
}