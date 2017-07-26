//Create a router object
var express = require('express');
var router = express.Router();
var session = require('express-session');
// Require controller modules
var project = require('../controllers/project');
var ssn;

router.get('/',function(req,res){
    ssn = req.session; 
    res.sendFile('index.html',{root: './public'});
    });
//Get the project the user selected
router.post('/',function(req,res,next){ 
    console.log("Get Project Data Request");
    ssn = req.session;
    //Get the selected project 
    projectID = project.data.getProjectID(req, ssn.projectsJSON);
    next();
            },
    function(req, res){
    //Put the project ID the user selected in cookie storage
    res.cookie('projectID', ssn.projectID, { });
    project.data.getData(req,res,ssn.workspaceID,ssn.projectID);
          });
module.exports = router;