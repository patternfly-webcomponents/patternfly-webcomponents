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
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * PfUtil
 * Internal Utility Functions for Patternfly Web Components
 * --------------------------------------------------------------------------
 */

var PfUtil = function () {
  function PfUtil() {
    _classCallCheck(this, PfUtil);

    this.isMSIE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null ? parseFloat(RegExp.$1) : false;
    this.isIE = /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  _createClass(PfUtil, [{
    key: 'addClass',
    value: function addClass(el, c) {
      // where modern browsers fail, use classList
      if (el.classList) {
        el.classList.add(c);
      } else {
        el.className += ' ' + c;
        el.offsetWidth;
      }
    }
  }, {
    key: 'removeClass',
    value: function removeClass(el, c) {
      if (el.classList) {
        el.classList.remove(c);
      } else {
        el.className = el.className.replace(c, '').replace(/^\s+|\s+$/g, '');
      }
    }
  }, {
    key: 'getClosest',
    value: function getClosest(el, s) {
      //el is the element and s the selector of the closest item to find
      // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var former = s.charAt(0);
      var latter = s.substr(1);
      for (; el && el !== document; el = el.parentNode) {
        // Get closest match
        if (former === '#') {
          // If selector is an ID
          if (el.id === latter) {
            return el;
          }
        } else if (former === '.') {
          // If selector is a class
          if (new RegExp(latter).test(el.className)) {
            return el;
          }
        } else {
          // we assume other selector is tag name
          if (el.nodeName === s) {
            return el;
          }
        }
      }
      return false;
    }

    // tooltip / popover stuff

  }, {
    key: 'isElementInViewport',
    value: function isElementInViewport(t) {
      // check if this.tooltip is in viewport
      var r = t.getBoundingClientRect();
      return r.top >= 0 && r.left >= 0 && r.bottom <= (window.innerHeight || document.documentElement.clientHeight) && r.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
  }, {
    key: 'getScroll',
    value: function getScroll() {
      // also Affix and scrollSpy uses it
      return {
        y: window.pageYOffset || document.documentElement.scrollTop,
        x: window.pageXOffset || document.documentElement.scrollLeft
      };
    }
  }, {
    key: 'reflow',
    value: function reflow(el) {
      // force reflow
      return el.offsetHeight;
    }
  }, {
    key: 'once',
    value: function once(el, type, listener, self) {
      var one = function one(e) {
        try {
          listener.call(self, e);
        } finally {
          el.removeEventListener(type, one);
        }
      };

      el.addEventListener(type, one);
    }

    // the following 2 methods were taken from bootstrap.native - Native Javascript for Bootstrap 4
    // https://github.com/thednp/bootstrap.native
    // Copyright (c) 2015 dnp_theme

  }, {
    key: 'getOuterHeight',
    value: function getOuterHeight(child) {
      var childStyle = child && window.getComputedStyle(child),
          btp = /px/.test(childStyle.borderTopWidth) ? Math.round(childStyle.borderTopWidth.replace('px', '')) : 0,
          btb = /px/.test(childStyle.borderBottomWidth) ? Math.round(childStyle.borderBottomWidth.replace('px', '')) : 0,
          mtp = /px/.test(childStyle.marginTop) ? Math.round(childStyle.marginTop.replace('px', '')) : 0,
          mbp = /px/.test(childStyle.marginBottom) ? Math.round(childStyle.marginBottom.replace('px', '')) : 0;
      return child.clientHeight + parseInt(btp) + parseInt(btb) + parseInt(mtp) + parseInt(mbp);
    }
  }, {
    key: 'getMaxHeight',
    value: function getMaxHeight(parent) {
      // get collapse trueHeight and border
      var parentHeight = 0;
      for (var k = 0, ll = parent.children.length; k < ll; k++) {
        parentHeight += parent.children[k].offsetHeight;
      }
      return parentHeight;
    }
  }]);

  return PfUtil;
}();

var pfUtil = new PfUtil();
exports.pfUtil = pfUtil;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordionTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionBody = __webpack_require__(28);

var _pfAccordionBody2 = _interopRequireDefault(_pfAccordionBody);

var _pfUtils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
 *
 * @prop {boolean} open indicates if accordion is expanded
 */
var PfAccordionTemplate = exports.PfAccordionTemplate = function (_HTMLElement) {
  _inherits(PfAccordionTemplate, _HTMLElement);

  _createClass(PfAccordionTemplate, [{
    key: 'connectedCallback',


    /**
     * Called when an instance was inserted into the document
     */
    value: function connectedCallback() {
      this.classList.add('panel-collapse');
      this.classList.add('collapse');
      this.setAttribute('role', 'tabpanel');

      this.addEventListener('transitionend', this._handleTransitionEnd);

      if (this.hasAttribute('open')) {
        this.classList.add('in');
      } else if (this.classList.contains('in')) {
        this.setAttribute('open', '');
      } else {
        this.style.height = 0;
      }

      this._initialized = true;
      this.dispatchEvent(new Event('pf-accordion.initialized'));
    }

    /**
     * Called when an instance of the element is created
     */

  }], [{
    key: 'observedAttributes',


    /**
     * Returns a list of attributes on which we are interested to track changes
     * @returns {String[]}
     */
    get: function get() {
      return ['open'];
    }
  }]);

  function PfAccordionTemplate() {
    _classCallCheck(this, PfAccordionTemplate);

    var _this = _possibleConstructorReturn(this, (PfAccordionTemplate.__proto__ || Object.getPrototypeOf(PfAccordionTemplate)).call(this));

    _this._initialized = false;
    return _this;
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */


  _createClass(PfAccordionTemplate, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if ('open' === attrName) {
        if (this.hasAttribute('open')) {
          this._expand();
        } else {
          this._collapse();
        }
      }
    }

    /**
     * Make the panel visible
     */

  }, {
    key: '_expand',
    value: function _expand() {
      this._transitioning = true;
      this._action = 'expanding';

      this.dispatchEvent(new CustomEvent('pf-accordion.expanding', {
        bubbles: true,
        cancelable: false
      }));
      this.classList.remove('collapse');
      this.classList.add('collapsing');

      this.style.height = _pfUtils.pfUtil.getMaxHeight(this) + 'px';
    }

    /**
     * Hide the panel
     */

  }, {
    key: '_collapse',
    value: function _collapse() {
      var _this2 = this;

      this._transitioning = true;
      this._action = 'collapsing';

      this.dispatchEvent(new CustomEvent('pf-accordion.collapsing', {
        bubbles: true,
        cancelable: false
      }));
      var maxHeight = _pfUtils.pfUtil.getMaxHeight(this);
      this.classList.remove('collapse');
      this.classList.add('collapsing');
      this.style.height = maxHeight + 'px';

      setTimeout(function () {
        _this2.style.height = '0px';
      }, 10);
    }

    /**
     * Toggle the visiblity of the panel
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      this.open = !this.open;
    }

    /**
     * Handles the transitionend event.
     * @private
     */

  }, {
    key: '_handleTransitionEnd',
    value: function _handleTransitionEnd() {

      this.classList.remove('collapsing');
      this.classList.add('collapse');
      if ('expanding' === this._action) {
        this.classList.add('in');
        this.style.height = '';
        this.setAttribute('aria-expanded', 'true');
        this.dispatchEvent(new CustomEvent('pf-accordion.expanded', {
          bubbles: true
        }));
      } else {
        this.setAttribute('aria-expanded', 'false');
        this.dispatchEvent(new CustomEvent('pf-accordion.collapsed', {
          bubbles: true
        }));
      }

      this._transitioning = false;
      this._action = null;
    }

    /**
     * Get the display state of the panel
     *
     * @returns {string} the display state, either 'shown' or 'hidden'
     */

  }, {
    key: 'open',
    get: function get() {
      return this.hasAttribute('open');
    }

    /**
     * Set the display state of the panel
     *
     * @param {string} value the display state, either 'shown' or 'hidden'
     */
    ,
    set: function set(value) {
      if (value) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
    }
  }]);

  return PfAccordionTemplate;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-template', PfAccordionTemplate);
})();

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAlert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAlert = __webpack_require__(5);

var _pfAlert2 = _interopRequireDefault(_pfAlert);

var _pfUtils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-alert&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-alert type="danger" persistent="true" persistentCallbackFn="alert('Danger alert closed');"></pf-alert>
 *
 * @prop {string} type danger, warning, success, info
 * @prop {string} persistant true, false
 * @prop {function} persistent-callback-fn
 */
