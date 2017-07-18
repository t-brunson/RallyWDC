var express = require('express');
var router = express.Router();
var session = require('express-session');


// Require controller modules
var ssn;


/* GET home page. */
router.get('/',function(req,res){
    ssn = req.session; 
    res.json({userStory: ssn.hierarchicalrequirementJSON, iteration: ssn.IterationJSON, project: ssn.projectJSON, release: ssn.releaseJSON, defect: ssn.defectJSON, task: ssn.taskJSON, portfolioItem: ssn.portfolioItemJSON});
    console.log("Tabelau Requesting Data Request");
})
router.post('/', function(req, res,next) {
    console.log("");
   res.sendFile('index.html',{root: './public'})
});

module.exports = router;