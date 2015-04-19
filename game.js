
//
// Projet Elsa
//

//
// Game
//

var io = require('socket.io')();

var cycle = 0;
var timer = 10;

setInterval(function() {
    timer--;
    io.emit('timer', {timer : timer});
    if(timer <= 0) {
        cycle++;
        timer = 10;
        console.log('cycle : ' + cycle);
    }
}, 1000);

module.exports = io;