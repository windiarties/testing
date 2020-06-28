const pg = require('pg')
const DatabaseConnection = require('../Config/dbp.config.json')
var DB = new pg.Pool(DatabaseConnection.config)

const dt = {
    readData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM account', function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                console.log("ini data :" + JSON.stringify(data))

            })

        })

    },
    readData2: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM account', function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                console.log("ini data :" + JSON.stringify(data))

            })

        })

    }
}

module.exports = dt