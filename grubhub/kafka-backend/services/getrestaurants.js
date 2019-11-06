var Menu = require("../../Backend/models/menu");
var mongoose = require("../../Backend/mongoose");
// var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {
console.log('Inside Kiran restaurants:');
    console.log('Req QUery : ', msg);
    console.log(msg.restaurant_zipcode);
    console.log(msg.dish_name);
    // Menu.find({ dish_name: "req.body.dish_name" });
    Menu.distinct("restaurant_name", {
        dish_name: new RegExp(msg.dish_name, "i"),
        restaurant_zipcode: msg.restaurant_zipcode
    }).then(results => {
        // console.log('Successfully fetched data from DB')
        
        // console.log(JSON.stringify(results));
        // res.writeHead(200, {
        //     'Content-Type': 'application/json'
        // })
        // res.end(JSON.stringify(results))
        callback(null,(results));
        console.log(results)
    })
    .catch(err => {
        console.log('Error occured while fetching data from DB')
        // res.writeHead(400, {
        //     'Content-Type': 'text/plain'
        // })
        // res.end('Error occured while fetching data from DB')
        callback(err,"error");
    })
        
}

exports.handle_request = handle_request;