var PfAlert = exports.PfAlert = function (_HTMLElement) {
  _inherits(PfAlert, _HTMLElement);

  _createClass(PfAlert, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this.classList.add("alert");
      this.insertBefore(this._template.content, this.firstChild);
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
      if (attrName === "type") {
        this._resetType(oldValue, newValue);
        this._initType();
      } else if (attrName === "persistent" || attrName === "persistent-callback-fn") {
        this._initPersistent();
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['type', 'persistent', 'persistent-callback-fn'];
    }
  }]);

  function PfAlert() {
    _classCallCheck(this, PfAlert);

    var _this = _possibleConstructorReturn(this, (PfAlert.__proto__ || Object.getPrototypeOf(PfAlert)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _pfAlert2.default;
    _this._initDefaults();
    _this._initPersistent();
    _this._initType();
    return _this;
  }

  /**
   * Helper function to init defaults
   * @private
   */


  _createClass(PfAlert, [{
    key: '_initDefaults',
    value: function _initDefaults() {
      this._classNames = {
        "pfalert": {
          "danger": "alert-danger",
          "info": "alert-info",
          "success": "alert-success",
          "warning": "alert-warning"
        },
        "pficon": {
          "danger": "pficon-error-circle-o",
          "info": "pficon-info",
          "success": "pficon-ok",
          "warning": "pficon-warning-triangle-o"
        }
      };
    }

    /**
     * Helper function to make alert persistent
     * @private
     */

  }, {
    key: '_initPersistent',
    value: function _initPersistent() {
      var self = this;
      var nodes = this._getNodes('button.close');
      var el = nodes[0];
      if (this.getAttribute("persistent") === "true") {
        this.classList.add("alert-dismissable");
        if (el !== undefined) {
          el.classList.remove("hidden");
          el.setAttribute('onclick', this.getAttribute("persistent-callback-fn"));
        }
      } else {
        this.classList.remove("alert-dismissable");
        if (el !== undefined) {
          el.classList.add("hidden");
        }
      }
    }

    /**
     * Helper function to init alert type
     * @private
     */

  }, {
    key: '_initType',
    value: function _initType() {
      var nodes = this._getNodes('span.pficon');
      var el = nodes[nodes.length - 1];
      switch (this.getAttribute("type")) {
        case "danger":
          this.classList.add(this._classNames.pfalert.danger);
          el.classList.add(this._classNames.pficon.danger);
          break;
        case "info":
          this.classList.add(this._classNames.pfalert.info);
          el.classList.add(this._classNames.pficon.info);
          break;
        case "success":
          this.classList.add(this._classNames.pfalert.success);
          el.classList.add(this._classNames.pficon.success);
          break;
        case "warning":
          this.classList.add(this._classNames.pfalert.warning);
          el.classList.add(this._classNames.pficon.warning);
          break;
      }
    }

    /**
     * Helper function to reset alert type
     * @param oldValue The old attribute value
     * @private
     */

  }, {
    key: '_resetType',
    value: function _resetType(oldValue) {
      var nodes = this._getNodes('span.pficon');
      var el = nodes[nodes.length - 1];
      switch (oldValue) {
        case "danger":
          this.classList.remove(this._classNames.pfalert.danger);
          el.classList.remove(this._classNames.pficon.danger);
          break;
        case "info":
          this.classList.remove(this._classNames.pfalert.info);
          el.classList.remove(this._classNames.pficon.info);
          break;
        case "success":
          this.classList.remove(this._classNames.pfalert.success);
          el.classList.remove(this._classNames.pficon.success);
          break;
        case "warning":
          this.classList.remove(this._classNames.pfalert.warning);
          el.classList.remove(this._classNames.pficon.warning);
          break;
      }
    }

    /**
     * Get nodes from given selector
     *
     * @param selector The query selector identifying the elements to retrieve
     * @returns {Element}
     * @private
     */

  }, {
    key: '_getNodes',
    value: function _getNodes(selector) {
      var el = this.querySelectorAll(selector);
      if (el.length === 0) {
        el = this._template.content.querySelectorAll(selector);
      }
      return el;
    }
  }]);

  return PfAlert;
}(HTMLElement);

window.customElements.define('pf-alert', PfAlert);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfAlertTemplate = "\n<button type=\"button\" class=\"close hidden\" data-dismiss=\"alert\" aria-hidden=\"true\">\n  <span class=\"pficon pficon-close\"></span>\n</button>\n<span class=\"pficon\"></span>\n";
exports.default = PfAlertTemplate;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfTab = __webpack_require__(7);

var _pfTab2 = _interopRequireDefault(_pfTab);

var _pfTabs = __webpack_require__(8);

var _pfTabs2 = _interopRequireDefault(_pfTabs);

var _pfTab3 = __webpack_require__(9);

var _pfTab4 = _interopRequireDefault(_pfTab3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tabs&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs>
 *  <pf-tab tab-title="Tab1" active="true">
 *    <p>Tab1 content here</p>
 *  </pf-tab>
 *  <pf-tab tab-title="Tab2">
 *    <p>Tab2 content here</p>
 *  </pf-tab>
 * </pf-tabs>
 *
 */
var PfTabs = exports.PfTabs = function (_HTMLElement) {
  _inherits(PfTabs, _HTMLElement);

  _createClass(PfTabs, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      if (!this._initialized) {
        this.insertBefore(this._tabsTemplate.content, this.firstChild);

        this._makeTabsFromPfTab();

        this.querySelector('ul').addEventListener('click', this);

        // Add the ul class if specified
        this.querySelector('ul').className = this.attributes.class ? this.attributes.class.value : 'nav nav-tabs';

        if (!this.mutationObserver) {
          this.mutationObserver = new MutationObserver(this._handleMutations.bind(this));
          this.mutationObserver.observe(this, { childList: true, attributes: true });
        }
      }
      this._initialized = true;
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
      if (attrName === 'class' && newValue !== 'ng-isolate-scope') {
        var ul = this.querySelector('ul');
        if (ul) {
          ul.className = newValue;
        }
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['class'];
    }
  }]);

  function PfTabs() {
    _classCallCheck(this, PfTabs);

    var _this = _possibleConstructorReturn(this, (PfTabs.__proto__ || Object.getPrototypeOf(PfTabs)).call(this));

    _this._tabsTemplate = document.createElement('template');
    _this._tabsTemplate.innerHTML = _pfTabs2.default;

    _this.selected = null;
    _this.tabMap = new Map();
    _this.panelMap = new Map();
    _this.displayMap = new Map();
    return _this;
  }

  /**
   * Called when the element is removed from the DOM
   */


  _createClass(PfTabs, [{
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.querySelector('ul').removeEventListener('click', this);
    }

    /**
     * Handle the tab change event
     *
     * @param event {Event} Handle the tab change event
     */

  }, {
    key: 'handleEvent',
    value: function handleEvent(event) {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        this._setTabStatus(event.target.parentNode);
      }
    }

    /**
     * Handle mutations
     *
     * @param mutations
     * @private
     */

  }, {
    key: '_handleMutations',
    value: function _handleMutations(mutations) {
      var self = this;
      var handlers = [];
      mutations.forEach(function (mutationRecord) {
        //child dom nodes have been added
        if (mutationRecord.type === 'childList') {
          for (var i = 0; i < mutationRecord.addedNodes.length; i++) {
            handlers.push(['add', mutationRecord.addedNodes[i]]);
          }
          for (var _i = 0; _i < mutationRecord.removedNodes.length; _i++) {
            handlers.push(['remove', mutationRecord.removedNodes[_i]]);
          }
        } else if (mutationRecord.type === 'attributes') {
          //mutationRecord.attributeName contains changed attributes
          //note: we can ignore this for attributes as the v1 spec of custom
          //elements already provides attributeChangedCallback
        }
      });
      if (handlers.length) {
        requestAnimationFrame(function () {
          var ul = self.querySelector('ul');
          handlers.forEach(function (notes) {
            var action = notes[0];
            var pfTab = notes[1];
            var tab = void 0;

            //ignore Angular directive #text and #comment nodes
            if (pfTab.nodeName !== "PF-TAB") {
              return;
            }

            if (action === 'add') {
              //add tab
              tab = self._makeTab(pfTab);
              self.tabMap.set(tab, pfTab);
              self.panelMap.set(pfTab, tab);

              //if active, deactivate others
              if (pfTab.attributes.active) {
                self.tabMap.forEach(function (value, key) {
                  var fn = tab === key ? self._makeActive : self._makeInactive;
                  fn.call(self, key);
                });
              } else {
                self._makeInactive(tab);
              }
              ul.appendChild(tab);
            } else {
              //remove tab
              tab = self.panelMap.get(pfTab);
              tab.parentNode.removeChild(tab);
              self.panelMap.delete(pfTab);
              self.tabMap.delete(tab);
              self.displayMap.delete(tab);

              //we removed the active tab, make the last one active
              if (pfTab.attributes.active) {
                var last = ul.querySelector('li:last-child');
                self._setTabStatus(last);
              }
            }
          });
        });
      }
    }

    /**
     * Handle the tabTitle change event
     *
     * @param panel {string} The tab panel
     * @param tabTitle {string} The tab title
     */

  }, {
    key: 'handleTitle',
    value: function handleTitle(panel, tabTitle) {
      var tab = this.panelMap.get(panel);
      //attribute changes may fire as Angular is rendering
      //before this tab is in the panelMap, so check first
      if (tab) {
        tab.children[0].textContent = tabTitle;
      }
    }

    /**
     * Sets the active tab programmatically
     * @param tabTitle
     */

  }, {
    key: 'setActiveTab',
    value: function setActiveTab(tabTitle) {
      var _this2 = this;

      this.tabMap.forEach(function (value, key) {
        var tabtitle = value.attributes.tabtitle ? value.attributes.tabtitle.value : value.tabtitle;
        if (tabtitle === tabTitle) {
          _this2._setTabStatus(key);
        }
      });
    }

    /**
     * Helper function to create tabs
     *
     * @private
     */

  }, {
    key: '_makeTabsFromPfTab',
    value: function _makeTabsFromPfTab() {
      var ul = this.querySelector('ul');
      if (this.children && this.children.length) {
        var pfTabs = [].slice.call(this.children).filter(function (node) {
          return node.nodeName === 'PF-TAB';
        });
        [].forEach.call(pfTabs, function (pfTab, idx) {
          var tab = this._makeTab(pfTab);
          ul.appendChild(tab);
          this.tabMap.set(tab, pfTab);
          this.panelMap.set(pfTab, tab);

          if (idx === 0) {
            this._makeActive(tab);
          } else {
            pfTab.style.display = 'none';
          }
        }.bind(this));
      }
    }

    /**
     * Helper function to create a new tab element from given tab
     *
     * @param pfTab A PfTab element
     * @returns {PfTab} A new PfTab element
     * @private
     */

  }, {
    key: '_makeTab',
    value: function _makeTab(pfTab) {
      var frag = document.createElement('template');
      frag.innerHTML = _pfTab2.default;
      var tab = frag.content.firstElementChild;
      var tabAnchor = tab.firstElementChild;
      //React gives us a node with attributes, Angular adds it as a property
      tabAnchor.innerHTML = pfTab.attributes && pfTab.attributes.tabTitle ? pfTab.attributes.tabTitle.value : pfTab.tabTitle;
      this.displayMap.set(pfTab, pfTab.style.display);
      return tab;
    }

    /**
     * Helper function to make given tab active
     *
     * @param tab A PfTab element
     * @private
     */

  }, {
    key: '_makeActive',
    value: function _makeActive(tab) {
      tab.classList.add('active');
      var pfTab = this.tabMap.get(tab);
      var naturalDisplay = this.displayMap.get(pfTab);
      pfTab.style.display = naturalDisplay;
      pfTab.setAttribute('active', '');
    }

    /**
     * Helper function to make given tab inactive
     *
     * @param tab A PfTab element
     * @private
     */

  }, {
    key: '_makeInactive',
    value: function _makeInactive(tab) {
      tab.classList.remove('active');
      var pfTab = this.tabMap.get(tab);
      pfTab.style.display = 'none';
      pfTab.removeAttribute('active');
    }

    /**
     * Helper function to set tab status
     *
     * @param {boolean} active True if active
     * @param {string} tabtitle the tab title
     * @private
     */

  }, {
    key: '_setTabStatus',
    value: function _setTabStatus(active) {
      if (active === this.selected) {
        return;
      }
      this.selected = active;

      var activeTabTitle = "";
      var tabs = this.querySelector('ul').children;
      [].forEach.call(tabs, function (tab) {
        if (active === tab) {
          activeTabTitle = tab.querySelector('a').text;
        }
        var fn = active === tab ? this._makeActive : this._makeInactive;
        fn.call(this, tab);
      }.bind(this));

      //dispatch the custom 'tabChanged' event for framework listeners
      this.dispatchEvent(new CustomEvent('pf-tabs.tabChanged', { detail: activeTabTitle }));
    }
  }]);

  return PfTabs;
}(HTMLElement);

window.customElements.define('pf-tabs', PfTabs);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfTabTemplate = "\n<li role=\"presentation\">\n  <a href=\"#\" role=\"tab\" data-toggle=\"tab\"></a>\n</li>\n";
exports.default = PfTabTemplate;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfTabsTemplate = "\n<ul role=\"tablist\"></ul>\n";
exports.default = PfTabsTemplate;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = __webpack_require__(10);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tab&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs>
 *  <pf-tab tab-title="Tab1" active="true">
 *    <p>Tab1 content here</p>
 *  </pf-tab>
 *  <pf-tab tab-title="Tab2">
 *    <p>Tab2 content here</p>
 *  </pf-tab>
 * </pf-tabs>
 *
 * @prop {string} tab-title the tab title
 * @prop {string} active if attribute exists, tab will be active
 */
