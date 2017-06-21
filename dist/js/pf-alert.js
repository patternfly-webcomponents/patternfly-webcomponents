/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** PF Alert Component **/
	__webpack_require__(2);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfAlert = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfAlert = __webpack_require__(3);

	var _pfAlert2 = _interopRequireDefault(_pfAlert);

	var _pfUtils = __webpack_require__(4);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfAlertTemplate = "\n<button type=\"button\" class=\"close hidden\" data-dismiss=\"alert\" aria-hidden=\"true\">\n  <span class=\"pficon pficon-close\"></span>\n</button>\n<span class=\"pficon\"></span>\n";
	exports.default = PfAlertTemplate;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

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
	      var f = s.charAt(0);
	      for (; el && el !== document; el = el.parentNode) {
	        // Get closest match
	        if (f === '.') {
	          // If selector is a class
	          if (document.querySelector(s) !== undefined) {
	            return el;
	          }
	        }
	        if (f === '#') {
	          // If selector is an ID
	          if (el.id === s.substr(1)) {
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
	  }]);

	  return PfUtil;
	}();

	var pfUtil = new PfUtil();
	exports.pfUtil = pfUtil;

/***/ }
/******/ ]);