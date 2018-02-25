const gulp	= require('gulp');
const sass	= require('gulp-sass');
const pug		= require('gulp-pug');
const browserSync	= require('browser-sync').create();


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
		   .pipe(sass()) // Convert Sass to CSS with gulp-sass
		   .on('error', console.log)		
		   .pipe(gulp.dest('static/css/'))
		   .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function() {
	browserSync.init(
	{
		server: 
		{
			baseDir: 'templates/main',
			index: 'index.html'
		},
		notify: false
	});
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
	gulp.watch('src/scss/**/*.+(scss|sass)', ['sass']);
	gulp.watch('src/pug/**/*.pug', ['pug']);
	// Reloads the browser whenever HTML or JS files change
  gulp.watch('templates/main/*.html', browserSync.reload); 
  gulp.watch('static/js/**/*.js', browserSync.reload); 
});

gulp.task('default',['watch']);

