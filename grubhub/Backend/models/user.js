var mongoose = require('mongoose');

let Buyer = mongoose.model('Users',{
    first_name : {
        type : String
     },
    last_name : {
         type : String
     },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone : {
        type : Number
     },
    image:{
         type: String
     }

});

module.exports = Buyer;