var Menu = require("../../Backend/models/menu");
var mongoose = require("../../Backend/mongoose");

function handle_request(msg, callback) {
    console.log("Inside delete section request");
    console.log(msg);

    Menu.deleteMany({

        section: msg.section
    }).then(results => {
        console.log('Successfully fetched data from DB')
        console.log(JSON.stringify(results));
        // res.writeHead(200, {
        //     'Content-Type': 'application/json'
        // })
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