//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
var mysql = require('mysql');
var cors = require('cors');
app.set('view engine', 'ejs');
var dateformat = require('dateformat');
var mongoose = require ("./mongoose.js");
var crypt = require('./crypt');
var morgan =require('morgan');
var jwt = require('jsonwebtoken');
const fs = require('fs');
// let pool = require('./connection.js')
// console.log("pool:" + pool);
var CONST = require('./const');

var passport = require('passport');
require('./passport')(passport);
var requireAuth = passport.authenticate('jwt',{session: false});
app.use(morgan('dev'));
app.use(passport.initialize());

app.use('/images', express.static('public'))
//use cors to allow cross origin resource sharing
app.use(cors({ origin: CONST.SERVER_URL, credentials: true }));

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_kafka_passport_mongo',
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "main",
  
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', CONST.SERVER_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});


// const storage = multer.diskStorage({
//   destination: './public/profile/',
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname +
//         '_' +
//         Date.now() +
//         path.extname(file.originalname) +
//         '.png'
//     )
//   }
// })

// const upload = multer({
//   storage: storage
// }).single('myImage')



// app.post('/userprofile', function (req, res) {
//   upload(req, res, err => {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with uploading')
//     } else {
//       console.log('Inside upload post call')
//       console.log(req.file.originalname)
//       // console.log(req.file.email);
//       con.query(
//         'UPDATE users SET image = "' +
//           req.file.filename +
//           '" WHERE email = "' +
//           req.file.originalname +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while upating data in DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while upating data in DB')
//           } else {
//             console.log('Updated image.')
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//           }
//         }
//       )
//     }
//   })
// })


app.get('/', function (req, res) {
  console.log("Inside Root Folder");
  res.end("Connected")
});

app.post('/', function (req, res) {
  console.log("Inside Home");
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end("hi");
})


// app.get('/userprofile', function (req, res) {
//   console.log('Inside User Profile')
//   con.query(
//     'Select first_name, last_name, email,phone, password,image from users where email="' +
//       req.query.email+
//       '";',
//     (error, results, fields) => {
//       console.log(req.query.email);
//       if (error) {
        
//         console.log('Error occured while fetching data from DB')
//         res.writeHead(400, {
//           'Content-Type': 'text/plain'
//         })
//         res.end('Error occured while fetching data from DB')
//       } else {
//         console.log('Successfully fetched data from DB')
//         // console.log(JSON.stringify(results[0]));
//         res.writeHead(200, {
//           'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results[0]))
//         console.log(results)
//       }
//     }
//   )
// })


// app.post('/userimage', function (req, res) {
//     console.log('Inside User Image')
//     let filename = null
//     let binaryData = null
//     let base64String = null

//     con.query(
//       'Select image from users where email="' + req.body.email + '";',
//       (error, results, fields) => {
//         if (error) {
//           console.log('Error occured while fetching data from DB.')
//           res.writeHead(400, {
//             'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while fetching data from DB')
//         } else {
//           if (results.length < 1 || results == undefined) {
//             console.log('No records found!')
//           } else {
//             console.log('Found records!')
//             console.log(results)
//             filename = path.resolve(
//               __dirname,
//               './public/profile/' + results[0].image
//             )
//             binaryData = fs.readFileSync(filename)
//             base64String = new Buffer(binaryData).toString('base64')
//             console.log('Successfully fetched data from DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'image/png'
//             })
//             res.end(base64String)
//           }
//         }
//       }
//     )
//   } )
  // console.log('base64: ' + base64String)


// app.post('/update', function (req, res) {
//   console.log("Inside Profile");
//   console.log(req.body);

//   let first_name = req.body.first_name;
//   let last_name = req.body.last_name;
//   let email = req.body.email;
//   let phone = req.body.phone;
//   let password = req.body.password;

//   let sql = "UPDATE users SET first_name = " + mysql.escape(first_name)
//     + ", last_name = " + mysql.escape(last_name)
//     + ", email = " + mysql.escape(email)
//     + ", phone = " + mysql.escape(phone)
//     + ", password = " + mysql.escape(password)
//     + "where email  = " + mysql.escape(email) + ';';

//   console.log(sql + " done");

//   con.query(sql, function (err, result) {
//     if (err) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Error");
//       console.log(err);
//       res.end("Changes failed")
//     }
//     else {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end(" Updated");
//       console.log("updated successfully");
//     }
//   }
//   );
// });

// app.post('/ownerupdate', function (req, res) {
//   console.log("Inside Profile");
//   console.log(req.body);

