var express = require('express');
var router = express.Router();
var session = require('express-session');


// Require controller modules
var ssn;


/* GET home page. */
router.get('/submit',function(req,res){
    ssn = req.session; 

         res.json({userStory: ssn.hierarchicalrequirementJSON, iteration: ssn.IterationJSON, project: ssn.projectJSON, release: ssn.releaseJSON, defect: ssn.defectJSON, task: ssn.taskJSON, portfolioItem: ssn.portfolioItemJSON});
        console.log("/sendData Get Request sent data");
    
})
router.post('/', function(req, res,next) {
    console.log("Data was sent to tableau");
   
});

module.exports = router;