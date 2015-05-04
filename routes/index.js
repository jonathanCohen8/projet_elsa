
//
// Projet Elsa
//

//
// Router
//

var express		= require('express');
var passport	= require('passport');
var User		= require('../model/User.js');
var Inventory	= require('../model/Inventory.js');
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

	// Find current user
	User.findOne({ 'username': req.user.username }, function(err, user) {
			if (err) {
				console.log(err);
				return res.status(500).send();
			}

			// Find current user's inventory
			Inventory.findOne({ 'idUser' : req.user['_id']}, function(err, inventory) {
				if (err) {
					console.log(err);
					return res.status(500).send();
				}

				// Find neighboors of current user
				User.find()
					.where('_id').ne(user['_id'])
					.where('lat').gt(user['lat'] - 1).lt(user['lat'] + 1)
					.where('lng').gt(user['lng'] - 1).lt(user['lng'] + 1)
					.exec(function(err, neighboors) {

						if (err) {
							console.log(err);
							return res.status(500).send();
						}

						// Build neighboors array
						var otherUsers = [];
						for(var n in neighboors) {
							otherUsers.push({
								name : neighboors[n]['username'],
								lat : neighboors[n]['lat'],
								lng : neighboors[n]['lng']
							});
						}

						// Render page with accurate information
						res.render('index', {
							title : 'Projet Elsa',
							user : {
								// id : user._id,
								name : user['username'],
								lat : user['lat'],
								lng : user['lng'],
								level : user['level'],
								inventory : inventory,
								features : user['features']
							},
							neighboors : otherUsers
						});
					});
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

		//
		// TODO
		// Check for user's info
		// (mail, password, other stuff ...)
		//

		// Start position
		var start = {
			lat : 45.7484, // Lyon city latitude
			lng : 4.8467 // Lyon city longitude
		};
		var distance = 0.001; // remoteness from the center of regular start position
		
		User.register(new User({
			'username'	: req.body['username'],
			'mail'		: req.body['mail'],
			'gender'	: req.body['gender'],
			'lat'		: start.lat + parseFloat((Math.random().toFixed(4) * distance)),
			'lng'		: start.lng + parseFloat((Math.random().toFixed(4) * distance)),
			'level'		: 1,
			'features'	: {
				'tiredness'	: 0,
				'endurance'	: 0,
				'sight'		: 0,
				'strengh'		: 0
			}
		}), req.body.password, function(err, user) {

			// Error during registration
			if (err) {
				console.log(err);
				return res.render('register', {
					info: 'Désolé, il y a eu une erreur.'
				});
			}

			new Inventory({
				'idUser': user['_id'],
				'name'	: 'Banane 1996',
				'size'	: [4, 1],
				'items'	: [],
				'order'	: [[0, 0, 0, 0]]
			}).save(function(err) {
				if (err) {
					console.log(err);
					return res.status(400).send();
				}

				// Redirect to main page
				passport.authenticate('local')(req, res, function () {
					res.redirect('/');
				});
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