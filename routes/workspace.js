//Create a router object
var express = require('express');
var router = express.Router();
//Create a session 
var session = require('express-session');
// Require controller 
var workspace = require('../controllers/workspace');
//create session variable
var ssn;

//Get the Workspace the user selected
router.post('/',function(req,res,next){ 
    ssn = req.session;
    workspace.data.getWorkspaceID(req, ssn.workspacesJSON);
    console.log("Found Workspace ID");
    next();
            },
//Query for projects based on workspace
function(req, res){
    //Get login info
    var rallyInfo= workspace.data.login(req,ssn.userName,ssn.userPassword);
    //Get projects based on workspace and then move to filter page
    workspace.data.getProjects(req,res,rallyInfo,ssn.workspaceID);
          });
module.exports = router;