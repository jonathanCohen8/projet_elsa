
//
// Projet Elsa
//

//
// Game
//

var io = require('socket.io')();
var User = require('./model/User.js'); // SHOULD NOT BE HERE
var Action = require('./model/Action.js'); // SHOULD NOT BE HERE

var cycle = 0;
var max = 30;
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

        // =============================
        // UGLY STUFF BEGINS....... NOW!!
        //

		User.find({}, function(err, users) {
			users.forEach(function(user) {
				Action.findOne({ 'idUser' : user['_id']}, function(err, action) {
					if(action !== null) {
						user.update({
							'lat' : action['options']['lat'],
							'lng' : action['options']['lng']
						}, function(err, user) {
							if (err) console.log(err);
							else action.remove();
						});
					}
				});
			});
		});

        //
        // UGLY STUFF ENDED! SAFE!
        // =============================
    }
}, 1000);

module.exports = io;