var PfTab = exports.PfTab = function (_HTMLElement) {
  _inherits(PfTab, _HTMLElement);

  _createClass(PfTab, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this._tabTitle = this.getAttribute('tab-title');

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
      var parent = this.parentNode;
      if (attrName === 'tab-title' && parent && parent.handleTitle) {
        parent.handleTitle(this, newValue);
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['tab-title'];
    }
  }]);

  function PfTab() {
    _classCallCheck(this, PfTab);

    var _this = _possibleConstructorReturn(this, (PfTab.__proto__ || Object.getPrototypeOf(PfTab)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _panel2.default;
    return _this;
  }

  /**
   * Get tab-title
   *
   * @returns {string} The tab-title
   */


  _createClass(PfTab, [{
    key: 'tabTitle',
    get: function get() {
      return this._tabTitle;
    }

    /**
     * Set tab tab-title
     *
     * @param {string} value The tab tab-title
     */
    ,
    set: function set(value) {
      if (this._tabTitle !== value) {
        this._tabTitle = value;
        this.setAttribute('tab-title', value);
      }
    }

    /**
     * Get flag indicating tab is active
     *
     * @returns {boolean} True if tab is active
     */

  }, {
    key: 'active',
    get: function get() {
      return this._active;
    }

    /**
     * Set flag indicating tab is active
     *
     * @param {boolean} value True to set tab active
     */
    ,
    set: function set(value) {
      if (this._active !== value) {
        this._active = value;
        this.setAttribute('active', value);
      }
    }
  }]);

  return PfTab;
}(HTMLElement);

window.customElements.define('pf-tab', PfTab);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfPanelTemplate = "\n<div role=\"tabpanel\"></div>\n";
exports.default = PfPanelTemplate;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTooltip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfTooltip = __webpack_require__(12);

var _pfTooltip2 = _interopRequireDefault(_pfTooltip);

var _pfUtils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-tooltip&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tooltip animation="fade" target-selector="#btn-left" placement="left" delay="100" duration="150" container-selector="#container"></pf-alert>
 *
 * @prop {string} animation the animation class
 * @prop {string} target-selector the target element selector
 * @prop {string} placement left, right, top, bottom
 * @prop {number} delay animation delay (ms)
 * @prop {number} duration animation duration (ms)
 * @prop {string} container-selector the container element selector
 */

var PfTooltip = exports.PfTooltip = function (_HTMLElement) {
  _inherits(PfTooltip, _HTMLElement);

  _createClass(PfTooltip, [{
    key: 'init',


    /**
     * Reinitializes tooltip component with attribute values and resets content
     */
    value: function init() {
      var _this2 = this;

      this.element = this;
      this.content = this._innerHtml || this.element.innerHTML;
      this.tooltip = null;
      this._targetSelector = this.getAttribute('target-selector');
      this._target = this._targetSelector ? document.querySelector(this._targetSelector) : this;
      this._animation = this.getAttribute('animation') ? this.getAttribute('animation') : 'fade';
      this._placement = this.getAttribute('placement') ? this.getAttribute('placement') : 'right';
      this._delay = parseInt(this.getAttribute('delay')) || 100;
      this._mouseHover = 'onmouseleave' in document ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'];
      this._tipPositions = /\b(top|bottom|left|top)+/;
      this._duration = _pfUtils.pfUtil.isMSIE && _pfUtils.pfUtil.isMSIE < 10 ? 0 : parseInt(this.getAttribute('duration')) || 150;
      this._containerSelector = this.getAttribute('container-selector');
      this._container = this._containerSelector ? document.querySelector(this._containerSelector) : document.body;

      if (this._target) {
        //create open event listeners
        this._target.addEventListener(this._mouseHover[0], function (e) {
          _this2.open(e);
        }, false);

        //create close event listener
        this._target.addEventListener(this._mouseHover[1], function (e) {
          _this2.close(e);
        }, false);
      }
    }

    /**
     * Called when an instance was inserted into the document
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this3 = this;

      this.init();

      //handleContentChanged
      this.element.addEventListener('pf-tooltip.handleContentChanged', function (e) {
        _this3.init();
      }, false);
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
      this.init();
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['animation', 'target-selector', 'placement', 'delay', 'duration', 'container-selector'];
    }
  }]);

  function PfTooltip() {
    _classCallCheck(this, PfTooltip);

    var _this = _possibleConstructorReturn(this, (PfTooltip.__proto__ || Object.getPrototypeOf(PfTooltip)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _pfTooltip2.default;
    _this._timer = 0;
    return _this;
  }

  /**
   * Sets tooltip the inner HTML
   * @param {string} html string
   */


  _createClass(PfTooltip, [{
    key: 'setInnerHtml',
    value: function setInnerHtml(html) {
      this._innerHtml = html;
      this.element.dispatchEvent(new CustomEvent('pf-tooltip.handleContentChanged', {}));
    }

    /**
     * Get the animation class
     *
     * @returns {string} The animation class
     */

  }, {
    key: 'open',


    /**
     * The tooltip open method
     */
    value: function open() {
      var _this4 = this;

      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        if (_this4.tooltip === null) {
          _this4._createTooltip();
          _this4._styleTooltip();
          _this4._checkPlacement();
          _this4._showTooltip();
          //notify frameworks
          _this4.dispatchEvent(new CustomEvent('pf-tooltip.opened', {}));
        }
      }, 20);
    }

    /**
     * The tooltip close method
     */

  }, {
    key: 'close',
    value: function close() {
      var _this5 = this;

      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        if (_this5.tooltip && _this5.tooltip !== null) {
          _pfUtils.pfUtil.removeClass(_this5.tooltip, 'in');
          setTimeout(function () {
            _this5._removeTooltip();
            //notify frameworks
            _this5.dispatchEvent(new CustomEvent('pf-tooltip.closed', {}));
            // reset position after tooltip is closed
            _this5._placement = _this5.getAttribute('placement') ? _this5.getAttribute('placement') : 'right';
          }, _this5._duration);
        }
      }, this._delay + this._duration);
    }

    /**
     * Removes the tooltip
     * @private
     */

  }, {
    key: '_removeTooltip',
    value: function _removeTooltip() {
      this.tooltip && this._container.removeChild(this.tooltip);
      this.tooltip = null;
    }

    /**
     * Creates the tooltip
     * @private
     */

  }, {
    key: '_createTooltip',
    value: function _createTooltip() {
      var clone = document.importNode(this._template.content, true);
      var tooltipInner = clone.querySelector('.tooltip-inner');

      //set tooltip content
      tooltipInner.innerHTML = this.content;

      //append to the container
      this._container.appendChild(clone);

      //set reference to appended node
      var tooltips = this._container.querySelectorAll('.tooltip');
      this.tooltip = tooltips[tooltips.length - 1];
      this.tooltip.setAttribute('class', 'tooltip ' + this._placement + ' ' + this._animation);
    }

    /**
     * update the placement of tooltip
     */

  }, {
    key: '_updatePlacement',
    value: function _updatePlacement() {
      switch (this._placement) {
        case 'top':
          return 'bottom';
        case 'bottom':
          return 'top';
        case 'left':
          return 'right';
        case 'right':
          return 'left';
        default:
          return this._placement;
      }
    }

    /**
     * Styles the tooltip based on placement attribute
     * @private
     */

  }, {
    key: '_styleTooltip',
    value: function _styleTooltip() {
      var rect = this._target.getBoundingClientRect(); //tooltip real dimensions

      var // link rect | window vertical and horizontal scroll
      scroll = _pfUtils.pfUtil.getScroll();

      var //link real dimensions
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top };

      var tooltipDimensions = { w: this.tooltip.offsetWidth, h: this.tooltip.offsetHeight };

      //apply styling
      if (/top/.test(this._placement)) {
        //TOP
        this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h + 'px';
        this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w / 2 + linkDimensions.w / 2 + 'px';
      } else if (/bottom/.test(this._placement)) {
        //BOTTOM
        this.tooltip.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
        this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w / 2 + linkDimensions.w / 2 + 'px';
      } else if (/left/.test(this._placement)) {
        //LEFT
        this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h / 2 + linkDimensions.h / 2 + 'px';
        this.tooltip.style.left = rect.left + scroll.x - tooltipDimensions.w + 'px';
      } else if (/right/.test(this._placement)) {
        //RIGHT
        this.tooltip.style.top = rect.top + scroll.y - tooltipDimensions.h / 2 + linkDimensions.h / 2 + 'px';
        this.tooltip.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
      }

      this.tooltip.className.indexOf(this._placement) === -1 && (this.tooltip.className = this.tooltip.className.replace(/\b(top|bottom|left|right)+/, this._placement));
    }

    /**
     * check the placement of tooltip
     */

  }, {
    key: '_checkPlacement',
    value: function _checkPlacement() {
      if (!_pfUtils.pfUtil.isElementInViewport(this.tooltip)) {
        this._placement = this._updatePlacement();
        this._styleTooltip();
      }
    }

    /**
     * Makes tooltip visible
     * @private
     */

  }, {
    key: '_showTooltip',
    value: function _showTooltip() {
      !/\bin/.test(this.tooltip.className) && _pfUtils.pfUtil.addClass(this.tooltip, 'in');
    }
  }, {
    key: 'animation',
    get: function get() {
      return this._animation;
    }

    /**
     * Set animation class
     *
     * @param {string} value The animation class
     */
    ,
    set: function set(value) {
      if (this._animation !== value) {
        this._animation = value;
        this.setAttribute('animation', value);
      }
    }

    /**
     * Get the tooltip container-selector
     *
     * @returns {string} The container element selector
     */

  }, {
    key: 'containerSelector',
    get: function get() {
      return this._containerSelector;
    }

    /**
     * Set the tooltip container-selector
     *
     * @param {string} value The container element selector
     */
    ,
    set: function set(value) {
      if (this._containerSelector !== value) {
        this._containerSelector = value;
        this._container = document.querySelector(this._containerSelector);
        this.setAttribute('container-selector', value);
      }
    }

    /**
     * Get the animation duration
     *
     * @returns {string} The animation duration
     */

  }, {
    key: 'duration',
    get: function get() {
      return this._duration;
    }

    /**
     * Set the animation duration
     *
     * @param {string} value The animation duration
     */
    ,
    set: function set(value) {
      if (this._duration !== value) {
        this._duration = value;
        this.setAttribute('duration', value);
      }
    }

    /**
     * Get the animation delay
     *
     * @returns {string} The animation delay
     */

  }, {
    key: 'delay',
    get: function get() {
      return this._duration;
    }

    /**
     * Set the animation delay
     *
     * @param {string} value The animation delay
     */
    ,
    set: function set(value) {
      if (this._delay !== value) {
        this._delay = value;
        this.setAttribute('delay', value);
      }
    }

    /**
     * Get the placement position
     *
     * @returns {string} The placement position left, top, bottom, right
     */

  }, {
    key: 'placement',
    get: function get() {
      return this._placement;
    }

    /**
     * Set placement position
     *
     * @param {string} value The placement position left, top, bottom, right
     */
    ,
    set: function set(value) {
      if (this._placement !== value) {
        this._placement = value;
        this.setAttribute('placement', value);
      }
    }

    /**
     * Get the target-selector
     *
     * @returns {string} The target element selector
     */

  }, {
    key: 'targetSelector',
    get: function get() {
      return this._targetSelector;
    }

    /**
     * Set target-selector
     *
     * @param {string} value The target element selector
     */
    ,
    set: function set(value) {
      if (this._targetSelector !== value) {
        this._targetSelector = value;
        this._target = document.querySelector(this._targetSelector);
        this.setAttribute('target-selector', value);
      }
    }
  }]);

  return PfTooltip;
}(HTMLElement);

