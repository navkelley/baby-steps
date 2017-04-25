const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const router = express.Router();
const path = require('path');
const jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const isEmail = require('validator');

const Narrative = require('./src/models/narrative');
const Weight = require('./src/models/weight');
const Length = require('./src/models/length');
const HeadCir = require('./src/models/headCir');
const User = require('./src/models/user');

//middleware that is specific to this router
const timeLog = router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.post('/register', (req, res) => {
    const { name, email, username, password } = req.body;

    //validation
    if (email.length === 0) { return res.status(400).json({ error: 'Email is required' }); }  
    else if (!isEmail(email)) { return res.status(400).json({ message: 'Email is not valid.' }); }
    else if (username.length === 0) { return res.status(400).json({ error: 'Username is required' }); }
    else if (password.length === 0) { return res.status(400).json({ error: 'A password is required' }); }

    User.findOne({ email })
        .then(auth => {
        if (auth) { return res.status(422).json({ success: false, error: 'Email already in use.' }); }

        const newUser = new User({ email, password, username, name });

        newUser.save()
            .then(user => {
                return res.status(201).json({
                    success: true,
                    message: 'Registration Successful!',
                    user: user._id
                });
            })
            .catch(err => {
                let error;
                if (err.code === 11000) {
                    error = 'Duplicate email, please provide another one.';
                }
                res.status(422).json({
                    success: false,
                    message: error || err
                });
            });
        })
}); 

const localLogin = new LocalStrategy((username, password, done) => {
    User.findOne({ username })
        .then(user => {
        if (!user) { return done(null, false, { error: 'Login unsuccessful. Please try again!' }); }
        user.comparePassword(password, (err, isMatch) => {
        if (err) {
            return done(err);
        }
        else if (!isMatch) {
            return done(null, false, { error: 'Password did not match. Please try again!' });
        }
        return done(null, user);
        });
    })
    .catch(err => done(err));
});

passport.use(localLogin);
const requireLogin = passport.authenticate('local', { session: false });

const login = (req, res, next) => {
    const user = req.user._id;
    res.send(user);
    return next();
};

router.post('/login', requireLogin, login);

router.get('/dashboard/narratives/:userId', (req, res) => {
        Narrative.find({userId: req.params.userId}, (err, narratives) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(narratives);
        });
    })

    .post('/dashboard/narratives', (req, res) => {
		Narrative.create({
            userId: req.body.userId,
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

router.get('/dashboard/weight/:userId', (req,res) => {
        Weight.find({
            userId: req.params.userId,
        }, (err, weight) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(weight);
        });
    })

    .post('/dashboard/weight', (req, res) => {
        Weight.create({
            userId: req.body.userId,
            date: req.body.date,
            content: req.body.content
        }, (err, weight) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(weight);
        });
    });

router.put('/dashboard/weight/:id',(req, res) => {
        Weight.update(
            {_id: req.params.id},
            {content: req.body.content},
            {upsert: true}, (err, weight) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(weight);
        });
    })

    .delete('/dashboard/weight/:id', (req, res) => {
        Weight.remove(
        {_id: req.params.id}, function(err, weight) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(weight);
        }); 
    });

router.get('/dashboard/length/:userId', (req,res) => {
        Length.find({
            userId: req.params.userId,
        }, (err, length) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(length);
        });
    })

    .post('/dashboard/length', (req, res) => {
        Length.create({
            userId: req.body.userId,
            date: req.body.date,
            content: req.body.content
        }, (err, length) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(length);
        });
    });

router.put('/dashboard/length/:id',(req, res) => {
        Length.update(
            {_id: req.params.id},
            {content: req.body.content},
            {upsert: true}, (err, length) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(length);
        });
    })

    .delete('/dashboard/length/:id', (req, res) => {
        Length.remove(
        {_id: req.params.id}, function(err, length) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(length);
        }); 
    });

router.get('/dashboard/headCir/:userId', (req,res) => {
        HeadCir.find({
            userId: req.params.userId,
        }, (err, headCir) => {
            if(err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(headCir);
        });
    })

    .post('/dashboard/headCir', (req, res) => {
        HeadCir.create({
            userId: req.body.userId,
            date: req.body.date,
            content: req.body.content
        }, (err, headCir) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(headCir);
        });
    });

router.put('/dashboard/headCir/:id',(req, res) => {
        HeadCir.update(
            {_id: req.params.id},
            {content: req.body.content},
            {upsert: true}, (err, headCir) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(headCir);
        });
    })

    .delete('/dashboard/headCir/:id', (req, res) => {
        HeadCir.remove(
        {_id: req.params.id}, function(err, headCir) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(headCir);
        }); 
    });

router.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
}); 

module.exports = router;