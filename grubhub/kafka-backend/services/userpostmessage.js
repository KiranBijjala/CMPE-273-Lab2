var Message = require("../../Backend/models/message");
var mongoose = require("../../Backend/mongoose");


function handle_request(msg, callback) {
    
    console.log("Inside Post Message\n");
    console.log(msg); 
    
    var owneremail = msg.owneremail 
    var orderid = msg.orderid 
    var buyeremail = msg.buyeremail 
    var question = msg.question
    
        new Message({                
            owneremail,
            orderid,
            buyeremail,
            question
            }).save().then((docs)=>{
            console.log("Message Posted : ",docs);
            callback(null,docs);
        },(err)=>{
            console.log("Error in posting message");
            callback(err,"Error");
    })
}

exports.handle_request = handle_request;