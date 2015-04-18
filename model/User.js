
//
// Projet Elsa
//

//
// User module
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Character = require('./Character.js');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	name		: String,
	password	: String,
	mail		: String,
	characters	: Character,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);