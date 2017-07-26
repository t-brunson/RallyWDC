var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var request = require('request');
var methods = {};
var ssn;

//Get the selected workspace ID
methods.getProjectID = function(req,projectJSON){
        console.log("Filter Started");
        ssn = req.session;
    //Get the project the user requested from the drop down
        var projecteResponse = req.body.project;
        console.log(projecteResponse);
        //Creating an Array to Loop Through
        var project=[projectJSON];
        //Looping through Array to check value and find workspaceID
            project[0].QueryResult.Results.forEach(function(item){
                if(item._refObjectName === projecteResponse){
                    console.log(item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length));
                    var projectID= item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length);
                    ssn.projectID=projectID;
            }   
            })
        };

//Get projects based on selected workspace
methods.getData = function(req,res,workspaceID, projectID){
        ssn = req.session;    
        console.log("Start User Story Query");

        var token_request_header = {
        "zsessionid": ssn.accessToken,
                };
  // Build the post request for the OAuth endpoint
        var options = {
        method: 'GET',
        url: "https://rally1.rallydev.com/slm/webservice/v2.0/hierarchicalrequirement?project/"+projectID+"&query=(((Iteration.Name = "+ '"OC-P5.R3-Sprint 13"' + ") OR (Iteration.Name = "+ '"OC-P5.R3-Sprint 12"' + ")) OR (Iteration.Name = "+ '"OC-P5.R3-Sprint 11"' + "))&pagesize=200",
        headers: token_request_header
  };
    var hierarchicalrequirementJSON;
  // Make the post request
  request(options, function (error, response, body) {
    if (!error) {
        hierarchicalrequirementJSON= JSON.parse(body);
        ssn.hierarchicalrequirementJSON=hierarchicalrequirementJSON;
        console.log(hierarchicalrequirementJSON);
        res.redirect('/');
    } else {
    console.log('Post request failed')
    console.log(error);
    }
  });
};
exports.data =methods; 