//   let first_name = req.body.first_name;
//   let last_name = req.body.last_name;
//   let email = req.body.email;
//   let password = req.body.password;
//   let restaurant_name= req.body.restaurant_name;
//   let restaurant_zipcode=req.body.restaurant_zipcode;

//   let sql = "UPDATE owners SET first_name = " + mysql.escape(first_name)
//     + ", last_name = " + mysql.escape(last_name)
//     + ", email = " + mysql.escape(email)
//     + ", password = " + mysql.escape(password)
//     + ", restaurant_name = " + mysql.escape(restaurant_name)
//     + ", restaurant_zipcode = " + mysql.escape(restaurant_zipcode)
//     + "where email  = " + mysql.escape(email) + ';';

//   console.log(sql + " done");

//   con.query(sql, function (err, result) {
//     if (err) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Error");
//       console.log(err);
//       res.end("Changes failed")
//     }
//     else {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end(" Updated");
//       console.log("updated successfully");
//     }
//   }
//   );
// });

// app.get('/ownerprofile', function (req, res) {
//   console.log('Inside Owner Profile')
//   con.query(
//     'Select first_name, last_name, email,cuisine,restaurant_name,restaurant_zipcode, password from owners where email="' +
//       req.query.email +
//       '";',
//     (error, results, fields) => {
//       console.log(req.query.email);
//       if (error) {
//         console.log('Error occured while fetching data from DB')
//         res.writeHead(400, {
//           'Content-Type': 'text/plain'
//         })
//         res.end('Error occured while fetching data from DB')
//       } else {
//         console.log('Successfully fetched data from DB')
//         // console.log(JSON.stringify(results[0]));
//         res.writeHead(200, {
//           'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results[0]))
//       }
//     }
//   )
// })

// app.post('/ownerimage', function (req, res) {
//   console.log('Inside Owners User Image')

//   // console.log(req.body.email);

//   let filename = null
//   let binaryData = null
//   let base64String = null

//   con.query(
//     'Select image from owners where email="' + req.body.email + '";',
//     (error, results, fields) => {
//       if (error) {
//         console.log('Error occured while fetching data from DB.')
//         res.writeHead(400, {
//           'Content-Type': 'text/plain'
//         })
//         res.end('Error occured while fetching data from DB')
//       } else {
//         if (results.length < 1 || results == undefined) {
//           console.log('No records found!')
//         } else {
//           if (results.length < 1 || results == undefined) {
//             console.log('No records found!')
//           } else {
//             console.log(results[0].image)
//             filename = path.resolve(
//               __dirname,
//               './public/profile/' + results[0].image
//             )
//             binaryData = fs.readFileSync(filename)
//             base64String = new Buffer(binaryData).toString('base64')
//             console.log('Successfully fetched data from DB')
//             // console.log(JSON.stringify(results[0]));
//             res.writeHead(200, {
//               'Content-Type': 'image/png'
//             })
//             res.end(base64String)
//           }
//         }
//       }
//     }
//   )
// })

// app.post('/ownerprofile', function (req, res) {
//   upload(req, res, err => {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with uploading')
//     } else {
//       console.log('Inside upload post call')
//       console.log(req.file.originalname)
//       // console.log(req.file.email);
//       con.query(
//         'UPDATE owners SET image = "' +
//           req.file.filename +
//           '" WHERE email = "' +
//           req.file.originalname +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while upating data in DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while upating data in DB')
//           } else {
//             console.log('Updated image.')
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//           }
//         }
//       )
//     }
//   })
// })






// app.get('/restaurants', function (req, res) {
//   console.log('Inside restaurants:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   let query =
//     'SELECT DISTINCT restaurant_name FROM menu WHERE restaurant_zipcode="' +
//     req.query.zipcode +
//     '" and dish_name REGEXP "' +
//     req.query.dish_name +
//     '";'
//   console.log(query)
//   // connection.connect();
//   con.query(query, (error, result, fields) => {
//     if (error) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Please check the email  and password.')
//     } else {
//       console.log('result of query:', result)
//       res.cookie('cookie', result.email, {
//         maxAge: 900000,
//         httpOnly: false,
//         path: '/'
//       })
//       req.session.result = result
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(result))
//     }
//   })
// })



