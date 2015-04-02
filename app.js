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
var NodeCache = require('node-cache');
var configWeb = require('config').web;
var urlRoot;
var port;
var logFile = fs.createWriteStream('./express.log', {flags: 'a'});

var app = express();

global.myCache = new NodeCache({ stdTTL: 100, checkperiod: 120});


/**
 * check if node mode is valid
 */
if (!(process.env.NODE_ENV == 'production' ||
      process.env.NODE_ENV == 'development')) {
  console.log('Error: invalid NODE_ENV');
  process.exit();
}


urlRoot = configWeb.urlRoot;
port = configWeb.port;

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
app.get('/alljobsrunning', routes.allJobsRunning());
app.get('/alljobspending', routes.allJobsPending());
app.get('/history', routes.history());
app.get('/status', routes.status());
app.get('/reservations', routes.reservations());
app.get('/applications', routes.applications());
app.get('/faq', routes.faq());
app.get('/listuser', routes.listUsers());

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
