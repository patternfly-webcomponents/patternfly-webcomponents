var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  path = require('path'),
  sass = require('gulp-sass'),
  $ = require('gulp-load-plugins')(),
  webpack = require('webpack-stream');


gulp.task('font', function(){
  return gulp.src([
      'node_modules/font-awesome/fonts/*',
      'node_modules/patternfly-css/source/fonts/*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', ['lint'], function () {
  return gulp.src('src/*.js')
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function () {
  return gulp.src(['src/*.js'])
    .pipe(eslint('node_modules/patternfly-utils/eslint.json'))
    .pipe(eslint.failOnError());
});

gulp.task('scss', function() {
  return gulp.src(['src/scss/*.scss'])
    .pipe($.plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('webpack', ['js'], function() {
  return gulp.src([
    'node_modules/patternfly-alert/dist/js/pf-alert.component.js',
    'node_modules/patternfly-tabs/dist/js/pf-tabs.component.js',
    'node_modules/patternfly-utilization-bar-chart/dist/js/pf-utilization-bar-chart.component.js'])
    .pipe(webpack({
      resolveLoader: { root: path.join(__dirname, "node_modules") }
    }))
    .pipe($.rename('patternfly.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['font', 'js', 'scss', 'webpack']);

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('index.html', ['build']);
  gulp.watch('app/*.html', ['build']);
  gulp.watch('src/*.js', ['build']);
  gulp.watch('src/*.html', ['build']);
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});