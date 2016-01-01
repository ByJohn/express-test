var express = require('express');
var app = express();
var port = process.env.PORT || 4004;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('index', {title: 'Home'});
});

var server = app.listen(port, function () {
	console.log('App running on port', port);
});