window.customElements.define('pf-tooltip', PfTooltip);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var PfTooltipTemplate = "\n<div role=\"tooltip\" class=\"tooltip\">\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-inner\"></div>\n</div>\n";

exports.default = PfTooltipTemplate;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfUtilizationBarChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtilizationBarChartDefault = __webpack_require__(14);

var _pfUtilizationBarChartDefault2 = _interopRequireDefault(_pfUtilizationBarChartDefault);

var _pfUtilizationBarChartInline = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-utilization-bar-chart&gt;</b> element for Patternfly Web Components
 *
 * @example <caption>Default Layout, no Thresholds</caption> {@lang xml}
 * <pf-utilization-bar-chart chart-title="RAM Usage" used="8" total="24" units="MB"></pf-utilization-bar-chart>
 *
 * @example <caption>Default Layout, no Thresholds</caption> {@lang xml}
 * <pf-utilization-bar-chart chart-title="RAM Usage" used="8" total="24" units="MB"></pf-utilization-bar-chart>
 *
 * @example <caption>Inline Layout</caption> {@lang xml}
 * <pf-utilization-bar-chart id="thresholdExample2" chart-title="Disk I/O" layout="inline" used="450" total="500" units="I/Ops" threshold-warning="60" threshold-error="85"></pf-utilization-bar-chart>
 *
 * @prop {string} chart-title the chart title
 * @prop {string} layout 'inline' for inline layout
 * @prop {number} used the percentage used
 * @prop {number} total the percentage total
 * @prop {string} units the display units
 * @prop {number} threshold-warning the warning threshold
 * @prop {number} threshold-error the error threshold
 */
var PfUtilizationBarChart = exports.PfUtilizationBarChart = function (_HTMLElement) {
  _inherits(PfUtilizationBarChart, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfUtilizationBarChart() {
    _classCallCheck(this, PfUtilizationBarChart);

    var _this = _possibleConstructorReturn(this, (PfUtilizationBarChart.__proto__ || Object.getPrototypeOf(PfUtilizationBarChart)).call(this));

    _this._lastThresholdClass;
    _this._layout;
    return _this;
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfUtilizationBarChart, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._layout = this.getAttribute('layout');
      if (this._layout && this._layout === 'inline') {
        this.innerHTML = _pfUtilizationBarChartInline.inline;
      } else {
        this.innerHTML = _pfUtilizationBarChartDefault2.default;
      }
      this.updateChart();
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
    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
      if (oldValue !== null) {
        this.updateChart();
      }
    }

    /**
     * Updates chart content
     */

  }, {
    key: 'updateChart',
    value: function updateChart() {
      var chartTitle = this.getAttribute('chart-title');
      if (chartTitle) {
        this.querySelector('.progress-description').innerText = chartTitle;
      }

      var usedBar = this.querySelector('.progress-bar-used');
      var remainingBar = this.querySelector('.progress-bar-remaining');

      var usedValue = this.getAttribute('used');
      var totalValue = this.getAttribute('total');
      var units = this.getAttribute('units') !== null ? this.getAttribute('units') : "";

      if (this._layout && this._layout === 'inline') {
        usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " " + units;
      } else {
        usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " of " + totalValue + " " + units;
      }

      var percentageUsed = Math.round(100 * (usedValue / totalValue));

      usedBar.setAttribute("style", "width: " + percentageUsed + "%;");
      remainingBar.setAttribute("style", "width: " + (100 - percentageUsed) + "%;");

      var errorThreshold = this.getAttribute('threshold-error');
      var warnThreshold = this.getAttribute('threshold-warning');

      if (errorThreshold || warnThreshold) {
        this.setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold);
      }
    }

    /**
     * Sets the used bar threshold color, percentageUsed, errorThreshold, warnThreshold
     */

  }, {
    key: 'setUsedBarThresholdColor',
    value: function setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold) {
      var thresholdClass = void 0;

      if (errorThreshold || warnThreshold) {
        if (percentageUsed >= errorThreshold) {
          thresholdClass = "progress-bar-danger";
        } else if (percentageUsed >= warnThreshold && percentageUsed < errorThreshold) {
          thresholdClass = "progress-bar-warning";
        } else if (percentageUsed < warnThreshold) {
          thresholdClass = "progress-bar-success";
        }

        if (thresholdClass !== this._lastThresholdClass) {
          var event = new CustomEvent('pf-utilization-bar-chart.thresholdSet', { 'id': this.getAttribute('id'), 'threshold': thresholdClass });
          event.initCustomEvent('pf-utilization-bar-chart.thresholdSet', true, true, { 'id': this.getAttribute('id'), 'threshold': thresholdClass });
          usedBar.classList.remove(this._lastThresholdClass);
          usedBar.classList.add(thresholdClass);
          this._lastThresholdClass = thresholdClass;
          usedBar.dispatchEvent(event);
        }
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['chart-title', 'used', 'total', 'units'];
    }
  }]);

  return PfUtilizationBarChart;
}(HTMLElement);

window.customElements.define('pf-utilization-bar-chart', PfUtilizationBarChart);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pfUtilzBarChartDefault = "\n  <div class=\"utilization-bar-chart-pf\">\n    <div class=\"progress-description\"></div>\n    <div class=\"progress progress-label-top-right\">\n      <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-used\">\n          <span><strong class=\"utiliz-bar-strong-label\"></strong> Used</span>\n        </div>\n        <div class=\"progress-bar progress-bar-remaining\"></div>\n      </div>\n    </div>\n  </div>\n";
exports.default = pfUtilzBarChartDefault;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pfUtilzBarChartInline = "\n  <div class=\"progress-container progress-description-left progress-label-right\">\n    <div class=\"progress-description\"></div>\n    <div class=\"progress\">\n      <div class=\"progress-bar progress-bar-used\">\n        <span><strong class=\"utiliz-bar-strong-label\"></strong> Used</span>\n      </div>\n      <div class=\"progress-bar progress-bar-remaining\"></div>\n    </div>\n  </div>\n";
exports.inline = pfUtilzBarChartInline;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

var _pfModalDialog = __webpack_require__(17);

var _pfModalDialog2 = _interopRequireDefault(_pfModalDialog);

var _pfModalContent = __webpack_require__(18);

var _pfModalContent2 = _interopRequireDefault(_pfModalContent);

var _pfModalHeader = __webpack_require__(19);

var _pfModalHeader2 = _interopRequireDefault(_pfModalHeader);

var _pfModalBody = __webpack_require__(21);

var _pfModalBody2 = _interopRequireDefault(_pfModalBody);

var _pfModalFooter = __webpack_require__(22);

