var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  $ = require('gulp-load-plugins')(),
  webpack = require('webpack-stream');

gulp.task('copy', function () {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  return gulp.src('src/*.js')
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp.src(['app/app.less'])
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer("last 3 versions", "> 1%"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scss', function(){
  return gulp.src(['src/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe($.rename('patternfly.css'))
    .pipe(gulp.dest('dist/css'));
});

// ToDo: Remove Vulcanize in favor of Webpack
gulp.task('vulcanize', function () {
  return gulp.src(['dist/pf-utilization-bar-chart.html'])
      .pipe($.vulcanize({dest: 'dist', inlineScripts: true, inlineCss: true}))
      .pipe(gulp.dest('dist'));
});

gulp.task('webpack', ['js'], function() {
  return gulp.src([
    'node_modules/patternfly-alert/dist/pf-alert.component.js',
    'node_modules/patternfly-tabs/dist/pf-tabs.component.js',
    'node_modules/patternfly-utilization-bar-chart/dist/pf-utilization-bar-chart.component.js'])
    .pipe(webpack())
    .pipe($.rename('patternfly.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['js', 'copy', 'css', 'scss', 'vulcanize', 'webpack']);

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