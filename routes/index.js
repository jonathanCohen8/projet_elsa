
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
	res.render('index', {
		title : "Projet Elsa",
		current_user : [
			{
				name : "John-Bob",
				x : 45.7787,
				y : 4.86865,
				inventory : [
					{
						id		: 1,
						name	: 'Automatic American Rifle 1992',
						type	: 'weapon',
						picture	: null
					},
					{
						id		: 2,
						name	: 'Helmet firefighter',
						type	: 'defense',
						picture	: null
					}
				],
				bag : [[0,0,0,0],[0,0,0,0],[1,1,0,2],[1,1,0,2]]
			}
		],
		users: [
			{
				name : "Elsa",
				x : 45.779,
				y : 4.8689
			}
		]
	});
});

// GET start page
router.get('/start', function(req, res) {
	res.render('start');
});

module.exports = router;