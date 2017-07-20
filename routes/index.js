//Create a router instance
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
   var x=0;
    if(x ==0){
        x=x+1;
        res.sendFile('index.html',{root: './views'});
        
    }
    if(x==2){
        res.sendFile('tableau.html',{root: './views'});
    }  
});
router.use(express.static( 'public'));
router.post('/', function (req,res){
    res.sendFile('login.html',{root: './views'});
    //res.render('login.html');
});
module.exports = router;