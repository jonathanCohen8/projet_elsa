
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

module.exports = router;