var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('public'));

//use app.route to be able to reduce redunancy and typos
//define route to login page
app.route('/') 
	.get(function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
})
//define route to main dashboard
app.route('/dashboard')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/dashboard.html'))
})
//define route to milestones and achievements
app.route('/milestones')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/milestones.html'))
})
//define route to user forum 
app.route('/forum')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/forum.html'))
})
//define route to user account settings 
app.route('/user-account')
	.get(function(req, res) {
		res.sendFile(path.join(__dirname + '/public/user-account.html'))
})

exports.app = app;

app.listen(process.env.PORT || 8080);
console.log('Connected on port 8080');