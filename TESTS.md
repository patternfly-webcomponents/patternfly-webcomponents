# Testing Patternfly-Webcomponents

### Unit Tests
Unit tests are run with [Karma](https://karma-runner.github.io/1.0/index.html) and [karma-phantomjs-launcher](https://github.com/karma-runner/karma-phantomjs-launcher).

To run unit tests, simply run:
```
gulp test
```

To debug unit tests locally with karma test server and Chrome, first edit `karma.conf.js` to target Chrome:
```
  browsers: ['Chrome'],
```
You can also change `logLevel` for futher debug logging:
```
logLevel: config.LOG_DEBUG,
```

 you can then run the following to start a Karma debug server:
 ```
 karma start karma.conf.js
 ```
(then hit the "DEBUG" button in the top right to debug)

 To debug unit tests locally with Phantom JS, edit `karma.conf.js` to target Phantom:
 ```
  browsers: ['PhantomJS'],
```

you can then run:
```
karma start --browsers PhantomJS_custom
```

This will launch a local PhantomJS debug server, which you can access here:
```
http://localhost:9000/webkit/inspector/inspector.html?page=2
```

### Performance Tests
This project makes use of [Sitespeed.io](https://www.sitespeed.io/) for web performance tests. 

You will need Chrome Driver to run Sitespeed tests in Chrome.
```
$ npm install chromedriver -g
```

Start a performance run with:
```
$ gulp perf
```
Once finished, review results in the `perf` directory.

### Bundle Analysis
You can visualize web component webpack bundles with `webpack-bundle-analyzer`. To see this, simply run:
```
$ gulp bundleAnalyzer
```