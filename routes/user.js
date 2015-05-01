
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
// Route middleware to make sure a user is logged in
//
function isLoggedIn(req, res, next) {

    // If user is authenticated in the session, carry on.
    if (req.isAuthenticated())
        return next();

    // If not, redirect him to the home page
    res.redirect('/login');
}


//
// Current user's neighboors route
//
router.route('/neighboors')

	// GET neighboors of the current user
	.get(isLoggedIn, function(req, res) {
		User.find()
			.where('_id').ne(req.user['_id'])
			.where('lat').gt(req.user['lat'] - 1).lt(req.user['lat'] + 1)
			.where('lng').gt(req.user['lng'] - 1).lt(req.user['lng']+ 1)
			.exec(function(err, neighboors) {
				if (err) {
					console.log(err);
					res.status(400).send();
					return;
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

				res.send(otherUsers);
			});
	});


//
// Current user's inventory route
//
router.route('/inventory')

	// GET inventory
	.get(isLoggedIn, function(req, res) {
		User.findOne({ 'username': req.user['username'] })
			.select('inventory')
			.exec(function(err, inventory) {
				if (err) {
					console.log(err);
					res.status(400).send();
					return;
				}
				res.send(inventory);
			});
	})

	// PUT inventory
	.put(isLoggedIn, function(req, res) {
		User.update({ '_id': req.user['_id'] }, { 'inventory.order': req.body },
			function(err, inventory) {
				if (err) {
					console.log(err);
					res.status(400).send();
					return;
				}
				res.status(200).send();
			});
	});


//
// Handle user's action
//
router.route('/action')

	// GET current action
	.get(isLoggedIn, function(req, res) {

	});

module.exports = router;