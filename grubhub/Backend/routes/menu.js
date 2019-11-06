
var express = require('express');
var app = express();
var Menu = require('../models/menu');
var Owner = require('../models/owner');
// const crypt = require('../crypt');
// const jwt = require("jsonwebtoken");
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var kafka = require('kafka-node');
var morgan = require("morgan");
var dateformat = require('dateformat');
// var requireAuth = passport.authenticate('jwt', { session: false });
var kafka = require('../kafka/client');
var mongoose = require('mongoose');
var uploadmenu = require('../multermenu');
app.use(morgan('dev'));
//require('./app/routes')(app);
app.use(passport.initialize());
// var menu = require('../models/menu');
// Bring in defined Passport Strategy
require('../passport')(passport);
app.use(bodyParser.json());
const fs = require('fs')
var router = express.Router();

// router.post('/restaurantmenu', function (req, res) {
//     console.log('Inside restaurant menu Post Request')
//     // console.log("Req Body : ", username + "password : ",password);

//     var now = new Date()
//     var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
//     var id = mongoose.Types.ObjectId()
//     console.log('Req Body : ', req.body)

//     let menu = new Menu
//         ({
//             _id: id,
//             dish_name: req.body.dish_name,
//             description: req.body.description,
//             price: req.body.price,
//             section: req.body.section,
//             restaurant_name: req.body.restaurant_name,
//             restaurant_zipcode: req.body.restaurant_zipcode
//         })
//     menu
//         .save()
//         .then(response => {
//             console.log('response' + response)
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//         })
//         .catch(err => {
//             console.log('Error occured while inserting data in DB' + err)
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while inserting data in DB')
//         })
// })

router.post('/restaurantmenu', function (req, res) {
    console.log("Inside Restaurant Menu");
    kafka.make_request("restaurant-menu", req.body, function (err, results) {
        console.log('Result from  Search Kafka Backend\n', results);
        if (err) {
            res.send({ status: "error", msg: err });
        } else {
            res.send({ status: "success", msg: "success", data: results });
        }
    })
})

router.post('/updatemenuimage', function (req, res) {
    uploadmenu(req, res, err => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            })
            res.end('Issue with uploading')
        } else {
            console.log('Inside upload post call')
            // console.log(req.file.email);

            // console.log(id);
            console.log(req.file);
    console.log(req.file.originalname);
            // console.log(id);
            Menu
                .updateOne(
                    { _id: req.file.originalname},
                    { $set: { image: req.file.filename } }
                )
                .then(response => {
                    console.log(response)
                    console.log('Updated image.')
                    
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('Successfully Registered')
                })
                .catch(err => {
                    console.log('Error while upating data in DB')
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('Error')
                })
        }
    })
})

router.post('/menuimage', function (req, res) {
    console.log('Inside Menu Image')
    let filename = null
    let binaryData = null
    let base64String = null
  
    Menu
      .find({
        _id: req.body.id
      })
      .then(results => {
        // let query= res[0].image;
        if (
          results[0].image === null ||
          results[0].image === [] ||
          typeof results[0].image === 'undefined'
        ) {
          console.log('No records found!')
        } else {
          console.log(results[0].image)
          console.log(__dirname.split('/routes')[0] + '/public/menuprofile/' + results[0].image);
          binaryData = fs.readFileSync(
            __dirname.split('/routes')[0] + '/public/menuprofile/' + results[0].image
          )
          console.log(binaryData);
          base64String = new Buffer(binaryData).toString('base64')

        // filename = path.resolve(
        //                   __dirname,
        //                   './public/menuprofile/' + results[0].image
        //                 )
        //                 binaryData = fs.readFileSync(filename)
        //                 base64String = new Buffer(binaryData).toString('base64')
        //                 console.log('Successfully fetched data from DB')
          console.log('Successfully fetched data from DB')
          console.log(JSON.stringify(results[0]));
          res.writeHead(200, {
            'Content-Type': 'image/png'
          })
          res.end(base64String)
        }
      })
      .catch(err => {
        console.log('Error occured while fetching data from DB.')
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Error occured while fetching data from DB')
      })
  })

// router.get('/restaurants', function (req, res) {
//     console.log('Inside Kiran restaurants:');
//     console.log('Req Body : ', req.query);
//     console.log(req.query.restaurant_zipcode);
//     console.log(req.query.dish_name);
//     // Menu.find({ dish_name: "req.body.dish_name" });
//     Menu.distinct("restaurant_name", {
//         dish_name: new RegExp(req.query.dish_name, "i"),
//         restaurant_zipcode: req.query.restaurant_zipcode
//     }).then(results => {
//         console.log('Successfully fetched data from DB')

//         console.log(JSON.stringify(results));
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results))
//         console.log(results)
//     })
//     .catch(err => {
//         console.log('Error occured while fetching data from DB')
//         res.writeHead(400, {
//             'Content-Type': 'text/plain'
//         })
//         res.end('Error occured while fetching data from DB')
//     })

// })


