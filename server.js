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

//use app.route to be able to reduce redunancy and typos
//define route to login page
app.route('/') 
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/index.html'));
	});

//define route to main dashboard
app.route('/dashboard') 
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/dashboard.html'));
	});

app.route('/dashboard/narratives')
    .get((req,res) => {
        Narrative.find((err, narrative) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.json("Hello World testing route");
        });
    });

	.post((req, res) => {
		Narrative.create({
			//not sure about this, as all fields are different 
        	title: req.body.title
    	}, function(err, item) {
        	if (err) {
            	return res.status(500).json({
                	message: 'Internal Server Error'
            	});
        	}
        	res.status(201).json(item);
    	});
    })

    .put(function(req, res) {
    	Narrative.update(
	        {_id: req.params.id},
	        //not sure about this, as all fields are different
	        {title: req.body.title},
	        {upsert: true}, function (err, item) {
	        if (err) {
	            return res.status(500).json({
	                message: 'Internal Server Error'
	            });
	        }
        	res.status(200).json(item);
        });
    })

    .delete(function(req, res) {
    	Narrative.remove(
        {_id: req.params.id}, function(err, item) {
	        if (err) {
	            return res.status(500).json({
	                message: 'Internal Server Error'
	            });
	        }
	        res.status(200).json(item);
	    }); 
	});

//define route to milestones and achievements
app.route('/milestones')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/milestones.html'));
});

//define route to user forum 
app.route('/forum')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/forum.html'));
});

//define route to user account settings 
app.route('/user-account')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/user-account.html'));
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
}); 

exports.app = app;
exports.runServer = runServer;
