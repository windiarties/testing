const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')

    

const M_TestType_BL = {
    readTestTypeAllHandler: (req, res, next) => { //res=lempar data ke client
       
        dtl.readTestTypeHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    },
    readBanyakUjianAllHandler: (req, res, next) => { //res=lempar data ke client
        var docs=req.body
        // console.log(docs)
        dtl.readBanyakUjianHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    readBanyakTestTiapUjianAllHandler: (req, res, next) => { //res=lempar data ke client
        var docs=req.body
        // console.log(docs)
        dtl.readBanyakTestTiapUjianHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    deleteBanyakTestTiapUjianAllHandler: (req, res, next) => { //res=lempar data ke client
        var docs=req.body
        // console.log(docs)
        dtl.deleteBanyakTestTiapUjianHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    tambahBanyakTestTiapUjianAllHandler: (req, res, next) => { //res=lempar data ke client
        var docs=req.body
        // console.log(docs)
        dtl.tambahBanyakTestTiapUjianHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    deleteAllTestTiapUjianAllHandler: (req, res, next) => { //res=lempar data ke client
        var docs=req.body
        console.log(docs)
        dtl.deleteAllTestTiapUjianHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    deleteUjianAllHandler: (req, res, next) => { //res=lempar data ke client
        var docs=req.body
        console.log(docs)
        dtl.deleteUjianHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    
    
}

module.exports = M_TestType_BL