var _pfModalFooter2 = _interopRequireDefault(_pfModalFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal target-selector="#btn-toggle-modal" backdrop keyboard>
 *   <pf-modal-dialog>
 *     <pf-modal-content>
 *       <pf-modal-header modal-title="Modal Title"></pf-modal-header>
 *       <pf-modal-body>custom content</pf-modal-body>
 *       <pf-modal-footer></pf-modal-footer>
 *     </pf-modal-content>
 *   </pf-modal-dialog>
 * </pf-modal>
 *
 * @prop {string} target-selector Indicating which element will fireup the modal
 * @prop {boolean} backdrop Indicating whether Clicking the backdrop could hide the modal or not
 * @prop {boolean} keyboard Indicating whether clicking the escape key could hide the modal or not
 * @prop {boolean} open Indicating whether or not the modal is opend
 *
 * @methods
 *
 * @show Show the modal
 * @hide Hide the modal
 * @toggle Toggle the visible/invisible state of modal
 *
 * @events
 *
 * @pf-modal.show It's fired immediately when the show instance method is called. If caused by a click,
 * the clicked element is available as the relatedTarget property of the event.detail
 * @pf-modal.shown It's fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click,
 * the clicked element is available as the relatedTarget property of the event.detail
 * @pf-modal.hide It's fired immediately when the hide instance method has been called
 * @pf-modal.hidden It's fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete)
 */

var PfModal = exports.PfModal = function (_HTMLElement) {
  _inherits(PfModal, _HTMLElement);

  _createClass(PfModal, [{
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'target-selector' && newValue !== null && oldValue === null) {
        this._target = document.querySelector(newValue);
        if (this._target) {
          this._target.addEventListener('click', this.show.bind(this), false);
          this._target.setAttribute('data-bound', 'bound');
        }
      }
      if (attrName === 'open' && newValue !== null) {
        this._showModal();
      }
      if (attrName === 'keyboard') {
        if (newValue === '') {
          this.addEventListener('keydown', this._keydownHandler, false);
        } else {
          this.removeEventListener('keydown', this._keydownHandler, false);
        }
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }, {
    key: 'open',


    /*
     * Get the show/hide state of modal
     *
     * @returns {boolean} True if modal is visible
     */
    get: function get() {
      return this.hasAttribute('open');
    }

    /*
     * Set flag indicating modal is shown
     *
     * @param {boolean} val True to set modal visible
     */
    ,
    set: function set(val) {
      if (this.open !== val) {
        if (val) {
          this.setAttribute('open', '');
        } else {
          this._hideModal();
        }
      }
    }

    /*
     * Get the backdrop setting
     *
     * @returns {boolean} True if users are allowed to hide modal on clicking backdrop
     */

  }, {
    key: 'backdrop',
    get: function get() {
      return this.hasAttribute('backdrop');
    }

    /*
     * Set flag indicating clicking backdrop of modal could hide modal
     *
     * @param {boolean} val True to enable backdrop clicking
     */
    ,
    set: function set(val) {
      if (this.backdrop !== val) {
        if (val) {
          this.setAttribute('backdrop', '');
        } else {
          this.removeAttribute('backdrop');
        }
      }
    }

    /*
     * Get the keyboard setting
     *
     * @returns {boolean} True if users are allowed to hide modal when escape key is pressed
     */

  }, {
    key: 'keyboard',
    get: function get() {
      return this.hasAttribute('keyboard');
    }

    /*
     * Set flag indicating pressing escape key could hide modal
     *
     * @param {boolean} val True to enable escape key reaction
     */
    ,
    set: function set(val) {
      if (this.keyboard !== val) {
        if (val) {
          this.setAttribute('keyboard', '');
        } else {
          this.removeAttribute('keyboard');
        }
      }
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['target-selector', 'open', 'keyboard', 'backdrop'];
    }
  }]);

  function PfModal() {
    _classCallCheck(this, PfModal);

    var _this = _possibleConstructorReturn(this, (PfModal.__proto__ || Object.getPrototypeOf(PfModal)).call(this));

    _this._mask = null;
    return _this;
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfModal, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.className = 'modal fade';
      this.setAttribute('tabindex', -1);

      if (this.open) {
        this._showModal();
      }

      if (this.getAttribute('target-selector')) {
        this._target = document.querySelector(this.getAttribute('target-selector'));
        if (this._target && !(this._target.getAttribute('data-bound') === 'bound')) {
          this._target.addEventListener('click', this.show.bind(this), false);
        }
      }

      this.addEventListener('click', this.hide, false);
    }

    /*
     * Show the modal when attribute open is added or property open is enabled
     * @private
     */

  }, {
    key: '_showModal',
    value: function _showModal() {
      _pfUtils.pfUtil.addClass(document.body, 'modal-open');
      this._mask = document.createElement('div');
      this._mask.className = 'modal-backdrop fade';
      document.body.appendChild(this._mask);
      _pfUtils.pfUtil.reflow(this._mask);
      _pfUtils.pfUtil.addClass(this._mask, 'in');
      _pfUtils.pfUtil.reflow(this);
      _pfUtils.pfUtil.addClass(this, 'in');
      _pfUtils.pfUtil.once(this.querySelector('pf-modal-dialog'), 'transitionend', this._afterShowModal, this);
    }

    /*
     * Show the modal
     * @public
     */

  }, {
    key: 'show',
    value: function show(e) {
      if (e) {
        this.dispatchEvent(new CustomEvent('pf-modal.show', { 'detail': { 'relatedTarget': e.currentTarget } }));
        this._triggeredByUser = true;
      } else {
        this.dispatchEvent(new CustomEvent('pf-modal.show', {}));
      }
      if (this.open) {
        return;
      }
      this.open = true;
    }

    /*
     * Callback after modal is shown
     * @private
     */

  }, {
    key: '_afterShowModal',
    value: function _afterShowModal() {
      this.focus();
      if (this._triggeredByUser) {
        this.dispatchEvent(new CustomEvent('pf-modal.shown', { 'detail': { 'relatedTarget': this._target } }));
      } else {
        this.dispatchEvent(new CustomEvent('pf-modal.shown', {}));
      }
      this._triggeredByUser = false;
    }

    /*
     * Hide the modal when attribute open is removed or property open is disabled
     * @private
     */

  }, {
    key: '_hideModal',
    value: function _hideModal() {
      _pfUtils.pfUtil.removeClass(document.body, 'modal-open');
      _pfUtils.pfUtil.removeClass(this._mask, 'in');
      _pfUtils.pfUtil.removeClass(this, 'in');
      _pfUtils.pfUtil.once(this, 'transitionend', this._afterHideModal, this);
    }

    /*
     * Hide the modal
     * @public
     */

  }, {
    key: 'hide',
    value: function hide(e) {
      if (e) {
        e.preventDefault();
        if (!(_pfUtils.pfUtil.getClosest(e.target, '.pf-hide-modal') || e.target === e.currentTarget && this.backdrop)) {
          return;
        }
      }

      this.dispatchEvent(new CustomEvent('pf-modal.hide', {}));

      if (!this.open) {
        return;
      }
      this._hideModal();
    }

    /*
     * Callback after the modal is hidden
     * @private
     */

  }, {
    key: '_afterHideModal',
    value: function _afterHideModal() {
      this.removeAttribute('open');
      if (this._mask) {
        this._mask.remove();
        this._mask = null;
      }
      this.dispatchEvent(new CustomEvent('pf-modal.hidden', {}));
    }

    /*
     * Toggle the visible/invisible state of modal
     * @public
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      return this.open ? this.hide() : this.show();
    }

    /*
     * Handler of keydown event of escape key
     * @private
     */

  }, {
    key: '_keydownHandler',
    value: function _keydownHandler(e) {
      var isEscape = e.key && e.key === 'Escape' || e.keyIdentifier && e.keyIdentifier === 'U+001B' || e.keyCode && e.keyCode === 27 || e.which && e.which === 27;
      if (isEscape && this.open) {
        this.hide();
      }
    }
  }]);

  return PfModal;
}(HTMLElement);

window.customElements.define('pf-modal', PfModal);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModalDialog = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal-dialog&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal target-selector="#btn-toggle-modal" backdrop keyboard>
 *  <pf-modal-dialog>
 *   <pf-modal-content> practical content of pf-modal </pf-modal-content>
 *  </pf-modal-dialog>
 * </pf-modal>
 */

var PfModalDialog = exports.PfModalDialog = function (_HTMLElement) {
  _inherits(PfModalDialog, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfModalDialog() {
    _classCallCheck(this, PfModalDialog);

    return _possibleConstructorReturn(this, (PfModalDialog.__proto__ || Object.getPrototypeOf(PfModalDialog)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfModalDialog, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      _pfUtils.pfUtil.addClass(this, 'modal-dialog');
    }
  }]);

  return PfModalDialog;
}(HTMLElement);

window.customElements.define('pf-modal-dialog', PfModalDialog);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModalContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal-content&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal target-selector="#btn-toggle-modal" backdrop keyboard>
 *  <pf-modal-dialog>
 *   <pf-modal-content> practical content of pf-modal </pf-modal-content>
 *  </pf-modal-dialog>
 * </pf-modal>
 */

var PfModalContent = exports.PfModalContent = function (_HTMLElement) {
  _inherits(PfModalContent, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfModalContent() {
    _classCallCheck(this, PfModalContent);

    return _possibleConstructorReturn(this, (PfModalContent.__proto__ || Object.getPrototypeOf(PfModalContent)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfModalContent, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      _pfUtils.pfUtil.addClass(this, 'modal-content');
    }
  }]);

  return PfModalContent;
}(HTMLElement);

window.customElements.define('pf-modal-content', PfModalContent);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModalHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

var _pfModalHeader = __webpack_require__(20);

