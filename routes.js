const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const router = express.Router();
const path = require('path');

const Narrative = require('./src/models/narrative');
const Measurement = require('./src/models/measurement');
const User = require('./src/models/user');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//define route to home page
router.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/public/index.html'));
	});

//define route to main dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});//not working

router.get('/dashboard/narratives', (req,res) => {
        Narrative.find((err, narrative) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(narrative);
        });
    });

router.post('/dashboard/narratives', (req, res) => {
		Narrative.create({
        	title: req.body.title
    	}, function(err, narrative) {
        	if (err) {
            	return res.status(500).json(err);
        	}
        	res.status(201).json(narrative);
    	});
});

router.route('/dashboard/narratives/:id')
    .put((req, res) => {
    	Narrative.update({
            _id: req.params.id,
	        title: req.body.title,
	        content: req.body.content,
	        upsert: true}, function (err, item) {
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
router.get('/milestones', (req, res) => {
		res.sendFile(path.join(__dirname + '/public/milestones.html'));
});

//define route to user forum 
router.get('/forum',(req, res) => {
		res.sendFile(path.join(__dirname + '/public/forum.html'));
});

//define route to user account settings 
router.get('/user-account',(req, res) => {
		res.sendFile(path.join(__dirname + '/public/user-account.html'));
});

router.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
}); 

module.exports = router; 
//end