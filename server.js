const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const app = express();
const path = require('path');
const router = require('./routes');

app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//bring in routes 
app.use('/', router);

const runServer = (callback) => {

    mongoose.connect('mongodb://localhost/auth').then(function() {
    User.find(function(err, users) {
        console.log(users); 
    });
    app.listen(process.env.PORT || 8080);
    });//work in progress 

    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
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
