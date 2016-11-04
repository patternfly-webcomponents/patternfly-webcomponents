var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  browserSyncPort = 3000,
  baseUrl = 'http://localhost:' + browserSyncPort,
  eslint = require('gulp-eslint'),
  ignore = require('gulp-ignore'),
  karma = require('karma').Server,
  path = require('path'),
  sass = require('gulp-sass'),
  $ = require('gulp-load-plugins')(),
  webpack = require('webpack-stream'),
  runSequence = require('run-sequence'),
  louis = require('gulp-louis'),
  sitespeedio = require('gulp-sitespeedio');

gulp.task('font', function(){
  return gulp.src([
      'node_modules/font-awesome/fonts/*',
      'node_modules/patternfly-css/source/fonts/*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', ['lint'], function () {
  return gulp.src(['src/*/*.js', '!src/*/*.spec.js'])
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist/es2015'));
});

gulp.task('lint', function () {
  return gulp.src(['src/*/*.js'])
    .pipe(eslint('eslint.json'))
    .pipe(eslint.failOnError());
});

gulp.task('scss', function() {
  return gulp.src(['src/scss/*.scss'])
    .pipe($.plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('test', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-debug', function (done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    browsers: ['Chrome']
  }, done).start();
});

gulp.task('sitespeedio', ['serve'], function(done){
  var run = sitespeedio({
    urls: [
      baseUrl + '/app/app.html?file=pf-alert',
      baseUrl + '/app/app.html?file=pf-tabs',
      baseUrl + '/app/app.html?file=pf-utilization-bar-chart'
    ],
    browser: 'chrome',
    resultBaseDir: './perf/',
    connection: 'cable',
    html: true,
    budget: {
      page: {
        pageWeight:1000000,
        imageWeight: 300000,
        jsWeight: 500000,
        cssWeight: 500000
      }
    }
  });
  run(done);
});

gulp.task('louis', ['serve'], function() {
  return louis({
    //note: change this url to the page you are testing
    //todo: refactor gulp-louis to accept an array
    timeout: 10,
    url: baseUrl + '/app/app.html?file=pf-alert',
    outputFileName: 'perf/phantomas/results.json',
    engine: 'webkit',
    userAgent: 'Chrome/54.0.2840.87',
    performanceBudget: {
      slowestResponse: 1000,
      domComplete: 3000
    }
  });
});

gulp.task('perf', function(done){
  runSequence('build', 'sitespeedio', done)
});

gulp.task('webpack', ['js'], function() {
  return gulp.src('src/patternfly.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['font', 'js', 'scss', 'webpack']);

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: browserSyncPort
  });

  gulp.watch('index.html', ['build']);
  gulp.watch('app/*.html', ['build']);
  gulp.watch('src/*.js', ['build']);
  gulp.watch('src/*.html', ['build']);
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});