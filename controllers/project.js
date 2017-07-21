var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var rally = require('rally');
var methods = {};
var ssn;

//Login user 
methods.login =function(req, userName, password){
    ssn=req.session;
    rallyApi = rally({
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
    return rallyApi;
}
//Get the selected workspace ID
methods.getProjectID = function(req,projectJSON){
        console.log("Filter Started");
        ssn = req.session;
    //Get the workspace the user requested from the drop down
        var projecteResponse = req.body.project;
        console.log(projecteResponse);
        //Creating an Array to Loop Through
        var project=[projectJSON];
        //Looping through Array to check value and find workspaceID
            project[0].Results.forEach(function(item){
                if(item._refObjectName === projecteResponse){
    //Test to show workspace ID was gathered
                    console.log("Project ID below");
                    console.log(item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length));
                    var projectID= item._ref.substring(item._ref.lastIndexOf("/")+1, item._ref.length);
                     ssn.projectID=projectID;
            }
                
            })
        };
//Get projects based on selected workspace
methods.getData = function(req,res,rallyApi,workspaceID, projectID){
        ssn = req.session;    
        console.log("Start User Story Query");
        //User Story Query
        var hierarchicalrequirementJSON;
rallyApi.query({type: 'hierarchicalrequirement',
                start: 1, //the 1-based start index, defaults to 1
                pageSize: 200, //the page size (1-200, defaults to 200)
                limit: Infinity,
        fetch: [//User Story Fields'
            'FormattedID','PlanEstimate','Rank','ScheduleState','Tags','Type','WorkState','AcceptedDate','IsTestable','Capability','RundDate','ObjectID','DirectChildrenCount','Name','Iteration','Parent','Owner','Release','c_type','Feature',
                ],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}}, 
    function(error, result) {if(error) {console.log(error);} 
        //Save Iteration JSON data
        hierarchicalrequirementJSON= result;
        //Set project object for other middleware
        ssn.hierarchicalrequirementJSON= hierarchicalrequirementJSON;
        console.log('Hierarchical Requirement Query Completed');
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
        console.log('Start iteration Query');
        //Iteration Query
        var IterationJSON;
        rallyApi.query({type: 'Iteration',
        start: 1, //the 1-based start index, defaults to 1
        pageSize: 200, //the page size (1-200, defaults to 200)
        limit: Infinity,
        fetch:['Iteration','StartDate','EndDate','PlannedVelocity','State','TaskActualTotal','TaskEstimateTotal','TaskRemainingTotal','Sequence','PlanEstimate','ObjectID','Name','Project',],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}},function(error, result){if(error) {
        console.log("there was an error");
        }
        //Save workspace JSON data
        IterationJSON= result;
        //Set project object for other middleware
        ssn.IterationJSON= IterationJSON;
        console.log('Iteration Query Completed');
                                                                                                               
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
        console.log('Start Project Query');
        //Project Query
        var projectJSON;
        rallyApi.query({type: 'Project',
        start: 1, //the 1-based start index, defaults to 1
        pageSize: 200, //the page size (1-200, defaults to 200)
        limit: Infinity,                
        fetch: [//Project Fields'
                'ObjectID' ,'Name','Parent','Workspace',
            ],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}},function(error, result){if(error) {console.log("there was an error");}
        //Save workspace JSON data
        projectJSON= result;
        //Set project object for other middleware
        ssn.projectJSON= projectJSON;
        console.log('Project Query Completed');
        
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
        console.log('Start Release Query');
        //Release Query
        var releaseJSON;
        rallyApi.query({type: 'Release', 
        start: 1, //the 1-based start index, defaults to 1
        pageSize: 200, //the page size (1-200, defaults to 200)
        limit: Infinity,
        fetch: [//Release Fields'
    'PlanEstimate','Rank','ScheduleState','ObjectID','Name','Accepted','Project','ReleaseStartDate','ReleaseDate','PlannedVelocity','State','TaskActualTotal','TaskEstimateTotal','TaskRemainingTotal',
            
    ],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}},function(error, result){if(error) {console.log("there was an error");}
        //Save workspace JSON data
        releaseJSON= result;
        //Set project object for other middleware
        ssn.releaseJSON= releaseJSON;
        console.log('Release Query Completed');
        
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
        console.log('Start Defect Query');
        //Defect Query
        var defectJSON;
        rallyApi.query({type: 'Defect',
        start: 1, //the 1-based start index, defaults to 1
        pageSize: 200, //the page size (1-200, defaults to 200)
        limit: Infinity,
        fetch: [//User Story Fields'
    'FormattedID','PlanEstimate','ScheduleState','Tags','AcceptedDate','RundDate','ObjectID','Name','Iteration','State','Defects','SchedulableArtifact','ClosedDate','CreationDate','Environment','Priority','FoundBy','Tags','Requirement','Severity','Project','Release','Owner','Rank',

    ],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}},function(error, result){if(error) {console.log("there was an error");}
        //Save workspace JSON data
        defectJSON= result;
        //Set project object for other middleware
        ssn.defectJSON= defectJSON;
        console.log('Defect Query Completed');
        
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
        console.log('Start Task Query');
        //Task Query
        var taskJSON;
        rallyApi.query({type: 'Task', 
        //start: 1, //the 1-based start index, defaults to 1
        //pageSize: 200, //the page size (1-200, defaults to 200)
        //limit: Infinity,
        fetch: [//Task Fields*
            'Release','Project','State','Tags','Iteration','Tasks','Actuals','Estimate','ToDo','TimeSpent','TaskType','Owner','WorkProduct','LastUpdateDate','CreationDate','FormattedID','Name','ObjectID','c_Type',
            
    ],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}},function(error, result){if(error) {console.log("there was an error");}
        //Save workspace JSON data
        taskJSON= result;
        //Set project object for other middleware
        ssn.taskJSON= taskJSON;
        console.log('Task Query Completed');
        
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
        console.log('Start Portfolio Item Query');
        //Portfolio Item Query
        var portfolioItemJSON;
        rallyApi.query({type: 'PortfolioItem',
        //start: 1, //the 1-based start index, defaults to 1
        //pageSize: 200, //the page size (1-200, defaults to 200)
        //limit: Infinity,
        fetch: [//PortfolioItem
           'Release','Tags','State','Parent','Project','ObjectID','FormattedID','Feature','PortfolioItemName','AcceptedLeafStoryCount','AcceptedLeafStoryPlaneEstimateTotal','ActualEndDate','ActualStartDate','InvestmentCategory','JobSize','LeafStoryCount','LeafStoryPlanestimateTotal','PercentDoneByStoryCount','PercentDoneByStoryPlanEstimate','PlannedEndDate','PlannedStartDate','PortfolioItemType','PreliminaryEstimate','UnEstimatedLeafStoryCount','RefinedEstimate','Description','EPMSid','PortfolioItemTypeName','Name',
    ],
        scope: {workspace: '/workspace/'+ workspaceID, project: '/project/'+projectID}},function(error, result){if(error) {
        console.log("there was an error");
        }
        //Save workspace JSON data
        portfolioItemJSON= result;
        //Set project object for other middleware
        ssn.portfolioItemJSON= portfolioItemJSON;
        console.log('Portfolio Item Query Completed');
        res.render("sendData", {Project: ssn.projectsJSON, ProjectID: ssn.projectID,Workspace: ssn.workspacesJSON, WorkspaceID: ssn.workspaceID});
    });
                             });
                        });
                      }); 
                     });  
                   });
                             });
};
exports.data =methods; 