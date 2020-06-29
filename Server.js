const restify = require('restify')
const pg = require('pg')
const DatabaseConnection = require('./Config/dbp.config.json')
const middleware = require("restify-cors-middleware")

var pool = new pg.Pool(DatabaseConnection.config);
pool.connect(function (err) {
    if (err) {
        console.log("not able to get connection " + err);
        process.exit()

    } else {
        console.log('[DATABASE] connected')
        const server = restify.createServer()
        const port = process.env.PORT || 3001
        const cors = middleware({
            origins: ['*']
           // ,
           // allowHeaders: ['authorization']
        });

        server.pre(cors.preflight)
        server.use(cors.actual)
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser({ mapParams: false }));

        require('./Routes/routes')(server)

        server.listen(port, () => {
            console.log('[SERVER] running at port ' + port)
        })
    }
})