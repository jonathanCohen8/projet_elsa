
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


//
// Route middleware to make sure a user is logged in
//
function isLoggedIn(req, res, next) {

    // If user is authenticated in the session, carry on.
    if (req.isAuthenticated())
        return next();

    // If not, redirect him to the home page
    res.redirect('/login');
}


// GET map page
router.get('/', isLoggedIn, function(req, res) {
	User.findOne({ 'username': req.user.username }, function(err, user) {
		if (err) {
			console.log('Error : %s', err);
			return;
		}
		console.log(user.username);
		console.log(user.x);
		console.log(user.y);
		console.log(user.inventory);
		console.log(user.inventory.order);
		console.log(user.features);
		res.render('index', {
			user : req.user,
			title : "Projet Elsa",
			current_user : {
				id : user._id,
				name : user.name,
				x : user.x,
				y : user.y,
				inventory : user.inventory,/*[
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
				]
				bag : {
					name : "Sac de fortune",
					size : [4, 4],
					content : [[0,3,0,0],[0,3,0,0],[1,1,0,2],[1,1,0,2]]
				}*/
				feature : user.features
			},
			users : [
				{
					id : 2,
					name : "Elsa",
					x : 45.779,
					y : 4.8688
				}
			]
		});
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
		User.register(new User({
			username	: req.body.username,
			mail		: req.body.mail,
			gender		: req.body.gender,
			x			: Math.random() * 180,
			y			: Math.random() * 90,
			level		: 1,
			inventory	: {
				name	: "Banane 90's",
				size	: [4,1],
				items	: [],
				order	: [[0, 0, 0, 0]]
			},
			features	: {
				tiredness	: 0,
				endurance	: 0,
				sight		: 0,
				strengh		: 0
			}
		}), req.body.password, function(err) {

			// Error during registration
			if (err) {
				console.log(err);
				return res.render("register", {
					info: "Désolé, il y a eu une erreur."
				});
			}

			// Redirect to character creation page
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