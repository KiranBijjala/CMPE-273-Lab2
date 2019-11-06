var Menu = require("../../Backend/models/menu");
var mongoose = require("../../Backend/mongoose");
// var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {
console.log('Inside restaurants sections:')
    // console.log("Req Body : ", username + "password : ",password);
    console.log('Req Body : ', msg.restaurant_name)
    // let temp = req.query.restaurant_name
    // // console.log(str);
    Menu
        .distinct("section", {
            // dish_name: req.query.dish_name,
            restaurant_name: msg.restaurant_name
        })
        .then(results => {
            console.log('Successfully fetched section data from DB')
            console.log(results)
            // console.log(JSON.stringify(results[0]));
            // res.writeHead(200, {
            //     'Content-Type': 'application/json'
            // })
            // res.end(JSON.stringify(results))
            callback(null,results);
        })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
            // res.writeHead(400, {
            //     'Content-Type': 'text/plain'
            // })
            // res.end('Error occured while fetching data from DB')
            callback(err,"Error");
        })
}

exports.handle_request = handle_request;