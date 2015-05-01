
//
// Projet Elsa
//

//
// Router
//

var express	= require('express');
var router	= express.Router();
var User	= require('../model/User.js');


//
// Current user's neighboors routes
//
router.route('/neighboors')

	// GET neighboors of the current user
	.get(function(req, res) {
		res.status(200).send();
	});


//
// Current user's inventory routes
//
router.route('/inventory')

	// PUT inventory
	.put(function(req, res) {
		console.log(req.body);
		res.status(200).send();
	});

module.exports = router;