var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  browserSyncPort = 3000,
  baseUrl = 'http://localhost:' + browserSyncPort,
  eslint = require('gulp-eslint'),
  gettext = require("gulp-gettext-parser"),
  ignore = require('gulp-ignore'),
  Karma = require('karma').Server,
  path = require('path'),
  rename = require("gulp-rename"),
  sass = require('gulp-sass'),
  $ = require('gulp-load-plugins')(),
  webpack = require('webpack-stream'),
  runSequence = require('run-sequence'),
  sitespeedio = require('gulp-sitespeedio'),
  runBundleAnalyzer = false,
  jsdoc = require('gulp-jsdoc3'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

gulp.task('font', function() {
  return gulp.src(['node_modules/patternfly/dist/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', ['lint','copy'], function () {
  return gulp.src(['src/*/*.js', '!src/*/*.spec.js'])
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist/es2015'));
});

gulp.task('copy', function() {
  return gulp.src(['src/customElementShim.js', ''])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('doc', function (cb) {
  var config = require('./jsdocConfig.json');
  gulp.src(['README.md', './src/**/*.component.js', './src/pf-utils/*-utils.js'], {read: false})
    .pipe(jsdoc(config, cb));
});

gulp.task('lint', function () {
  return gulp.src(['src/*/*.js'])
    .pipe(eslint('.eslintrc.json'))
    .pipe(eslint.failOnError());
});

gulp.task('scss', function() {
  return gulp.src(['src/scss/*.scss'])
    .pipe($.plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('css', function() {
  return gulp.src(['node_modules/patternfly/dist/css/**/*'])
    .pipe(gulp.dest('dist/css'));
});


gulp.task('test', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-debug', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    browsers: ['Chrome']
  }, done).start();
});

gulp.task('sitespeedio', ['serve'], function(done) {
  var run = sitespeedio({
    urls: [
      baseUrl + '/app/app.html?file=pf-alert',
      baseUrl + '/app/app.html?file=pf-tabs',
      baseUrl + '/app/app.html?file=pf-utilization-bar-chart',
      baseUrl + '/app/app.html?file=pf-list-view',
      baseUrl + '/app/app.html?file=pf-tooltip'
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

gulp.task('perf', function(done) {
  runSequence('build', 'sitespeedio', done);
});

gulp.task('bundleAnalyzer', function(done) {
  runBundleAnalyzer = true;
  runSequence('build', done);
});

gulp.task('webpack', ['js'], function() {
  var webpackConfig = require('./webpack.config.js');
  if (runBundleAnalyzer) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  return gulp.src('src/patternfly.js')
    .pipe(webpack( webpackConfig ))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('gettext-extract', function () {
  return gulp.src(["src/**/*.js"])
    .pipe(gettext())
    .pipe(rename("patternfly.pot"))
    .pipe(gulp.dest("dist/i18n"));
});

gulp.task('build', ['font', 'js', 'scss', 'css', 'gettext-extract', 'webpack']);

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: browserSyncPort
  });

  gulp.watch('index.html', ['build']);
  gulp.watch('app/*.html', ['build']);
  gulp.watch('src/**/*.js', ['build']);
  gulp.watch('src/**/*.html', ['build']);
  gulp.watch("dist/**/*").on('change', browserSync.reload);
});
