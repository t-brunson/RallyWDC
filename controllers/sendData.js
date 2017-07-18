var bodyParser= require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var rally = require('rally');

var methods = {};
var ssn;


methods.createTableauConnection =function() {
  
    console.log("Create Connection");
    
    var myConnector = tableau.makeConnector();
    console.log(myConnector);
    // Creating Database Framework 
    console.log("Create Schema");
    myConnector.getSchema = function (schemaCallback) {     
    //defining schemas to place data     
    var userStory_cols = [
        
        //{ id : "ID", alias : "AutoID", dataType : tableau.dataTypeEnum.float },
        
        { id : "FormattedID", alias : "FormattedID", dataType : tableau.dataTypeEnum.string }, 
        
        { id : "PlanEstimate", alias : "Plan Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "Rank", alias : "Rank", dataType : tableau.dataTypeEnum.float },
        
        { id : "ScheduleState", alias : "Schedule State", dataType : tableau.dataTypeEnum.string },
        
        { id : "IterationName", alias : "Iteration Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "IterationID", alias : "Iteration ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Tags", alias : "Tags", dataType : tableau.dataTypeEnum.string },
        
        { id : "StoryType", alias : "Story Type", dataType : tableau.dataTypeEnum.string },
        
        { id : "WorkState", alias : "Work State", dataType : tableau.dataTypeEnum.string },
        
        { id : "AcceptedDate", alias : "Accepted Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "IsTestable", alias : "Is Testable", dataType : tableau.dataTypeEnum.string },
        
        { id : "FeatureNumber", alias : "Feature Number", dataType : tableau.dataTypeEnum.string },
        
        { id : "FeatureName", alias : "Feature Name", dataType : tableau.dataTypeEnum.string },

        { id : "OwnerName", alias : "Owner Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectName", alias : "Project Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "ReleaseName", alias : "Release Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ReleaseID", alias : "Release ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Capability", alias : "Capability", dataType : tableau.dataTypeEnum.string },
        
        { id : "RunDate", alias : "Run Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "ObjectID", alias : "User Story ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "DirectChildren", alias : "Children Count", dataType : tableau.dataTypeEnum.string },
        
        //{ id : "RunProject", alias : "Run Project", dataType : tableau.dataTypeEnum.string },
        
        { id : "Name", alias : "Name", dataType : tableau.dataTypeEnum.string },   
    ];
        
    var userStoryTabel = {
        id : "UserStory",
        alias : "User Story Data",
        columns : userStory_cols,
        incrementColumnId: "RunDate"
    };

    var project_cols=[
        
        //{ id : "ID", alias : "AutoID", dataType : tableau.dataTypeEnum.float },
        
        { id : "Name", alias : "Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "ParentName", alias : "Parent Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ParentID", alias : "Parent ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "WorkspaceName", alias : "Workspace Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "WorkspaceID", alias : "Workspace ID", dataType : tableau.dataTypeEnum.string },
                    ];
    
    var projectTable ={
        id : "Project",
        alias : "Project Data",
        columns : project_cols
    };
        
    var iteration_cols=[
        
       
        
        { id : "Name", alias : "Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "StartDate", alias : "Start Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "EndDate", alias : "End Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "ProjectName", alias : "Project Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "PlanEstimate", alias : "Plan Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "PlannedVelocity", alias : "Planned Velocity", dataType : tableau.dataTypeEnum.float },
        
        { id : "ObjectID", alias : "Iteration ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "State", alias : "State", dataType : tableau.dataTypeEnum.string },
        
        { id : "TaskActualTotal", alias : "Task Actual Total", dataType : tableau.dataTypeEnum.float },
        
        { id : "TaskEstimateTotal", alias : "Task Estimate Total", dataType : tableau.dataTypeEnum.float },
        
        { id : "TaskRemainingTotal", alias : "Task Remaining Total", dataType : tableau.dataTypeEnum.float },
        
        
                    ];
    
    var iterationTable ={
        id : "Iteration",
        alias : "Iteration Data",
        columns : iteration_cols
    };
        
    var release_cols=[
        
        //{ id : "ID", alias : "AutoID", dataType : tableau.dataTypeEnum.float },
        
        { id : "Name", alias : "Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ObjectID", alias : "Release ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Accepted", alias : "Accepted", dataType : tableau.dataTypeEnum.float },
        
        { id : "PlanEstimate", alias : "Plan Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "PlannedVelocity", alias : "Planned Velocity", dataType : tableau.dataTypeEnum.float },
        
        { id : "ProjectName", alias : "Project Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "EndDate", alias : "End Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "StartDate", alias : "Start Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "State", alias : "State", dataType : tableau.dataTypeEnum.string },
        
        { id : "TaskActualTotal", alias : "Task Actual Total", dataType : tableau.dataTypeEnum.float },
        
        { id : "TaskEstimateTotal", alias : "Task Estimate Total", dataType : tableau.dataTypeEnum.float },
        
        { id : "TaskRemainingTotal", alias : "Task Remaining Total", dataType : tableau.dataTypeEnum.float },
        
        //{ id : "LastUpdated", alias : "Last Update", dataType : tableau.dataTypeEnum.date },
                    ];
    
    var releaseTable ={
        id : "Release",
        alias : "Release Data",
        columns : release_cols
    };
    
    var defect_cols = [
        
        //{ id : "ID", alias : "AutoID", dataType : tableau.dataTypeEnum.float },
        
        { id : "FormattedID", alias : "FormattedID", dataType : tableau.dataTypeEnum.string }, 
        
        { id : "ClosedDate", alias : "Closed Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "CreationDate", alias : "Creation Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "AcceptedDate", alias : "Accepted Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "PlanEstimate", alias : "Plan Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "Rank", alias : "Rank", dataType : tableau.dataTypeEnum.float },
        
        { id : "ScheduleState", alias : "Schedule State", dataType : tableau.dataTypeEnum.string },
        
        { id : "State", alias : "State", dataType : tableau.dataTypeEnum.string },
        
        { id : "Enviroment", alias : "Enviroment", dataType : tableau.dataTypeEnum.string },
        
        { id : "Priority", alias : "Priority", dataType : tableau.dataTypeEnum.string },
        
        { id : "FoundBy", alias : "Found By", dataType : tableau.dataTypeEnum.string },
        
        { id : "IterationName", alias : "Iteration Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "IterationID", alias : "Iteration ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Owner", alias : "Owner", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectName", alias : "Project Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "ReleaseName", alias : "Release Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ReleaseID", alias : "Release ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Tags", alias : "Tag", dataType : tableau.dataTypeEnum.string },
        
        { id : "ObjectID", alias : "Defect ID", dataType : tableau.dataTypeEnum.float },
        
        { id : "Requirement_FormattedID", alias : "Requirement FormattedID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Requirement_Iteration", alias : "Requirement Itearation Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "Requirement_IterationID", alias : "Requirement Iteration ID", dataType : tableau.dataTypeEnum.string },
       
        { id : "RunDate", alias : "Run Date", dataType : tableau.dataTypeEnum.date },
        
        //{ id : "RunProject", alias : "Run Project", dataType : tableau.dataTypeEnum.string },
        
        { id : "Severity", alias : "Severity", dataType : tableau.dataTypeEnum.string },    
    ];
        
    var defectTabel = {
        id : "Defect",
        alias : "Defect Data",
        columns : defect_cols
    };
        
    var task_cols=[
       // { id : "ID", alias : "AutoID", dataType : tableau.dataTypeEnum.float },
        
        { id : "FormattedID", alias : "FormattedID", dataType : tableau.dataTypeEnum.string },
        
        { id : "IterationName", alias : "Iteration Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "IterationID", alias : "Iteation ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Actuals", alias : "Actuals", dataType : tableau.dataTypeEnum.float },
        
        { id : "Estimate", alias : "Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "ToDo", alias : "To Do", dataType : tableau.dataTypeEnum.float },
        
        { id : "TimeSpent", alias : "Time Spent", dataType : tableau.dataTypeEnum.float },
        
        { id : "State", alias : "State", dataType : tableau.dataTypeEnum.float },
        
        { id : "Tags", alias : "Tags", dataType : tableau.dataTypeEnum.string },
        
        { id : "TaskType", alias : "Task Type", dataType : tableau.dataTypeEnum.string },
        
        { id : "Owner", alias : "Owner", dataType : tableau.dataTypeEnum.string },
        
        { id : "Project", alias : "Project Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "Release", alias : "Release Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ReleaseID", alias : "Release ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "WorkProduct_FormattedID", alias : "Work Product ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "LastUpdateDate", alias : "Last Update", dataType : tableau.dataTypeEnum.date },
        
        { id : "CreationDate", alias : "Creation Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "ObjectID", alias : "Task ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "RunDate", alias : "Run Date", dataType : tableau.dataTypeEnum.date },
        
        //{ id : "RunProject", alias : "Run", dataType : tableau.dataTypeEnum.string },
                    ];
    
    var taskTabel = {
        id : "Task",
        alias : "Task Data",
        columns : task_cols
    };
        
    var portfolioItem_cols=[
       // { id : "ID", alias : "AutoID", dataType : tableau.dataTypeEnum.float },
        
        { id : "FormattedID", alias : "FormattedID", dataType : tableau.dataTypeEnum.string },
        
        { id : "ObjectID", alias : "Portfolio Item ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "PortfolioItemName", alias : "Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectName", alias : "Project Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ProjectID", alias : "Project ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "ParentName", alias : "Parent Name", dataType : tableau.dataTypeEnum.string },
        
        { id : "ParentID", alias : "Parent ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "State", alias : "State", dataType : tableau.dataTypeEnum.string },
        
        { id : "AcceptedLeafStoryCount", alias : "Accepted Leaf Story Count", dataType : tableau.dataTypeEnum.float },
        
        { id : "AcceptedLeafPlanEstimate", alias : "Accepted Leaf Plan Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "ActualEndDate", alias : "Actual End Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "ActualStartDate", alias : "Actual Start Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "InvestmentCategory", alias : "Investment Category", dataType : tableau.dataTypeEnum.string },
        
        { id : "JobSize", alias : "Job Size", dataType : tableau.dataTypeEnum.float },
        
        { id : "LeafStoryCount", alias : "Leaf Story Count", dataType : tableau.dataTypeEnum.float },
        
        { id : "LeafStoryPlanEstimateTotal", alias : "Leaf Story Plan Estimate Total ", dataType : tableau.dataTypeEnum.float },
        
        { id : "PercentDoneByStoryCount", alias : "Percent Done By Stop Count", dataType : tableau.dataTypeEnum.float },
        
        { id : "PercentDoneByStoryPlaneEstimate", alias : "Percent Done By Plan Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "PlannedEndDate", alias : "Planned End Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "PlannedStartDate", alias : "Planned Start Date", dataType : tableau.dataTypeEnum.date },
        
        { id : "PortfolioItem_Type", alias : "Type", dataType : tableau.dataTypeEnum.string },
        
        { id : "PerliminaryEstimate", alias : "Perliminary Estimate", dataType : tableau.dataTypeEnum.string },
        
        { id : "UnEstimatedLeafStoryCount", alias : "UnEstimated Leaf Story Count", dataType : tableau.dataTypeEnum.string },
        
        { id : "Tags", alias : "Tags", dataType : tableau.dataTypeEnum.string },
      
        { id : "RefinedEstimate", alias : "Refined Estimate", dataType : tableau.dataTypeEnum.float },
        
        { id : "Description", alias : "Description", dataType : tableau.dataTypeEnum.string },
        
        { id : "EPMSid", alias : "EPMSid", dataType : tableau.dataTypeEnum.string },
        
        { id : "Release", alias : "Release", dataType : tableau.dataTypeEnum.string },
        
        { id : "ReleaseID", alias : "Release ID", dataType : tableau.dataTypeEnum.string },
        
        { id : "RunDate", alias : "RunDate", dataType : tableau.dataTypeEnum.date },
        
       // { id : "RunProject", alias : "Run", dataType : tableau.dataTypeEnum.string },
      ];
    
    var portfolioItemTabel = {
        id : "PortfolioItem",
        alias : "Portfolio Item Data",
        columns : portfolioItem_cols
    };

  schemaCallback([userStoryTabel, iterationTable, projectTable, releaseTable,defectTabel,taskTabel,portfolioItemTabel]);
};
    //Pulling Data From Rally
    console.log("Get Data");
    myConnector.getData = function(table, doneCallback) {
        //Setting Date
        var today = new Date();
        var dd = today.getDay();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        //Incremental Refresh
        var incrementDate = new Date();
       incrementDate = Date.parse(table.incrementValue || 1);
        
        
        
            if(dd<10) {
    dd = '0'+dd
} 

            if(mm<10) {
    mm = '0'+mm
} 

        today = mm + '/' + dd + '/' + yyyy;
        todayTest=today+1;
        
    $.getJSON("http://localhost:3000", function(resp) {
        var feat = resp,
            tableData = []
            i=0;
console.log(incrementDate);
console.log(Date.parse(today))
console.log(Date.parse(todayTest));
        
          if (table.tableInfo.id == "UserStory"){
              if(incrementDate < Date.parse(todayTest)){
                for (var i = 0, len = feat.userStory.length; i < len; i++) {
                    
                    tableData.push({
                    //"HR_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ),
                    //"ID": ,
                    "FormattedID": feat.userStory[i].FormattedID,
                    "PlanEstimate": feat.userStory[i].PlanEstimate,
                    "Rank": feat.userStory[i].Rank,
                    "ScheduleState": feat.userStory[i].ScheduleState,
                    "IterationName": feat.userStory[i].Iteration,
                    "IterationID": feat.userStory[i].Iteration,
                    "Tags": feat.userStory[i].Tags._tagsNameArray,
                    "StoryType": feat.userStory[i].c_Type,
                    "WorkState": feat.userStory[i].c_WorkState,
                    "AcceptedDate": feat.userStory[i].AcceptedDate,
                    "IsTestable": feat.userStory[i].c_IsTestable,
                    "FeatureNumber": feat.userStory[i].Feature,
                    "FeatureName": feat.userStory[i].Feature,
                    "OwnerName": feat.userStory[i].Owner,
                    "ProjectName": feat.userStory[i].Project._refObjectName,
                    "ProjectID": feat.userStory[i].Project._ref.substring(feat.userStory[i].Project._ref.lastIndexOf("/")+1, feat.userStory[i].Project._ref.length ),
                    "ReleaseName": feat.userStory[i].Release,
                    "ReleaseID": feat.userStory[i].Release,
                    "Capability": feat.userStory[i].c_Capability,
                    "RunDate": today,
                    "ObjectID": feat.userStory[i].ObjectID,
                    "DirectChildren": feat.userStory[i].DirectChildrenCount,
                    //"RunProject": feat[i].DirectChildrenCount,
                    "Name": feat.userStory[i]._refObjectName,
                                }); 
                    }
                  //Error Handeling  
                for (var i = 0, len = feat.userStory.length; i < len; i++){
                        
                if(tableData[i].IterationID !== null)
                {
                    tableData[i].IterationName= feat.userStory[i].Iteration._refObjectName;
                                    
                    tableData[i].IterationID= feat.userStory[i].Iteration.ObjectID;
                }
                if(tableData[i].FeatureName !== null)  { 
                try{
                
                    tableData[i].FeatureNumber=  feat.userStory[i].Feature.ObjectID;
                                    
                    tableData[i].FeatureName= feat.userStory[i].Feature.Name;
                
            }
                catch(e){
                    tableData[i].FeatureNumber =null;
                
                    tableData[i].FeatureName= null;
            }
            }
                
                if(tableData[i].OwnerName !== null)
                {
                    tableData[i].OwnerName= feat.userStory[i].Owner._refObjectName;           
                }
                if(tableData[i].ReleaseName !== null)
                {
                    tableData[i].ReleaseName=  feat.userStory[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.userStory[i].Release.ObjectID;
                }
                try
                {
                    tableData[i].Tags= feat.userStory[i].Tags._tagsNameArray.Name;           
                }
                catch(e){
                     tableData[i].Tags= feat.userStory[i].Tags;
                }
                                                            }   
                                               }
          }
          // Iteration Call  
          if (table.tableInfo.id == "Iteration"){
                for (var i = 0, len = feat.iteration.length; i < len; i++) {
                tableData.push({
                    
                    //"ID":"",
                    "Name": feat.iteration[i]._refObjectName,
                    "StartDate": feat.iteration[i].StartDate,
                    "EndDate": feat.iteration[i].EndDate,
                    "ProjectName": feat.iteration[i].Project._refObjectName,
                    "ProjectID": feat.iteration[i].Project._ref.substring(feat.iteration[i].Project._ref.lastIndexOf("/")+1, feat.iteration[i].Project._ref.length ),
                    "PlanEstimate": feat.iteration[i].PlanEstimate,
                    "PlannedVelocity": feat.iteration[i].PlannedVelocity,
                    "ObjectID": feat.iteration[i].ObjectID,
                    "State": feat.iteration[i].State,
                    "TaskActualTotal": feat.iteration[i].TaskActualTotal,
                    "TaskEstimateTotal": feat.iteration[i].TaskEstimateTotal,
                    "TaskRemainingTotal": feat.iteration[i].TaskRemainingTotal,
                    
                    //"Iteration_Sequence": feat[i].Iteration.State,
                                });
                                                            }
                                                }
          // Project Call    
          if (table.tableInfo.id == "Project"){
            for (var i = 0, len = feat.project.length; i < len; i++) {
            //Project Check
            try{
                tableData.push({
                   // "HR_Project_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ),
                    "ID": '',
                    "Name": feat.project[i]._refObjectName,
                    "ProjectID": feat.project[i]._ref.substring(feat.project[i]._ref.lastIndexOf("/")+1, feat.project[i]._ref.length ),
                    "ParentName": feat.project[i].Parent.Name,
                    "ParentID": feat.project[i].Parent.ObjectID,
                    "WorkspaceName": feat.project[i].Workspace.Name,
                    "WorkspaceID": feat.project[i].Workspace.ObjectID,
                                });
                }
            catch(e){
                     tableData.push({
                   // "HR_Project_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ),
                    "ID": '',
                    "Name": feat.project[i]._refObjectName,
                    "ProjectID": feat.project[i]._ref.substring(feat.project[i]._ref.lastIndexOf("/")+1, feat.project[i]._ref.length ),
                    "WorkspaceName": feat.project[i].Workspace.Name,
                    "WorkspaceID": feat.project[i].Workspace.ObjectID,
                                });
                    }
                                                                }
                                                }
          // Release Call 
          if (table.tableInfo.id == "Release"){
            for (var i = 0, len = feat.release.length; i < len; i++) {
            //Release Check
            
                tableData.push({
                    //"HR_Release_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ), 
                    "ID": '',
                    "Name": feat.release[i]._refObjectName,
                    "ObjectID": feat.release[i].ObjectID,
                    "Accepted": feat.release[i].Accepted,
                    "PlanEstimate": feat.release[i].PlanEstimate,
                    "PlannedVelocity": feat.release[i].PlannedVelocity,
                    "ProjectName": feat.release[i].Project._refObjectName,
                    "ProjectID": feat.release[i].Project._ref.substring(feat.release[i].Project._ref.lastIndexOf("/")+1, feat.release[i].Project._ref.length ),
                    "EndDate": feat.release[i].ReleaseDate,
                    "StartDate": feat.release[i].ReleaseStartDate,
                    "State": feat.release[i].State,
                    "TaskActualTotal": feat.release[i].TaskActualTotal,
                    "TaskEstimateTotal": feat.release[i].TaskEstimateTotal,
                    "TaskRemainingTotal": feat.release[i].TaskRemainingTotal,
                    //"Release_LastUpdated": feat[i].Release.Notes,
                                });
                
                                                   }
                                            }
          // Defect Call
          if (table.tableInfo.id == "Defect"){
            for (var i = 0, len = feat.defect.length; i < len; i++) {
            //Defect Check
                tableData.push({
                    //"HR_Release_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ), 
                    "ID": "",
                    "FormattedID": feat.defect[i].FormattedID,
                    "ClosedDate": feat.defect[i].ClosedDate,
                    "CreationDate": feat.defect[i].CreationDate,
                    "AcceptedDate": feat.defect[i].AcceptedDate,
                    "PlanEstimate": feat.defect[i].PlanEstimate,
                    "Rank": feat.defect[i].Rank,
                    "ScheduleState": feat.defect[i].ScheduleState,
                    "State": feat.defect[i].State,
                    "Enviroment": feat.defect[i].Environment,
                    "Priority": feat.defect[i].Priority,
                    "FoundBy": feat.defect[i].c_FoundBy,
                    "IterationName": feat.defect[i].Iteration,
                    "IterationID": feat.defect[i].Iteration,
                    "Owner": feat.defect[i].Owner,
                    "ProjectName": feat.defect[i].Project._refObjectName,
                    "ProjectID": feat.defect[i].Project._ref.substring(feat.defect[i].Project._ref.lastIndexOf("/")+1, feat.defect[i].Project._ref.length ),
                    "ReleaseName": feat.defect[i].Release,
                    "ReleaseID": feat.defect[i].Release,
                    "Tags": feat.defect[i].Tags._tagsNameArray,
                    "ObjectID":feat.defect[i].ObjectID,
                    "Requirement_FormattedID": feat.defect[i].Requirement,
                    "Requirement_Iteration": feat.defect[i].Requirement,
                    "Requirement_IterationID": feat.defect[i].Requirement,
                    "RunDate": today,
                    //"RunProject": feat[i].Release.TaskRmainingTotal,
                    "Severity": feat.defect[i].Severity,
                    //"Release_LastUpdated": feat[i].Release.Notes,
                                });
                }                                        
            //Error Handling  
            for (var i = 0, len = feat.defect.length; i < len; i++){
                        
            if(tableData[i].IterationID !== null)
                {
                    tableData[i].IterationName= feat.defect[i].Iteration.Name;
                                    
                    tableData[i].IterationID= feat.defect[i].Iteration.ObjectID;
                }
            if(tableData[i].Owner !== null)
                {
                    tableData[i].Owner= feat.defect[i].Owner._refObjectName;           
                }
            if(tableData[i].ReleaseName !== null)
                {
                    tableData[i].ReleaseName=  feat.defect[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.defect[i].Release.ObjectID;
                }
            if(tableData[i].Requirement_FormattedID !== null)
                {
                    try{
                    tableData[i].Requirement_FormattedID= feat.defect[i].Requirement.FormattedID;
                    }
                    catch(e){
                        tableData[i].Requirement_FormattedID='';
                    }   
                }
             if(tableData[i].Requirement_Iteration !== null)
                {
                    try{
                     tableData[i].Requirement_Iteration= feat.defect[i].Requirement.Iteration.Name;
                                    
                    tableData[i].Requirement_IterationID= feat.defect[i].Requirement.Iteration.ObjectID;
                }
                    catch(e){
                        tableData[i].Requirement_Iteration= null;
                                    
                    tableData[i].Requirement_IterationID= null;
                    }
                                                            }
                                                     }
          }
          // Task Call 
          if (table.tableInfo.id == "Task"){
            for (var i = 0, len = feat.task.length; i < len; i++) {
            //Release Check
                tableData.push({
                    //"HR_Release_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ), 
                    "ID": '',
                    "FormattedID": feat.task[i].FormattedID,
                    "IterationName": feat.task[i].Iteration,
                    "IterationID": feat.task[i].Iteration,
                    "Actuals": feat.task[i].Actuals,
                    "Estimate": feat.task[i].Estimate,
                    "ToDo": feat.task[i].ToDo,
                    "TimeSpent": feat.task[i].TimeSpent,
                    "StartDate": feat.task[i].ReleaseStartDate,
                    "State": feat.task[i].State,
                    "Tags": feat.task[i].Tags._tagsNameArray,
                    "TaskType": feat.task[i].c_Type,
                    "Owner": feat.task[i].Owner,
                    "Project": feat.task[i].Project,
                    "ProjectID": feat.task[i].Project,
                    "Release": feat.task[i].Release,
                    "ReleaseID": feat.task[i].Release,
                    "WorkProduct_FormattedID": feat.task[i].WorkProduct.FormattedID,
                    "LastUpdateDate": feat.task[i].LastUpdateDate,
                    "CreationDate": feat.task[i].CreationDate,
                    "ObjectID": feat.task[i].ObjectID,
                    "RunDate": today,
                    //"RunProject":'',
                                });
                                                            }
            for (var i = 0, len = feat.task.length; i < len; i++){
                        
            if(tableData[i].IterationName !== null)
                {
                    tableData[i].IterationName= feat.task[i].Iteration.Name;
                                    
                    tableData[i].IterationID= feat.task[i].Iteration.ObjectID;
                }
            if(tableData[i].Owner !== null)
                {
                    tableData[i].Owner= feat.task[i].Owner._refObjectName;           
                }
            if(tableData[i].Release !== null)
                {
                    tableData[i].Release=  feat.task[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.task[i].Release.ObjectID;
                }
            if(tableData[i].Project !== null)
                {
                    tableData[i].Project= feat.task[i].Project._refObjectName;
                    
                    tableData[i].ProjectID= feat.task[i].Project._ref.substring(feat.task[i].Project._ref.lastIndexOf("/")+1, feat.task[i].Project._ref.length );
                }
                                            }
                                            }
          // PortfolioItem Call
          if (table.tableInfo.id == "PortfolioItem"){
            for (var i = 0, len =  feat.portfolioItem.length; i < len; i++) {
            //PortfolioItem Check
                tableData.push({
                    "ID": '',
                    "FormattedID": feat.portfolioItem[i].FormattedID,
                    "ObjectID": feat.portfolioItem[i].ObjectID,
                    "PortfolioItemName": feat.portfolioItem[i].Name,
                    "ProjectName": feat.portfolioItem[i].Project,
                    "ProjectID": feat.portfolioItem[i].Project,
                    "ParentName": feat.portfolioItem[i].PortfolioItemType.Parent,
                    "ParentID": feat.portfolioItem[i].PortfolioItemType.Parent,
                    "State": feat.portfolioItem[i].State.Name,
                    "AcceptedLeafStoryCount": feat.portfolioItem[i].AcceptedLeafStoryCount,
                    "AcceptedLeafPlanEstimate": feat.portfolioItem[i].AcceptedLeafStoryPlanEstimateTotal,
                    "ActualEndDate": feat.portfolioItem[i].ActualEndDate,
                    "ActualStartDate": feat.portfolioItem[i].ActualStartDate,
                    "InvestmentCategory": feat.portfolioItem[i].InvestmentCategory,
                    "JobSize": feat.portfolioItem[i].JobSize,
                    "LeafStoryCount": feat.portfolioItem[i].LeafStoryCount,
                    "LeafStoryPlanEstimateTotal": feat.portfolioItem[i].LeafStoryPlanEstimateTotal,
                    "PercentDoneByStoryCount": feat.portfolioItem[i].PercentDoneByStoryCount,
                    "PercentDoneByStoryPlaneEstimate": feat.portfolioItem[i].PercentDoneByStoryPlanEstimate,
                    "PlannedEndDate": feat.portfolioItem[i].PlannedEndDate,
                    "PlannedStartDate": feat.portfolioItem[i].PlannedStartDate,
                    "PortfolioItem_Type": feat.portfolioItem[i].PortfolioItemType.Name,
                    "PerliminaryEstimate": feat.portfolioItem[i].PreliminaryEstimate,
                    "UnEstimatedLeafStoryCount": feat.portfolioItem[i].UnEstimatedLeafStoryCount,
                    "Tags": feat.portfolioItem[i].Tags._tagsNameArray,
                    "RefinedEstimate": feat.portfolioItem[i].RefinedEstimate,
                    "Description": feat.portfolioItem[i].Description,
                    "EPMSid": feat.portfolioItem[i].c_EPMSID,
                    "Release": feat.portfolioItem[i].Release,
                    "ReleaseID": feat.portfolioItem[i].Release,
                    "RunDate": today,
                    //"RunProject":'',
                              });
                                                                }                                               
            for (var i = 0, len = feat.portfolioItem.length; i < len; i++){
                        
            if(tableData[i].ProjectName !== null)
                {
                    tableData[i].ProjectName= feat.portfolioItem[i].Project._refObjectName;
                                    
                    tableData[i].ProjectID= feat.portfolioItem[i].Project._ref.substring(feat.portfolioItem[i].Project._ref.lastIndexOf("/")+1, feat.portfolioItem[i].Project._ref.length );
                }
            if(tableData[i].Release !== null)
                {
                    tableData[i].Release=  feat.portfolioItem[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.portfolioItem[i].Release.ObjectID;
                }
            if(tableData[i].ParentName !== null)
                {
                    tableData[i].ParentName= feat.portfolioItem[i].PortfolioItemType.Parent.Name;
                    
                    tableData[i].ParentID= feat.portfolioItem[i].PortfolioItemType.Parent.ObjectID;
                }
          
                                                                }
                                            }
        
            
        table.appendRows(tableData);
        doneCallback();
    });
};
    //Sending to tableau
    tableau.registerConnector(myConnector);
    console.log("Get Data Worked Tableau Connector created");
};

methods.accessTableau =function() {
    ssn = req.session; 
    tableau.connectionName = "Rally Data Import";
    tableau.submit();
    console.log("Connected to tableau");
};
exports.data =methods;