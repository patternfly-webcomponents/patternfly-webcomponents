//Shim for resolving current issue with extending HTMLElement in ES6 /Babel transpiled classes in Safari
//https://github.com/babel/babel/issues/1548
//https://github.com/babel/babel/issues/4480

if (typeof HTMLElement !== 'function'){
  var _HTMLElement = function(){};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}