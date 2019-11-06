var Buyer = require("../../Backend/models/user");
var mongoose = require("../../Backend/mongoose");
var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {
    console.log("In User Profile handle request");
    console.log(msg);
    Buyer.find({email : msg}).then((docs)=>{
      console.log("In Get Profile Query");
      if (docs) {
                  console.log("Success");
                  console.log(JSON.stringify(docs[0]));
                  callback(null,docs);
                  
              } else {
                  console.log("Unable get data");
                  callback(null,"No profile Found");
              }
  });
}

exports.handle_request = handle_request;
