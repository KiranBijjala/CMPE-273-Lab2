'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Buyer = require("./models/user");

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "JonSnow"
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        Buyer.find({email: jwt_payload.email}, function (res) {
            console.log("JWT PAYLOAD ",jwt_payload);
            var user = res;
            // delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};