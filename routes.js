const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); 
const config = require('./config');
const router = express.Router();
const path = require('path');
const jsonParser = bodyParser.json();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session')
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;

//import models for use 
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

//====================== get root and deliver html ============================//
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//====================== define route for users to login or register =============//
// Get Homepage
router.get('/', ensureAuthenticated, (req, res) => {
   res.redirect('/');
});

function ensureAuthenticated(req, res, next){
   if(req.isAuthenticated()){
      return next();
   } else {
      res.redirect(401, '/');
   }
};

// Register User
router.post('/register', (req, res) => {
   let name = req.body.name;
   let email = req.body.email;
   let username = req.body.username;
   let password = req.body.password;
   let verifypassword = req.body.verifypassword;

   console.log("User name:", name);
   console.log(req.body);
   //validation
   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'Email is not valid').isEmail();
   req.checkBody('username', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();

   let errors = req.validationErrors();

   if(errors) {
     res.json(errors)
   } else {
      let newUser = new User({
         name: name,
         email: email,
         username: username,
         password: password
      });
      User.createUser(newUser, (err, user) => {
         if(err) throw err;
         console.log(user);
         res.json(user);
      });
   }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          return done( null, false, {message: 'Invalid password'});
        }
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.getUserbyId(id, (err, user) => {
      done(err, user);
    });
  });

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/', failureFlash: true}),
  function(req, res) {
});

router.post('/getUserId', (req, res) => {
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(user);
            res.json(user);
        }
    });
});


router.get('/logout', (req, res) => {
   req.logout();
   req.flash('sucess_msg', 'You are logged out');
   res.redirect('/');
});

//====================== routes for dashboard narratives ==============================//
//userId: currentUser previously 
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

//====================== routes to define dashboard measurements =======================//
router.get('/dashboard/measurements/:userId/:type', (req,res) => {
        Measurement.find({
            userId: req.params.userId,
            type: req.params.type
        }, (err, measurement) => {
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
            userId: req.body.userId,
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

//====================== catch all for routes =======================================//
router.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
}); 

module.exports = router; 
//end