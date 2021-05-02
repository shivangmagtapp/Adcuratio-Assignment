var express = require('express');
var router = express.Router();
var keys = require("../config/keys")
var bcrypt = require("bcryptjs");
const registerModel = require("./models/register")
const rateModel = require("./models/exchangeRates")
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var jwtAuth = require('./Auth/auth')
mongoose.connect(keys.mongoConnection, {useNewUrlParser: true});
/* GET home page. */
router.get('/',jwtAuth, function(req, res, next) {
  res.status(200).send("Running!");
});

router.post('/api/register', function(req, res, next) {
  console.log("here")
  console.log(req.body)
  registerModel.find({email:req.body.email}).exec(function(err,data){
    if(data.length===0){
      bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(req.body.password , salt , (err , hash)=> {
            if(err){
                error.bcrypt="Password was not hashed";
                return res.status(400).json({error:"error"})
            } else{
              var details = new registerModel({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            details.save(function(err,res2){
              if(err){
                console.log(err)
                res.status(200).json({error:"Something went wrong!"})
              }
              else{
                res.status(200).send("Saved!");
              }
            })
          }
        })
      })
    }
    else{
      res.status(200).json({error:"Email Aready Exists!"})
    }
  })
  
});


router.post('/api/login', function(req, res, next) {
  console.log("here")
  console.log(req.body)
  registerModel.find({email:req.body.email}).exec(function(err,data){
    console.log(data[0])
    if(data.length===0){
      res.status(200).json({error:"Email Not exists"})
    }
    else{
      bcrypt.compare(req.body.password , data[0].password).then(isMatch => {
        if(isMatch){
          jwt.sign({ email: req.body.email, UserId: data[0]._id, name:data[0].name }, keys.jwtSecret,{expiresIn:"1d"}, function(err, token) {
            if(err){
              console.log(err)
            }
            else{
            res.status(200).json({error:"", token:token});
            }
          })
        }
        else{
          res.status(200).json({error:"Password is wrong"})
        }

      })
    }
  })
})

router.post('/api/save',jwtAuth, function(req, res, next) {
  var details = new rateModel({
    from: req.body.from,
    to: req.body.to,
    rate: req.body.rate,
  });
  details.save(function(err,res2){
    if(err){
      console.log(err)
      res.status(200).json({error:"Something went wrong!"})
    }
    else{
    res.status(200).json({error:"",msg:"Added"})
   }
  })
})

router.post('/api/get/data',jwtAuth, function(req, res, next) {
  rateModel.find({from:req.body.from,to:req.body.to}).exec(function(err,data){
  console.log(data)
  if(err){
    console.log(err)
  }
  else{
    res.status(200).json({data:data,error:''})
  }
  })
})

router.post('/api/edit',jwtAuth, function(req, res, next) {
  rateModel.updateOne({_id:req.body.id},{$set:{rate:req.body.rate}}).exec(function(err,data){
    if(err){
      console.log(err)
      res.status(200).json({error:"Something went wrong!"})
    }
    else{
    res.status(200).json({error:"",msg:"Updated"})
   }
  })
})

router.post('/api/convert',jwtAuth, function(req, res, next) {
  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var date = new Date().getDate()
  rateModel.find({from:req.body.from,to:req.body.to,date:{$gte: new Date(year,month,date-1)}}).exec(function(err,data){
  console.log(data)
  if(err){
    console.log(err)
  }
  else{
    res.status(200).json({data:data,error:''})
  }
  })
})
module.exports = router;
