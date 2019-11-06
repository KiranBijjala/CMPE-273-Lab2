var Menu = require("../../Backend/models/menu");
const mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log('Inside restaurant menu Post Request')
    // console.log("Req Body : ", username + "password : ",password);

    // var now = new Date()
    // var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
    var id = mongoose.Types.ObjectId()
    // console.log('Req Body : ', req.body)

    let menu = new Menu
        ({
            _id: id,
            dish_name: msg.dish_name,
            description: msg.description,
            price: msg.price,
            section: msg.section,
            restaurant_name: msg.restaurant_name,
            restaurant_zipcode: msg.restaurant_zipcode,
            image : msg.image
        })
    menu
        .save()
        .then(response => {
            console.log('Restaurant Menu response:' + response)
            // res.writeHead(200, {
            //     'Content-Type': 'text/plain'
            // })
            // res.end('Successfully Registered')
            callback(null,response);
        })
        .catch(err => {
            console.log('Error occured while inserting data in DB' + err)
            // res.writeHead(400, {
            //     'Content-Type': 'text/plain'
            // })
            // res.end('Error occured while inserting data in DB')
            callback(err,"Error");
        })
}

exports.handle_request = handle_request;