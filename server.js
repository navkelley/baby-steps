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
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const db = mongoose.connection; 

//view engine 
app.engine('handlebars', expressHandlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

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

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

exports.app = app;
exports.runServer = runServer;
