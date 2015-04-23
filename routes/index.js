
//
// Projet Elsa
//

//
// Router
//

var express		= require('express');
var passport	= require('passport');
var User		= require('../model/User.js');
var router		= express.Router();

// GET map page
router.get('/', function(req, res) {
	if(!req.user) return res.redirect('/login');

	res.render('index', {
		user : req.user,
		title : "Projet Elsa",
		current_user : {
			id : 1,
			name : "John-Bob",
			x : 45.7787,
			y : 4.86865,
			inventory : [
				{
					bag_id	: 1,
					name	: 'P226',
					type	: 'weapon',
					size	: [2,2], // [width, heigh]
					picture	: 'P226.png'
				},
				{
					bag_id	: 2,
					name	: 'Swiss Army knife',
					type	: 'weapon',
					size	: [1,2],
					picture	: 'swiss.png'
				},
				{
					bag_id	: 3,
					name	: 'Satellite phone',
					type	: 'telecommunications',
					size	: [1,2],
					picture	: 'phone.png'
				}
			],
			bag : {
				name : "Sac de fortune",
				size : [4, 4],
				content : [[0,3,0,0],[0,3,0,0],[1,1,0,2],[1,1,0,2]]
			}
		},
		vision : [0.001],
		users: [
			{
				id : 2,
				name : "Elsa",
				x : 45.779,
				y : 4.8688
			}
		]
	});
});

// GET start page
/*router.get('/start', function(req, res) {
	res.render('start');
});*/


//
// Registration route
//
router.route('/register')

	// GET register page
	.get(function(req, res) {
		res.render('register', {});
	})

	// POST a new user
	.post(function(req, res) {
		User.register(new User(
			{
				username	: req.body.username,
				mail		: req.body.mail
			}), req.body.password, function(err) {
			if (err) {
				return res.render("register", {info: "Désolé. Cet utilisateur existe déjà."});
			}

			passport.authenticate('local')(req, res, function () {
				res.redirect('/');
			});
		});
});


//
// Login route
//
router.route('/login')

	// GET login page
	.get(function(req, res) {
		res.render('login', { user : req.user });
	})

	// POST to log in
	.post(passport.authenticate('local'), function(req, res) {
		res.redirect('/');
	});


//
// Logout route
//
router.route('/logout')

	// GET logout page
	.get(function(req, res) {
		req.logout();
		res.redirect('/login');
	});

module.exports = router;