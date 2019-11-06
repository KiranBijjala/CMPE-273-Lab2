var Buyer = require("../../Backend/models/user");
var mongoose = require("../../Backend/mongoose");
var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {

    console.log("\nIn User Sign Up handle request\n");
    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var email = msg.email;
    var password = msg.password;
    var phone = msg.phone;
    console.log("Inside signup");
    console.log(password)
    crypt.createHash(password, (hash) => {
        Buyer.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hash,
            phone: phone
        }, (err, doc) => {
            if (err) {
                console.log("Failed user creation");
                callback(err,"Error")
            }
            else {
                console.log("Creation of user successful:" + doc);
                callback(null,doc);
            }
        })
    }, (err) => {
        console.log("Error occured in crypt:" + err);
    })
}

exports.handle_request = handle_request;


