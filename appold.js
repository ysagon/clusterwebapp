

/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var assert = require('assert');
var flash = require('connect-flash');
var execSync = require('execSync');
var urlRoot;
var port;
var logFile = fs.createWriteStream('./express.log', {flags: 'a'});

var app = express();


/**
 * check if node mode is valid
 */
if (!(process.env.NODE_ENV == 'production' ||
      process.env.NODE_ENV == 'development')) {
  console.log('Error: invalid NODE_ENV');
  process.exit();
}

if (process.env.NODE_ENV == 'production') {
  urlRoot = 'https://baobabmaster.unige.ch/iface/';
  port = 3000;
}else {
  urlRoot = 'https://baobabmaster.unige.ch/iface-dev/';
  port = 6000;
}


// all environments
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());


app.configure('production', function() {
  app.use(express.logger({stream: logFile}));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(app.router);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}else {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index(urlRoot));
app.get('/alljobsrunning', routes.allJobsRunning(execSync));
app.get('/alljobspending', routes.allJobsPending(execSync));
app.get('/history', routes.history(execSync));
app.get('/status', routes.status(execSync));
app.get('/reservations', routes.reservations(execSync));
app.get('/applications', routes.applications());

try {
  var res = http.createServer(app).listen(app.get('port'), function() {
    if (process.env.NODE_ENV == 'production') {
      console.log('Express server listening on port ' +
                    app.get('port') + ' in production mode');
    }else {
      console.log('Express server listening on port ' +
                    app.get('port') + ' in debug mode');
    }
  });
}catch (e) {

}
