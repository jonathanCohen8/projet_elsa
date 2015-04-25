
//
// Projet Elsa
//

//
// Character module
//

var mongoose = require('mongoose');

var Character = new mongoose.Schema({
	x			: Number,
	y			: Number,
	level		: Number,
	equipment	: Array,
	features	:  {
		tiredness	: Number,
		endurance	: Number,
		sight		: Number,
		strengh		: Number
	}
});

module.exports = mongoose.model('Character', Character);