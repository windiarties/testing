const pg = require('pg')
const DatabaseConnection = require('../Config/dbp.config.json')
var DB = new pg.Pool(DatabaseConnection.config);
const request = require('request');

const dt = {
    readcoverData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM cover', function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                // console.log("ini data :" + JSON.stringify(data))

            })

        })

    },
    readartistData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT MAX(id) as id FROM artist', function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                // console.log("ini data :" + JSON.stringify(data))

            })

        })

    },
    readofficialData: (callback) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            var data = ''
            if (err) {
                data = err;
            }
            client.query('SELECT * FROM official_song WHERE cover_views = 8043927', function (err, result) {
                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }
                callback(data)
                // console.log("ini data offc:" + JSON.stringify(data))

            })

        })

    },
    tambahData: (callback, docs) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            // console.log(docs)
            console.log(docs.length)
            var data = ''
            var chart = []
            var dt = datetime.create();
            var currentdate = dt.format('Y-m-d');
            var id = 1
            // console.log(docs.length)
            if (err) {
                data = err;
            }

            
            // chart = docs.filter((value) => 
            // value.title.toLowerCase().includes(docs.nama) && value.title.toLowerCase().includes('cover') && value.views > 1000
            // )
            
            // console.log(chart)
            let query = "INSERT INTO public.data_cover(create_at, artist_id, title, channel, views) VALUES "

            docs.map((item, i) => {
                // let name = item.filter
                //let password = `$2a$10$lSKij2nfqKrlg8lPwNP5EOEx0FNzGH6zMcbSHxlP.zYmhGQEZKS1S`
                if (i === docs.length - 1) {
                    query += `('${currentdate}', ${item.id}, '${item.title}' , '${item.chanel}', ${item.views});`
                } else {
                    query += `('${currentdate}', ${item.id}, '${item.title}' , '${item.chanel}', ${item.views}),`
                }
            })

            console.log(query)
            // [currentdate, id, element.title, element.channel, element.views]  
            client.query(query, function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }

                // console.log("banyak "+JSON.stringify(data))
                callback(data)
            })

        })


    },
    tambahcover: (callback, docs) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            console.log(docs)
            var data = ''
            var dt = datetime.create();
            var currentdate = dt.format('Y-m-d');

            console.log(docs.length)
            if (err) {
                data = err;
            }
            // for (let i = 0; i < docs.length; i++ ){

            // }

            const query = {
                text: "INSERT INTO public.cover(create_at, artist_name, song_name, title, channel, views, total_views) VALUES ($1, $2, $3, $4, $5, $6, $7);",
                values: [currentdate, docs.artist_name, docs.song_name, docs.title, docs.channel, docs.views, docs.total_views],
            }
            client.query(query, function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }

                // console.log("banyak "+JSON.stringify(data))
                callback(data)
            })

        })

    },
    tambahartis: (callback, docs) => { //res=lempar data ke client    
        DB.connect(function (err, client, done) {
            console.log(docs)
            var data = ''
            var dt = datetime.create();
            var currentdate = dt.format('Y-m-d');

            console.log(currentdate)
            if (err) {
                data = err;
            }

            const query = {
                text: "INSERT INTO public.artistid(artist_name, song_name, total_views, total_cover) VALUES ($1, $2, $3, $4);",
                values: [docs.artist_name, docs.song_name, docs.total_views, docs.total_cover],
            }
            client.query(query, function (err, result) {

                done()
                if (err) {
                    data = err;
                } else {
                    data = result.rows
                }

                // console.log("banyak "+JSON.stringify(data))
                callback(data)
            })

        })

    }
}

module.exports = dt