const gulp = require('gulp');
const gulpLess = require('gulp-less');
const gulpRemoveFiles = require('gulp-remove-files');
const gulpWatcher = require('gulp-watch');
const gulpBabel = require('gulp-babel');
const webserver = require('gulp-webserver');


	// local server + livereload
gulp.task('localServer', () => {
	gulp.src('./../Lesson22')
		.pipe(webserver({
			port:8000,
			host:'localhost',
			open: true,
			livereload: true
		}));
})

	// less into css
gulp.task('styles', done => {
	gulp.src('./css/**/*.less')
		.pipe(gulpLess())
		.pipe(gulp.dest('./dist'));
	done();
});

	// clear dist
gulp.task('clear', done => {
	gulp.src('./dist/*')
		.pipe(gulpRemoveFiles())
	done();	
});

	// watcher for css && js
gulp.task('watch', () => {
	gulp.watch('./css/**/*.less',gulp.series('clear','styles'))
	gulp.watch('./js/*.js',gulp.series('scripts'))
});

	// es2015+ ---> es5
gulp.task('scripts', done => {
	gulp.src('./js/*.js')
		.pipe(gulpBabel({
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('./script2015+'))
		done();
});

	// default
gulp.task('default', gulp.series('clear','styles'));
