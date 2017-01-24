const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const path = require('path');
const router = require('./routes');
const jsonParser = bodyParser.json();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session')
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

//import models for use 
const Narrative = require('./src/models/narrative');
const Weight = require('./src/models/weight');
const Length = require('./src/models/length');
const HeadCir = require('./src/models/headCir');
const User = require('./src/models/user');

//tell app what to use 
app.use(bodyParser.json()); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

//Creating express session 
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Flash messages
app.use((req, res, next) => {
  res.locals.sucess_msg = req.flash('sucess_msg');
  res.locals.erro_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

let currentUser; 

//bring in routes 
app.use('/', router);

const runServer = (callback) => { 
    mongoose.connect(config.DATABASE_URL, (err) => {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, () => {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
    runServer((err) => {
        if (err) {
            console.error(err);
        }
    });
};


exports.app = app;
exports.runServer = runServer;
