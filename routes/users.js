
var express = require('express');
var db = require('../db');

var router = express.Router();

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});


router.get('/', function(req, res, next) {
	db.query('select * from arc_archived_ofl where product_type = \'S5P.TROPOMI.L1B\'', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify(results, null, 4));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

module.exports = router;
