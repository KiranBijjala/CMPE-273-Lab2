var express = require('express');
var app = express();
var Owner  = require('../models/owner');
const crypt = require('../crypt');
var bodyParser = require('body-parser');
var ownerupload = require('../multer_owner');
const fs = require('fs');
var kafka = require('../kafka/client');

app.use(bodyParser.json());

var router = express.Router();

router.get('/ownerprofile', function (req, res) {
    console.log("In Get Profile Query");
    console.log(req.query.email);
    Owner.find({ email: req.query.email }).then((docs) => {
        console.log("In Get Profile Query");
        if (docs) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            // console.log(docs);
            console.log("SUccess");
            console.log(JSON.stringify(docs[0]));
            res.end(JSON.stringify(docs[0]));

        } else {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Unable to get data");
            console.log("Unable get data");
        }
    })
})

router.post('/ownerprofile', function (req, res) {
    ownerupload(req, res, err => {
      if (err) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end('Issue with uploading')
      } else {
        console.log('Inside upload post call')
        console.log(req.file.originalname)
        // console.log(req.file.email);
        Owner
          .update(
            { email: req.file.originalname },
            { $set: { image: req.file.filename } }
          )
          .then(response => {
            console.log('response' + response)
            console.log('Updated image.')
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            })
            res.end('Successfully Registered')
          })
          .catch(err => {
            console.log('Error occured while upating data in DB')
            res.writeHead(400, {
              'Content-Type': 'text/plain'
            })
            res.end('Error occured while upating data in DB')
          })
      }
    })
  })


router.post('/ownerimage', function (req, res) {
    console.log('Inside Owner Image')
    let filename = null
    let binaryData = null
    let base64String = null
    console.log(req.body.email);
    Owner
      .find({
        email: req.body.email
      })
      .then(results => {
        if (
          results[0].image === null ||
          results[0].image === [] ||
          typeof results[0].image === 'undefined'
        ) {
          console.log('No records found!')
        } else {
          console.log(results[0].image)
          console.log(__dirname.split('/routes')[0] + '/public/ownerprofile/' + results[0].image);

            // filename = path.resolve(
            //               __dirname,
            //               './public/profile/' + results[0].image
            //             )
            //             binaryData = fs.readFileSync(filename)
            //             base64String = new Buffer(binaryData).toString('base64')
            //             console.log('Successfully fetched data from DB')

          binaryData = fs.readFileSync(
            __dirname.split('/routes')[0] + '/public/ownerprofile/' + results[0].image
          )
          console.log(binaryData);
          base64String = new Buffer(binaryData).toString('base64')
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


router.post('/ownerupdate', function (req, res) {
    console.log("Inside Update Post Request\n");
    let data = req.body;
    console.log(req.body.restaurant_zipcode);
    console.log(data.email);
    let password = data.password;
    crypt.createHash(password, (hash) => {
        Owner.findOneAndUpdate({ email: data.email },
            {
                $set: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    password: hash,
                    restaurant_name: data.restaurant_name,
                    restaurant_zipcode: data.restaurant_zipcode,
                    cuisine: data.cuisine
                }
            }, { new: true }).then((docs) => {
                console.log("In Update Profile Query");
                if (!docs) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unable to get data");
                    console.log("Unable get data");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful");
                    console.log(password);
                    console.log("Successful updated");
                    console.log("Document Updated : ", docs);

                }

            });
    })
});

router.get('/restaurantdetails', function (req, res) {
  console.log('Inside restaurants details:');
  console.log('Req Body : ', req.query.details);
  let temp = req.query.details;
  var nameArr = temp.split(',');
  console.log(nameArr);

  let str = nameArr;
  console.log(JSON.stringify(str));
  Owner.find({ restaurant_name: { $in: str } }).then((docs) => {
      console.log("In Get restaurant details Query");
      if (docs) {
          res.writeHead(200, {
              'Content-Type': 'text/plain'
          })
          // console.log(docs);
          console.log("Success");
          console.log(JSON.stringify(docs));
          res.end(JSON.stringify(docs));

      } else {
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Unable to get data");
          console.log("Unable get data");
      }
  });
});

// router.get('/restaurantdetails', function (req, res) {
//   console.log("Restaurants");
//   let temp = req.query.details;
//   console.log(temp);
//   kafka.make_request("restaurant-details", temp, function(err,results){
//     console.log('Result from Kafka Backend\n', results);
//     if (err){
//         console.log(" ERROR Occurred");
//         res.json({
//             status:"error",
//             msg:"System Error, Try Again."
//         })
//     }else{
//         res.writeHead(200,{
//             'Content-Type' : 'application/json'
//             })
//             res.end(JSON.stringify(results));
//         }
// });

// })

module.exports = router;