var express = require('express');
var app = express();
var posts = require('./posts');
var allPosts = posts();
var allPostsSlugs = posts.getAllOfProperty('slug');

var port = process.env.PORT || 4004;

//Available to all view templates as "navItems"
app.locals.navItems = [
	{
		name: 'Home',
		url: '/'
	},
	{
		name: 'Sample Page',
		url: '/sample-page'
	}
];

app.set('views', __dirname + '/views'); //The view (template) locations
app.set('view engine', 'jade');

app.use(express.static('public')); //Enables the "public" folder to be accessible from the front end (ie. through a web browser)


//Home page
app.get('/', function (req, res) {
	res.render('page-index', {title: 'Latest Posts', posts: allPosts, archive: true});
});


//Sample page
app.get('/sample-page', function (req, res) {
	res.render('page-sample', {title: 'Sample Page'});
});


//Other pages
app.get('/*', function (req, res, next) {
	var pathParts = req.path.substring(1).split('/'); //Remove the first character of the url path and split the string by all its '/' character

	//If it is an post article page
	if(pathParts.length === 1 && allPostsSlugs.indexOf(pathParts[0]) !== -1) {
		var post = posts.getBySlug(pathParts[0]);
		res.render('page-post', {title: post.title, post: post});
	}
	else next();
});


//404
app.use(function(req, res, next) {
	res.status(404);
	res.render('page', {title: 'Page Not Found', pageContent: '<p>Sorry, the page you are looking for could not be found.</p>'});
});


//Start the node server
var server = app.listen(port, function () {
	console.log('App running on port', port);
});
