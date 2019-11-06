
var express = require('express');
var app = express();
var Menu  = require('../models/menu');
const crypt = require('../crypt');
const jwt = require("jsonwebtoken");
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var kafka = require('kafka-node');
var morgan = require("morgan");
var dateformat = require('dateformat');
var mongoose = require('mongoose');
var requireAuth = passport.authenticate('jwt', {session: false});
var kafka = require('../kafka/client');
var Order = require('../models/orders')
app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../passport')(passport);
app.use(bodyParser.json());

var router = express.Router();

// router.post('/userorder', function (req, res) {
//   console.log('Inside user order Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
//   var id = mongoose.Types.ObjectId()
//   console.log('Req Body : ', req.body)

//   let order = new Order
//       ({
//           order_id: id,
//           orderlist : req.body.order,
//           total : req.body.total,
//           user_email : req.body.user_email,
//           restaurant_name : req.body.restaurant_name,
//           order_status : 'New',
          
//       })
//   order
//       .save()
//       .then(response => {
//           console.log('response' + response)
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           })
//           res.end('Successfully Registered')
//       })
//       .catch(err => {
//           console.log('Error occured while inserting data in DB' + err)
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while inserting data in DB')
//       })
// })

router.post('/userorder', function (req, res) {
    console.log("Inside User order request");

    kafka.make_request("user-order", req.body, function (err, results) {
        console.log('Result from  Search Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

})

router.get('/orderlist', function (req, res) {
    console.log("Inside Order list request");
    console.log(req.query);
    kafka.make_request("list-order", req.query, function (err, results) {
        console.log('Result from  Search Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

})

// router.get('/orderlist', function (req, res) {
//   console.log("Inside Order List");
//   console.log('Req Body : ', req.query)
//   let str = ["Preparing","Ready" ,"New"];
//   // console.log(str);
//   let email = req.query.email;
//   let person = req.query.person;
//   let order = 'order_status';
//   let query = {};
  
//   query[person] = email;
//   query[order] = {"$in" : str}
//   console.log(query);
//   Order
//       .find( query,     
//       )
//       .then(results => {
//           console.log('Successfully fetched data from DB')
//           console.log(JSON.stringify(results));
//           res.writeHead(200, {
//               'Content-Type': 'application/json'
//           })
//           res.end(JSON.stringify(results))
//       })
//       .catch(err => {
//           console.log('Error occured while fetching data from DB')
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while fetching data from DB')
//       })
// })

// router.get('/pastorderlist', function (req, res) {
//   console.log("Inside Past Order List");
//   console.log('Req Body : ', req.query)
//   let str = ["Delivered","Cancel"];
//   // console.log(str);
//   let email = req.query.email;
//   let person = req.query.person;
//   let order = 'order_status';
//   let query = {};
  
//   query[person] = email;
//   query[order] = {"$in" : str}
//   console.log(query);
//   Order
//       .find( query,     
//       )
//       .then(results => {
//           console.log('Successfully fetched data from DB')
//           console.log(JSON.stringify(results));
//           res.writeHead(200, {
//               'Content-Type': 'application/json'
//           })
//           //   delete results[0].password;
//           res.end(JSON.stringify(results))
//       })
//       .catch(err => {
//           console.log('Error occured while fetching data from DB')
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while fetching data from DB')
//       })
// })

router.get('/pastorderlist', function (req, res) {
    console.log("Inside Order list request");
    console.log(req.query);
    kafka.make_request("pastlist-order", req.query, function (err, results) {
        console.log('Result from  Past Order Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

})

// router.post('/orderstatus', function (req, res) {
//   console.log("Order Status");
//   console.log(req.body);
//   Order.update(
//      {order_id  : req.body.order_id },
//      {$set: {
//       order_status : req.body.order_status
//     }
//   }
    
//   ).then(results => {
//       console.log('Successfully fetched data from DB')
//       console.log(JSON.stringify(results));
//       res.writeHead(200, {
//           'Content-Type': 'application/json'
//       })
//       //   delete results[0].password;
//       res.end(JSON.stringify(results))
//   })
//   .catch(err => {
//       console.log('Error occured while fetching data from DB')
//       res.writeHead(400, {
//           'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while fetching data from DB')
//   })
// }) 

router.post('/orderstatus', function (req, res) {
    console.log("Inside Order list request");
    console.log(req.body);
    kafka.make_request("order-status", req.body, function (err, results) {
        console.log('Result from  Past Order Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

})
module.exports = router;