var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb+srv://kiranbijjala94:kiranbijjala@grubhub-nerj4.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },(err) =>{
    
mongoose.connect('mongodb+srv://kiranbijjala94:kiranbijjala@grubhub-nerj4.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },(err) =>{
        if (err) throw err;
    console.log("Connected to MongoDB");
});

module.exports = {mongoose};