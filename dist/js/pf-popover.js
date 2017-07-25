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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
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
  }]);

  return PfUtil;
}();

var pfUtil = new PfUtil();
exports.pfUtil = pfUtil;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfPopover = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfPopover = __webpack_require__(31);

var _pfPopover2 = _interopRequireDefault(_pfPopover);

var _pfUtils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-popover&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-popover animation="fade" target-selector="#btn-left" placement="left" delay="100" duration="150" popover-title="Popover Title" dismissible="true" container-selector="#container"></pf-alert>
 *
 * @prop {string} animation the animation class
 * @prop {string} target-selector the target element selector
 * @prop {string} placement left, right, top, bottom
 * @prop {string} popover-title the title of popover
 * @prop {string} dismissible true, false
 * @prop {number} delay animation delay (ms)
 * @prop {number} duration animation duration (ms)
 * @prop {string} container-selector the container element selector
 */

var PfPopover = exports.PfPopover = function (_HTMLElement) {
  _inherits(PfPopover, _HTMLElement);

  _createClass(PfPopover, [{
    key: 'init',


    /**
     * Reinitializes popover component with attribute values and resets content
     */
    value: function init() {
      var _this2 = this;

      this.element = this;
      this.content = this._innerHtml || this.element.innerHTML;
      this.popover = null;
      this._targetSelector = this.getAttribute('target-selector');
      this._target = this._targetSelector ? document.querySelector(this._targetSelector) : this;
      this._animation = this.getAttribute('animation') ? this.getAttribute('animation') : 'fade';
      this._popoverTitle = this.getAttribute('popover-title') ? this.getAttribute('popover-title') : '';
      this._dismissible = this.getAttribute('dismissible') ? this.getAttribute('dismissible') : false;
      this._placement = this.getAttribute('placement') ? this.getAttribute('placement') : 'right';
      this._delay = parseInt(this.getAttribute('delay')) || 100;
      this._duration = _pfUtils.pfUtil.isMSIE && _pfUtils.pfUtil.isMSIE < 10 ? 0 : parseInt(this.getAttribute('duration')) || 150;
      this._containerSelector = this.getAttribute('container-selector');
      this._container = this._containerSelector ? document.querySelector(this._containerSelector) : document.body;

      if (this._target) {
        //create open event listeners
        this._target.addEventListener('click', function (e) {
          if (_this2.popover !== null) {
            _this2.close(e);
          } else {
            _this2.open(e);
          }
        }, false);
      }

      if (this._dismissible) {

        document.addEventListener('click', function (event) {
          if (_this2.popover !== null && event.target === _this2.popover.querySelector('div.popover > h3.popover-title .close > span.pficon-close')) {
            _this2.close();
          }
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
      this.element.addEventListener('handleContentChanged', function (e) {
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

    /**
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['animation', 'target-selector', 'placement', 'delay', 'duration', 'container-selector', 'popover-title'];
    }
  }]);

  function PfPopover() {
    _classCallCheck(this, PfPopover);

    var _this = _possibleConstructorReturn(this, (PfPopover.__proto__ || Object.getPrototypeOf(PfPopover)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _pfPopover2.default;
    _this._timer = 0;
    return _this;
  }

  /**
   * Sets popover the inner HTML
   * @param {string} html string
   */


  _createClass(PfPopover, [{
    key: 'setInnerHtml',
    value: function setInnerHtml(html) {
      this._innerHtml = html;
      this.element.dispatchEvent(new CustomEvent('handleContentChanged', {}));
    }

    /**
     * public handler
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      this.init();
      if (this.popover === null) {
        this.open();
      } else {
        this.close();
      }
    }

    /**
     * Get the animation class
     *
     * @returns {string} The animation class
     */

  }, {
    key: 'open',


    /**
       * The popover open method
       */
    value: function open() {
      var _this4 = this;

      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        if (_this4.popover === null) {
          _this4._createPopover();
          _this4._stylePopover();
          _this4._checkPlacement();
          _this4._showPopover();
          //notify frameworks
          _this4.dispatchEvent(new CustomEvent('pf-popover.opened', {}));
        }
      }, 20);
    }

    /**
     * The popover close method
     */

  }, {
    key: 'close',
    value: function close() {
      var _this5 = this;

      clearTimeout(this._timer);
      this._timer = setTimeout(function () {
        if (_this5.popover && _this5.popover !== null) {
          _pfUtils.pfUtil.removeClass(_this5.popover, 'in');
          setTimeout(function () {
            _this5._removePopover();
            //notify frameworks
            _this5.dispatchEvent(new CustomEvent('pf-popover.closed', {}));
            // reset position after popover is closed
            _this5._placement = _this5.getAttribute('placement') ? _this5.getAttribute('placement') : 'right';
          }, _this5._duration);
        }
      }, this._delay + this._duration);
    }

    /**
     * Removes the popover
     * @private
     */

  }, {
    key: '_removePopover',
    value: function _removePopover() {
      this.popover && this._container.removeChild(this.popover);
      this.popover = null;
    }

    /**
     * Creates the popover
     * @private
     */

  }, {
    key: '_createPopover',
    value: function _createPopover() {
      var clone = document.importNode(this._template.content, true);
      var popoverInner = clone.querySelector('.popover-content');
      var popovertitle = clone.querySelector('.popover-title');
      var closeButton = document.createElement('template');
      closeButton.innerHTML = '<button type="button" class="close"><span class="pficon pficon-close"></span></button>';

      if (this._popoverTitle === '' && !this._dismissible) {
        popovertitle.parentNode.removeChild(popovertitle);
      } else {
        //set popover title
        popovertitle.innerHTML = this._popoverTitle;

        if (this._dismissible) {
          popovertitle.appendChild(closeButton.content);
        }
      }
      //set popover content
      popoverInner.innerHTML = this.content;

      //append to the container
      this._container.appendChild(clone);

      //set reference to appended node
      this.popover = this._container.querySelectorAll('.popover:last-child')[0];
      this.popover.style.display = 'block';
      this.popover.setAttribute('class', 'popover ' + this._placement + ' ' + this._animation);
    }

    /**
     * update the placement of popover
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
     * Styles the popover based on placement attribute
     * @private
     */

  }, {
    key: '_stylePopover',
    value: function _stylePopover() {
      var rect = this._target.getBoundingClientRect(); //popover real dimensions

      var // link rect | window vertical and horizontal scroll
      scroll = _pfUtils.pfUtil.getScroll();

      var //link real dimensions
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top };

      var popoverDimensions = { w: this.popover.offsetWidth, h: this.popover.offsetHeight };

      //apply styling
      switch (this._placement) {
        case 'top':
          //TOP
          this.popover.style.top = rect.top + scroll.y - popoverDimensions.h + 'px';
          this.popover.style.left = rect.left + scroll.x - popoverDimensions.w / 2 + linkDimensions.w / 2 + 'px';
          break;

        case 'bottom':
          //BOTTOM
          this.popover.style.top = rect.top + scroll.y + linkDimensions.h + 'px';
          this.popover.style.left = rect.left + scroll.x - popoverDimensions.w / 2 + linkDimensions.w / 2 + 'px';
          break;

        case 'left':
          //LEFT
          this.popover.style.top = rect.top + scroll.y - popoverDimensions.h / 2 + linkDimensions.h / 2 + 'px';
          this.popover.style.left = rect.left + scroll.x - popoverDimensions.w + 'px';
          break;

        case 'right':
          //RIGHT
          this.popover.style.top = rect.top + scroll.y - popoverDimensions.h / 2 + linkDimensions.h / 2 + 'px';
          this.popover.style.left = rect.left + scroll.x + linkDimensions.w + 'px';
          break;
      }
      this.popover.className.indexOf(this._placement) === -1 && (this.popover.className = this.popover.className.replace(/\b(top|bottom|left|right)+/, this._placement));
    }

    /**
     * check the placement of popover
     */

  }, {
    key: '_checkPlacement',
    value: function _checkPlacement() {
      if (!_pfUtils.pfUtil.isElementInViewport(this.popover)) {
        this._placement = this._updatePlacement();
        this._stylePopover();
      }
    }

    /**
     * Makes popover visible
     * @private
     */

  }, {
    key: '_showPopover',
    value: function _showPopover() {
      !/\bin/.test(this.popover.className) && _pfUtils.pfUtil.addClass(this.popover, 'in');
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
     * Get the popover container-selector
     *
     * @returns {string} The container element selector
     */

  }, {
    key: 'containerSelector',
    get: function get() {
      return this._containerSelector;
    }

    /**
     * Set the popover container-selector
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
     * Get the placement this._placement
     *
     * @returns {string} The placement this._placement left, top, bottom, right
     */

  }, {
    key: 'placement',
    get: function get() {
      return this._placement;
    }

    /**
     * Set placement this._placement
     *
     * @param {string} value The placement this._placement left, top, bottom, right
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

    /**
     * Get the popover-title
     *
     * @return {string} the title of popover
     */

  }, {
    key: 'popoverTitle',
    get: function get() {
      return this._popoverTitle;
    }

    /**
     * Set popover-title
     *
     * @param {string} value The title of popover
     */
    ,
    set: function set(value) {
      if (this._popoverTitle !== value) {
        this._popoverTitle = value;
        this.setAttribute('popover-title', value);
      }
    }
  }]);

  return PfPopover;
}(HTMLElement);

window.customElements.define('pf-popover', PfPopover);

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfPopoverTemplate = "\n<div class=\"popover\" role=\"popover\">\n  <div class=\"arrow\"></div>\n  <h3 class=\"popover-title closable\"></h3>\n  <div class=\"popover-content\"></div>\n</div>\n";

exports.default = PfPopoverTemplate;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Popover Component **/
__webpack_require__(30);

/***/ })

/******/ });