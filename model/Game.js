
//
// Projet Elsa
//

//
// Game module
//

var mongoose	= require('mongoose');
var User		= require('./User.js');
var Action		= require('./Action.js');

var Game = new mongoose.Schema({
	'cycle' : Number,
	'max'   : Number,
	'timer' : Number
});


// Update every users according to their actions
Game.methods.update = function(callback) {
	User.find({}, function(err, users) {
		users.forEach(function(user) {
			Action.findOne({ 'idUser' : user['_id']}, function(err, action) {
				if(action !== null) {

					// Position update
					if(action['type'] === 'move') {
						user.update({
							'lat' : action['options']['lat'],
							'lng' : action['options']['lng']
						}, function(err, user) {
							if (err) console.log(err);
							else action.remove();
						});
					}
				}
			});
		});
		callback();
	});
};

Game.methods.start = function(io) {
	var game = this;
	setInterval(function() {
		game.timer--;
		io.emit('timer', {
			'timeLeft'	: game.timer,
			'timeMax'	: game.max
		});

		if(game.timer <= 0) {
			game.cycle++;
			game.timer = game.max;

			// Update every users
			game.update(function() {
				io.emit('updated');
			});
		}
	}, 1000);
};

module.exports = mongoose.model('Game', Game);