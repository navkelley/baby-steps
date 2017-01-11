const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const app = express();
const path = require('path');

//use app.route to be able to reduce redunancy and typos
//define route to home page
app.route('/') 
	.get((req, res) => {
		res.sendFile(path.join(__dirname + '/public/index.html'));
	});

//define route to main dashboard
app.route('/dashboard') 
	.get((req, res) => {
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
            res.json("Hello World testing route narratives");
        });
    })

	.post((req, res) => {
		Narrative.create({
        	title: req.body.title
    	}, function(err, item) {
        	if (err) {
            	return res.status(500).json({
                	message: 'Internal Server Error'
            	});
        	}
        	res.status(201).json("Hello World");
    	});
    })
app.route('/dashboard/narratives/:id')
    .put((req, res) => {
    	Narrative.update(
	        {_id: req.params.id},
	        {title: req.body.title},
	        {content: req.body.content},
	        {upsert: true}, function (err, item) {
	        if (err) {
	            return res.status(500).json({
	                message: 'Internal Server Error'
	            });
	        }
        	res.status(200).json("Hello world put working");
        });
    })

    .delete((req, res) => {
    	Narrative.remove(
        {_id: req.params.id}, function(err, item) {
	        if (err) {
	            return res.status(500).json({
	                message: 'Internal Server Error'
	            });
	        }
	        res.status(200).json("hello world hello hello");
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

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
}); 