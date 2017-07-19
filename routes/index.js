//Create a router instance
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
console.log("/ Get fired");
 res.sendFile('index.html',{root: './views'});
    
});
router.use(express.static( 'public'));
router.post('/', function (req,res){
    res.sendFile('login.html',{root: './views'});
    //res.render('login.html');
});
module.exports = router;