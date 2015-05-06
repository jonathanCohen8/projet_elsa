
//
// Projet Elsa
//

//
// Server
//

var express      = require('express');
var socketio     = require('socket.io');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var passport     = require('passport');
var Strategy     = require('passport-local').Strategy;
var Game         = require('./model/Game.js');


// Mongo database
mongoose.connect('mongodb://195.154.71.91:1723/projet_elsa');
var db = mongoose.connection;


// Express app & socket.io
var app = express();
app.set('io', socketio());


// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Middlewares
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'elsa cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Passport
var User = require('./model/User');
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Make the database accessible to the router
app.use(function(req, res, next){
    req.db = db;
    next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/user'));


// Start game
var game = new Game({
    'cycle' : 0,
    'max'   : 60,
    'timer' : 60
});
game.start(app.get('io'));


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            error: err
        });
    });
}


// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;