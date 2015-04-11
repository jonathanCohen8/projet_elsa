
//
// Projet Elsa
//

//
// Router
//

var express	= require('express');
var router	= express.Router();
var User	= require('../model/User.js');

// GET home page
router.get('/', function(req, res) {

	// DEBUT TEST
	var u	= new User('John Bob');
	var db	= req.db;
	console.log(db);
	// db.users.insert(u);
	// FIN TEST

	res.render('index', {title : "Projet Elsa"});
});

// GET start page
router.get('/start', function(req, res) {
	res.render('start');
});


module.exports = router;