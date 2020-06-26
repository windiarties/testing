const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
// const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
let jumlahlogin = 0;
const officialLogic = {


    readofficial: (req, res, next) => { //res=lempar data ke client
        dtl.readofficialData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    }


}

module.exports = officialLogic