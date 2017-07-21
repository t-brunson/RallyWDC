//Handling Post Request info
var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
//Loging into rally
var rally = require('rally');
var queryUtils = rally.util.query;
//Creating the methods object to export to routes
var methods = {};
//Defining a session 
var ssn;
//Log the user in
methods.login =function(req, userName, password){
    ssn=req.session;
    restApi = rally({
    user: userName, 
    pass: password,
    apiVersion: 'v2.0', //this is the default and may be omitted
    server: 'https://rally1.rallydev.com/',  
    requestOptions: {
        headers: {
            'X-RallyIntegrationName': 'Rally WDC',  
            'X-RallyIntegrationVendor': 'Trey Brunson',             
            'X-RallyIntegrationVersion': '1.0'                
        }
         
    }
        
});
    //Print Test
    console.log("Login Succesful");
    return restApi;
    
};
//Get the selected workspace ID
methods.getWorkspaceID = function(req,workspaceJSON){
        console.log("Getting User workspace");
        ssn = req.session;
    //Where the project results go
        var projectsJSON;
    //Get the workspace the user requested from the drop down
        var workspaceResponse = req.body.workspace;
        console.log(workspaceResponse);
        //Creating an Array to Loop Through
        var workspace=[workspaceJSON];
        //Looping through Array to check value and find workspaceID
            workspace[0].Results.forEach(function(item){
                if(item._refObjectName === workspaceResponse){
                   //Workspace ID 
                    console.log(item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length));
                    var workspaceID= item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length);
                    ssn.workspaceID=workspaceID;
            }   
            })
        };
//Get projects based on selected workspace
methods.getProjects = function(req,res,rally,workspaceID){
        ssn = req.session;    
        console.log("Project Query Started");
    //Project Query
            rally.query({
                type: 'Project', 
                //query: queryUtils.where('Children', '!=', ''),
                scope: {
                    workspace: '/workspace/'+ workspaceID,
                    up:'true',
                    down:'false'
                }},function(error, result){
        //Test for error
        if(error) {
            console.log("there was an error");}
        
        //Save workspace JSON data
        projectsJSON= result;
        //Set project object for other middleware
        ssn.projectsJSON= projectsJSON;
        console.log('Project Query Completed');
        res.render("projectSelection", {Project: projectsJSON});
            });
    };
exports.data =methods;