var gulp = require('gulp');
var jshint = require('gulp-jshint');
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
	gulp.src('backstage/scripts/albumEdit/*.js')
		.pipe(concat('albumEdit-all.js'))
		// .pipe(gulp.dest('backstage/dist/scripts'))
		.pipe(rename('albumEdit-all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('backstage/dist/scripts'))
});
gulp.task('watch', function() {
	gulp.watch('backstage/scripts/albumEdit/*.js', function() {
		gulp.run('scripts');
	});
});

// gulp.task('default', function() {
// 	gulp.run('scripts');

// 	gulp.watch('backstage/scripts/albumEdit/*.js', function() {
// 		gulp.run('scripts');
// 	});
// });
gulp.task('default', ['scripts' , 'watch']);