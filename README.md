# PatternFly Web Components for [PatternFly](https://www.patternfly.org)
This project will provide a set of core web components for the PatternFly reference implementation.

![image](https://cloud.githubusercontent.com/assets/12733153/19731570/d719d1d0-9b6b-11e6-8c70-2b93d1d60788.png)

![image](https://cloud.githubusercontent.com/assets/12733153/19732159/e0ee31cc-9b6d-11e6-9dfa-9e954ab611c2.png)

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

* Bable - Essentially an ECMAScript 6 to ECMAScript 5 Javascript compiler. It allows you to use ES6 features in your projects and then compiles ES5 for you to use in production.
* Vulcanize - Concatenate a set of Web Components into one file.  Reduce an HTML file and its dependent HTML Imports into one file.  Web pages that use multiple HTML Imports to load dependencies may end up making lots of network round-trips. In many cases, this can lead to long initial load times and unnecessary bandwidth usage. The Vulcanize tool follows HTML Imports and `<script>` tags to inline these external assets into a single page, to be used in production.
* Plumber - Prevent pipe breaking caused by errors from gulp plugins