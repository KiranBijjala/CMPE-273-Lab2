var Owner = require("../../Backend/models/owner");
var mongoose = require("../../Backend/mongoose");
var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {

    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var email = msg.email;
    var password = msg.password;
    var restaurant_name = msg.restaurant_name;
    var restaurant_zipcode = msg.restaurant_zipcode;
    var cuisine = msg.cuisine;

    console.log("Inside Owner signup");
    console.log(password)
    crypt.createHash(password, (hash) => {
      Owner.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hash,
        restaurant_name : restaurant_name,
        restaurant_zipcode : restaurant_zipcode,
        cuisine : cuisine
      }, (err, results) => {
        if (err) {
            console.log("Failed user creation");
            callback(err,"Error")
            
        }
        else {
            console.log("Creation of user successful:" + results);
            callback(null,results);
        }
    })
}, (err) => {
    console.log("Error occured in crypt:" + err);
})
}

exports.handle_request = handle_request;
