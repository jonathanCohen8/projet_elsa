
//
// Projet Elsa
//

//
// Game module
//

var io = require('socket.io')();
var mongoose = require('mongoose');

var Game = new mongoose.Schema({
	'cycle' : Number,
	'max'   : Number,
	'timer' : Number
});

/*Game.methods.start = function() {

	setInterval(function() {
		this.timer--;
		io.emit('timer',
			{
				timer	: this.timer,
				max		: this.max
			});
		if(this.timer <= 0) {
			this.cycle++;
			this.timer = this.max;
		}
	}, 1000);
};*/

module.exports = mongoose.model('Game', Game);