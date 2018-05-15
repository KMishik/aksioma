'use strict'

const gulp	= require('gulp');
const sass	= require('gulp-sass');
const pug		= require('gulp-pug');
const ts		=	require('gulp-typescript');
const browserSync	= require('browser-sync').create();

let tsProject = ts.createProject({
	removeComments:	true,
	noImplicitAny:	true,
	target:	'ES3',
	module:	'commonjs',
	declarationFiles:	false,
});

gulp.task('tsc', () => {
	return gulp.src('src/ts/**/*.ts')
						 .pipe(tsProject())
						 .js.pipe(gulp.dest('static/main/js/'));
});

gulp.task('pug', () => {
	const run = () => gulp.src(['src/pug/**/*.pug', '!src/pug/**/_*.pug'])
				.pipe(pug({/* Add this API options */
										pretty: true
									}))
				.on('error', console.log)
				.pipe(gulp.dest('templates/main/'));
	run();
});

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.+(scss|sass)')// Gets all files ending with .scss and .sass in app/scss and children dirs
		   .pipe(sass().on('error', function(err) {
			   sass.logError(err);
		   })) // Convert Sass to CSS with gulp-sass
		   .pipe(gulp.dest('static/main/css/'));
		//    .pipe(browserSync.reload({stream: true}));
});

/* gulp.task('browserSync', function() {
	browserSync.init(
	{
		server:
		{
			baseDir: 'templates/main',
			index: 'index.html'
		},
		notify: false
	});
}); */

gulp.task('browserSync', function() {
	browserSync.init(
	{
		proxy: "127.0.0.1:8000",
		notify: false,
	});
});

gulp.task('watch', ['tsc', 'sass', 'pug', 'browserSync'], function() {
	gulp.watch('src/scss/**/*.+(scss|sass)', ['sass']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	gulp.watch('src/ts/**/*.ts', ['tsc']);
	// Reloads the browser whenever HTML,CSS or JS files change
	gulp.watch('static/main/css/**/*.css', browserSync.reload);
	gulp.watch('main/templates/main/*.html', browserSync.reload);
	gulp.watch('static/main/js/**/*.js', browserSync.reload);
});

gulp.task('default',['watch']);
