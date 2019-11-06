var express = require('express');
var app = express();
var Owner = require('../models/owner');
const crypt = require('../crypt');
const jwt = require("jsonwebtoken");
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var kafka = require('kafka-node');
var requireAuth = passport.authenticate('jwt', { session: false });
var kafka = require('../kafka/client');

app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../passport')(passport);
app.use(bodyParser.json());

var router = express.Router();


router.post('/ownerlogin', function (req, res) {
  console.log("Inside Login Post Request\n");
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  Owner.find({
    email: email
  }).then((docs) => {
    console.log("Success");
    if (docs.length != 0) {
      console.log(docs);
      var user = {
        id: docs.id,
        email: docs.email
      }
      crypt.compareHash(req.body.password, docs[0].password, (err, isMatch) => {
        console.log("Comparing passwords");
        console.log(password);
        console.log(docs[0].password);

        if (isMatch) {
          var token = jwt.sign(user, "JonSnow");
          res.values = docs;
          // res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, path: '/' });
          console.log(token);
          // var decoded = jwt_decode(token);

          res.status(200).json({ success: true, token: token, ownerdata: JSON.stringify(docs) })
          // res.send(JSON.stringify(docs));
          // console.log(decoded);
          // res.send(decoded);

          // console.log("successful login")
        }
        else {
          res.status(404).json({
            success: false,
            message: "Authentication Failed , Passwords didn't match"
          })
          // res.end("User Login Failed");
          // console.log("Login Failed");
          // console.log(err);
        }
      }, (err) => {
        console.log("Error Occurred")
      })
    }
  })
});


// router.post('/ownersignup', function (req, res) {
//   var first_name = req.body.first_name;
//   var last_name = req.body.last_name;
//   var email = req.body.email;
//   var password = req.body.password;
//   var restaurant_name = req.body.restaurant_name;
//   var restaurant_zipcode = req.body.restaurant_zipcode;
//   var cuisine = req.body.cuisine;

//   console.log("Inside signup");
//   console.log(password)
//   crypt.createHash(password, (hash) => {
//     Owner.create({
//       first_name: first_name,
//       last_name: last_name,
//       email: email,
//       password: hash,
//       restaurant_name : restaurant_name,
//       restaurant_zipcode : restaurant_zipcode,
//       cuisine : cuisine
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


router.post('/ownersignup',function(req,res){
  console.log("Inside User Sign up Request\n");

kafka.make_request('owner-signup',req.body, function(err,results){
  console.log('Result from Kafka Backend\n', results);
  if (err){
    console.log( " ERROR Occurred");
    res.json({
        status:"error",
        msg:"System Error, Try Again."
    })
}else{
  console.log("Signup for user sent to client");
  res.writeHead(200,{
      'Content-Type' : 'application/json'
      })
      res.end(JSON.stringify(results));
  }
    })
});


module.exports = router;