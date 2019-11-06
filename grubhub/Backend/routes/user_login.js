var express = require('express');
var app = express();
var Buyer  = require('../models/user');
const crypt = require('../crypt');
const jwt = require("jsonwebtoken");
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var kafka = require('kafka-node');
var morgan = require("morgan");

var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../kafka/client');

app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../passport')(passport);
app.use(bodyParser.json());

var router = express.Router();

router.post('/login', function (req, res) {
  console.log("Inside Login Post Request\n");
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  Buyer.find({
    email: email
  }).then((docs) => {
    console.log("Success");
    if (docs.length != 0) {
      console.log(docs);
      var user={
        id:docs.id,
        email:docs.email
      }
      crypt.compareHash(req.body.password, docs[0].password, (err, isMatch  ) => {
        console.log("Comparing passwords");
        console.log(password);
        console.log(docs[0].password);

        if (isMatch) {
          var token = jwt.sign(user, "JonSnow", {
              expiresIn: 10080 // in seconds
          });
          res.values = docs;
          // res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, path: '/' });
          console.log(token);
          // var decoded = jwt_decode(token);
          res.status(200).json({status : 200, success: true, token : token , user :JSON.stringify(docs)})
          // console.log(decoded);
          // res.send(decoded);
          // res.send(JSON.stringify(docs));
          // console.log("successful login")
        }
        else {
         res.status(201).json({
           success: false,
           message : "Authentication Failed , Passwords didn't match"
         })

        }
      },(err)=>{
        console.log("Err0or Occurred")
      })  
    }
  })
});

// router.post('/signup', function (req, res) {
//   console.log("Inside User Signup");

//   kafka.make_request("signup",req.body),function(err,results){
//     console.log("result from kafka backend",results);
//     console.log("in result");
//     console.log("Result ", results, " Error:", err);
//     if (err) {
//       res.send({ status: "error", msg: err });
//     } else {
//       res.send({ status: "success", msg: "success", data: results });
//     }
//       }
// })


router.post('/signup',function(req,res){
  console.log("Inside User Sign up Request\n");

kafka.make_request('signup',req.body, function(err,results){
  console.log('Result from Kafka Backend\n', results);
  if (err){
      console.log(" ERROR");
      console.log("Error in signing up");
      res.sendStatus(400).json({
          status:"error",
          msg:"System Error, Try Again."
      }).end();
  }else if(results == 201){
      console.log(" User already there with email :- ", req.body.email);
      // res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
       res.sendStatus(201).end(JSON.stringify(results));
      }else{
          console.log("Userr created with email :- ", req.body.email);
          // res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
           res.sendStatus(200).end(JSON.stringify(results));
      }
    })
});



// router.post('/signup', function (req, res) {
//   var first_name = req.body.first_name;
//   var last_name = req.body.last_name;
//   var email = req.body.email;
//   var password = req.body.password;
//   var phone = req.body.phone;
//   console.log("Inside signup");
//   console.log(password)
//   crypt.createHash(password, (hash) => {
//     Buyer.create({
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password: hash,
//       phone: phone
//     }, (err, doc) => {
//       if (err) {
//         res.writeHead(201, {
//           'Content-Type': 'text/plain'
//         })
//         res.end("User Creation Failed");
//         console.log("Failed user creation");
//       }
//       else {
//         res.writeHead(200, {
//           'Content-Type': 'text/plain'
//         })
//         res.end("Successfully Created a user");
//         console.log("Creation of user successful:" + doc);
//       }
//     })
//   }, (err) => {
//     console.log("Error occured in crypt:" + err);
//   })
// })




module.exports = router;

