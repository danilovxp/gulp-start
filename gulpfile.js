const   gulp = require('gulp'),
        sass = require('gulp-sass'), //compile SASS to CSS
        browserSync = require('browser-sync'); //auto-reload of page by Browser-sync
        uglify = require('gulp-uglify');
        concat = require('gulp-concat');
        rename = require('gulp-rename');




gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({stream: true}))

})

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}))
})


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public/"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('src/*.html', gulp.parallel('html'))
    gulp.watch('src/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('scss', 'js', 'html', 'browser-sync', 'watch'))

