var Buyer = require("../../Backend/models/user");
var mongoose = require("../../Backend/mongoose");
var crypt = require("../../Backend/crypt");

function handle_request(msg, callback) {
    
console.log("Inside Login Post Request\n");
var email = req.body.email;
var password = req.body.password;
console.log(email);
Buyer.find({
  email: email
}).then((docs) => {
  console.log("Success");
  if (docs.length != 0) {
    console.log(docs);
    var user={
      id:docs.id,
      email:docs.email
    }
    crypt.compareHash(req.body.password, docs[0].password, (err, isMatch  ) => {
      console.log("Comparing passwords");
      console.log(password);
      console.log(docs[0].password);

      if (isMatch) {
        var token = jwt.sign(user, "JonSnow", {
            expiresIn: 10080 // in seconds
        });
        res.values = docs;
        // res.cookie('cookie', email, { maxAge: 900000, httpOnly: false, path: '/' });
        console.log(token);
        // var decoded = jwt_decode(token);
        res.status(200).json({status : 200, success: true, token : token , user :JSON.stringify(docs)})
        // console.log(decoded);
        // res.send(decoded);
        // res.send(JSON.stringify(docs));
        // console.log("successful login")
      }
      else {
       res.status(201).json({
         success: false,
         message : "Authentication Failed , Passwords didn't match"
       })

      }
    },(err)=>{
      console.log("Err0or Occurred")
    })  
  }
})
}

exports.handle_request = handle_request;