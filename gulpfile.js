var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  $ = require('gulp-load-plugins')();

gulp.task('js', function () {
  return gulp.src('src/*.js')
    .pipe($.plumber())
    .pipe($.babel(
      {presets: ['es2015']}
    ))
    // .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp.src([
        'src/*.html',
        'node_modules/webcomponents.js/webcomponents.js',
      ])
      .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp.src(['node_modules/patternfly/less/patternfly.less',
    'node_modules/patternfly/less/patternfly-additions.less'])
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer("last 3 versions", "> 1%"))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('img', function(){
  return gulp.src(['./node_modules/patternfly/dist/img/*.*'])
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function(){
  return gulp.src(['./node_modules/patternfly/dist/fonts/*.*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('vulcanize', ['copy'], function () {
  return gulp.src([
        'dist/pf-tabs.html',
        'dist/pf-utilization-bar-chart.html',
        'src/pf-alert.html',
        'src/pf-icon.html'])
      .pipe($.vulcanize({dest: 'dist', inlineScripts: true, inlineCss: true}))
      .pipe(gulp.dest('dist'));
});

// gulp.task('build', ['copy', 'js', 'css', 'img', 'fonts']);
gulp.task('build', ['js', 'copy', 'css', 'img', 'fonts', 'vulcanize']);


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