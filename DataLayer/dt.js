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
            })
        })
    },
    readUserData: (callback, username) => { //res=lempar data ke client      
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
                // console.log("ini data di dt : "+ data)
                callback(data)
            })
        })
    },
    createUserData: (callback, docs) => { //res=lempar data ke client      
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {

                data = err;
            }

            var salt = bcrypt.genSaltSync(10);
            let pashash = bcrypt.hashSync(docs.password, salt);

            const query = {
                text: 'INSERT INTO account(username,password) VALUES($1,$2)',
                values: [docs.username, pashash],
            }
            client.query(query, function (err, result) {
                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
            })


        })

    }
}

module.exports = dt