// router.post('/search', function (req, res) {
//     console.log('Inside restaurants:')
//     // console.log("Req Body : ", username + "password : ",password);
//     console.log('Req Body : ', req.query)
//     Menu
//         .distinct("restaurant_name", {
//             dish_name: new RegExp(req.query.dish_name, "i"),
//             restaurant_zipcode: req.query.restaurant_zipcode
//         })
//         .then(results => {
//             console.log('Successfully fetched data from DB')

//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results))
//             console.log(results)
//         })
//         .catch(err => {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//         })
// })

router.get('/restaurants', function (req, res) {
    console.log('Inside search restaurants:')
    var msg = req.query;
    // console.log("Req Body : ", username + "password : ",password);
    kafka.make_request("get-restaurants", msg, function (err, results) {
        console.log('Result from  Search Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            // console.log("Profile for user " + email +" sent to client");
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end((JSON.stringify(results)));
        }
    });
})


// router.get('/restaurantsections', function (req, res) {
//     console.log('Inside restaurants sections:')
//     // console.log("Req Body : ", username + "password : ",password);
//     console.log('Req Body : ', req.query.restaurant_name)
//     let temp = req.query.restaurant_name
//     // console.log(str);
//     Menu
//         .distinct("section", {
//             // dish_name: req.query.dish_name,
//             restaurant_name: req.query.restaurant_name
//         })
//         .then(results => {
//             console.log('Successfully fetched section data from DB')
//             console.log(results)
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results))
//         })
//         .catch(err => {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//         })
// })

router.get('/restaurantsections', function (req, res) {
    console.log("Inside Restaurant Sections");
    let temp = req.query;
    console.log(temp);
    kafka.make_request("restaurant-sections", temp, function (err, results) {
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

router.get('/sectionsmenu', function (req, res) {
    console.log("Inside Restaurant Sections");
    let temp = req.query;
    console.log(temp);
    kafka.make_request("sections-menu", temp, function (err, results) {
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

// router.get('/sectionsmenu', function (req, res) {
//     // console.log("Req Body : ", username + "password : ",password);
//     console.log('Inside sections menu:')
//     console.log('Req Body : ', req.query.restaurant_name, req.query.section)
//     let temp = req.query.restaurant_name
//     // console.log(str);
//     Menu
//         .find({
//             restaurant_name: req.query.restaurant_name,
//             section: req.query.section
//         })
//         .then(results => {
//             console.log('Successfully fetched data from DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             //   delete results[0].password;
//             res.end(JSON.stringify(results))
//         })
//         .catch(err => {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//         })
// })

// router.post('/updaterestaurantmenu', function (req, res) {

//     var now = new Date()
//     var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

//     console.log('Req Body : ', req.body)
//     Menu.update(
//         { _id: req.body.id },
//         {
//             $set: {
//                 dish_name: req.body.dishname,
//                 description: req.body.description,
//                 price: req.body.price,
//                 section: req.body.section,
//             }
//         }).then(results => {
//             console.log('Successfully fetched data from DB')
//             console.log(JSON.stringify(results));
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             //   delete results[0].password;
//             res.end(JSON.stringify(results))
//         })
//         .catch(err => {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//         })

// })

router.post('/updaterestaurantmenu', function (req, res) {
    kafka.make_request("update-restaurantmenu", req.body, function (err, results) {
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

// router.post('/deletedish', function (req, res) {
//     console.log("Inside delete dish request");
//     console.log(req.body);

//     Menu.deleteOne({
//         _id: req.body.id
//     }).then(results => {
//         console.log('Successfully fetched data from DB')
//         console.log(JSON.stringify(results));
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         //   delete results[0].password;
//         res.end(JSON.stringify(results))
//     })
//         .catch(err => {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//         })
// })

router.post('/deletedish', function (req, res) {
    kafka.make_request("delete-dish", req.body, function (err, results) {
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

router.post('/deletesection', function (req, res) {
    kafka.make_request("delete-section", req.body, function (err, results) {
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

// router.post('/deletesection', function (req, res) {
//     console.log("Inside delete section request");
//     console.log(req.body);

//     Menu.deleteMany({

//         section: req.body.section
//     }).then(results => {
//         console.log('Successfully fetched data from DB')
//         console.log(JSON.stringify(results));
//         res.writeHead(200, {
//             'Content-Type': 'application/json'
//         })
//         //   delete results[0].password;
//         res.end(JSON.stringify(results))
//     })
//         .catch(err => {
//             console.log('Error occured while fetching data from DB')
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while fetching data from DB')
//         })
// })

// router.post('/menudetails', function (req, res) {
//     kafka.make_request("menu-details", req.query, function (err, results) {
//         console.log('Result from  Search Kafka Backend\n', results);
//         if (err) {
//             console.log(" ERROR Occurred");
//             res.json({
//                 status: "error",
//                 msg: "System Error, Try Again."
//             })
//         } else {
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//         }
//     })
// })

router.get('/menudetails', function (req, res) {
    console.log('Inside  menu Details:')
    console.log(req.query.id);

    Menu
        .find({
            _id: req.query.id,
            // section: req.query.section
        })
        .then(results => {
            console.log('successful DB')
            // console.log(JSON.stringify(results[0]));
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            //   delete results[0].password;
            res.end(JSON.stringify(results[0]))
        })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Error occured while fetching data from DB')
        })
})



module.exports = router;