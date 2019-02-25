
var express = require('express');
var db = require('../db');

var router = express.Router();

router.get('/:orbit', function(req, res, next) {
	var orbit = req.params.orbit
	var sql = `select orbit_number, product_type, sensing_start_time, sensing_stop_time, revision, product_status, message_creation_time, message from proc_ofl where product_status != 'SUCCESS' and event_type = 'ProdGenerated' and product_type like 'S5P.TROPOMI.%' and orbit_number = ${orbit} order by sensing_start_time`;

	db.query(sql, function (error, results, fields) 
	{
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
	  		res.setHeader('Content-Type', 'application/json');
  			res.send(JSON.stringify(results, null, 4));
  			//res.json({ a: 1 });
	  	}
  	});
});

module.exports = router;
