
//
// Projet Elsa
//

//
// Character module
//

var mongoose = require('mongoose');

var Character = new mongoose.Schema({
	user		: String,
	x			: Number,
	y			: Number,
	level		: Number,
	equipment	: Array,
	features	: Array // Mixed ?
	/*
	this.features = {
		tiredness	: 0,
		endurance	: 0,
		sight		: 0,
		strengh		: 0
	};*/

});

module.exports = mongoose.model('Character', Character);