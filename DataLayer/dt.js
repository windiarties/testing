const pg = require('pg')
const DatabaseConnection = require('../Config/dbp.config.json')
var DB = new pg.Pool(DatabaseConnection.config);
const request = require('request');

const dt = {
    readOneAddrBookByusernameData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT MAX(id) as id FROM account', function (err, result) {

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