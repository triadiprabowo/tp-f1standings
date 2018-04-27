const gulp = require('gulp');
const gzip = require('gulp-gzip');
const color = require('gulp-color');
const imagemin = require('gulp-imagemin');

gulp.task('postbuild__js', () => {
	return gulp.src('./dist/*.bundle.js')
		.pipe(gzip({ gzipOptions: { level: 9}, skipGrowingFiles: true }))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('postbuild__image', () => {
	return gulp.src('./dist/assets/*')
		.pipe(gzip({ gzipOptions: { level: 9}, skipGrowingFiles: true }))
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 2}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('./dist/assets/'))
});

const gulpTasks = [
	'postbuild__js',
	'postbuild__image',
];

gulp.task('default', gulpTasks, () => {
	console.log(color(`Postbuild bundle has been successfully streamed ${new Date()}`, 'GREEN'));
});