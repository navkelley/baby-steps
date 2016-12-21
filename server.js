var express = require('express');
var app = express();
app.use(express.static('public'));

exports.app = app;

console.log('Connected on port 8080'); 
app.listen(process.env.PORT || 8080);