const ResponseHelper = require('../Helpers/responseHelper')
const dtl = require('../DataLayer/dt')
const authConfig = require('../Config/auth.config.json')
// const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const md5=require('md5')
let jumlahlogin = 0;
const api = {
    
    read: (req, res, next) => { //res=lempar data ke client
        
        dtl.readData(function(items){    
            ResponseHelper.sendResponse(res, 200, items)
        })       
        
    },
    login: (req, res, next) => {
        console.log("Login") 
        let data=req.body
        
        dtl.readData2(function(items){
            console.log(items[0]) 
            
            if(items[0] && items[0].is_locked == false && items[0].is_deleted == false)
            {  
                
                if(md5(data.passwd) == items[0].passwd ){    
                        let token=jwt.sign(items[0],authConfig.secretkey)
                    
                        delete items[0].passwd
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
                        dtl.changeisLocked(data.username,statusChange)
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
        },data.username)
        
    },
    
}

module.exports = api