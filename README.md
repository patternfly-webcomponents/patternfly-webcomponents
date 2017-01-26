# PatternFly Web Components
This project will provide the set of core web components for the [PatternFly](https://www.patternfly.org).

![Image of PatternFly](https://raw.githubusercontent.com/patternfly-webcomponents/patternfly-webcomponents/master/icons/patternfly-webcomponents.png)

https://patternfly-webcomponents.github.io/

Note: This project is in alpha state and currently makes use of [Patternfly 4](https://github.com/patternfly/patternfly) / Bootstrap 3 CSS. In future releases, 
we will add support for Patternfly 5 / Bootstrap 4 Atomic CSS.

https://github.com/patternfly/patternfly-atomic

## Getting Started
   npm install --save patternfly-webcomponents

### JS
Include `dist\js\patternfly.js` to load all components or load the `*.js` components individually.

### CSS
Load the web component CSS in `dist\css\patternfly-webcomponents.css` alongside Patternfly CSS.

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

## Gotchas
If you choose to include components individually, you will also want to include `dist\js\customElementShim.js`. This resolves an issue currently with the HTMLElement prototype in Safari.

[Source](https://github.com/babel/babel/issues/1548)