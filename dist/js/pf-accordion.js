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

/***/ 0:
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

/***/ 2:
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

/***/ 25:
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

/***/ 26:
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

/***/ 27:
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

/***/ 28:
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

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Accordion Component **/
__webpack_require__(25);

/***/ })

/******/ });