// 'use strict';
var bcrypt = require('bcrypt-nodejs');

var crypt = {};

crypt.createHash = function (data, successCallback, failureCallback) {
    
    bcrypt.genSalt(10, function (err, salt) {
        
        if (err) {
            console.log("error :" +err);
            failureCallback(err);
            return;
        }
        console.log(salt);
        console.log(data);
        bcrypt.hash(data, salt, null, function (err, hash) {
            console.log("success called crypt");
            if (err) {
                console.log("Calling Failed");
                failureCallback(err);
                return;
            }
            console.log("Calling Success");
            successCallback(hash);
        });
    });
};

crypt.compareHash = function (data, encrypted, successCallback, failureCallback) {
    console.log(encrypted);
    console.log(data);
    bcrypt.compare(data, encrypted, function (err, isMatch) {
        if (err) {
            failureCallback(err);
            return;
        }
        console.log("Inside compareHash" + isMatch);
        successCallback(err, isMatch);
    });
};

module.exports = crypt;
