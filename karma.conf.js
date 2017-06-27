// Karma configuration
// Generated on Mon Oct 31 2016 14:37:35 GMT-0400 (EDT)

module.exports = function(config) {
  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/promise-polyfill/promise.js',
      'node_modules/jasmine-promises/dist/jasmine-promises.js',
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
      'node_modules/@webcomponents/custom-elements/src/native-shim.js',
      'dist/js/patternfly.js',
      'src/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['HeadlessChrome'],

    // you can define custom flags
    customLaunchers: {
      HeadlessChrome: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', ' --remote-debugging-port=9222']
      },
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  } else {
    configuration.files.unshift('node_modules/@webcomponents/custom-elements/src/native-shim.js');
  }

  config.set(configuration);
};
