# Testing Patternfly-Webcomponents

### Unit Tests

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