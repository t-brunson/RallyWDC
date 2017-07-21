//Create a router instance
var express = require('express');
var router = express.Router();
var x=0;

/* GET home page. */
router.get('/', function(req, res) {
//First time visting 
    if(x = 0){
        x=1;
        console.log(x);
        res.sendFile('index.html',{root: './public'});
    }
res.sendFile('tableau.html',{root: './views'})       
});
        
      

router.use(express.static( 'public'));
router.post('/', function (req,res){
    res.sendFile('login.html',{root: './views'});
    //res.render('login.html');
});
module.exports = router;  