var _pfModalHeader2 = _interopRequireDefault(_pfModalHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal-header&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal-header modal-title="Modal Title"></pf-modal-header>
 */

var PfModalHeader = exports.PfModalHeader = function (_HTMLElement) {
  _inherits(PfModalHeader, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfModalHeader() {
    _classCallCheck(this, PfModalHeader);

    return _possibleConstructorReturn(this, (PfModalHeader.__proto__ || Object.getPrototypeOf(PfModalHeader)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfModalHeader, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      _pfUtils.pfUtil.addClass(this, 'modal-header');

      if (!this.querySelector('.pf-hide-modal')) {
        this._template = document.createElement('template');
        this._template.innerHTML = _pfModalHeader2.default;
        this.appendChild(this._template.content);
      }
      if (this.modalTitle) {
        this._addModalTitle();
      }
    }

    /*
     * Append cancel button
     *
     * @private
     */

  }, {
    key: '_addModalTitle',
    value: function _addModalTitle() {
      if (!this.querySelector('.modal-title')) {
        this.insertAdjacentHTML('beforeend', '<h4 class="modal-title">' + this.modalTitle + '</h4>');
      }
    }

    /*
     * Get modal-title
     *
     * @returns {string} The modal title
     */

  }, {
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'modal-title') {
        if (newValue && !oldValue) {
          this._addModalTitle();
        }
        if (newValue && oldValue) {
          this.querySelector('.modal-title').textContent = this.modalTitle;
        }
        if (!newValue) {
          var title = this.querySelector('.modal-title');
          title.parentNode.removeChild(title);
        }
      }
    }
  }, {
    key: 'modalTitle',
    get: function get() {
      return this.getAttribute('modal-title');
    }

    /*
     * Set modal-title
     *
     * @param {string} val Modal title
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('modal-title', val);
      } else {
        this.removeAttribute('modal-title');
      }
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['modal-title'];
    }
  }]);

  return PfModalHeader;
}(HTMLElement);

window.customElements.define('pf-modal-header', PfModalHeader);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfModalHeaderTemplate = "\n<button type=\"button\" class=\"close pf-hide-modal\" aria-hidden=\"true\">\n  <span class=\"pficon pficon-close\"></span>\n</button>\n";
exports.default = PfModalHeaderTemplate;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModalBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal-body&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal-body>custom content of mdoal-body</pf-modal-body>
 */

var PfModalBody = exports.PfModalBody = function (_HTMLElement) {
  _inherits(PfModalBody, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfModalBody() {
    _classCallCheck(this, PfModalBody);

    return _possibleConstructorReturn(this, (PfModalBody.__proto__ || Object.getPrototypeOf(PfModalBody)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfModalBody, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      _pfUtils.pfUtil.addClass(this, 'modal-body');
    }
  }]);

  return PfModalBody;
}(HTMLElement);

window.customElements.define('pf-modal-body', PfModalBody);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfModalFooter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-modal-footer&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal-footer></pf-modal-footer>
 */

var PfModalFooter = exports.PfModalFooter = function (_HTMLElement) {
  _inherits(PfModalFooter, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfModalFooter() {
    _classCallCheck(this, PfModalFooter);

    return _possibleConstructorReturn(this, (PfModalFooter.__proto__ || Object.getPrototypeOf(PfModalFooter)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfModalFooter, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      _pfUtils.pfUtil.addClass(this, 'modal-footer');

      if (this.cancelCaption) {
        this._addCancelBtn();
      }
      if (this.saveCaption) {
        this._addSaveBtn();
      }
    }

    /*
     * Append cancel button
     *
     * @private
     */

  }, {
    key: '_addCancelBtn',
    value: function _addCancelBtn() {
      if (!this.querySelector('.btn-default')) {
        this.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-default pf-hide-modal">' + this.cancelCaption + '</button>');
      }
    }

    /*
     * Append save button
     *
     * @private
     */

  }, {
    key: '_addSaveBtn',
    value: function _addSaveBtn() {
      if (!this.querySelector('.btn-primary')) {
        this.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-primary">' + this.saveCaption + '</button>');
      }
    }

    /*
     * Get cancelCaption
     *
     * @returns {string} The cancelCaption
     */

  }, {
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'cancelcaption') {
        if (newValue && !oldValue) {
          this._addCancelBtn(newValue);
        }
        if (newValue && oldValue) {
          this.querySelector('.btn-default').textContent = this.cancelCaption;
        }
        if (!newValue) {
          var btn = this.querySelector('.btn-default');
          btn.parentNode.removeChild(btn);
        }
      }
      if (attrName === 'savecaption') {
        if (newValue && !oldValue) {
          this._addSaveBtn(newValue);
        }
        if (newValue && oldValue) {
          this.querySelector('.btn-primary').textContent = this.saveCaption;
        }
        if (!newValue) {
          var _btn = this.querySelector('.btn-primary');
          _btn.parentNode.removeChild(_btn);
        }
      }
    }
  }, {
    key: 'cancelCaption',
    get: function get() {
      return this.getAttribute('cancelCaption');
    }

    /*
     * Set cancelCaption
     *
     * @param {string} val Caption of cancel button
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('cancelCaption', val);
      } else {
        this.removeAttribute('cancelCaption');
      }
    }

    /*
     * Get saveCaption
     *
     * @returns {string} The saveCaption
     */

  }, {
    key: 'saveCaption',
    get: function get() {
      return this.getAttribute('saveCaption');
    }

    /*
     * Set saveCaption
     *
     * @param {string} val Caption of save button
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('saveCaption', val);
      } else {
        this.removeAttribute('saveCaption');
      }
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['cancelcaption', 'savecaption'];
    }
  }]);

  return PfModalFooter;
}(HTMLElement);

window.customElements.define('pf-modal-footer', PfModalFooter);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-dropdown&gt;</b> element for Patternfly Web Components
 *
 * <pf-dropdown id="dropdown1"><div class="dropdown">
 *    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdown2" data-toggle="dropdown" aria-haspopup="true"
 *      aria-expanded="false">
 *      Dropdown
 *      <span class="caret"></span>
 *      </button>
 *      <ul class="dropdown-menu">
 *        <li class="dropdown-header">Header</li>
 *        <li><a href="#">Item 1</a></li>
 *        <li><a href="#">Item 2</a></li>
 *        <li class="disabled"><a href="#">Item 3</a></li>
 *        <li><a href="#">Item 4</a></li>
 *        <li class="divider"></li>
 *        <li><a href="#">Item 5</a></li>
 *      </ul>
 *      </div>
 *  </pf-dropdown>
 */

var PfDropdown = exports.PfDropdown = function (_HTMLElement) {
  _inherits(PfDropdown, _HTMLElement);

  _createClass(PfDropdown, [{
    key: 'connectedCallback',


    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      var _this2 = this;

      this._button = this.querySelector('.btn');
      this._disabled = /\bdisabled/.test(this._button.className);
      var menu = this.querySelector('.dropdown-menu');

      this._button.addEventListener('click', function () {
        _this2._showDropdown();
      });

      document.addEventListener('click', function (event) {
        //close dropdown if clicked outside menu
        if (event.target !== menu && event.target !== _this2._button && !menu.contains(event.target) && !_this2._button.contains(event.target)) {
          _this2._clearDropdown();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (/input|textarea/.test(event.target.tagName)) {
          return;
        }
        if (_this2._disabled) {
          return;
        }
        var active = /\bopen/.test(_this2._button.parentNode.className);

        //check if dropdown is open
        if (active) {
          _this2._keyHandler(event);
        }
      });

      // disable click for disabled Items
      this.disableClick();

      this.initialized = true;
      this.dispatchEvent(new CustomEvent('pf-dropdown.initialized', {}));
    }

    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}

    /*
     * An instance of the element is created or upgraded
     */

  }]);

  function PfDropdown() {
    _classCallCheck(this, PfDropdown);

    return _possibleConstructorReturn(this, (PfDropdown.__proto__ || Object.getPrototypeOf(PfDropdown)).call(this));
  }

  /**
   *Toggle the dropdown
   */


  _createClass(PfDropdown, [{
    key: 'toggle',
    value: function toggle() {
      this._showDropdown();
    }

    /**
     * Disable click on disabled items
     */

  }, {
    key: 'disableClick',
    value: function disableClick() {
      var self = this;
      var items = this.querySelectorAll('ul.dropdown-menu li a');

      var _loop = function _loop(i) {
        items[i].onclick = function () {
          if (items[i].parentNode.classList.contains('disabled')) {
            return false;
          }
          self.dispatchEvent(new CustomEvent('pf-dropdown.itemClicked', {}));
          return true;
        };
      };

      for (var i = 0; i < items.length; i++) {
        _loop(i);
      }
    }
    /**
     * Open the dropdown
     *
     */

  }, {
    key: '_showDropdown',
    value: function _showDropdown() {
      var button = this.querySelector('.btn');
      if (/\bdisabled/.test(button.className)) {
        return;
      }
      var active = /\bopen/.test(button.parentNode.className);
      if (!active) {
        this._detectTouch();
        this.dispatchEvent(new CustomEvent('pf-dropdown.show', {}));
        button.focus();
        button.setAttribute('aria-expanded', 'true');
        button.parentNode.classList.toggle('open');
        this.dispatchEvent(new CustomEvent('pf-dropdown.shown', {}));
      }
      if (active) {
        this._clearDropdown();
      }
    }
    /**
     * Close the dropdown
     *
     */

  }, {
    key: '_clearDropdown',
    value: function _clearDropdown() {
      var button = this.querySelector('.btn');
      var backdrop = this.querySelector('.dropdown-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
      this.dispatchEvent(new CustomEvent('pf-dropdown.hide', {}));
      button.setAttribute('aria-expanded', 'false');
      button.parentNode.classList.remove('open');
      this.dispatchEvent(new CustomEvent('pf-dropdown.hidden', {}));
    }

    /**
     * Support for phone browser
     *
     */

  }, {
    key: '_detectTouch',
    value: function _detectTouch() {
      if ('ontouchstart' in document.documentElement) {
        var div = document.createElement('div');
        div.classList.add('dropdown-backdrop');
        this.insertBefore(div, this.querySelector('.dropdown-menu'));
        div.addEventListener('click', this._clearDropdown());
      }
    }

    /**
     *Support for accessibility
     *
     * @param {Event} event
     */

  }, {
    key: '_keyHandler',
    value: function _keyHandler(event) {
      var keycode = event.keyCode ? event.keyCode : event.which;

      // escape key
      if (keycode === 27) {
        this._clearDropdown();
        this._button.focus();
      }

      // up and down key
      if (keycode === 38 || keycode === 40) {

        event.preventDefault();
        event.stopPropagation();

        var menuItem = this.querySelectorAll('.dropdown-menu li:not(.disabled) a');
        // index: guide focus on menu items
        var index = Array.prototype.indexOf.call(menuItem, event.target);

        if (keycode === 38 && index > 0) {
          index--;
        }
        if (keycode === 40 && index < menuItem.length - 1) {
          index++;
        }
        if (index < 0) {
          index = 0;
        }
        menuItem[index].focus();
      }
    }
  }]);

  return PfDropdown;
}(HTMLElement);

window.customElements.define('pf-dropdown', PfDropdown);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-touchspin&gt;</b> element for Patternfly Web Components
 *
 * <pf-touchspin id="touchspin" class="input-group bootstrap-touchspin" decimals="2" step="0.1">
 *  <span class="input-group-btn">
 *    <button class="btn btn-default bootstrap-touchspin-down" type="button">-</button>
 *  </span>
 *  <input value="50.00" type="text" class="form-control">
 *  <span class="input-group-btn">
 *    <button class="btn btn-default bootstrap-touchspin-up" type="button">+</button>
 *  </span>
 * </pf-touchspin>
 *
 * @prop {number} min the minimum value
 * @prop {number} max the maximum value
 * @prop {number} step Increment/Decrement in value on up/down
 * @prop {number} decimals decimal points in value
 * @prop {boolean} booster if true, spinner will become faster continousally on holding down the button
 * @prop {number} boostat boost at every nth step
 * @prop {number} maxboostedstep maximum step when boosted
 * @prop {number} stepinterval refresh reate of spinner in millisecond
 * @prop {number} stepintervaldelay delay before sppiner starts to spin(millisecond)
 * @prop {string} forcestepdivisibility force the value to be divisible by step value: 'none' | 'round' | 'floor' | 'ceil'
 *
 */

var PfTouchspin = exports.PfTouchspin = function (_HTMLElement) {
  _inherits(PfTouchspin, _HTMLElement);

  _createClass(PfTouchspin, [{
    key: 'init',
    value: function init() {
      this._min = parseFloat(this.getAttribute('min')) ? this.getAttribute('min') : 0;
      this._max = parseFloat(this.getAttribute('max')) ? this.getAttribute('max') : 100;
      this._step = parseFloat(this.getAttribute('step')) ? this.getAttribute('step') : 1;
      this._decimals = parseInt(this.getAttribute('decimals')) ? this.getAttribute('decimals') : 0;
      this._booster = this.getAttribute('booster') ? this.getAttribute('booster') : true;
      this._boostat = parseInt(this.getAttribute('boostat')) ? this.getAttribute('boostat') : 10;
      this._maxBoostedStep = this.getAttribute('maxboostedstep') ? this.getAttribute('maxboostedstep') : false;
      this._stepInterval = this.getAttribute('stepinterval') ? this.getAttribute('stepinterval') : 100;
      this._stepIntervalDelay = this.getAttribute('stepintervaldelay') ? this.getAttribute('stepintervaldelay') : 500;
      this._forceStepDivisibility = this.getAttribute('forcestepdivisibility') ? this.getAttribute('forcestepdivisibility') : 'round';
      this._spinning = false;
      this.spincount = 0;
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      var input = this.querySelector('input');
      var down = this.querySelector('.bootstrap-touchspin-down');
      var up = this.querySelector('.bootstrap-touchspin-up');
      this.init();

      // support for up/down keys
      input.addEventListener('keydown', function (event) {
        var inputVal = parseFloat(_this2.querySelector('input').value);
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode === 38) {
          _this2._up();
          if (inputVal === _this2._max) {
            return;
          }
          _this2._upSpin();
          event.preventDefault();
        } else if (keycode === 40) {
          _this2._down();
          if (inputVal === _this2._min) {
            return;
          }
          _this2._downSpin();
          event.preventDefault();
        }
      });

      input.addEventListener('keyup', function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode === 38) {
          _this2._stop();
        } else if (keycode === 40) {
          _this2._stop();
        }
      });

      // support for click foe down spin
      down.addEventListener('mousedown', function (event) {
        var inputVal = parseFloat(_this2.querySelector('input').value);
        if (input.classList.contains('disabled')) {
          return;
        }
        _this2._down();
        if (inputVal === _this2._min) {
          return;
        }
        _this2._downSpin();

        event.preventDefault();
        event.stopPropagation();
      });

      document.addEventListener('mouseup', function (event) {

        event.preventDefault();
        _this2._stop();
      });

      up.addEventListener('mousedown', function (event) {
        var inputVal = parseFloat(_this2.querySelector('input').value);
        if (input.classList.contains('disabled')) {
          return;
        }

        _this2._up();
        if (inputVal === _this2._max) {
          return;
        }
        _this2._upSpin();

        event.preventDefault();
        event.stopPropagation();
      });

      // stop spinning if mouse is not over buttons
      down.addEventListener('mouseout', function (event) {
        event.stopPropagation();
        _this2._stop();
      });

      up.addEventListener('mouseout', function (event) {

        event.stopPropagation();
        _this2._stop();
      });

      //support for mouse scroll
      document.addEventListener('wheel', function (event) {
        var delta = -event.deltaY;
        if (input !== document.activeElement) {
          return;
        }
        event.stopPropagation();
        event.preventDefault();
        if (delta < 0) {
          _this2._down();
        } else {
          _this2._up();
        }
      });

      this._bindEvents();

      this.initialized = true;
      this.dispatchEvent(new CustomEvent('initialized', {}));
    }

    /**
    * Called when element's attribute value has changed
    *
    * @param {string} attrName The attribute name that has changed
    * @param {string} oldValue The old attribute value
    * @param {string} newValue The new attribute value
    */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      this.init();
    }

    /**
     * Called when an instance of the element is created
     */

  }]);

  function PfTouchspin() {
    _classCallCheck(this, PfTouchspin);

    return _possibleConstructorReturn(this, (PfTouchspin.__proto__ || Object.getPrototypeOf(PfTouchspin)).call(this));
  }

  /**
   *
   */


  _createClass(PfTouchspin, [{
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this3 = this;

      this.addEventListener('pf-touchspin.downonce', function () {
        _this3._down();
      });

      this.addEventListener('pf-touchspin.uponce', function () {
        _this3._up();
      });

      this.addEventListener('pf-touchspin.downspin', function () {
        _this3._downSpin();
      });

      this.addEventListener('pf-touchspin.upspin', function () {
        _this3._upSpin();
      });

      this.addEventListener('pf-touchspin.stop', function () {
        _this3._stop();
      });
    }

    /**
     * force the valur to be divisible by step
     *
     * @param {number} value
     */

  }, {
    key: '_stepDivisibility',
    value: function _stepDivisibility(value) {
      switch (this._forceStepDivisibility) {
        case 'round':
          return (Math.round(value / this._step) * this._step).toFixed(this._decimals);
        case 'floor':
          return (Math.floor(value / this._step) * this._step).toFixed(this._decimals);
        case 'ceil':
          return (Math.ceil(value / this._step) * this._step).toFixed(this._decimals);
        default:
          return value;
      }
    }

    /**
     * check the value before change in value
     */

  }, {
    key: '_checkValue',
    value: function _checkValue() {
      var val = void 0,
          parsedval = void 0,
          returnval = void 0;

      val = this.querySelector('input').value;

      if (this._decimals > 0 && val === '.') {
        return;
      }

      parsedval = parseFloat(val);

      if (isNaN(parsedval)) {
        parsedval = 0;
      }

      returnval = parsedval;

      if (parsedval < this.min) {
        returnval = this.min;
      }

      if (parsedval > this.max) {
        returnval = this.max;
      }

      returnval = this._stepDivisibility(returnval);

      if (Number(val).toString() !== returnval.toString()) {
        this.querySelector('input').value = returnval;
      }
    }

    /**
     * boost the value
     *
     * @param {number} value
     */

  }, {
    key: '_boostedStep',
    value: function _boostedStep() {
      if (!this._booster) {
        return this._step;
      }
      var boosted = Math.pow(2, Math.floor(this.spincount / this._boostat)) * this._step;

      if (this._maxBoostedStep) {
        if (boosted > this._maxBoostedstep) {
          boosted = this._maxBoostedStep;
        }
      }
      return Math.max(this._step, boosted);
    }

    /**
     * increment input value
     */

  }, {
    key: '_up',
    value: function _up() {
      var val = void 0,
          boostedStep = void 0;

      this._checkValue();

      val = parseFloat(this.querySelector('input').value);
      if (isNaN(val)) {
        val = 0;
      }

      boostedStep = this._boostedStep();

      val = val + boostedStep;

      if (val > this._max) {
        val = this._max;
        this.dispatchEvent(new CustomEvent('pf-touchspin.max', {}));
        this._stop();
      }

      val = parseFloat(val).toFixed(this._decimals);

      this.querySelector('input').value = val;
    }

    /**
     *  decrement input value
     */

  }, {
    key: '_down',
    value: function _down() {
      var val = void 0,
          boostedStep = void 0;

      this._checkValue();

      val = parseFloat(this.querySelector('input').value);
      if (isNaN(val)) {
        val = 0;
      }

      boostedStep = this._boostedStep();

      val = val - boostedStep;

      if (val < this._min) {
        val = this._min;
        this.dispatchEvent(new CustomEvent('pf-touchspin.min', {}));
        this._stop();
      }

      val = parseFloat(val).toFixed(this._decimals);

      this.querySelector('input').value = val;
    }

    /**
     * Decremental spinner
     *
     */

  }, {
    key: '_downSpin',
    value: function _downSpin() {
      var _this4 = this;

      this._stop();

      this.spincount = 0;
      this._spinning = 'down';

      this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
      this.dispatchEvent(new CustomEvent('pf-touchspin.startdownspin', {}));

      this._downDelayTimeout = setTimeout(function () {
        _this4._downSpinTimer = setInterval(function () {
          _this4.spincount++;
          _this4._down();
        }, _this4._stepInterval);
      }, this._stepIntervalDelay);
    }

    /**
     * Incremental spinner
     */

  }, {
    key: '_upSpin',
    value: function _upSpin() {
      var _this5 = this;

      this._stop();

      this.spincount = 0;
      this._spinning = 'up';

      this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
      this.dispatchEvent(new CustomEvent('pf-touchspin.startupspin', {}));

      this._upDelayTimeout = setTimeout(function () {
        _this5._upSpinTimer = setInterval(function () {
          _this5.spincount++;
          _this5._up();
        }, _this5._stepInterval);
      }, this._stepIntervalDelay);
    }

    /**
     * Stop the spinner
     *
     */

  }, {
    key: '_stop',
    value: function _stop() {
      clearTimeout(this._downDelayTimeout);
      clearTimeout(this._upDelayTimeout);
      clearInterval(this._downSpinTimer);
      clearInterval(this._upSpinTimer);

      switch (this._spinning) {
        case 'up':
          this.dispatchEvent(new CustomEvent('pf-touchspin.stopupspin', {}));
          this.dispatchEvent(new CustomEvent('pf-touchspin.stopspin', {}));

          break;
        case 'down':
          this.dispatchEvent(new CustomEvent('pf-touchspin.stopdownspin', {}));
          this.dispatchEvent(new CustomEvent('pf-touchspin.stopspin', {}));
          break;
      }

      this.spincount = 0;
      this._spinning = false;
    }
  }]);

  return PfTouchspin;
}(HTMLElement);

