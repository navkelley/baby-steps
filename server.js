var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));

app.route('/') 
	.get(function(req, res) {
	res.sendFile(path.join(__dirname + '/index.hmtl'))
})

app.route('/dashboard')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/dashboard.html'))
})

app.route('/milestones')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/milestones.html'))
})

app.route('/forum')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/forum.html'))
})

app.route('/user-account')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/user-account.html'))
})

exports.app = app;

console.log('Connected on port 8080'); 
app.listen(process.env.PORT || 8080);