
//
// Projet Elsa
//

//
// Router
//

var express		= require('express');
var router		= express.Router();
var User		= require('../model/User.js');
var Action		= require('../model/Action.js');
var Inventory	= require('../model/Inventory.js');


//
// Middleware to make sure a user is logged in
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
				res.status(200).send(otherUsers);
			});
	});


//
// Current user's inventory route
//
router.route('/inventory')

	// GET inventory
	.get(isLoggedIn, function(req, res) {
		Inventory.findOne({ 'idUser': req.user['_id'] })
			.select('inventory')
			.exec(function(err, inventory) {
				if (err) {
					console.log(err);
					return res.status(500).send();
				}
				res.send(inventory);
			});
	})

	// PUT inventory
	.put(isLoggedIn, function(req, res) {
		Inventory.findOneAndUpdate({ 'idUser': req.user['_id'] }, { 'order': req.body },
			function(err) {
				if (err) {
					console.log(err);
					return res.status(500).send();
				}
				res.status(200).send();
			});
	});


//
// Current user's position
//
router.route('/position')

	// GET position
	.get(isLoggedIn, function(req, res) {
		User.findOne({ '_id' : req.user['_id']}, 'lat lng', function(err, user) {
			if(err) {
				console.log(err);
				return res.status(500).send();
			}
			res.status(200).send({
				'lat' : user.lat,
				'lng' : user.lng
			});
		});
	});


//
// Handle user's action
//
router.route('/action')

	// GET current action
	.get(isLoggedIn, function(req, res) {
		Action.findOne({ '_id': req.user['_id'] }, function(err, action) {
			if (err) {
				console.log(err);
				return res.status(500).send();
			}
			res.status(200).send(action);
		});
	})

	// POST next action
	.post(isLoggedIn, function(req, res) {

		// Move action
		if(req.body['type'] === 'move' &&
			req.body['options'].hasOwnProperty('lat') &&
			req.body['options'].hasOwnProperty('lng')) {

				// Check if user's action is valid
				// i.e., if user can reach the required position
				// PS : this DOES NOT work
				var everythingsOk = false;
				if((req.body['options']['lat'] - req.user.lat) * (req.body['options']['lat'] - req.user.lat) +
					(req.body['options']['lng'] - req.user.lng) * (req.body['options']['lng'] - req.user.lng) <
					req.user.features.endurance * req.user.features.endurance)
					everythingsOk = true;

				console.log(everythingsOk);

				// Update database with user's new move
				if(everythingsOk) {
					Action.findOneAndUpdate({ 'idUser': req.user['_id'] }, {
						'type' : req.body['type'],
						'options.lat' : req.body['options']['lat'],
						'options.lng' : req.body['options']['lng']
					}, { 'upsert' : true, 'new' : true },
					function(err, action) {
						if (err) {
							console.log(err);
							return res.status(500).send();
						}
						res.status(200).send();
					});
				} else return res.status(400).send();
		}
		
		// Fight action
		else if(req.body['type'] === 'fight' &&
			req.body['options'].hasOwnProperty('idEnemy')) {
				newAction['options']['idEnemy'] = req.body['options']['idEnemy'];

				// Update database with user's new fight
				console.log("fight bitch #yolo");
		}
	});

module.exports = router;