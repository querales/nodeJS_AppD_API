/**
 * Created by gabriella.querales on 12/30/15.
 */


var env = require('./env.js')

//AppDyn
// Create AppD object
var appd = require('appdynamics');
appd.profile({
    //local
    //controllerHostName:'osxltgquerales.corp.appdynamics.com',
    //demo2
    //controllerHostName:'demo2.appdynamics.com',


    //staging
    controllerHostName:process.env.APPDYN_HOST,
    controllerPort:process.env.APPDYN_PORT, // If SSL, be sure to enable the next line
    controllerSslEnabled: false,
    //controllerSslEnabled: true,

    accountName:process.env.APPDYN_ACCT_NAME,
    accountAccessKey:process.env.APPDYN_ACCESS_KEY,

    applicationName: process.env.APPDYN_APP_NAME,
    tierName: process.env.APPDYN_TIER_NAME,
    nodeName: process.env.APPDYN_NODE_NAME,
    debug:true

});

var bodyParser     =        require("body-parser");


//open source modules
var express = require('express'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure app routes
//var route = require ('./mobileRoutes') (app);


// this hook is to test the event loop snapshot. It takes 5 seconds to execute (slow process)
    app.get('/longLoop', function (request, response) {
    process.nextTick(function () {
      console.log ("long loop _No docker")
//      actorsProf ();
      dummy = [];
      var now = Date.now(), then = now;
      while (then - now < 5000) {
          then = Date.now();
          dummy.push(0);
          if (dummy.length > 100) {
              dummy.splice(0, 10);
          }
      }
   response.send ('done local machine no docker')})                                                                                                                                                               
                                                                                                                                                                                          
                                                                                                                                                                                          
})

app.get('/test', function (request, response) {


     var mytxn=appd.getTransaction(request);
     var headers= request.headers;




    // Add headers to USER data snapshot.
    headersS= JSON.stringify(headers);
    console.log ("headers"+  headersS);
    mytxn.addSnapshotData(headers, headersS);


//      actorsProf ();
        dummy = [];
        var now = Date.now(), then = now;
        while (then - now < 2000) {
            then = Date.now();
            dummy.push(0);
            if (dummy.length > 100) {
                dummy.splice(0, 10);
            }
        }

   //  response.statusCode = 404;
     response.send ('test is done '+JSON.stringify(headers));

    })



// Make our Express server listen on port 3000.
app.listen(3000);  
