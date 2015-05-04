
//
// Projet Elsa
//

//
// Inventory module
//

var mongoose = require('mongoose');

var Inventory = new mongoose.Schema({
	'idUser' : mongoose.Schema.Types.ObjectId,
	'name' : String,
	'size' : [Number],
	'items' : [{
		'id' : Number,
		'name' : String,
		'type' : String,
		'size' : [Number],
		'picture' : String
	}],
	'order' : [], // Should be [[Number]] ... ?
});

module.exports = mongoose.model('Inventory', Inventory);