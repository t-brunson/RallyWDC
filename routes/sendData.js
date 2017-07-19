var express = require('express');
var router = express.Router();
var session = require('express-session');


// Require controller modules
var ssn;


/* GET home page. */
router.get('/',function(req,res){
    ssn = req.session; 
    res.json({userStory: ssn.hierarchicalrequirementJSON, iteration: ssn.IterationJSON, project: ssn.projectJSON, release: ssn.releaseJSON, defect: ssn.defectJSON, task: ssn.taskJSON, portfolioItem: ssn.portfolioItemJSON});
    console.log("Sending JSON Data to /sendData");
})
router.post('/', function(req, res,next) {
    console.log("Tableau Web connector displayed");
   res.sendFile('tableau.html',{root: './views'})
});

module.exports = router;