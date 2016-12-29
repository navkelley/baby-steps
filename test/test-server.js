var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');

var should = chai.should();
var expect = chai.expect;
var app = server.app;


chai.use(chaiHttp);

describe('Baby Steps', function() {
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
		.get('/dashboard.html')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html; 
			done();
		});
	});

	it('should reach milestones', function(done) {
		chai.request(app)
		.get('/milestones.html')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('should reach forum', function(done) {
		chai.request(app)
		.get('/forum.html')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('should reach user account', function(done) {
		chai.request(app)
		.get('/user-account.html')
		.end(function(err, res) {
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});
});