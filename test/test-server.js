const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const express = require('express');
const router = express.Router(); 
const Narrative = require('../src/models/narrative');
const Weight = require('../src/models/weight');
const Length = require('../src/models/length');
const HeadCir = require('../src/models/headCir');
const User = require('../src/models/user'); 
const server = require('../server.js');
const app = server.app;

//set currentUser for test purposes(admintest id)
let currentUser = "58884612fe59a04aeb6ce5fb";

chai.use(chaiHttp);

describe('reach html page', (done) => {
	it('should reach root and have html', (done) => {
		chai.request(app)
		.get('/')
		.end((err, res) => {
			should.equal(err, null);
			res.should.have.status(200); 
			res.should.be.html;
			done();
		});
	});
});

describe('users from signup', (done) => {
	before((done) => {
        server.runServer(() => {
            User.create({
            	username: 'Tiffany', 
            	password: 'password1',
                email: 'admintest@test.com',
                name: 'Tiffany Jones'
            }, () => {
            	done();
            });
        });
    });

    after((done) => {
        User.remove(() => {
            done();
        });
    });

    it('should create a new user', (done) => {
    	chai.request(app)
    	   .post('/register')
           .send({
                username: 'bobtest',
                name: 'bob test',
                email: 'bob@test.com',
                password: 'testingbabysteps'
           })
    	   .end((err, res) => {
    	       should.equal(err, null);
    	       res.should.be.json;
               res.body.should.be.a('object');
               res.body.should.have.property('username');
               res.body.should.have.property('name');
               res.body.should.have.property('password');
               res.body.should.have.property('email');
               res.body.username.should.be.a('string');
               res.body.name.should.be.a('string');
               res.body.password.should.be.a('string');
               res.body.email.should.be.a('string');
               res.body.username.should.equal('bobtest');
               res.body.email.should.equal('bob@test.com');
               res.body.name.should.equal('bob test');
               done(); 
    	   });
    });
});

describe('dashboard narratives DB', (done) => {
	before((done) => {
        server.runServer(() => {
            Narrative.create({
                userId: currentUser,
                title: 'Day 1', 
                date:'10/12/16', 
                content: 'Good day'
            },
            {
                userId: currentUser,
                title: 'Day 2', 
                date: '10/31/16', 
                content: 'First laugh'
            },
            {
                userId: currentUser,
                title: 'Day 3',
                date: '11/12/16', 
                content: 'First time using bigger bottle'
            }, () => {
                done();
            });
        });
    });

    after((done) => {
        Narrative.remove(function() {
            done();
        });
    });

	it('should get all narratives', (done) => {
		chai.request(app)
			.get('/dashboard/narratives/' + currentUser)
			.end((err, res) => {
				should.equal(err, null);
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('array');
				res.body.should.have.length(3);
				res.body[0].should.be.a('object');
				res.body[0].should.have.property('title');
				res.body[0].should.have.property('content');
				res.body[0].should.have.property('date');
				res.body[0].title.should.be.a('string');
				res.body[0].content.should.be.a('string');
				res.body[0].date.should.be.a('string');
				res.body[0].title.should.equal('Day 1');
				res.body[1].title.should.equal('Day 2');
				res.body[2].title.should.equal('Day 3');
				done();
			});
	});

	it('should add a record to narratives on post', (done) => {
		chai.request(app)
			.post('/dashboard/narratives')
			.send({
                userId: currentUser,
				title: 'Day 4',
				date: '12/25/16',
				content: 'First Christmas!'
			})
			.end((err, res) => {
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body.should.have.property('title');
				res.body.should.have.property('content');
				res.body.should.have.property('date');
				res.body.title.should.be.a('string');
				res.body.date.should.be.a('string');
				res.body.content.should.be.a('string');
				res.body.title.should.equal('Day 4');
				res.body.content.should.equal('First Christmas!');
				done();
			});
	});

	it('should edit a record on put', (done) => {
		Narrative.findOne({title: 'Day 1'}, (err, narrative) => {
			let id = narrative._id;

			chai.request(app)
				.put('/dashboard/narratives/' + id)
				.send({title: 'Eating Well', content: 'He is eating so much!'})
				.end((err, res) => {
					should.equal(err, null);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('n');
					res.body.should.have.property('nModified');
					res.body.should.have.property('ok');
					done();
				});
		});
	});

	it('should remove a record on delete', (done) => {
		Narrative.findOne({title: 'Day 2'}, (err, narrative) => {
			let id = narrative._id;

			chai.request(app)
				.delete('/dashboard/narratives/' + id)
				.end((err, res) => {
					should.equal(err, null);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('n');
					res.body.should.have.property('ok');
					done();
				});
		});
	});
});

