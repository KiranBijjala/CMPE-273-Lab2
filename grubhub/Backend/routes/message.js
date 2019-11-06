
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("../mongoose");
var  Message  = require("../models/message");
var morgan = require('morgan');
var kafka = require('../kafka/client');
app.use(morgan('dev'));

app.use(bodyParser.json());

const router = express.Router()

// router.post('/PostMessage', function(req,res){
//     console.log("Inside Post Message\n");
//     console.log(req.body); 
    
//     var owneremail = req.body.owneremail 
//     var orderid = req.body.orderid 
//     var buyeremail = req.body.buyeremail 
//     var question = req.body.question
    
//         new Message({                
//             owneremail,
//             orderid,
//             buyeremail,
//             question
//             }).save().then((docs)=>{
//             console.log("Message Posted : ",docs);
//         },(err)=>{
//             console.log("Error in posting message");
//     })
// });

router.post('/PostMessage', function(req,res){
    console.log("In Post Message Request");
    kafka.make_request("post-message", req.body, function (err, results) {
        console.log('Result from  Post Message Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

})

// router.get('/GetMessage',function(req,res){
//     console.log("Inside get message ");
//     var email = req.query.id;                       

//     console.log(email);
//     Message.find({
//         owneremail : email
// }).then((data)=>{
//     console.log(data);    
//     if(data.length!=0){
//         res.writeHead(200,{
//             'Content-Type' : 'application/json'
//             })
//             res.end(JSON.stringify(data));        
//     }
// })    
// });

router.get('/GetMessage',function(req,res){
    console.log("Inside Get Message request");
    kafka.make_request("get-message", req.body, function (err, results) {
        console.log('Result from  Post Message Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })

})

router.post('/ReplyMessage', function(req,res){
    console.log("Inside Reply Message\n");
    console.log(req.body); 
    
    var id = req.body.id
    var reply = req.body.reply
    
    Message.findOne({
            _id: id
    }).then((data)=>{
        console.log(data);  
        // console.log(data.length);  
        if(data.length!=0){                 //got message then reply 
            Message.findOneAndUpdate({_id : id},    //where condition
                { $set : {reply : reply}}).then((result)=>{
                if(result!= undefined){
                    console.log("\n Replied Successfully !!\n\n",result)
                    res.status(200).json({success: true, message :  "Replied Successfully" });
                }else{
                    console.log("Error in replying :( ",result);
                    res.status(200).json({success: true, message :  "Replied Successfully" });                    
                }
            })
           } 
           else{
            console.log("No Message Found")
            res.status(202).json({success: false, message :  "No Message Found" });

        }
    })
});


router.get('/GetReply',function(req,res){
    console.log("Inside get reply ");
    var email = req.query.id;                       

    console.log(email);
    Message.find({
        buyeremail : email
}).then((data)=>{
    console.log(data);    
    if(data.length!=0){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(data));
        
    }
})    //end of then    
})

module.exports = router;
