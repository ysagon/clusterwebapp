
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
var urlRoot = 'https://baobab.unige.ch/iface/';


//var ldap = require('ldapjs');


//ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

//var searchbase = "ou=people,dc=unige,dc=ch";
//var binddn = "cn=HPC adduser agent,ou=HPC,ou=Applications,dc=unige,dc=ch";
//var ldappass = 'aJlwf/2APs';

//var client = ldap.createClient({
//   url: 'ldaps://people.unige.ch:636'
//});

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object. In the real world, this would query a database;
// however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));



var opts = {
  filter: '(uid=Isabel.Melguizo@unige.ch)',
  scope: 'one',
  attributes: ['objectGUID']
};

//client.bind(binddn, ldappass, function(err){
//   assert.ifError(err);
//});


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/clusterWebApp');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
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
// authenticator
//app.use(express.basicAuth('yann', 'yann'));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', routes.index(urlRoot));
app.get('/users', ensureAuthenticated, user.list);
app.get('/login', routes.login);
app.get('/userlist', ensureAuthenticated, routes.userlist(db));
app.get('/logout', ensureAuthenticated, routes.logout);

app.get('/alljobsrunning', routes.allJobsRunning(execSync));
app.get('/alljobspending', routes.allJobsPending(execSync));
app.get('/history', ensureAuthenticated, routes.history(execSync));
app.get('/status', routes.status(execSync));
app.get('/reservations', routes.reservations(execSync));


// POST /login
// Use passport.authenticate() as route middleware to authenticate the
// request. If authentication fails, the user will be redirected back to the
// login page. Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the home page.
//
// curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });

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
