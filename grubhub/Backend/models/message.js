var mongoose = require("mongoose");

let message = mongoose.model('message',{   
    owneremail   :   {
        type : String
    },
    orderid:   {
        type : String
    },
    buyeremail:  {
        type : String
    },    
    question : {
        type : String
    },
    reply :  {
        type : String
    }
})

     
module.exports = message;