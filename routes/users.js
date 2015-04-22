
//
// Projet Elsa
//

//
// Router
//

var express	= require('express');
var router	= express.Router();


//
// Current user's neighboors routes
//
// router.route('/:id/neighboors')
router.route('/neighboors')

	// GET neighboors of the current user
	.get(function(req, res) {
		res.status(200).send();
	});


//
// Current user's inventory routes
//
// router.put('/:id/inventory')
router.route('/inventory')

	// PUT inventory
	.put(function(req, res) {
		// var idUser = req.params.id;
		// console.log(req.bag);
		console.log('#yolo');
		res.status(200).send();
	});

module.exports = router;