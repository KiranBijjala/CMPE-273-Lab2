var Order = require("../../Backend/models/orders");
// var mongoose = require("../../Backend/mongoose");
const mongoose = require('mongoose');

function handle_request(msg, callback) {
    console.log('Inside user order Post Request')
  // console.log("Req Body : ", username + "password : ",password);

//   var now = new Date()
//   var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
  var id = mongoose.Types.ObjectId()
//   console.log('Req Body : ', req.body)

  let order = new Order
      ({
          order_id: id,
          orderlist : msg.order,
          total : msg.total,
          user_email : msg.user_email,
          restaurant_name : msg.restaurant_name,
          order_status : 'New',
          
      })
  order
      .save()
      .then(response => {
          console.log('response' + response)
        //   res.writeHead(200, {
        //       'Content-Type': 'text/plain'
        //   })
        //   res.end('Successfully Registered')
        callback(null,results);
      })
      .catch(err => {
          console.log('Error occured while inserting data in DB' + err)
        //   res.writeHead(400, {
        //       'Content-Type': 'text/plain'
        //   })
        //   res.end('Error occured while inserting data in DB')
        callback(err,"Error");
      })
}

exports.handle_request = handle_request;
