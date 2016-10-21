var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require(`cookie-session`);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('handlebars');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
// var auth = require('./routes/auth');

var db = require('./db/local_API');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: 'blog',
  secret: process.env.SESSION_SECRET,
  secureProxy: app.get('env') === 'production'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
// app.use('/auth', auth);

// init passport
app.use(passport.initialize());

// passport session
app.use(passport.session());

//google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
  },
  (accessToken, refreshToken, profile, cb1) => {
    console.log(profile);
    db.findOrCreate( profile, (err, user) => {
      let usr = user[0]
      return cb1(null, {
        token: accessToken,
        id: usr.id,
        email: usr.email,
        first_name: usr.first_name,
        last_name: usr.last_name,
        image_url: usr.image_url
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get(`/auth/google`, passport.authenticate(`google`),
  (req, res) => {
  });
app.get(`/auth/google/callback`, passport.authenticate(`google`, {
  successRedirect: `/`,
  failureRedirect: `/error`
}));

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});
module.exports = app;
