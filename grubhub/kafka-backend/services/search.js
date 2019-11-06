// var Owner = require("../../Backend/models/owner.js");
// var mongoose = require("../../Backend/mongoose");
// var crypt = require("../../Backend/crypt");
// var  Menu = require("../../Backend/models/menu");

// function handle_request(msg, callback) {
//     console.log('Inside restaurants details:');
//   let temp = msg;
//   console.log(msg);
//   var nameArr = temp.split(',');
//   console.log(nameArr);

//   let str = nameArr;
//   console.log(JSON.stringify(str));
//   Owner.find({ restaurant_name: { $in: str } }).then((docs) => {
//       console.log("In Get restaurant details Query");
//       if (docs) {
//         //   res.writeHead(200, {
//         //       'Content-Type': 'text/plain'
//         //   })
//         //   // console.log(docs);
//           console.log("Success");
//           console.log(JSON.stringify(docs));
//         //   res.end(JSON.stringify(docs));
//         callback(null,docs);


//       } else {
//         //   res.writeHead(400, {
//         //       'Content-Type': 'text/plain'
//         //   })
//         //   res.end("Unable to get data");
//           console.log("Unable get data");
//           callback(null,"Error Occurred");
//       }
//   });
// }



// exports.handle_request = handle_request;