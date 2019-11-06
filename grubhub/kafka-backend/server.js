var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var signup = require('./services/signup.js');
var buyerprofile = require('./services/buyerprofile.js');
var buyerprofileupdate = require('./services/buyerprofileupdate.js');
var getrestaurants = require('./services/getrestaurants.js');
var restaurantmenu = require('./services/restaurantmenu.js');
var restaurantsections = require('./services/restaurantsections.js');
var sectionmenu = require('./services/sectionmenu.js');
var userorder = require('./services/userorder.js');
var orderlist = require('./services/orderlist.js');
var pastorderlist = require('./services/pastorderlist.js');
var userpostmessage = require('./services/userpostmessage.js');
var ownersignup = require('./services/ownersignup.js');
var orderstatus = require('./services/orderstatus.js');
var updaterestaurantmenu = require('./services/updaterestaurantmenu.js');
var deletedish = require('./services/deletedish.js');
var deletesection = require('./services/deletesection.js');
var menudetails = require('./services/menudetails.js');
var getmessage = require('./services/getmessage.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup",signup)
handleTopicRequest("buyerprofile",buyerprofile)
handleTopicRequest("buyerprofileupdate",buyerprofileupdate)
handleTopicRequest("get-restaurants",getrestaurants)
handleTopicRequest("restaurant-menu",restaurantmenu)
handleTopicRequest("restaurant-sections",restaurantsections)
handleTopicRequest("sections-menu",sectionmenu)
handleTopicRequest("user-order",userorder)
handleTopicRequest("list-order",orderlist)
handleTopicRequest("pastlist-order",pastorderlist)
handleTopicRequest("post-message",userpostmessage)
handleTopicRequest("owner-signup",ownersignup)
handleTopicRequest("order-status",orderstatus)
handleTopicRequest("update-restaurantmenu",updaterestaurantmenu)
handleTopicRequest("delete-dish",deletedish)
handleTopicRequest("delete-section",deletesection)
handleTopicRequest("menu-details",menudetails)
handleTopicRequest("get-message",getmessage)