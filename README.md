# PatternFly Web Components [PatternFly](https://www.patternfly.org)
This project will provide a set of core web components for the PatternFly reference implementation.

## Getting started
### Build
    npm install
    gulp build
### Serve
    gulp serve
URL: http://localhost:3000/index.html
* Uses gulp watch and browser-sync

## Tech Notes

Repository uses the following:

* Bable - BEssentially an ECMAScript 6 to ECMAScript 5 Javascript compiler. It allows you to use ES6 features in your projects and then compiles ES5 for you to use in production.
* Vulcanize - Concatenate a set of Web Components into one file.  Reduce an HTML file and its dependent HTML Imports into one file.  Web pages that use multiple HTML Imports to load dependencies may end up making lots of network round-trips. In many cases, this can lead to long initial load times and unnecessary bandwidth usage. The Vulcanize tool follows HTML Imports and <script> tags to inline these external assets into a single page, to be used in production.
* Plumber - Prevent pipe breaking caused by errors from gulp plugins