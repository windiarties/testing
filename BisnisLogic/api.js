const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const api = {

    read: (req, res, next) => { //res=lempar data ke client

        dtl.readData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })

    },
    login: (req, res, next) => {
        console.log("test web")
        let data = req.body

        dtl.readUserData(function (items) {
            console.log("data items..."+ JSON.stringify(items[0]))

            if (items[0]) {
                console.log(jwt.sign(items[0], authConfig.secretkey))

                if (bcrypt.compareSync(data.password,items[0].password)) {
                    let token = jwt.sign(items[0], authConfig.secretkey)

                    delete items[0].password
                    let result = {
                        userdata: items[0],
                        token: token
                    }
                    // let result="Berhasil Login"
                    ResponseHelper.sendResponse(res, 200, result)
                } 
                else {
                    let result = "Wrong password"
                    ResponseHelper.sendResponse(res, 404, result)
                }
            } 
            else {
                let result = "User not Found"
                ResponseHelper.sendResponse(res, 404, result)
            }

        },data.username)

    },
    createUser: (req, res, next) => { //res=lempar data ke client

        dtl.createUserData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })

    }
}

module.exports = api