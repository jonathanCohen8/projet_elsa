
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
	res.render('index', {title : "Projet Elsa"});
});

// GET start page
router.get('/start', function(req, res) {
	res.render('start');
});

//
// TEST
//
// GET (but post ??? --> BAD !)
router.get('/postData', function(req, res) {
	var u	= new User('John Bob');
	var db	= req.db;
	var collection = db.collection('user');
	collection.insert({name : 'John Bob'}, function (err, doc) {
		if (err) res.send("There was a problem adding the information to the database.");
		else res.send("Bien ouèj");
	});
});

module.exports = router;