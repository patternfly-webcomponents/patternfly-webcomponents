# PatternFly Web Components
This project will provide a set of core web components for the [PatternFly](https://www.patternfly.org) project.

![Image of PatternFly](https://raw.githubusercontent.com/patternfly-webcomponents/patternfly-webcomponents/master/icons/patternfly-webcomponents.png)

https://patternfly-webcomponents.github.io/

Note: This project is in alpha state and currently makes use of [Patternfly 4](https://github.com/patternfly/patternfly) / Bootstrap 3 CSS. In future releases, we will add support for [Patternfly 5](https://github.com/patternfly/patternfly-css) / Bootstrap 4 Atomic CSS.

## Getting Started
```
   npm install --save patternfly-webcomponents
```

### JS
Include `dist\js\patternfly.js` to load all components or load the `*.js` components individually.

### CSS
Load the web component CSS in `dist\css\patternfly-webcomponents.css` alongside Patternfly CSS.

### API Docs
API documentation for each component is generated with [JSDocs](http://usejsdoc.org/). You can view these docs here:

https://patternfly-webcomponents.github.io/patternfly-webcomponents/

### Build
    npm install
    gulp build

### Serve
    gulp serve
URL: http://localhost:3000/index.html
* Uses gulp watch and browser-sync

![image](https://cloud.githubusercontent.com/assets/12733153/20062925/69b80140-a4d3-11e6-87d7-b2f523b1b869.png)

### Testing
Unit and Peformance test notes can be found in [TESTS.md](TESTS.md)

Test pages for each component can also be found at the following url:
https://rawgit.com/patternfly-webcomponents/patternfly-webcomponents/master-dist/index.html

## Tech Notes
Repository uses the following:

* Babel - Essentially an ECMAScript 6 to ECMAScript 5 Javascript compiler. It allows you to use ES6 features in your projects and then compiles ES5 for you to use in production.
* Plumber - Prevent pipe breaking caused by errors from gulp plugins
* Webpack - Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.

## Gotchas
If you choose to include components individually, you will also want to include `dist\js\customElementShim.js`. This resolves an issue currently with the HTMLElement prototype in Safari.

[Source](https://github.com/babel/babel/issues/1548)

## Git Commit Guidelines

PatternFly Web Components uses a semantic release process to automate package publishing, based on the following commit message format.

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject** ([full explanation](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

##### Patch Release

```
fix(pencil): stop graphite breaking when too much pressure applied
```

##### Feature Release

```
feat(pencil): add 'graphiteWidth' option
```

##### Breaking Release

```
perf(pencil): remove graphiteWidth option
```
