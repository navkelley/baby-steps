const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server.js');

const should = chai.should();
const expect = chai.expect;
const app = server.app;


chai.use(chaiHttp);

const mongoose = require('mongoose');

describe('reach html pages', function() {
	it('should reach root and have html', function(done) {
		chai.request(app)
		.get('/')
		.end(function(err, res) {
			res.should.have.status(200); 
			res.should.be.html;
			done();
		});
	});

	it('should reach dashboard', function(done) {
		chai.request(app)
		.get('/dashboard')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html; 
			done();
		});
	});

	it('should reach milestones', function(done) {
		chai.request(app)
		.get('/milestones')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('should reach forum', function(done) {
		chai.request(app)
		.get('/forum')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('should reach user account', function(done) {
		chai.request(app)
		.get('/user-account')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});
});