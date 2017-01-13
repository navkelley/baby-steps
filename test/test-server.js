const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../server.js');

const should = chai.should();
const expect = chai.expect;
const app = server.app;

const Narrative = require('../src/models/narrative');
const Measurement = require('../src/models/measurement');
const User = require('../src/models/user');

chai.use(chaiHttp);

describe('reach html pages', () => {
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

	it('should reach dashboard', (done) => {
		chai.request(app)
		.get('/dashboard')
		.end((err, res) => {
			should.equal(err, null);
			res.should.have.status(200);
			res.should.be.html; 
			done();
		});
	});

	it('should reach milestones', (done) => {
		chai.request(app)
		.get('/milestones')
		.end((err, res) => {
			should.equal(err, null);
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('should reach forum', (done) => {
		chai.request(app)
		.get('/forum')
		.end((err, res) => {
			should.equal(err, null);
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('should reach user account', (done) => {
		chai.request(app)
		.get('/user-account')
		.end((err, res) => {
			should.equal(err, null);
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});
});

describe('dashboard narratives DB', () => {
	before((done) => {
        server.runServer(() => {
            Narrative.create({
            	title: 'Day 1', 
            	date:'10/12/16', 
            	content: 'Good day'
            },
            {
            	title: 'Day 2', 
            	date: '10/31/16', 
            	content: 'First laugh'
            },
            {
            	title: 'Day 3',
            	date: '11/12/16', 
            	content: 'First time using bigger bottle'
        	}, () => {
                done();
            });
        });
    });

    after(function(done) {
        Narrative.remove(() => {
            done();
        });
    });

	it('should get all narratives', (done) =>{
		chai.request(app)
			.get('/dashboard/narratives')
			.end((err,res) => {
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
				title: 'Day 4',
				date: '12/15/15',
				content: 'First Christmas!'
			})
			.end((err, res) => {
				should.equal(err, null);
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				res.body[3].should.have.property('title');
				res.body[3].should.have.property('content');
				res.body[3].should.have.property('date');
				res.body[3].title.should.be.a('string');
				res.body[3].date.should.be.a('string');
				res.body[3].content.should.be.a('string');
				res.body[3].title.should.equal('Day 4');
				res.body[3].date.should.equal('12/25/16');
				res.body[3].content.should.equal('First Christmas!');
				res.body[0].title.should.equal('Day 1');
				res.body[1].content.should.equal('First laugh');
				res.body[2].date.should.equal('11/12/16');
				done();
			});
	});
//work in progress
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
					res.body[1].should.have.property('title');
					res.body[1].should.have.property('content');
					res.body[1].title.should.equal('Eating Well');
					res.body[1].content.should.equal('He is eating so much!');
					res.body[2].title.should.equal('Day 3');
					res.body[1].content.should.equal('First laugh');
				})
		});
	});
//work in progress
	it('should remove a record on delete', (done) => {
		Narrative.findOne({title: 'Day 2'}, (err, narrative) => {
			let id = narrative._id;

			chai.request(app)
				.delete('/dashboard/narratives/' + id)
				.end((err, res) => {
					should.equal(err, null);
					res.should.have.status(200);
					done();
				})
		});
	});
});