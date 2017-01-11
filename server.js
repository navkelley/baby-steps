const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const app = express();
const path = require('path');

app.use(bodyParser.json()); 
app.use(express.static('public'));

const runServer = (callback) => {
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

const Narrative = require('./src/models/narrative');
const Measurement = require('./src/models/measurement');
const User = require('./src/models/user');

exports.app = app;
exports.runServer = runServer;
