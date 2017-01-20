const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const router = express.Router();
const path = require('path');
const jsonParser = bodyParser.json();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//import models for use 
const Narrative = require('./src/models/narrative');
const Measurement = require('./src/models/measurement');
const User = require('./src/models/user');

//middleware that is specific to this router
const timeLog = router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

//====================== define route for sign up page ========================//
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
});

//====================== define route for users ================================//
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
  function(req, email, password, done) {
    User.findOneByEmail(email, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.use(passport.initialize());

router.post('/', passport.authenticate('local', 
    {failureRedirect: '/'}),
    function (req, res) {
        console.log(res)
        res.redirect('/dashboard');
    }
);



router.post('/users', jsonParser, function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    let username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    let password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            let user = new User({
                username: username,
                password: hash
            });

            user.save((err, createdUser) => {
                if (err) {
                    return res.status(500).json(err);
                }
                currentUser = createdUser._id;
                return res.status(201).json({createdUser});
            });
        });
    });
});

//====================== define route to main dashboard & deliver ======================//
router.get('/dashboard', (req, res) => {
    console.log('dashboard route hit')
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

//====================== routes for dashboard narratives ==============================//
router.get('/dashboard/narratives/:userId', (req, res) => {
        Narrative.find({userId: currentUser}, (err, narrative) => {
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
            userId: currentUser,
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


//====================== route to see all narr entries ============================//
router.get('/narrative-entries', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/narrative-entries.html'));
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
            userId: currentUser,
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
//====================== route to see all weight entires ============================//
router.get('/weight-entries', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/weight-entries.html'));
});

//====================== route to see all length entries ============================//
router.get('/length-entries', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/length-entries.html'));
});

//====================== route to see all headCir entries ===========================//
router.get('/headCir-entries', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/headCir-entries.html'));
});

//====================== catch all for routes =======================================//
router.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
}); 

module.exports = router; 
//end