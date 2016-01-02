var gulp = require('gulp'),
	sass = require('gulp-sass'),
	spawn = require('child_process').spawn,
	node;

//Adapted from gulpfile to reload node when changes are made: https://gist.github.com/webdesserts/5632955

gulp.task('default', ['build-css', 'server', 'watch']);

gulp.task('watch', function() {
	gulp.watch(['*.js'], ['server']);
	gulp.watch(['source/scss/**/*.scss'], ['build-css']);
});

gulp.task('server', function() {
	if (node) node.kill();
	node = spawn('node', ['index.js'], {stdio: 'inherit'})
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});

gulp.task('build-css', function() {
	return gulp.src('source/scss/**/*.scss')
		.pipe(sass({style: 'compressed'}))
		.pipe(gulp.dest('public/css'));
});

process.on('exit', function() {
	if (node) node.kill();
});