// app.post('/login', function (req, res) {
//   console.log("Inside Login Post Request\n");
//   var email = req.body.email;
//   var password = req.body.password;
//   var sql = "SELECT *  FROM users WHERE email = " +
//     mysql.escape(email) + "and password = " + mysql.escape(password);
//   console.log(sql + " FIRED >>>>>>\n")
//   // pool.getConnection((err, conn) => {
//   //   if (err) {
//   //     console.log(err);
//   //   }
//   //   else {
//     con.query(sql, function (err, result) {
//         if (err) {
//           console.log(err);
//         }
//         else if (result != 0) {
//           console.log(result)
//           res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, path: '/' });
//           req.session.user = result;
//           res.writeHead(200, {
//             'Content-Type': 'text/plain'
//           })
//           res.end(JSON.stringify(result))
//           console.log("Login Successfully");
//         }
//         else {
//           console.log("No user found");
//           res.writeHead(404, {
//             'Content-Type': 'text/plain'
//           })
//           res.end("No user found");
//         }
//       });
//     }
//     // conn.release();
//   )

// app.post('/signup', function (req, res) {
//   console.log("Inside User Signup");
//   console.log("Req Body:" + req.body);
//   console.log(req.body);
//   var now = new Date()

//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
//   con.query(
//     'INSERT INTO users (first_name,last_name,email,password, created, modified) VALUES ("' +
//       req.body.first_name +
//       '","' +
//       req.body.last_name +
//       '","' +
//       req.body.email +
//       '","' +
//       req.body.password +
//       '","' +
//       today +
//       '","' +
//       today +
//       '");',
//     (error, results, fields) => {
//     if (error) {
//       console.log("error ocurred");
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("User already Exists");
//     }
//     else {
//       console.log('The solution is: ', results);
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("User Succesfully Registered");
//     }
//   })
// })

// app.post('/ownersignup', function (req, res) {
//   console.log("Inside Home Login");
//   console.log("Req Body:" + req.body);
//   console.log(req.body);
//   var now = new Date()

//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
//   con.query(
//     'INSERT INTO owners (first_name,last_name,email,password,restaurant_name,restaurant_zipcode,cuisine,created, modified) VALUES ("' +
//       req.body.first_name +
//       '","' +
//       req.body.last_name +
//       '","' +
//       req.body.email +
//       '","' +
//       req.body.password +
//       '","' +
//       req.body.restaurant_name +
//       '","' +
//       req.body.restaurant_zipcode +
//       '","' +
//       req.body.cuisine +
//       '","' +
//       today +
//       '","' +
//       today +
//       '");',
//     (error, results, fields) => {
//     if (error) {
//       console.log("error ocurred");
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("User already Exists");
//     }
//     else {
//       console.log('The solution is: ', results);
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("User Succesfully Registered");
//     }
//   })
// })

// app.post('/ownerlogin', function (req, res) {
//   console.log("Inside Owner Login Post Request\n");
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log(req.body);
//   var sql = "SELECT *  FROM owners WHERE email = " +
//     mysql.escape(email) + "and password = " + mysql.escape(password);

//   con.query(sql, function (err, result) {
//     if (err) {
//       console.log("Error occurred")
//     }
//     else if (result != 0) {
//       console.log(result)
//       res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, path: '/' });
//       req.session.user = result;
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end(JSON.stringify(result))
//     }
//     else {
//       console.log("No user found");
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("No user found");
//     }
//   });
// })

// app.post('/search', function (req, res) {
//   console.log("Searching in Database" + req.body);
//   console.log(req.body);
//   let dish_name = req.body.dish_name;
//   let restaurant_zipcode = req.body.restaurant_zipcode;

//   var sql = "select * from menu where dish_name like '%" + dish_name + "%' and restaurant_zipcode <= "
//     + mysql.escape(restaurant_zipcode);

//   console.log(sql)

//   // pool.getConnection(function(err,con){
//   //     if(err){
//   //         console.log(err);
//   //         res.writeHead(400,{
//   //             'Content-Type' : 'text/plain'
//   //         })
//   //         res.end("Could Not Get Connection Object");
//   //     }else{

//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     if (result != 0) {

//       console.log("Item Found");
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(result));
//       console.log(JSON.stringify(result));
//       console.log(result);
//     }
//     else {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Item not found");
//       console.log("No Item found");
//       console.log(JSON.stringify(result));
//       console.log(result);
//     }
//   })

// })

// app.post('/menuimage', function (req, res) {
//   upload(req, res, err => {
//     if (err) {
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with uploading')
//     } else {
//       console.log('Inside upload post call')
//       console.log(req.file.originalname)
//       // console.log(req.file.email);
//       connection.query(
//         'UPDATE menu SET image = "' +
//           req.file.filename +
//           '" WHERE email = "' +
//           req.file.originalname +
//           '";',
//         (error, results, fields) => {
//           if (error) {
//             console.log('Error occured while upating data in DB')
//             res.writeHead(400, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Error occured while upating data in DB')
//           } else {
//             console.log('Updated image.')
//             res.writeHead(200, {
//               'Content-Type': 'text/plain'
//             })
//             res.end('Successfully Registered')
//           }
//         }
//       )
//     }
//   })
// })

