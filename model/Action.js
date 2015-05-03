
//
// Projet Elsa
//

//
// Action module
//

var mongoose = require('mongoose');

var Action = new mongoose.Schema({
	'idUser' : mongoose.Schema.Types.ObjectId,
	'type' : String,
	'options' : {}
});

module.exports = mongoose.model('Action', Action);