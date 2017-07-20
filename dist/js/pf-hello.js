/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * i18n Utils JS Helper
 * Common i18n helper methods used in Patternfly Web Components
 */

/**
 * See pf-i18n element for initialization details.
 *
 * @constructor
 */
var I18nUtil = function I18nUtil() {
  var self = this;

  /**
   * Get localized text.
   *
   * @param {string} key The message key
   */
  this.gettext = function (key) {
    if (self.mixin !== undefined && typeof self.mixin.getMsg === 'function') {
      return self.mixin.getMsg(key);
    } else if (self.mixin !== undefined) {
      return self.mixin[key];
    }
    return key;
  };

  /**
   * Set an object literal containing translated messages or an object containing a getMsg() function to retrieve
   * translated messages.
   *
   * @param {Function} mixin The i18n mixin.
   */
  this.setMixin = function (mixin) {
    if (mixin === undefined) {
      throw new Error("I18nUtil: Mixin cannot be undefined.");
    }
    self.mixin = mixin;
  };
};
var i18n = new I18nUtil();
exports.i18n = i18n;

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfHello = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfHello = __webpack_require__(29);

var _pfHello2 = _interopRequireDefault(_pfHello);

var _i18nUtils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-hello&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-hello></pf-hello>
 */
var PfHello = exports.PfHello = function (_HTMLElement) {
  _inherits(PfHello, _HTMLElement);

  _createClass(PfHello, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this.appendChild(this._template.content);
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }, {
    key: 'attributeChangedCallback',


    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      this.refresh();
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['text'];
    }
  }]);

  function PfHello() {
    _classCallCheck(this, PfHello);

    var _this = _possibleConstructorReturn(this, (PfHello.__proto__ || Object.getPrototypeOf(PfHello)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _pfHello2.default;
    _this.refresh();
    return _this;
  }

  /**
   * Get nodes from given selector
   *
   * @param selector The query selector identifying the elements to retrieve
   * @returns {Element}
   * @private
   */


  _createClass(PfHello, [{
    key: '_getNodes',
    value: function _getNodes(selector) {
      var el = this.querySelectorAll(selector);
      if (el.length === 0) {
        el = this._template.content.querySelectorAll(selector);
      }
      return el;
    }

    /**
     * Helper function to init text
     * @private
     */

  }, {
    key: 'refresh',
    value: function refresh() {
      var nodes = this._getNodes('span');
      var el = nodes[nodes.length - 1];
      el.innerHTML = _i18nUtils.i18n.gettext("Hello World!");
    }
  }]);

  return PfHello;
}(HTMLElement);

window.customElements.define('pf-hello', PfHello);

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfHelloTemplate = "\n<span></span>\n";
exports.default = PfHelloTemplate;

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Hello **/
__webpack_require__(28);

/***/ })

/******/ });