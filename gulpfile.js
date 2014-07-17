var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var wrap   = require('gulp-wrap');
var del = require('del');
var nib    = require('nib');
var stylus = require('gulp-stylus');

gulp.task('javascript', function() {
  return gulp.src('assets/javascript/*.js')
    .pipe(concat('main.js'))
    .pipe(wrap('(function(a, window){<%= contents %>}(angular, window));'))
    .pipe(gulp.dest('public/javascript'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascript'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('css', function() {
  return gulp.src('assets/style/*.styl')
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('default', function() {
  gulp.start('javascript');
	gulp.start('css');
});

gulp.task('watch', function() {
  gulp.watch('assets/javascript/*.js', ['javascript']);
	gulp.watch('assets/style/*.styl', ['css']);
});
