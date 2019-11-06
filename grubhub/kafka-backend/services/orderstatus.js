var Order = require("../../Backend/models/orders");
var mongoose = require("../../Backend/mongoose");

function handle_request(msg, callback) {
console.log("Order Status");
  console.log(msg);
  Order.update(
     {order_id  : msg.order_id },
     {$set: {
      order_status : msg.order_status
    }
  }
    
  ).then(results => {
      console.log('Successfully fetched data from DB')
      callback(null,results)
  })
  .catch(err => {
      console.log('Error occured while fetching data from DB')
      callback(err,"Error");
  })
}

exports.handle_request = handle_request;