// app.post('/restaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

//   console.log('Req Body : ', req.body)
//   let query =
//     'INSERT INTO menu (dish_name,description , price, section, restaurant_name, restaurant_zipcode, created, modified) VALUES ("' +
//     req.body.dish_name +
//     '","' +
//     req.body.description +
//     '","' +
//     req.body.price +
//     '","' +
//     req.body.section +
//     '","' +
//     req.body.restaurant_name +
//     '","' +
//     req.body.restaurant_zipcode +
//     '","' +
//     today +
//     '","' +
//     today +
//     '");'

//   console.log(query)

//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('User registered sucessfully!')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Successfully Registered')
//     }
//   })
// })

// app.get('/restaurantdetails', function (req, res) {
//   console.log('Inside restaurants details:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.details)
//   let temp = req.query.details
//   var nameArr = temp.split(',')
//   console.log(nameArr)
//   // console.log('typeof'+ typeof(temp));
//   let str = nameArr
//     .map(function (restaurant) {
//       // Wrap each element of the dates array with quotes
//       return "'" + restaurant + "'"
//     })
//     .join(',')
//   // console.log(str);
//     console.log(str);
//   let query =
//     'SELECT image, sections, rating, restaurant_name FROM owners WHERE restaurant_name in (' +
//     str +
//     ');'
//   console.log(query)
//   // connection.connect();
//   con.query(query, (error, result, fields) => {
//     if (error) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('No restaurant details found.')
//     } else {
//       console.log('result of query:', result)
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(result))
//     }
//   })
// })

// app.get('/restaurantsections', function (req, res) {
//   console.log('Inside restaurants sections:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.restaurant_name)
//   let query =
//     'select distinct(section) from menu where restaurant_name="' +
//     req.query.restaurant_name +
//     '";'
//   console.log(query)
//   // connection.connect();
//   con.query(query, (error, result, fields) => {
//     if (error) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('No restaurant details found.')
//     } else {
//       console.log('result of query:', result)
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(result))
//       res.end("success");
//     }
//   })
// })

// app.get('/sectionsmenu', function (req, res) {
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query.restaurant_name)
//   let temp = req.query.restaurant_name
//   // console.log(str);

//   let query =
//     'select * from menu where restaurant_name="' +
//     req.query.restaurant_name +
//     '" and section="' +
//     req.query.section +
//     '";'
//   console.log(query)
//   // connection.connect();
//   con.query(query, (error, result, fields) => {
//     if (error) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('No restaurant details found.')
//     } else {
//       console.log('result of query:', result)
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       res.end(JSON.stringify(result))
//     }
//   })
// })

// app.post('/orderstatus', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query =
//     'UPDATE orders SET order_status = "' +
//     req.body.order_status +
//     '" WHERE order_id = "' +
//     req.body.order_id +
//     '";'

//   console.log(query)

//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('update order status')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Successfully updated order status')
//     }
//   })
// })

// app.post('/restaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

//   console.log('Req Body : ', req.body)
//   let query =
//     'INSERT INTO menu (dish_name,description , price, section, restaurant_name, restaurant_zipcode, created, modified) VALUES ("' +
//     req.body.dish_name +
//     '","' +
//     req.body.description +
//     '","' +
//     req.body.price +
//     '","' +
//     req.body.section +
//     '","' +
//     req.body.restaurant_name +
//     '","' +
//     req.body.restaurant_zipcode +
//     '","' +
//     today +
//     '","' +
//     today +
//     '");'

//   console.log(query)

//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('User registered sucessfully!')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Successfully Registered')
//     }
//   })
// })


// app.post('/userorder', function (req, res) {
//   // Object.keys(req.body).forEach(function(key){
//   //     req.body = JSON.parse(key);
//   // });
//   // var username = req.body.username;
//   // var password = req.body.password;
//   console.log('Inside user order Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   var now = new Date()

//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