describe('dashboard measurements for weight', (done) => {
	before((done) => {
        server.runServer(() => {
            Weight.create({ 
                userId: currentUser,
            	date:'10/12/16', 
            	content: '12lbs 5oz'
            },
            { 
                userId: currentUser,
            	date: '10/31/16', 
            	content: '14lbs 3oz'
            },
            {
            	userId: currentUser,
                date: '11/12/16', 
            	content: '15lbs 6oz'
        	}, () => {
                done();
            });
        });
    });

    after((done) => {
        Weight.remove(() => {
            done();
        });
    });

    it('should get all weight records', (done) => {
        chai.request(app)
            .get('/dashboard/weight/' + currentUser)
            .end((err,res) => {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('userId');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('date');
                res.body[0].userId.should.be.a('string');
                res.body[0].content.should.be.a('string');
                res.body[0].date.should.be.a('string');
                res.body[1].content.should.equal('14lbs 3oz');
                res.body[2].content.should.equal('15lbs 6oz');
                done();
            });
    });

    it('should add a record to weight on post', (done) => {
        chai.request(app)
            .post('/dashboard/weight')
            .send({
                userId: currentUser,
                date: '12/25/16',
                content: '17lbs 3oz'
            })
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('content');
                res.body.should.have.property('date');
                res.body.date.should.be.a('string');
                res.body.content.should.be.a('string');
                res.body.content.should.equal('17lbs 3oz');
                done();
            });
    });

    it('should edit a record on put', (done) => {
        Weight.findOne({date: '10/12/16' }, (err, weight) => {
            let id = weight._id;

            chai.request(app)
                .put('/dashboard/weight/' + id)
                .send({content: '8lbs 1oz'})
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('n');
                    res.body.should.have.property('nModified');
                    res.body.should.have.property('ok');
                    done();
                });
        });
    });

    it('should remove a record on delete', (done) => {
        Weight.findOne({date: '11/12/16'}, (err, weight) => {
            let id = weight._id;

            chai.request(app)
                .delete('/dashboard/weight/' + id)
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('n');
                    res.body.should.have.property('ok');
                    done();
                });
        });
    }); 
});

describe('dashboard measurements for length', (done) => {
    before((done) => {
        server.runServer(() => {
            Length.create({ 
                userId: currentUser,
                date:'10/12/16', 
                content: '20 inches'
            },
            {
                userId: currentUser,
                date: '11/12/16', 
                content: '21.5 inches'
            }, () => {
                done();
            });
        });
    });

    after((done) => {
        Length.remove(() => {
            done();
        });
    });

    it('should get all length records', (done) => {
        chai.request(app)
            .get('/dashboard/length/' + currentUser)
            .end((err,res) => {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(2);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('userId');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('date');
                res.body[0].userId.should.be.a('string');
                res.body[0].content.should.be.a('string');
                res.body[0].date.should.be.a('string');
                res.body[0].content.should.equal('20 inches');
                done();
            });
    });

    it('should add a record to length on post', (done) => {
        chai.request(app)
            .post('/dashboard/length')
            .send({
                userId: currentUser,
                date: '12/25/16',
                content: '23 inches'
            })
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('content');
                res.body.should.have.property('date');
                res.body.date.should.be.a('string');
                res.body.content.should.be.a('string');
                res.body.content.should.equal('23 inches');
                done();
            });
    });

    it('should edit a record on put', (done) => {
        Length.findOne({date: '10/12/16' }, (err, length) => {
            let id = length._id;

            chai.request(app)
                .put('/dashboard/length/' + id)
                .send({content: '23.5 inches'})
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('n');
                    res.body.should.have.property('nModified');
                    res.body.should.have.property('ok');
                    done();
                });
        });
    });

    it('should remove a record on delete', (done) => {
        Length.findOne({date: '11/12/16'}, (err, length) => {
            let id = length._id;

            chai.request(app)
                .delete('/dashboard/length/' + id)
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('n');
                    res.body.should.have.property('ok');
                    done();
                });
        });
    }); 
});

describe('dashboard measurements for head circumference', (done) => {
    before((done) => {
        server.runServer(() => {
            HeadCir.create({ 
                userId: currentUser,
                date:'10/12/16', 
                content: '12 inches'
            },
            {
                userId: currentUser,
                date: '11/12/16', 
                content: '14 inches'
            }, () => {
                done();
            });
        });
    });

    after((done) => {
        HeadCir.remove(() => {
            done();
        });
    });

    it('should get all head circumference records', (done) => {
        chai.request(app)
            .get('/dashboard/headCir/' + currentUser)
            .end((err,res) => {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(2);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('userId');
                res.body[0].should.have.property('content');
                res.body[0].should.have.property('date');
                res.body[0].userId.should.be.a('string');
                res.body[0].content.should.be.a('string');
                res.body[0].date.should.be.a('string');
                res.body[1].content.should.equal('14 inches');
                done();
            });
    });

    it('should add a record to headCir on post', (done) => {
        chai.request(app)
            .post('/dashboard/headCir')
            .send({
                userId: currentUser,
                date: '12/25/16',
                content: '15 inches'
            })
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('content');
                res.body.should.have.property('date');
                res.body.date.should.be.a('string');
                res.body.content.should.be.a('string');
                res.body.content.should.equal('15 inches');
                done();
            });
    });

    it('should edit a record on put', (done) => {
        HeadCir.findOne({date: '10/12/16' }, (err, headCir) => {
            let id = headCir._id;

            chai.request(app)
                .put('/dashboard/headCir/' + id)
                .send({content: '11.5 inches'})
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('n');
                    res.body.should.have.property('nModified');
                    res.body.should.have.property('ok');
                    done();
                });
        });
    });

    it('should remove a record on delete', (done) => {
        HeadCir.findOne({date: '11/12/16'}, (err, headCir) => {
            let id = headCir._id;

            chai.request(app)
                .delete('/dashboard/headCir/' + id)
                .end((err, res) => {
                    should.equal(err, null);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('n');
                    res.body.should.have.property('ok');
                    done();
                });
        });
    }); 
});