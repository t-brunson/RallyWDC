(function() {
    console.log("Rally WDC Has Started");
    // Create tableau connector
    var myConnector = tableau.makeConnector();
    
    myConnector.getSchema = function (schemaCallback) {   
        console.log("Inside Get Schema Function Started");
        tableau.log("Inside Get Schema Function Started");
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
    
     myConnector.getData = function(table, doneCallback) {
        console.log("Inside Get Data Function Called");
        tableau.log("Inside Get Data Function Called");
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
        
        var todayTest=today+1;
  
            console.log("Inside Get JSON Data JQuery Fired");
            tableau.log("Inside Get JSON Data JQuery Fired");
        
            var feat =  JSON.parse(tableau.connectionData),
            tableData = []
            i=0;
        
            console.log(feat.userStory.Results);
          if (table.tableInfo.id == "UserStory"){
                for (var i = 0, len = feat.userStory.Results.length; i < len; i++) {
                    
                    tableData.push({
                    //"HR_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ),
                    //"ID": ,
                    "FormattedID": feat.userStory.Results[i].FormattedID,
                    "PlanEstimate": feat.userStory.Results[i].PlanEstimate,
                    "Rank": feat.userStory.Results[i].Rank,
                    "ScheduleState": feat.userStory.Results[i].ScheduleState,
                    "IterationName": feat.userStory.Results[i].Iteration,
                    "IterationID": feat.userStory.Results[i].Iteration,
                    "Tags": feat.userStory.Results[i].Tags._tagsNameArray,
                    "StoryType": feat.userStory.Results[i].c_Type,
                    "WorkState": feat.userStory.Results[i].c_WorkState,
                    "AcceptedDate": feat.userStory.Results[i].AcceptedDate,
                    "IsTestable": feat.userStory.Results[i].c_IsTestable,
                    "FeatureNumber": feat.userStory.Results[i].Feature,
                    "FeatureName": feat.userStory.Results[i].Feature,
                    "OwnerName": feat.userStory.Results[i].Owner,
                    "ProjectName": feat.userStory.Results[i].Project._refObjectName,
                    "ProjectID": feat.userStory.Results[i].Project._ref.substring(feat.userStory.Results[i].Project._ref.lastIndexOf("/")+1, feat.userStory.Results[i].Project._ref.length ),
                    "ReleaseName": feat.userStory.Results[i].Release,
                    "ReleaseID": feat.userStory.Results[i].Release,
                    "Capability": feat.userStory.Results[i].c_Capability,
                    "RunDate": today,
                    "ObjectID": feat.userStory.Results[i].ObjectID,
                    "DirectChildren": feat.userStory.Results[i].DirectChildrenCount,
                    //"RunProject": feat.Results[i].DirectChildrenCount,
                    "Name": feat.userStory.Results[i]._refObjectName,
                                }); 
                    }
                  //Error Handeling  
                for (var i = 0, len = feat.userStory.Results.length; i < len; i++){
                        
                if(tableData[i].IterationID !== null)
                {
                    tableData[i].IterationName= feat.userStory.Results[i].Iteration._refObjectName;
                                    
                    tableData[i].IterationID= feat.userStory.Results[i].Iteration.ObjectID;
                }
                if(tableData[i].FeatureName !== null)  { 
                try{
                
                    tableData[i].FeatureNumber=  feat.userStory.Results[i].Feature.ObjectID;
                                    
                    tableData[i].FeatureName= feat.userStory.Results[i].Feature.Name;
                
            }
                catch(e){
                    tableData[i].FeatureNumber =null;
                
                    tableData[i].FeatureName= null;
            }
            }
                
                if(tableData[i].OwnerName !== null)
                {
                    tableData[i].OwnerName= feat.userStory.Results[i].Owner._refObjectName;           
                }
                if(tableData[i].ReleaseName !== null)
                {
                    tableData[i].ReleaseName=  feat.userStory.Results[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.userStory.Results[i].Release.ObjectID;
                }
                try
                {
                    tableData[i].Tags= feat.userStory.Results[i].Tags._tagsNameArray.Name;           
                }
                catch(e){
                     tableData[i].Tags= feat.userStory.Results[i].Tags;
                }
                                                            }   
                                               }
          // Iteration Call  
          if (table.tableInfo.id == "Iteration"){
                for (var i = 0, len = feat.iteration.Results.length; i < len; i++) {
                tableData.push({
                    
                    //"ID":"",
                    "Name": feat.iteration.Results[i]._refObjectName,
                    "StartDate": feat.iteration.Results[i].StartDate,
                    "EndDate": feat.iteration.Results[i].EndDate,
                    "ProjectName": feat.iteration.Results[i].Project._refObjectName,
                    "ProjectID": feat.iteration.Results[i].Project._ref.substring(feat.iteration.Results[i].Project._ref.lastIndexOf("/")+1, feat.iteration.Results[i].Project._ref.length ),
                    "PlanEstimate": feat.iteration.Results[i].PlanEstimate,
                    "PlannedVelocity": feat.iteration.Results[i].PlannedVelocity,
                    "ObjectID": feat.iteration.Results[i].ObjectID,
                    "State": feat.iteration.Results[i].State,
                    "TaskActualTotal": feat.iteration.Results[i].TaskActualTotal,
                    "TaskEstimateTotal": feat.iteration.Results[i].TaskEstimateTotal,
                    "TaskRemainingTotal": feat.iteration.Results[i].TaskRemainingTotal,
                    
                    //"Iteration_Sequence": feat[i].Iteration.State,
                                });
                                                            }
                                                }
          // Project Call    
          if (table.tableInfo.id == "Project"){
            for (var i = 0, len = feat.project.Results.length; i < len; i++) {
            //Project Check
            try{
                tableData.push({
                   // "HR_Project_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ),
                    "ID": '',
                    "Name": feat.project.Results[i]._refObjectName,
                    "ProjectID": feat.project.Results[i]._ref.substring(feat.project.Results[i]._ref.lastIndexOf("/")+1, feat.project.Results[i]._ref.length ),
                    "ParentName": feat.project.Results[i].Parent.Name,
                    "ParentID": feat.project.Results[i].Parent.ObjectID,
                    "WorkspaceName": feat.project.Results[i].Workspace.Name,
                    "WorkspaceID": feat.project.Results[i].Workspace.ObjectID,
                                });
                }
            catch(e){
                     tableData.push({
                   // "HR_Project_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ),
                    "ID": '',
                    "Name": feat.project.Results[i]._refObjectName,
                    "ProjectID": feat.project.Results[i]._ref.substring(feat.project.Results[i]._ref.lastIndexOf("/")+1, feat.project.Results[i]._ref.length ),
                    "WorkspaceName": feat.project.Results[i].Workspace.Name,
                    "WorkspaceID": feat.project.Results[i].Workspace.ObjectID,
                                });
                    }
                                                                }
                                                }
          // Release Call 
          if (table.tableInfo.id == "Release"){
            for (var i = 0, len = feat.release.Results.length; i < len; i++) {
            //Release Check
            
                tableData.push({
                    //"HR_Release_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ), 
                    "ID": '',
                    "Name": feat.release.Results[i]._refObjectName,
                    "ObjectID": feat.release.Results[i].ObjectID,
                    "Accepted": feat.release.Results[i].Accepted,
                    "PlanEstimate": feat.release.Results[i].PlanEstimate,
                    "PlannedVelocity": feat.release.Results[i].PlannedVelocity,
                    "ProjectName": feat.release.Results[i].Project._refObjectName,
                    "ProjectID": feat.release.Results[i].Project._ref.substring(feat.release.Results[i].Project._ref.lastIndexOf("/")+1, feat.release.Results[i].Project._ref.length ),
                    "EndDate": feat.release.Results[i].ReleaseDate,
                    "StartDate": feat.release.Results[i].ReleaseStartDate,
                    "State": feat.release.Results[i].State,
                    "TaskActualTotal": feat.release.Results[i].TaskActualTotal,
                    "TaskEstimateTotal": feat.release.Results[i].TaskEstimateTotal,
                    "TaskRemainingTotal": feat.release.Results[i].TaskRemainingTotal,
                    //"Release_LastUpdated": feat.Results[i].Release.Notes,
                                });
                
                                                   }
                                            }
          // Defect Call
          if (table.tableInfo.id == "Defect"){
            for (var i = 0, len = feat.defect.Results.length; i < len; i++) {
            //Defect Check
                tableData.push({
                    //"HR_Release_ref": feat.Results[i]._ref.substring(feat.Results[i]._ref.lastIndexOf("/")+1, feat.Results[i]._ref.length ), 
                    "ID": "",
                    "FormattedID": feat.defect.Results[i].FormattedID,
                    "ClosedDate": feat.defect.Results[i].ClosedDate,
                    "CreationDate": feat.defect.Results[i].CreationDate,
                    "AcceptedDate": feat.defect.Results[i].AcceptedDate,
                    "PlanEstimate": feat.defect.Results[i].PlanEstimate,
                    "Rank": feat.defect.Results[i].Rank,
                    "ScheduleState": feat.defect.Results[i].ScheduleState,
                    "State": feat.defect.Results[i].State,
                    "Enviroment": feat.defect.Results[i].Environment,
                    "Priority": feat.defect.Results[i].Priority,
                    "FoundBy": feat.defect.Results[i].c_FoundBy,
                    "IterationName": feat.defect.Results[i].Iteration,
                    "IterationID": feat.defect.Results[i].Iteration,
                    "Owner": feat.defect.Results[i].Owner,
                    "ProjectName": feat.defect.Results[i].Project._refObjectName,
                    "ProjectID": feat.defect.Results[i].Project._ref.substring(feat.defect.Results[i].Project._ref.lastIndexOf("/")+1, feat.defect.Results[i].Project._ref.length ),
                    "ReleaseName": feat.defect.Results[i].Release,
                    "ReleaseID": feat.defect.Results[i].Release,
                    "Tags": feat.defect.Results[i].Tags._tagsNameArray,
                    "ObjectID":feat.defect.Results[i].ObjectID,
                    "Requirement_FormattedID": feat.defect.Results[i].Requirement,
                    "Requirement_Iteration": feat.defect.Results[i].Requirement,
                    "Requirement_IterationID": feat.defect.Results[i].Requirement,
                    "RunDate": today,
                    //"RunProject": feat.Results[i].Release.TaskRmainingTotal,
                    "Severity": feat.defect.Results[i].Severity,
                    //"Release_LastUpdated": feat[i].Release.Notes,
                                });
                }                                        
            //Error Handling  
            for (var i = 0, len = feat.defect.Results.length; i < len; i++){
                        
            if(tableData[i].IterationID !== null)
                {
                    tableData[i].IterationName= feat.defect.Results[i].Iteration.Name;
                                    
                    tableData[i].IterationID= feat.defect.Results[i].Iteration.ObjectID;
                }
            if(tableData[i].Owner !== null)
                {
                    tableData[i].Owner= feat.defect.Results[i].Owner._refObjectName;           
                }
            if(tableData[i].ReleaseName !== null)
                {
                    tableData[i].ReleaseName=  feat.defect.Results[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.defect.Results[i].Release.ObjectID;
                }
            if(tableData[i].Requirement_FormattedID !== null)
                {
                    try{
                    tableData[i].Requirement_FormattedID= feat.defect.Results[i].Requirement.FormattedID;
                    }
                    catch(e){
                        tableData[i].Requirement_FormattedID='';
                    }   
                }
             if(tableData[i].Requirement_Iteration !== null)
                {
                    try{
                     tableData[i].Requirement_Iteration= feat.defect.Results[i].Requirement.Iteration.Name;
                                    
                    tableData[i].Requirement_IterationID= feat.defect.Results[i].Requirement.Iteration.ObjectID;
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
            for (var i = 0, len = feat.task.Results.length; i < len; i++) {
            //Release Check
                tableData.push({
                    //"HR_Release_ref": feat[i]._ref.substring(feat[i]._ref.lastIndexOf("/")+1, feat[i]._ref.length ), 
                    "ID": '',
                    "FormattedID": feat.task.Results[i].FormattedID,
                    "IterationName": feat.task.Results[i].Iteration,
                    "IterationID": feat.task.Results[i].Iteration,
                    "Actuals": feat.task.Results[i].Actuals,
                    "Estimate": feat.task.Results[i].Estimate,
                    "ToDo": feat.task.Results[i].ToDo,
                    "TimeSpent": feat.task.Results[i].TimeSpent,
                    "StartDate": feat.task.Results[i].ReleaseStartDate,
                    "State": feat.task.Results[i].State,
                    "Tags": feat.task.Results[i].Tags._tagsNameArray,
                    "TaskType": feat.task.Results[i].c_Type,
                    "Owner": feat.task.Results[i].Owner,
                    "Project": feat.task.Results[i].Project,
                    "ProjectID": feat.task.Results[i].Project,
                    "Release": feat.task.Results[i].Release,
                    "ReleaseID": feat.task.Results[i].Release,
                    "WorkProduct_FormattedID": feat.task.Results[i].WorkProduct.FormattedID,
                    "LastUpdateDate": feat.task.Results[i].LastUpdateDate,
                    "CreationDate": feat.task.Results[i].CreationDate,
                    "ObjectID": feat.task.Results[i].ObjectID,
                    "RunDate": today,
                    //"RunProject":'',
                                });
                                                            }
            for (var i = 0, len = feat.task.Results.length; i < len; i++){
                        
            if(tableData[i].IterationName !== null)
                {
                    tableData[i].IterationName= feat.task.Results[i].Iteration.Name;
                                    
                    tableData[i].IterationID= feat.task.Results[i].Iteration.ObjectID;
                }
            if(tableData[i].Owner !== null)
                {
                    tableData[i].Owner= feat.task.Results[i].Owner._refObjectName;           
                }
            if(tableData[i].Release !== null)
                {
                    tableData[i].Release=  feat.task.Results[i].Release.Name;
                                    
                    tableData[i].ReleaseID= feat.task.Results[i].Release.ObjectID;
                }
            if(tableData[i].Project !== null)
                {
                    tableData[i].Project= feat.task.Results[i].Project._refObjectName;
                    
                    tableData[i].ProjectID= feat.task.Results[i].Project._ref.substring(feat.task.Results[i].Project._ref.lastIndexOf("/")+1, feat.task.Results[i].Project._ref.length );
                }
                                            }
                                            }
          // PortfolioItem Call
          if (table.tableInfo.id == "PortfolioItem"){
            for (var i = 0, len =  feat.portfolioItem.Results.length; i < len; i++) {
            //PortfolioItem Check
                tableData.push({
                    "ID": '',
                    "FormattedID": feat.portfolioItem.Results[i].FormattedID,
                    "ObjectID": feat.portfolioItem.Results[i].ObjectID,
                    "PortfolioItemName": feat.portfolioItem.Results[i].Name,
                    "ProjectName": feat.portfolioItem.Results[i].Project,
                    "ProjectID": feat.portfolioItem.Results[i].Project,
                    "ParentName": feat.portfolioItem.Results[i].PortfolioItemType.Parent,
                    "ParentID": feat.portfolioItem.Results[i].PortfolioItemType.Parent,
                    //"State": feat.portfolioItem.Results[i].State.Name,
                    "AcceptedLeafStoryCount": feat.portfolioItem.Results[i].AcceptedLeafStoryCount,
                    "AcceptedLeafPlanEstimate": feat.portfolioItem.Results[i].AcceptedLeafStoryPlanEstimateTotal,
                    "ActualEndDate": feat.portfolioItem.Results[i].ActualEndDate,
                    "ActualStartDate": feat.portfolioItem.Results[i].ActualStartDate,
                    "InvestmentCategory": feat.portfolioItem.Results[i].InvestmentCategory,
                    "JobSize": feat.portfolioItem.Results[i].JobSize,
                    "LeafStoryCount": feat.portfolioItem.Results[i].LeafStoryCount,
                    "LeafStoryPlanEstimateTotal": feat.portfolioItem.Results[i].LeafStoryPlanEstimateTotal,
                    "PercentDoneByStoryCount": feat.portfolioItem.Results[i].PercentDoneByStoryCount,
                    "PercentDoneByStoryPlaneEstimate": feat.portfolioItem.Results[i].PercentDoneByStoryPlanEstimate,
                    "PlannedEndDate": feat.portfolioItem.Results[i].PlannedEndDate,
                    "PlannedStartDate": feat.portfolioItem.Results[i].PlannedStartDate,
                    "PortfolioItem_Type": feat.portfolioItem.Results[i].PortfolioItemType.Name,
                    "PerliminaryEstimate": feat.portfolioItem.Results[i].PreliminaryEstimate,
                    "UnEstimatedLeafStoryCount": feat.portfolioItem.Results[i].UnEstimatedLeafStoryCount,
                    "Tags": feat.portfolioItem.Results[i].Tags._tagsNameArray,
                    "RefinedEstimate": feat.portfolioItem.Results[i].RefinedEstimate,
                    "Description": feat.portfolioItem.Results[i].Description,
                    "EPMSid": feat.portfolioItem.Results[i].c_EPMSID,
                    "Release": feat.portfolioItem.Results[i].Release,
                    "ReleaseID": feat.portfolioItem.Results[i].Release,
                    "RunDate": today,
                    //"RunProject":'',
                              }); 
                                                                }                                               
            for (var i = 0, len = feat.portfolioItem.Results.length; i < len; i++){
                        
            if(tableData[i].ProjectName !== null)
                {
                    tableData[i].ProjectName= feat.portfolioItem.Results[i].Project._refObjectName;
                                    
                    tableData[i].ProjectID= feat.portfolioItem.Results[i].Project._ref.substring(feat.portfolioItem.Results[i].Project._ref.lastIndexOf("/")+1, feat.portfolioItem.Results[i].Project._ref.length );
                }
            if(tableData[i].Release !== null)
                {
                    //tableData[i].Release=  feat.portfolioItem.Results[i].Release.Name;
                                    
                    //tableData[i].ReleaseID= feat.portfolioItem.Results[i].Release.ObjectID;
                }
            if(tableData[i].ParentName !== null)
                {
                    tableData[i].ParentName= feat.portfolioItem.Results[i].PortfolioItemType.Parent.Name;
                    
                    tableData[i].ParentID= feat.portfolioItem.Results[i].PortfolioItemType.Parent.ObjectID;
                }
          
                                                                }
                                            }
         
        table.appendRows(tableData);
        doneCallback();
        
    console.log("After Get JSON data has been fired");
    tableau.log("After Get JSON data has been fired");
};
        

   
    console.log("After Got Schema Function has been Fired");
    //Pulling Data From Rally
   
    console.log("After Get Data Function has been Fired");
    // Register the tableau connector, call this last
    tableau.registerConnector(myConnector);
    
    $(document).ready(function() {
        console.log("Inside Document Reay Function Started");
      $("#getdatabutton").click(function() {
          console.log("Get Data buton pressed");
          tableau.log("Get Data buton pressed");
          if(tableau.phase == tableau.phaseEnum.interactivePhase ) {
                console.log("Interactive Phase");
                tableau.log("Interactive Phase");
            $.getJSON("https://rallywdc.herokuapp.com/sendData", function(resp) {
            console.log("Inside Get JSON Data JQuery Fired");
            tableau.log("Inside Get JSON Data JQuery Fired");
            var feat = resp;
            tableau.connectionData=JSON.stringify(feat);
            tableau.connectionName = "Rally Data" ;
            
            tableau.submit();  
            });  
      };
          if(tableau.phase == tableau.phaseEnum.gatherDataPhase) {
                console.log("gatherDataPhase");
                tableau.log("gatherDataPhase");
            
           
            tableau.submit();  
            };  
      });
  });
    console.log("Rally WDC Has Fired All functions");
})();
