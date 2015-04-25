
//
// Projet Elsa
//

//
// Game
//

var io = require('socket.io')();

var cycle = 0;
var max = 1000;
var timer = max;

setInterval(function() {
	timer--;
	io.emit('timer',
		{
			timer	: timer,
			max		: max
		});
    if(timer <= 0) {
        cycle++;
        timer = max;
    }
}, 1000);

module.exports = io;