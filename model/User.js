
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
	mail		: String,
	gender		: String,
	x			: Number,
	y			: Number,
	level		: Number,
	inventory	: {
		name	: String,
		size	: [Number],
		items	: [{
			id		: Number,
			name	: String,
			type	: String,
			size	: [Number],
			picture	: String
		}],
		order	: [] // Should be [[Number]] ...
	},
	features	:  {
		tiredness	: Number,
		endurance	: Number,
		sight		: Number,
		strengh		: Number
	}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);