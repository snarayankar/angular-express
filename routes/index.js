var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/data', function(req,res){
    res.json([{"id": 1, "name": "Santosh", "city": "Washington DC"}]);
});

module.exports = router;
