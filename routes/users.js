
//
// Projet Elsa
//

//
// Router
//

var express	= require('express');
var router	= express.Router();
var User	= require('../model/User.js');

// GET users list
router.get('/neighboors', function(req, res) {
	res.status(200).send();
});

// PUT inventory
router.put('/inventory', function(req, res) {
	res.status(200).send();
});

module.exports = router;