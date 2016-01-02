/*
 * Reads Markdown files in a specified directory and returns an array of objects containing data from each post.
 * Similar to Jekyll's posts format
 * Posts must be Markdown files as use the following filename pattern: 'YYYY-MM-DD-name-of-post.md'
 */

var fs = require('fs');
var markdown = require( 'markdown' ).markdown;

var _posts = [];

var _getAll = function (postsDir) {

	if(typeof postsDir === 'undefined') postsDir = __dirname + '/posts';

	var files = fs.readdirSync(postsDir);

	//For each file found in the defined directory
	files.forEach(function(filename) {
		//If the file has a Markdown file extension
		if(filename.split('.').slice(-1)[0] === 'md') {
			var nameParts = filename.replace('.md', '').split('-'), //Remove the file extension (".md") and split the string into items of an array after each hyphen
				dateParts = nameParts.splice(0, 3), //The first three items of the array should be the year, month and day
				titleParts = nameParts; //The remaining parts should be the article name (in a url-friendly format (slug))

			var date = new Date(dateParts.join('-')); //Construct a date object from the date values
			var slug = titleParts.join('-').toLowerCase(); //Rebuild the remain string parts to form the slug
			var title = toTitleCase(titleParts.join(' ')); //Rebuild the remaining parts into a single string and it into title case
			var html = markdown.toHTML(fs.readFileSync(postsDir  + '/' + filename, 'utf8')); //Pass the content of the file through the Markdown module, which returns html content

			//Create an object with the constructed properties and add it to the _posts global variable
			_posts.push({
				date: {
					object: date,
					formatted: formatDate(date)
				},
				slug: slug,
				title: title,
				content: html
			});
		}
	});

	//Loop through each post object and add an incremental integer after the slug of any duplicates
	var postTitles = {};
	_posts.forEach(function(post) {
		//If the slug value of the current post in the loop is already the name of a property in the postTitles object, this means a post with the same slug has already been check in the loop and this is post with a duplicate slug name
		if(postTitles.hasOwnProperty(post.slug)) {
			postTitles[post.slug]++; //Increment the tally for the current slug value in the loop
			post.slug += '-' + postTitles[post.slug]; //Append the current post's slug value with the incremented value
		}
		else {
			postTitles[post.slug] = 1; //If the slug does not already exist in the postTitles object, add it with a value of "1" (the current tally for the current slug name)
		}
	});

	return _posts;
};

//Return an array of a single property of every post, for example, _getAllOfProperty('title') with return an array with every post's title property
var _getAllOfProperty = function(property) {
	var values = [];

	if(_posts.length === 0) _getAll();

	_posts.forEach(function(post) {
		values.push(post[property]);
	});

	return values;
};

//Returns a single post object that contains the slug property that matches the slug argument
var _getBySlug = function(slug) {
	var found = false;

	if(_posts.length === 0) _getAll();

	_posts.forEach(function(post) {
		if(found === false && post.slug === slug) {
			found = post;
			return true;
		}
	});

	return found;
};

//Accepts a date object and returns a formatted date string - DD{th} Month YYYY
function formatDate(date) {
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return (day + dateSuffix(day) + ' ' + monthNames[monthIndex] + ' ' + year);

	//Calculates the appropriate suffix for a day date number. eg "st" for 21 (21st)
	function dateSuffix(date) {
		if(date == 1 || date == 21 || date == 31){return 'st';}
		else if(date == 2 || date == 22){return 'nd';}
		else if(date == 3 || date == 23){return 'rd';}
		else{return 'th';}
	}
}

//Adapted from: http://stackoverflow.com/a/196991/528423
function toTitleCase(str) {
	var title = str.replace(/\w\S*/g, function(txt) {
		//Words source: http://www.superheronation.com/2011/08/16/words-that-should-not-be-capitalized-in-titles/
		var lowercaseWords = [
			'a',
			'an',
			'the',
			'for',
			'and',
			'nor',
			'but',
			'or',
			'yet',
			'so',
			'at',
			'around',
			'by',
			'after',
			'along',
			'for',
			'from',
			'of',
			'on',
			'to',
			'with',
			'without'
		];

		if(lowercaseWords.indexOf(txt.toLowerCase()) != -1) return txt;
		else return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});

	title = title.charAt(0).toUpperCase() + title.substring(1);

	return title;
}

//Expose the functions in this file when this file is accessed as a module
module.exports = _getAll;
module.exports.getAll = _getAll;
module.exports.getBySlug = _getBySlug;
module.exports.getAllOfProperty = _getAllOfProperty;
