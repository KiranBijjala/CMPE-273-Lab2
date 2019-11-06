var Buyer = require("../../Backend/models/user");
var mongoose = require("../../Backend/mongoose");
var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {
    console.log("Inside Update Post Request\n");
    console.log(msg.email);
    let password = msg.password;
    crypt.createHash(password, (hash) => {
        Buyer.findOneAndUpdate({ email: msg.email },
            {
                $set: {
                    first_name: msg.first_name,
                    last_name: msg.last_name,
                    password: hash,
                    phone: msg.phone
                }
            }, { new: true }).then((docs) => {
                console.log("In Update Profile Query");
                if (!docs) {
                    console.log("Unable to update the data");
                    callback(null,"Unable to update the data");
                } else {
                    console.log(password);
                    console.log("Successful updated");
                    console.log("Document Updated : ", docs);
                    callback(null,docs);

                }

            });
    })
}

exports.handle_request = handle_request;