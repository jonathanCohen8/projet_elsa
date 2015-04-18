
//
// Projet Elsa
//

//
// User module
//

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	name		: String,
	password	: String,
	mail		: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);