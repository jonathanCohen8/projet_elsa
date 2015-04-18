
//
// Projet Elsa
//

//
// Router
//

var express		= require('express');
var passport	= require('passport');
var User		= require('../model/User.js');
var router		= express.Router();

// GET register page
router.get('/register', function(req, res) {
    res.render('register', {});
});

// POST a new user
router.post('/register', function(req, res) {
    User.register(new User(
		{
			username : req.body.username,
			mail : req.body.mail
		}), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Désolé. Ce nom d'utilisateur est existe déjà."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

// GET login page
router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

// POST to log in
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

// GET logout page
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// GET map page
router.get('/', function(req, res) {
	res.render('index', {
		user : req.user,
		title : "Projet Elsa",
		current_user : [
			{
				id : 1,
				name : "John-Bob",
				x : 45.7787,
				y : 4.86865,
				inventory : [
					{
						id		: 1,
						name	: 'Automatic American Rifle 1992',
						type	: 'weapon',
						size	: [2,2], // [width, heigh]
						picture	: null
					},
					{
						id		: 2,
						name	: 'Swiss Army knife',
						type	: 'weapon',
						size	: [1,2],
						picture	: null
					},
					{
						id		: 3,
						name	: 'Satelite phone',
						type	: 'telecommunications',
						size	: [1,2],
						picture	: null
					}
				],
				bag : [[0,3,0,0],[0,3,0,0],[1,1,0,2],[1,1,0,2]]
			}
		],
		users: [
			{
				id : 2,
				name : "Elsa",
				x : 45.779,
				y : 4.8689
			}
		]
	});
});

// GET start page
// router.get('/start', function(req, res) {
//	res.render('start');
// });

// GET ping test
router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;