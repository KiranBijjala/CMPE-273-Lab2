var Menu = require("../../Backend/models/menu");
var mongoose = require("../../Backend/mongoose");

function handle_request(msg, callback) {

    console.log('Req Body : ', msg)
    Menu.update(
        { _id: msg.id },
        {
            $set: {
                dish_name: msg.dishname,
                description: msg.description,
                price: msg.price,
                section: msg.section,
            }
        }).then(results => {
            console.log('Successfully fetched data from DB')
            console.log(JSON.stringify(results));
            callback(null,results);
            // res.writeHead(200, {
            //     'Content-Type': 'application/json'
            // })
            // res.end(JSON.stringify(results))
        })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
            callback(err,"Error");
            // res.writeHead(400, {
            //     'Content-Type': 'text/plain'
            // })
            // res.end('Error occured while fetching data from DB')
        })

}

exports.handle_request = handle_request;