var Order = require("../../Backend/models/orders");
var mongoose = require("../../Backend/mongoose");


function handle_request(msg, callback) {
    console.log("Inside Order List");
//   console.log('Req Body : ', req.query)
  let str = ["Preparing","Ready" ,"New"];
  // console.log(str);
  let email = msg.email;
  let person = msg.person;
  let order = 'order_status';
  let query = {};
  
  query[person] = email;
  query[order] = {"$in" : str}
  console.log(query);
  Order
      .find( query,     
      )
      .then(results => {
          console.log('Successfully fetched data from DB')
          console.log(JSON.stringify(results));
        //   res.writeHead(200, {
        //       'Content-Type': 'application/json'
        //   })
        //   res.end(JSON.stringify(results))
        callback(null,results)
      })
      .catch(err => {
          console.log('Error occured while fetching data from DB')
        //   res.writeHead(400, {
        //       'Content-Type': 'text/plain'
        //   })
        //   res.end('Error occured while fetching data from DB')
        callback(err,"Error");
      })
}

exports.handle_request = handle_request;