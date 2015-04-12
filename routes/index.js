
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
	res.render('index', {title : "Projet Elsa", users:
		[
			{
				name : "John-Bob",
				x : 45.77832,
				y : 4.86936
			}, {
				name : "Elsa",
				x : 45.7785,
				y : 4.875
			}
		]
	});
});

// GET users list
router.get('/users', function(req, res) {
	res.status(200).json({ users:
		[
			{
				name : "John-Bob",
				x : 45.77832,
				y : 4.86936
			}, {
				name : "Elsa",
				x : 45.7785,
				y : 4.875
			}
		]});
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