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
    ssn = req.session;
    projectID = project.data.getProjectID(req, ssn.projectsJSON);
    console.log("Found Project ID");
    next();
            },
    function(req, res){
    //Get login info
    var rallyInfo= project.data.login(req,ssn.userName,ssn.userPassword);
    //Get projects based on workspace and then move to filter page
    project.data.getData(req,res,rallyInfo,ssn.workspaceID,ssn.projectID);
          });
module.exports = router;