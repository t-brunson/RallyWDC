//Create a router object
var express = require('express');
var router = express.Router();
//Create a session
var session = require('express-session');
//Require login controller
var login_controller = require('../controllers/login');
//Defining session variable 
var ssn;


//Login User
router.post('/',function(req, res,next){ 
    //Define the Session
    ssn = req.session;
    //Login to Rally
    login_controller.data.loginUser(req);
    //Define the login info for all routes
    next();
            },
//Query for Workspaces
function(req, res){ 
    //Get user workspaces 
    login_controller.data.workspace(ssn.rallyApi,req,res);
          });
module.exports = router;