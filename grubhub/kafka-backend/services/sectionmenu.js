var Menu = require("../../Backend/models/menu");
var mongoose = require("../../Backend/mongoose");


function handle_request(msg, callback) {
console.log('Inside sections menu:')
    // console.log('Req Body : ', req.query.restaurant_name, req.query.section)
    // let temp = req.query.restaurant_name
    // console.log(str);
    console.log("Inside Sections Menu");
    Menu
        .find({
            restaurant_name: msg.restaurant_name,
            section: msg.section
        })
        .then(results => {
            console.log('Successfully fetched data from DB')
            // console.log(JSON.stringify(results[0]));
            // res.writeHead(200, {
            //     'Content-Type': 'application/json'
            // })
            // //   delete results[0].password;
            // res.end(JSON.stringify(results))
            callback(null,results);
        })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
            // res.writeHead(400, {
            //     'Content-Type': 'text/plain'
            // })
            // res.end('Error occured while fetching data from DB')
            callback(err,"Error");
        })


}

exports.handle_request = handle_request;