//   // var date = new Date().getDate(); //Current Date
//   //   var month = new Date().getMonth() + 1; //Current Month
//   //   var year = new Date().getFullYear();
//   //   var today= year+'-'+(month>9? '':0)+month +'-'+(date>9? '':0)+date;
//   // console.log(today.toISOString().substring(0, 10));
//   let query =
//     "INSERT INTO orders (orderlist, total, user_email, restaurant_name, order_status,created, modified ) VALUES ('" +
//     req.body.order +
//     "','" +
//     req.body.total +
//     "','" +
//     req.body.user_email +
//     "','" +
//     req.body.restaurant_name +
//     "','" +
//     'New' +
//     "','" +
//     today +
//     "','" +
//     today +
//     "');"
//   console.log(query)
//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB' + error)
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('User registered sucessfully!')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Successfully Ordered')
//     }
//   })
// })

// app.get('/orderlist', function (req, res) {
//   console.log('Inside user order list:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   let query =
//     'SELECT * FROM orders WHERE ' +
//     req.query.person +
//     '="' +
//     req.query.email +
//     '" and order_status in ("Preparing", "Ready", "New");'
//   console.log(query)
//   // connection.connect();
//   con.query(query, (error, result, fields) => {
//     if (error) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with the user info.')
//     } else {
//       console.log('result of query:', result)
//       req.session.result = result
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       console.log(JSON.stringify(result))
//       res.end(JSON.stringify(result))
//     }
//   })
// })

// app.get('/pastorderlist', function (req, res) {
//   console.log('Inside user order list:')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.query)
//   let query =
//     'SELECT * FROM orders WHERE ' +
//     req.query.person +
//     '="' +
//     req.query.email +
//     '" and order_status in ("Delivered","Cancel");'
//   console.log(query)
//   // connection.connect();
//   con.query(query, (error, result, fields) => {
//     if (error) {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Issue with the user info.')
//     } else {
//       console.log('result of query:', result)
//       req.session.result = result
//       res.writeHead(200, {
//         'Content-Type': 'application/json'
//       })
//       console.log(JSON.stringify(result))
//       res.end(JSON.stringify(result))
//     }
//   })
// })


// app.post('/deletedish', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query =
//     'Delete from menu WHERE id = "' +
//     req.body.id +
//     '";'

//   console.log(query)

//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('deleted dish from menu!')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Deleted dish from menu!')
//     }
//   })
// })

// app.post('/deletesection', function (req, res) {
//   console.log('Inside restaurant order status Post Request')
//   // console.log("Req Body : ", username + "password : ",password);
//   console.log('Req Body : ', req.body)
//   let query =
//     'Delete from menu WHERE section = "' +
//     req.body.section +
//     '";'

//   console.log(query)

//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('deleted section from menu!')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Deleted section from menu!')
//     }
//   })
// })

// app.post('/updaterestaurantmenu', function (req, res) {
//   console.log('Inside restaurant menu Post Request')
//   // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

//   console.log('Req Body : ', req.body)

//   let query =
//     'UPDATE menu SET dish_name = "' +
//     req.body.dishname +
//     '", description = "' +
//     req.body.description +
//     '", price = ' +
//     req.body.price +
//     ', section = "' +
//     req.body.section +
//     '", modified = "' +
//     today+
//     '" WHERE id = "' +
//     req.body.id +
//     '";'

//   console.log(query)

//   con.query(query, (error, results, fields) => {
//     if (error) {
//       console.log('Error occured while inserting data in DB')
//       res.writeHead(400, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Error occured while inserting data in DB')
//     } else {
//       console.log('User registered sucessfully!')
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end('Successfully Registered')
//     }
//   })
// })


// app.get('/menudetails', function (req, res) {
//   console.log('Inside User Profile')

//   // console.log(req.query.email)
//   con.query(
//     'Select * from menu where id="' +
//       req.query.id +
//       '";',
//     (error, results, fields) => {
//       if (error) {
//         console.log('Error occured while fetching data from DB')
//         res.writeHead(400, {
//           'Content-Type': 'text/plain'
//         })
//         res.end('Error occured while fetching data from DB')
//       } else {
//         console.log('Successfully fetched data from DB')
//         // console.log(JSON.stringify(results[0]));
//         res.writeHead(200, {
//           'Content-Type': 'application/json'
//         })
//         res.end(JSON.stringify(results[0]))
//       }
//     }
//   )
// })

app.use(require("./routes/user_login"));
app.use(require("../Backend/routes/user_profile"));
app.use(require("../Backend/routes/owner_login"));
app.use(require("../Backend/routes/owner_profile"));
app.use(require("../Backend/routes/cart"));
app.use(require("../Backend/routes/menu"));
app.use(require("../Backend/routes/message"));

// app.use(require('../Backend/routes/orders'))
//start your server on port 3001
app.listen(CONST.LOCAL_PORT);
console.log("Server Listening on port 3001");