window.customElements.define('pf-touchspin', PfTouchspin);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionPanel = __webpack_require__(26);

var _pfAccordionPanel2 = _interopRequireDefault(_pfAccordionPanel);

var _pfAccordionTemplate = __webpack_require__(2);

var _pfAccordionTemplate2 = _interopRequireDefault(_pfAccordionTemplate);

var _pfUtils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-accordion>
 *   <pf-accordion-panel>
 *     <pf-accordion-heading>
 *       <h4 class="panel-title">
 *         <a role="button" data-toggle="collapse" href="#">
 *           Collapsible Group Item #1
 *         </a>
 *       </h4>
 *     </pf-accordion-heading>
 *     <pf-accordion-template open>
 *       <pf-accordion-body>
 *         Collapse CONTENT 1
 *       </pf-accordion-body>
 *     </pf-accordion-template>
 *   </pf-accordion-panel>
 *   <pf-accordion-panel class="panel panel-primary">
 *     <pf-accordion-heading>
 *       <h4 class="panel-title">
 *         <a role="button" data-toggle="collapse" href="#">
 *           Collapsible Group Item #2
 *         </a>
 *       </h4>
 *     </pf-accordion-heading>
 *     <pf-accordion-template>
 *       <pf-accordion-body>
 *         Collapse CONTENT 2
 *       </pf-accordion-body>
 *     </pf-accordion-template>
 *   </pf-accordion-panel>
 * </pf-accordion>
 *
 * @prop fixedHeight {Boolean} Whether the accrodion is a fixed-height accordion
 */
var PfAccordion = exports.PfAccordion = function (_HTMLElement) {
  _inherits(PfAccordion, _HTMLElement);

  /**
   * Called when an instance of the element is created
   */
  function PfAccordion() {
    _classCallCheck(this, PfAccordion);

    var _this = _possibleConstructorReturn(this, (PfAccordion.__proto__ || Object.getPrototypeOf(PfAccordion)).call(this));

    _this._initialized = false;
    _this._openPanels = [];
    _this._fixedHeight = false;

    _this._observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if ('childList' === mutation.type) {
          // fixed height needs to be recalculated on DOM initialization
          if (_this.hasAttribute('fixedheight')) {
            _this._setFixedHeight();
          }
        }
      }
    });
    return _this;
  }

  /**
   * Called when an instance was inserted into the document
   */


  _createClass(PfAccordion, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.classList.add('panel-group');
      this.setAttribute('role', 'tablist');
      this.setAttribute('aria-multiselectable', 'true');

      // catch bubbled events
      this.addEventListener('pf-accordion.expanding', this._handlePanelShown);
      this.addEventListener('pf-accordion.collapsing', this._handlePanelHidden);

      this._observer.observe(this, {
        childList: true
      });

      if (this.hasAttribute('fixedheight')) {
        // _initialized is raised after _initFixedHeight
        this._initFixedHeight();
      } else {
        this._initialized = true;
        this.dispatchEvent(new Event('pf-accordion.initialized'));
      }
    }

    /**
     * Handle bubbled pf-accordion-expanding on accordion
     * @param {Event} e event
     * @private
     */

  }, {
    key: '_handlePanelShown',
    value: function _handlePanelShown(e) {
      var openPanels = this.querySelectorAll('.collapse.in');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = openPanels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var panel = _step.value;

          if (e !== panel) {
            panel.open = false;
          } else {
            window.__debug = 1 + 2;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Called when the element is removed from the DOM
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._observer.disconnect();
      window.removeEventListener('resize', this._fixedHeightListener);
    }

    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if ('fixedheight' === attrName) {
        if (newValue) {
          this._initFixedHeight();
        } else {
          this._unsetFixedHeight();
        }
      }
    }

    /**
     * Recalculates and sets the collapse height after every browser resize
     * @private
     */

  }, {
    key: '_setFixedHeight',
    value: function _setFixedHeight() {
      var _this2 = this;

      var height = this.clientHeight;

      // Close any open panels
      var openPanels = this.querySelectorAll('.collapse.in');

      for (var i = 0; i < openPanels.length; i++) {
        var panel = openPanels[i];
        panel.classList.remove('in');
      }

      // Determine the necessary height for the closed content
      var contentHeight = 0;
      for (var _i = 0; _i < this.children.length; _i++) {
        var element = this.children[_i];
        contentHeight += element.offsetHeight;
      }

      // Determine the height remaining for opened collapse panels
      var bodyHeight = this.clientHeight - contentHeight;

      // Make sure we have enough height to be able to scroll the contents if necessary
      if (bodyHeight < 25) {
        bodyHeight = 25;
      }

      // Reopen the initially opened panel
      for (var _i2 = 0; _i2 < openPanels.length; _i2++) {
        var _panel = openPanels[_i2];
        _panel.classList.add('in');
      }

      // run as requestAnimationFrame to prevent performance issues while resizing
      requestAnimationFrame(function () {
        // Set the max-height for the collapse panels
        var panels = _this2.getElementsByTagName('pf-accordion-template');
        for (var _i3 = 0; _i3 < panels.length; _i3++) {
          var _element = panels[_i3];
          // Set the max-height and vertical scroll of the scroll element
          if (!_element._oldStyle) {
            _element._oldStyle = {
              maxHeight: _element.style.maxHeight,
              overflowY: _element.style.overflowY
            };
          }
          _element.style.maxHeight = bodyHeight + 'px';
          _element.style.overflowY = 'auto';
        }

        _this2._oldStyle = {
          overflowY: _this2.style.overflowY
        };
        _this2.style.overflowY = 'fixed';

        if (!_this2._initialized) {
          // first time run, send an initialized event
          _this2._initialized = true;
          _this2.dispatchEvent(new Event('pf-accordion.initialized'));
        }
      });
    }

    /**
     * Removes the fixed-height panel configuration
     * @private
     */

  }, {
    key: '_unsetFixedHeight',
    value: function _unsetFixedHeight() {
      if (!this._fixedHeight) {
        return;
      }
      var panels = this.getElementsByTagName('pf-accordion-template');
      for (var i = 0; i < panels.length; i++) {
        var element = panels[i];

        // Set the max-height and vertical scroll of the scroll element
        if (element._oldStyle) {
          element.style.maxHeight = element._oldStyle.maxHeight;
          element.style.overflowY = element._oldStyle.overflowY;
          element._oldStyle = null;
        }
      }
      this.style.overflowY = this._oldStyle.overflowY;
      this._oldStyle = null;
      window.removeEventListener('resize', this._fixedHeihtListener);
      this._fixedHeight = false;
    }

    /**
     * Initializes a fixed-width accordion
     * @private
     */

  }, {
    key: '_initFixedHeight',
    value: function _initFixedHeight() {
      var _this3 = this;

      if (this._fixedHeight) {
        return;
      }

      requestAnimationFrame(function () {
        return _this3._setFixedHeight();
      });
      // Update on window resizing
      this._fixedHeightListener = this._setFixedHeight.bind(this);
      window.addEventListener('resize', this._fixedHeightListener);
      this._fixedHeight = true;
    }
  }, {
    key: 'fixedHeight',
    get: function get() {
      return this._fixedHeight;
    },
    set: function set(value) {
      if (value) {
        if (!this.hasAttribute('fixedheight')) {
          this.setAttribute('fixedheight', '');
        }
      } else {
        this.removeAttribute('fixedheight');
      }
    }
  }]);

  return PfAccordion;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion', PfAccordion);
})();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordionPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionHeading = __webpack_require__(27);

