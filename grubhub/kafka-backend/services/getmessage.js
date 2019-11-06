var Message = require("../../Backend/models/message");
var mongoose = require("../../Backend/mongoose");

function handle_request(msg, callback) {
    console.log("Inside get message ");
    var email = msg.id;                       

    console.log(email);
    Message.find({
        owneremail : email
}).then((data)=>{
    console.log(data);    
    if(data.length!=0){
        // res.writeHead(200,{
        //     'Content-Type' : 'application/json'
        //     })
        //     res.end(JSON.stringify(data));        
        callback(null,data);
    }
})    
}

exports.handle_request = handle_request;