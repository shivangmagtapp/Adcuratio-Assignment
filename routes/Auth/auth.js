var jwt = require('jsonwebtoken');
var key = require("../../config/keys")
module.exports=(req,res,next)=>{
    try{
        var headerToken = req.headers.token
        token = headerToken
        var sec = key.jwtSecret
        jwt.verify(token,sec, (err,data)=>{
            if(err){
                console.log(err)
                res.status(200).json({error:"Authentication Failed"})
            }
            else{
                req.userData=data
                next()
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(200).json({error:"Authentication Failed"})
    }
}