var _pfAccordionHeading2 = _interopRequireDefault(_pfAccordionHeading);

var _pfAccordionTemplate = __webpack_require__(2);

var _pfAccordionTemplate2 = _interopRequireDefault(_pfAccordionTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 */
var PfAccordionPanel = exports.PfAccordionPanel = function (_HTMLElement) {
  _inherits(PfAccordionPanel, _HTMLElement);

  /**
   * Called when an instance of the element is created
   */
  function PfAccordionPanel() {
    _classCallCheck(this, PfAccordionPanel);

    var _this = _possibleConstructorReturn(this, (PfAccordionPanel.__proto__ || Object.getPrototypeOf(PfAccordionPanel)).call(this));

    _this._initDefaults();
    return _this;
  }

  /**
   * Called when an instance of the element was inserted into the document
   */


  _createClass(PfAccordionPanel, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._setClasses();
    }

    /**
     * Returns a list of attributes on which we are interested to track changes
     * @returns {String[]}
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
      if ('class' === attrName) {
        this._setClasses();
      }
    }

    /**
     * Sets default constants
     * @private
     */

  }, {
    key: '_initDefaults',
    value: function _initDefaults() {
      this._classes = {
        'context': {
          'classes': ['panel-default', 'panel-info', 'panel-success', 'panel-primary', 'panel-warning', 'panel-danger'],
          'default': 'panel-default'
        }
      };
    }

    /**
     * Sets default classes on the component
     * @private
     */

  }, {
    key: '_setClasses',
    value: function _setClasses() {
      var _this2 = this;

      // add default class for this component
      if (!this.classList.contains('panel')) {
        this.classList.add('panel');
      }

      var hasClass = false;
      this._classes.context.classes.forEach(function (clazz) {
        hasClass = hasClass || _this2.classList.contains(clazz);
      });

      if (!hasClass) {
        this.classList.add(this._classes.context.default);
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['class'];
    }
  }]);

  return PfAccordionPanel;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-panel', PfAccordionPanel);
})();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
 *
 */
var PfAccordionHeading = exports.PfAccordionHeading = function (_HTMLElement) {
  _inherits(PfAccordionHeading, _HTMLElement);

  /**
   * Called when an instance of the element is created
   */
  function PfAccordionHeading() {
    _classCallCheck(this, PfAccordionHeading);

    var _this = _possibleConstructorReturn(this, (PfAccordionHeading.__proto__ || Object.getPrototypeOf(PfAccordionHeading)).call(this));

    _this._observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (record) {
        // detach handlers on toggle removal, try to get another toggle
        if (_this._toggle || _this._target) {
          for (var i = 0, length = record.removedNodes.length; i < length; i++) {
            if (record.removedNodes[i] === _this._toggle) {
              _this._toggle.removeEventListener('click', _this._toggleClickHandler);
              _this._toggle.removeEventListener('keyup', _this._toggleKeyUpHandler);
              _this._initializeToggle();
            }

            if (record.removedNodes[i] === _this._target) {
              _this._findTarget();
            }
          }
        }

        // if there is no toggle or target initialized
        if (record.addedNodes.length > 0) {
          if (!_this._target) {
            _this._findTarget();
          } else if (!_this._toggle) {
            _this._initializeToggle();
          }
        }
      });
    });
    return _this;
  }
  /**
   * Called when an instance was inserted into the document
   */


  _createClass(PfAccordionHeading, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.classList.add('panel-heading');
      this.setAttribute('role', 'tab');

      this._findTarget();

      this._observer.observe(this, {
        childList: true,
        subtree: true
      });
    }
  }, {
    key: '_findTarget',
    value: function _findTarget() {
      var _this2 = this;

      this._target = this.parentElement.querySelector('pf-accordion-template');
      if (this._target) {
        if (this._target._initialized) {
          this._initializeToggle();
        } else {
          this._target.addEventListener('pf-accordion.initialized', function () {
            _this2._initializeToggle();
          });
        }
      }
    }
    /**
     * Finds the toggle element and adds appropriate listeners to it.
     * @private
     */

  }, {
    key: '_initializeToggle',
    value: function _initializeToggle() {
      var _this3 = this;

      this._toggle = this.querySelector('*[data-toggle="collapse"]');

      if (this._toggle) {
        this._toggleClickHandler = this._handleToggleClick.bind(this);
        this._toggleKeyUpHandler = this._handleToggleKeyUp.bind(this);
        this._toggle.addEventListener('click', this._toggleClickHandler);
        this._toggle.addEventListener('keyup', this._toggleKeyUpHandler);

        if (this._target !== null) {
          if (this._target.open) {
            this._toggle.classList.remove('collapsed');
            this._toggle.setAttribute('aria-expanded', 'true');
          } else {
            this._toggle.classList.add('collapsed');
            this._toggle.setAttribute('aria-expanded', 'false');
          }

          this._target.addEventListener('pf-accordion.expanding', function () {
            _this3._toggle.classList.remove('collapsed');
            _this3._toggle.setAttribute('aria-expanded', 'true');
          });
          this._target.addEventListener('pf-accordion.collapsing', function () {
            _this3._toggle.classList.add('collapsed');
            _this3._toggle.setAttribute('aria-expanded', 'false');
          });
        }
      }
    }

    /**
     * Toggle the target
     * @private
     */

  }, {
    key: '_doToggle',
    value: function _doToggle() {
      if (this._target) {
        this._target.toggle();
      }
    }

    /**
     * Handle keyUp on the toggle element
     * @private
     */

  }, {
    key: '_handleToggleKeyUp',
    value: function _handleToggleKeyUp(event) {
      event.preventDefault();
      if (32 === event.keyCode) {
        this._doToggle();
      }
    }

    /**
     * Handle keyUp on the toggle element
     * @private
     */

  }, {
    key: '_handleToggleClick',
    value: function _handleToggleClick(event) {
      event.preventDefault();
      this._doToggle();
    }

    /**
     * Called when the element is removed from the DOM
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._observer.disconnect();
    }
  }]);

  return PfAccordionHeading;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-heading', PfAccordionHeading);
})();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-body&gt;</b> element for Patternfly Web Components
 *
 */
var PfAccordionBody = exports.PfAccordionBody = function (_HTMLElement) {
  _inherits(PfAccordionBody, _HTMLElement);

  function PfAccordionBody() {
    _classCallCheck(this, PfAccordionBody);

    return _possibleConstructorReturn(this, (PfAccordionBody.__proto__ || Object.getPrototypeOf(PfAccordionBody)).apply(this, arguments));
  }

  _createClass(PfAccordionBody, [{
    key: 'connectedCallback',

    /**
     * Called when an instance in inserted into the document
     */
    value: function connectedCallback() {
      this.classList.add('panel-body');
    }
  }]);

  return PfAccordionBody;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-body', PfAccordionBody);
})();

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Accordion Component **/
__webpack_require__(25);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Alert Component **/
__webpack_require__(4);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Tabs Component **/
__webpack_require__(6);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Tooltip Component **/
__webpack_require__(11);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* pf-dropdown webcomponent */
__webpack_require__(23);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* pf-touchspin webcomponent */
__webpack_require__(24);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Utilization Bar Chart **/
__webpack_require__(13);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Tooltip Component **/
__webpack_require__(16);

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(40);

Object.defineProperty(exports, 'PfAccordion', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index).default;
  }
});

var _index2 = __webpack_require__(41);

Object.defineProperty(exports, 'PfAlert', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index2).default;
  }
});

var _index3 = __webpack_require__(44);

Object.defineProperty(exports, 'PfDropdown', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index3).default;
  }
});

var _index4 = __webpack_require__(47);

Object.defineProperty(exports, 'PfModal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index4).default;
  }
});

var _index5 = __webpack_require__(42);

Object.defineProperty(exports, 'PfTabs', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index5).default;
  }
});

var _index6 = __webpack_require__(43);

Object.defineProperty(exports, 'PfTooltip', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index6).default;
  }
});

var _index7 = __webpack_require__(45);

Object.defineProperty(exports, 'PfTouchspin', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index7).default;
  }
});

var _index8 = __webpack_require__(46);

Object.defineProperty(exports, 'PfUtilizationBarChart', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_index8).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);