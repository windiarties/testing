const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
// const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
let jumlahlogin = 0;
const M_addrBook_BL = {


    cover: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs = req.body
        dtl.coverData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)

    },
    readcover: (req, res, next) => { //res=lempar data ke client
        dtl.readcoverData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    readartist: (req, res, next) => { //res=lempar data ke client
        dtl.readartistData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        })
    },
    cherio: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs = req.body
        console.log(JSON.stringify(docs));

        dtl.cherioData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)

    },
    tambahcover: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs = req.body
        // console.log(JSON.stringify(docs));
        dtl.tambahData(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)

    },
    tambahartist: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs = req.body
        dtl.tambahartis(function (items) {
            ResponseHelper.sendResponse(res, 200, items)
        }, docs)
    },

}

module.exports = M_addrBook_BL