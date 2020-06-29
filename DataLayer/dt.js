const pg = require('pg')
const DatabaseConnection = require('../Config/dbp.config.json')
var DB = new pg.Pool(DatabaseConnection.config)

const dt = {
    readUserData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM account where username=($1)', [username], function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                console.log("ini datanya :" + JSON.stringify(data))

            })

        })

    }
}

module.exports = dt