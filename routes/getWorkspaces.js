//Require a express object
var express = require('express');
//Require a router object
var router = express.Router();
//Require session
var session = require('express-session');
//Require request
var request = require('request');
//Defining session variable 
var ssn;

router.get('/',function(req,res){
    ssn = req.session;
    //Set variables for get request to retrive the workspaces the user has access to
    var token_request_header = {
      "zsessionid": ssn.accessToken,
  };
  // Build the post request for the OAuth endpoint
  var options = {
      method: 'GET',
      url: "https://rally1.rallydev.com/slm/webservice/v2.0/workspacepermission",
      headers: token_request_header
  };
  //Send the get request
  request(options, function (error, response, body) {
    if (!error) {
        //Retrive the results
        workspacesJSON= JSON.parse(body);
        //Set the variable for other routes
        ssn.workspacesJSON=workspacesJSON;
        console.log(workspacesJSON);
        //Send the client to the workspaceSelection view with the downloaded data
        res.render("workspaceSelection", {Workspace: workspacesJSON});
    } else {
    console.log('Get request failed')
    console.log(error);
    }
  });   
})

module.exports = router;