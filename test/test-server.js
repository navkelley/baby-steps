var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');

var should = chai.should();
var expect = chai.expect;
var app = server.app;

chai.use(chaiHttp);

describe('Baby Steps', function() {
	it('should reach root and deliver html', function(done) {
		chai.request(app)
		.get('/')
		.end(function(err, res) {
			res.should.have.status(200); 
			res.should.have.element('html');
			res.should.have.element('p');
			expect('Hello World!').to.equal('Hello World!');
			done();
		});
	});
});