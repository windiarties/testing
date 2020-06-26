const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
// const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5=require('md5')
let jumlahlogin = 0;
const M_addrBook_BL = {
    
    readAddrBookAllHandler: (req, res, next) => { //res=lempar data ke client
        
        dtl.readAddrBookAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    },
    createAddrBookAllHandler: (req, res, next) => { //res=lempar data ke client
        console.log("test")
        var docs=req.body
        console.log(JSON.stringify(docs));
        
        dtl.createAddrBookAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    updateAddrBookAllHandler: (req, res, next) => { //res=lempar data ke client
        
        var docs=req.body
        
        dtl.updateAddrBookAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    deleteAddrBookAllHandler: (req, res, next) => { //res=lempar data ke client
        
        var docs=req.body
        
        dtl.deleteAddrBookAllHandlerData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        },docs)       
        
    },
    

    login: (req, res, next) => {
        console.log("Login") 
        let data=req.body
        // console.log(JSON.stringify(data))
        dtl.readOneAddrBookByEmailAbuidData(function(items){
            console.log(items[0]) 
            
            if(items[0] && items[0].is_locked == false && items[0].is_deleted == false)
            {  
                
                if(md5(data.abpwd) == items[0].abpwd ){    
                        let token=jwt.sign(items[0],authConfig.secretkey)
                    
                        delete items[0].abpwd
                        let result={
                        userdata: items[0],
                        token: token
                        }
                     jumlahlogin = 0;
                        ResponseHelper.sendResponse(res, 200, result)
                        //let result="Berhasil Login"
                }else{
                    
                    if(jumlahlogin >= 2)
                    {
                        statusChange = true
                        dtl.changeisLocked(data.emailabuid,statusChange)
                        let result ="3 KALI LOGIN GAGAL, AKUN ANDA TERKUNCI"
                        jumlahlogin = 0;
                        ResponseHelper.sendResponse(res, 404, result)
                    }
                    else{
                        jumlahlogin++;
                        let result="Salah Username atau Password"
                        ResponseHelper.sendResponse(res, 404, result)
                    }      
                    
                }
                
            } 
            else if(items[0] && items[0].is_locked == true && items[0].is_deleted == false){
                
                    // console.log('masih dalam status no')
                jumlahlogin=0;
                let result ="Akun Anda Terkunci"
                ResponseHelper.sendResponse(res,404,result)
            
            }
            else if (items[0] && items[0].is_deleted == true)
            {
                jumlahlogin=0;
                let result ="Akun Anda Tidak Aktif"
                ResponseHelper.sendResponse(res,404,result)
            }
            else
            {
                jumlahlogin=0;
                let result="Salah Username atau Password"
                ResponseHelper.sendResponse(res, 404, result)
                
            }
               
            
        },data.emailabuid)
        
    },
    
}

module.exports = M_addrBook_BL