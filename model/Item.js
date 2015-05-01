
//
// Projet Elsa
//

//
// Item module
//

var mongoose = require('mongoose');

var Item = new mongoose.Schema({
	'id' : Number,
	'name' : String,
	'type' : String,
	'size' : [Number],
	'picture' : String
});

module.exports = mongoose.model('Item', Item);