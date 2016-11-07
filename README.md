# PatternFly Web Components for [PatternFly](https://www.patternfly.org)
This project will provide a set of core web components for the PatternFly reference implementation.

---

## Getting started
### Build
    npm install
    gulp build
### Serve
    gulp serve
URL: http://localhost:3000/index.html
* Uses gulp watch and browser-sync

![image](https://cloud.githubusercontent.com/assets/12733153/20062925/69b80140-a4d3-11e6-87d7-b2f523b1b869.png)

## Tech Notes

Repository uses the following:

* Bable - Essentially an ECMAScript 6 to ECMAScript 5 Javascript compiler. It allows you to use ES6 features in your projects and then compiles ES5 for you to use in production.
* Plumber - Prevent pipe breaking caused by errors from gulp plugins
* Webpack - Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.
