
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var assert = require('assert');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var execSync = require("execSync");
var urlRoot = 'https://baobabmaster.unige.ch/iface-dev/';
var port = 6000;


var app = express();

// all environments
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var hourMs = 1000*60*60;
app.use('/download', express.static('/var/www/html/download', { maxAge: hourMs }));
app.use('/download', express.directory('/var/www/html/download'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({ secret: 'blablbla'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', routes.index(urlRoot));
//app.get('/users', ensureAuthenticated, user.list);
//app.get('/login', routes.login);
//app.get('/userlist', ensureAuthenticated, routes.userlist(db));
//app.get('/logout', ensureAuthenticated, routes.logout);

app.get('/alljobsrunning', routes.allJobsRunning(execSync));
app.get('/alljobspending', routes.allJobsPending(execSync));
app.get('/history', routes.history(execSync));
app.get('/status', routes.status(execSync));
app.get('/reservations', routes.reservations(execSync));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected. If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
