/*
 * Reads Markdown files in a specified directory and returns an array of objects containing data from each post.
 * Similar to Jekyll's posts format
 * Posts must be Markdown files as use the following filename pattern: 'YYYY-MM-DD-name-of-post.md'
 */

var fs = require('fs');
var markdown = require( 'markdown' ).markdown;

var _posts = [];

var _getAll = function (postsDir) {

	var files = fs.readdirSync(postsDir);

	files.forEach(function(filename) {
		//If the file has a Markdown file extension
		if(filename.split('.').slice(-1)[0] === 'md') {
			var nameParts = filename.replace('.md', '').split('-'),
				dateParts = nameParts.splice(0, 3),
				titleParts = nameParts;

			var date = new Date(dateParts.join('-'));
			var slug = titleParts.join('-').toLowerCase();
			var title = toTitleCase(titleParts.join(' '));
			var html = markdown.toHTML(fs.readFileSync(postsDir  + '/' + filename, 'utf8'));

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
		if(postTitles.hasOwnProperty(post.slug)) {
			postTitles[post.slug]++;
			post.slug += '-' + postTitles[post.slug];
		}
		else {
			postTitles[post.slug] = 1;
		}
	});

	return _posts;
};

var _getBySlug = function(slug) {
	var found = false;

	_posts.forEach(function(post) {
		if(found === false && post.slug === slug) {
			found = post;
			return true;
		}
	});

	return found;
};

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

module.exports = _getAll;
module.exports.getAll = _getAll;
module.exports.getBySlug = _getBySlug;
