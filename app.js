//Rally Web Data Connector
//Trey Brunson

//--------------Required Libraries---------------//
//Web development framwork  
var express = require('express');
//Setting paths to find files
var path = require('path');
//Handling post requests
var bodyParser = require('body-parser');
//Creating sessions to share variables across application
var session = require('express-session');
//Easy HTTP requests
var request = require('request');
//--------------Required Libraries---------------//

///-------------Router Paths--------------///
var getWorkspaces = require('./routes/getWorkspaces');
var getProjects = require('./routes/getProjects');
var project = require('./routes/project');
///--------------Router Paths---------------///

//Create an instance
var app = express();

//--------------Setting Paths for Files---------------//
// Set path to look for views
app.set('views', path.join(__dirname, 'views'));
//Use ejs to create dynamic web pages
app.set('view engine', 'ejs');
//Set path for static files
app.use(express.static(path.join(__dirname, 'public')));
//--------------Setting Paths for Files---------------//

//--------------Defining requirments for current app instance---------------//
//Create a session for this instance
app.use(session({
  cookieName: 'session',
  secret: 'Keep this hidden',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//Manage cross site requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Handel data from POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//--------------Defining Requirments for current app instance---------------//

//--------------OAUTH---------------//
//Get configuration info for oAuth
var config =require('./config.js');
//Defining Variables for OAuth
var clientID = config.CLIENT_ID;
var clientSecret = config.CLIENT_SECRET;
console.log(clientID);
console.log(clientSecret);
var redirectURI = config.HOSTPATH + ":" + config.PORT + config.REDIRECT_PATH;

//Handel redirect request from rally oAuth request
app.get('/redirect', function(req, res) { //This is the same as your call back url from oauth setup localhost:3000 /redirect         ############
    console.log("Redirect request called");
    //Define a session
    var ssn;
    ssn = req.session;
  //Get authorization code from rally
  authCode = req.query.code;
    //Print authoCode to console 
  console.log(authCode);
  //Request for access token now that we have a code
  var requestObject = {
      code: authCode,
      redirect_uri: redirectURI,
      grant_type: 'authorization_code',
      client_id: clientID,
      client_secret: clientSecret,
  };
  var token_request_header = {
      'Content-Type': 'application/x-www-form-urlencoded',
  };
  // Build the post request for the OAuth endpoint
  var options = {
      method: 'POST',
      url: 'https://rally1.rallydev.com/login/oauth2/token',
      jar: false,
      form: requestObject,
      headers: token_request_header,
  };
  //Make the post request
  request(options, function (error, response, body) {
    if (!error) {
      //We should receive  { access_token: ACCESS_TOKEN }
      //Parse the token from the response
      body = JSON.parse(body);
      var accessToken = body.access_token;
        //Allow the access token to be used accross routes
      ssn.accessToken =accessToken;
      console.log(accessToken);
      //Set the token in cookies so the client can access it
      res.cookie('accessToken', accessToken, { });
      //Send request to login route
      res.redirect('/getWorkspaces');
    } else {
      console.log('Post request failed');
      console.log(error);
    }
  });
});
//--------------OAUTH---------------//

//--------------Defining where to send requests ---------------//
//Displays the login page when html://localhost:3000 is requested
app.get('/', function(req, res) {
  console.log("Display WDC");
    //Send client to index page
  res.redirect('/index.html');
});
//Logging the user in
app.use('/getWorkspaces', getWorkspaces);
//Finding the users workspaces
app.use('/getProjects', getProjects);
//Finding the projects aviable for specific workspace
app.use('/project', project);
//--------------Defining where to send requests ---------------//

//Export the instance
module.exports = app;