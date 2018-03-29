var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var question = require('./routes/question');
var reply = require('./routes/reply');
var follow = require('./routes/follow');
var collection = require('./routes/collection');
var upvote = require('./routes/upvote');
var comment = require('./routes/comment');
var message = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'qa',
  secret: 'qa',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000
  },
}))

app.use('/', routes);
app.use('/users', users);
app.use('/question', question);
app.use('/reply', reply);
app.use('/follow', follow);
app.use('/collection', collection);
app.use('/upvote', upvote);
app.use('/comment', comment);
app.use('/message', message);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
