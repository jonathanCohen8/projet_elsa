
//
// Projet Elsa
//

//
// User module
//

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	'username' : String,
	'password' : String,
	'mail' : String,
	'gender' : String,
	'lat' : Number,
	'lng' : Number,
	'level' : Number,
	'features' :  {
		'tiredness' : Number,
		'endurance' : Number,
		'sight' : Number,
		'strengh' : Number,
		'_id' : false
	}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);