//Installing libraries//

//Web Development Framwork for node 
var express = require('express');
var path = require('path');
//Logging requests/error handling
var logger = require('morgan');
//Handling post requests
var bodyParser = require('body-parser');
//Connecting to rally database
var rally = require('rally');
//Creating sessions to pass variables across routes
var session = require('express-session');

//Creating paths for the routes
var index = require('./routes/index');
var login = require('./routes/login');
var workspace = require('./routes/workspace');
var project = require('./routes/project');
var sendData = require('./routes/sendData');

//Creat an instance
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Creating path for views
app.set('views', path.join(__dirname, 'views'));
//Allowing dynamic html pages
app.set('view engine', 'ejs');

//Create a session for that instance
app.use(session({
  cookieName: 'session',
  secret: 'secret',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set satic file path
app.use(express.static(path.join(__dirname, 'public')));

//Displays the login page
app.use('/', index);
//Logging in 
app.use('/login', login);
//Finding the users workspaces
app.use('/workspace', workspace);
//Finding the projects aviable for specific workspace
app.use('/project', project);
//Sending data for the web data connector
app.use('/sendData',sendData);

app.use('/sendData/submit',sendData)
//Error Handling//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Export the instance
module.exports = app;