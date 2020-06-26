const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')

    

const M_Pelamar_BL = {
    readPelamarWithAddrBookAllHandler: (req, res, next) => { //res=lempar data ke client
       
        dtl.readPelamarWithAddrBookHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    },
    searchPelamarWithNameAllHandler: (req,res,next) => {
        var docs=req.body
        // console.log(req.body)
        dtl.searchPelamarWithNameAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200,items)
        },docs)
    },
    countPelamarAllHandler: (req,res,next) => {
        var docs=req.body
        dtl.countAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200,items)
        },docs)
    },
    kirimTokenPelamarAllHandler: (req,res,next) => {
        var docs=req.body
        dtl.kirimTokenAllHandlerData(function(items){
            ResponseHelper.sendResponse(res, 200,items)
        },docs)
    },
}

module.exports = M_Pelamar_BL