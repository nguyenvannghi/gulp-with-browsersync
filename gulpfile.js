var gulp = require('gulp'),
    sass = require('gulp-sass'),
    runSequence = require('gulp4-run-sequence'),
    browserSync = require('browser-sync').create();

gulp.task('css', () => {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(
            browserSync.stream({
                stream: true,
            })
        );
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './src',
            index: '/index.html',
        },
        notify: true,
    });
    gulp.watch(['./src/*.html', './src/scss/*.scss'], async (evt, file) => {
        await runSequence('css');
        browserSync.reload();
    });
});

gulp.task('default', (callback) => {
    runSequence('css', 'browser-sync', callback);
});
