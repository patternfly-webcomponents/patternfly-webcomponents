# Testing Patternfly-Webcomponents

### Unit Tests
Unit tests are run with [Karma](https://karma-runner.github.io/1.0/index.html) and [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher).

To run unit tests, simply run:
```
gulp test
```

To debug unit tests locally with karma test server and Headless Chrome, first add the following setting snippets to `karma.conf.js`:
```
  browsers: ['HeadlessChrome'],

  customLaunchers: {
    HeadlessChrome: {
      base: 'Chrome',
      flags: ['--no-sandbox', '--headless', '--disable-gpu', ' --remote-debugging-port=9222']
    }
  }
```

**Note**: --headless flag is only available Chrome 59+.

You can also change `logLevel` for futher debug logging:
```
logLevel: config.LOG_DEBUG,
```

you can then run the following to start a Karma debug server:
```
karma start karma.conf.js
```

then you can access `http://localhost:9876/` and hit the "DEBUG" button in the top right to debug

In addtion, if your target browers include Firefox, Opera, Safari , IE and so on. You can append these names to the "browsers" option.
```
browsers: ['HeadlessChrome', 'FireFox', 'Opera', 'Safari', 'IE']
```

Of course, you need to install the following launchers firstly:
- Firefox (launcher requires karma-firefox-launcher plugin)
- Opera (launcher requires karma-opera-launcher plugin)
- Safari (launcher requires karma-safari-launcher plugin)
- IE (launcher requires karma-ie-launcher plugin)

### Enabling Travis Builds
We enable Travis builds in our forks so that test pages may be shared in our pull requests. To setup Travis, you can do the following:

1. Generate a Github personal access token
   * You can do this by going to your Github profile -> Settings -> **Personal access tokens**
   * Select the **"Generate New Token"** button
    * Description: "patternfly-webcomponents"
    * Scopes: Check the **"public_repo"** option
   * Hit generate to generate the token
2. Enable Travis builds
   * Visit `https://travis-ci.org/`[~your github id]`/patternfly-webcomponents`
   * Hit **"More options"** dropdown and select **"Settings"**
   * Under **General**, set "Build branch updates" and "Build pull request updates" to **ON**
   * Under **Environment Variables**, add a variable with name **AUTH_TOKEN** and value the token generated from Step 1.
   * Set Display value in build log to **OFF**
3. Push your feature branch to your fork
   * Now that Travis builds are enabled, you will automatically see a Travis build triggered in your Travis build history after each branch push.
   * If the build is successful, you will automatically see a `-dist` branch created in your fork. (i.e.: `my-feature-branch-dist`) which contains all compiled assets
4. Copy your test page url to share in your pull request
   * Rawgit will now serve the test pages for your feature branch at the following url:
      * `https://rawgit.com/`[~your github id]`/patternfly-webcomponents/`[~your feature branch]`-dist/index.html`
      * Ex: `https://rawgit.com/priley86/patternfly-webcomponents/relative-paths-dist/index.html`  


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