//Handling Post Request info
var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
//Creating the methods object to export to routes
var methods = {};
//Defining a session 
var ssn;
var projectsJSON;
var request = require('request');
//Get the selected workspace ID
methods.getWorkspaceID = function(req,workspaceJSON){
        console.log("Getting User workspace");
        ssn = req.session;
      //Get the workspace the user requested from the drop down 
        var workspaceResponse = req.body.workspace;
        console.log(workspaceResponse);
        //Creating an Array to Loop Through
        var workspace=[workspaceJSON];
        //Looping through Array to check value and find workspaceID
            workspace[0].QueryResult.Results.forEach(function(item){
                //If the item in the workspace array matches the one the user requested the workspace ID is saved and shared with all routes
                if(item._refObjectName === workspaceResponse){
                   //Workspace ID 
                    console.log(item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length));
                    var workspaceID= item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length);
                    ssn.workspaceID=workspaceID;
            }   
            })
        };
//Get projects based on selected workspace
methods.getProjects = function(req,res,workspaceID){
        ssn = req.session;    
        console.log("Project Query Started");
    //Project Query to get all the projects for the selected workspace
     var token_request_header = {
      "zsessionid": ssn.accessToken,
  };
  // Build the get request 
     var options = {
      method: 'GET',
      url: "https://rally1.rallydev.com/slm/webservice/v2.0/Project?workspace/"+workspaceID+"&pagesize=200",
      headers: token_request_header
  };
  // Make the post request
  request(options, function (error, response, body) {
    if (!error) {
        projectsJSON= JSON.parse(body);
        ssn.projectsJSON=projectsJSON;
        console.log('Project Query Completed');
        res.render("projectSelection", {Project: projectsJSON});
    } else {
    console.log('Post request failed')
    console.log(error);
    }
  });   
};
exports.data =methods;