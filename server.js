let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose'); 
let config = require('./config');
let app = express();
let path = require('path');

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
};

let Item = require('./models/item');

//use app.route to be able to reduce redunancy and typos
//define route to login page
app.route('/') 
	.get(function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

//define route to main dashboard
app.route('/dashboard') 
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/dashboard.html'));
		Item.find(function(err, items) {
	        if (err) {
	            return res.status(500).json({
	                message: 'Internal Server Error'
	            });
	        }
	        res.json(items);
	    });
	})

	.post(function(req, res) {
		Item.create({
			//not sure about this, as all fields are different 
        title: req.body.title
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    }),

    .put(function(req, res) {
    	Item.update(
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
    }),

    .delete(function(req, res) {
    	Item.remove(
        {_id: req.params.id}, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(item);
    }),  

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

app.listen(process.env.PORT || 8080);
console.log('Connected on port 8080');