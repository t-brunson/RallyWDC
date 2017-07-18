//Handling Post Request Info
var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

//Need to install rally to connect to the database - npm install rally --save
var rally = require('rally');

// Need to install client sessions to save data across routes
var ssn;
//create the methods object to export functions to routes
var methods = {};
//Log the user in
methods.loginUser = function(req) {
    //Start Session
    ssn=req.session;
    //Set user name and password for all routes
    ssn.userName = req.body.userName;
    ssn.userPassword = req.body.userPassword;
    //Takes user input and logs into rally
    rallyApi = rally({
    user: ssn.userName, //required if no api key
    pass: ssn.userPassword, //required if no api key
    //Can be used for single time access no sign in required 
    //apiKey: '_C6RyrDFTTxe3Kc3dDdIKjWhRYsdD6eU43lY56Cp1Qxo', //preferred, required if no user/pass, defaults to process.env.RALLY_API_KEY
    apiVersion: 'v2.0',
    server: 'https://rally1.rallydev.com/',
    requestOptions: {
        headers: {
            'X-RallyIntegrationName': 'Rally WDC',  //while optional, it is good practice to
            'X-RallyIntegrationVendor': 'Trey Brunson',             //provide this header information
            'X-RallyIntegrationVersion': '1.0'                    
        }
        
    }
        
});
    ssn.rallyApi=rallyApi;
    //Test to console
    console.log("Login Succesful");
};
//Find the users workspaces
methods.workspace= function(rallyApi,req,res) {
    //Start Session
    ssn = req.session;
    //Where workspace data is gonna be stored
    var workspacesJSON;
    //Query to the database
    rallyApi.query({type: 'workspacepermission'},function(error, result){
        if(error) {
        console.log(error);
        }
        //Save workspace JSON data
        workspacesJSON= result;
        ssn.workspacesJSON=workspacesJSON;
        //Dynamic display workspace view with user workspace data
        res.render("workspaceSelection", {Workspace: workspacesJSON});
        console.log("User Results Retreived");
});
};
exports.data =methods;