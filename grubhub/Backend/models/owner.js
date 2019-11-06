var mongoose = require('mongoose');

let Owner = mongoose.model('Owner',{
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
    restaurant_name : {
        type : String
    },
    restaurant_zipcode : {
        type : Number
    },
    cuisine : {
        type : String
    },
    image:{
         type: String
     }

});

module.exports = Owner;