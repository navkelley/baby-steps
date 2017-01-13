const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const router = express.Router();
const path = require('path');

//import models for use 
const Narrative = require('./src/models/narrative');
const Measurement = require('./src/models/measurement');
const User = require('./src/models/user');

//middleware that is specific to this router
const timeLog = router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

//====================== define route to home page ====================================//
router.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/public/index.html'));
});

//====================== define route to main dashboard ================================//
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

//====================== routes for dashboard narratives ==============================//
router.get('/dashboard/narratives', (req,res) => {
        Narrative.find((err, narrative) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(narrative);
        });
    })

    .post('/dashboard/narratives', (req, res) => {
		Narrative.create({
        	title: req.body.title,
            date: req.body.date,
            content: req.body.content
        }, (err, narrative) => {
        	if (err) {
            	return res.status(500).json({
                    message: 'Internal Server Error'
                });
        	}
        	res.status(201).json(narrative);
    	});
    });


router.put('/dashboard/narratives/:id',(req, res) => {
    	Narrative.update(
            {_id: req.params.id},
	        {title: req.body.title, content: req.body.content},
	        {upsert: true}, (err, narrative) => {
	        if (err) {
	            return res.status(500).json({
                    message: 'Internal Server Error'
                });
	        }
        	res.status(200).json(narrative);
        });
    })

    .delete('/dashboard/narratives/:id', (req, res) => {
    	Narrative.remove(
        {_id: req.params.id}, function(err, narrative) {
	        if (err) {
	            return res.status(500).json({
                    message: 'Internal Server Error'
                });
	        }
	        res.status(200).json(narrative);
	    }); 
	});

//====================== routes to define dashboard measurements =======================//
router.get('/dashboard/measurements', (req,res) => {
        Measurement.find((err, measurement) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(measurement);
        });
    })

    .post('/dashboard/measurements', (req, res) => {
        Measurement.create({
            type: req.body.type,
            date: req.body.date,
            content: req.body.content
        }, (err, measurement) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(measurement);
        });
    });

router.put('/dashboard/measurements/:id',(req, res) => {
        Measurement.update(
            {_id: req.params.id},
            {type: req.body.type, content: req.body.content},
            {upsert: true}, (err, measurement) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(measurement);
        });
    })

    .delete('/dashboard/measurements/:id', (req, res) => {
        Measurement.remove(
        {_id: req.params.id}, function(err, measurement) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(measurement);
        }); 
    });

//====================== define route to user account settings =========================//
router.get('/user-account',(req, res) => {
		res.sendFile(path.join(__dirname + '/public/user-account.html'));
});

//catch all for routes
router.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
}); 

module.exports = router; 
//end