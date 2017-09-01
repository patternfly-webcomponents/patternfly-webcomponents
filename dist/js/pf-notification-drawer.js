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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
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
    key: 'hasClass',
    value: function hasClass(el, c) {
      return (' ' + el.className + ' ').indexOf(' ' + c + ' ') > -1;
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
          if (this.hasClass(el, latter)) {
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
    key: 'getArrayFromNodeList',
    value: function getArrayFromNodeList(els) {
      var result = [];
      if (els && els.length > 0) {
        result = Array.prototype.slice.call(els);
      }
      return result;
    }
  }, {
    key: 'removeNodes',
    value: function removeNodes(els) {
      if (els) {
        if (typeof els.length === 'undefined') {
          els.parentNode.removeChild(els);
        } else if (els.length > 0) {
          this.getArrayFromNodeList(els).forEach(function (el) {
            el.parentNode.removeChild(el);
          });
        }
      }
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

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

var _pfNotificationDrawerHeader = __webpack_require__(35);

var _pfNotificationDrawerHeader2 = _interopRequireDefault(_pfNotificationDrawerHeader);

var _pfNotificationDrawerAccordion = __webpack_require__(37);

var _pfNotificationDrawerAccordion2 = _interopRequireDefault(_pfNotificationDrawerAccordion);

var _pfNotificationDrawerAccordionPanel = __webpack_require__(38);

var _pfNotificationDrawerAccordionPanel2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanel);

var _pfNotificationDrawerAccordionPanelCollapse = __webpack_require__(40);

var _pfNotificationDrawerAccordionPanelCollapse2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelCollapse);

var _pfNotificationDrawerAccordionPanelBody = __webpack_require__(43);

var _pfNotificationDrawerAccordionPanelBody2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer>
 *   <pf-notification-drawer-accordion>
 *     <pf-notification-drawer-accordion-panel>
 *       <pf-notification-drawer-accordion-panel-collapse>
 *         <pf-notification-drawer-accordion-panel-body>
 *           <tag class="drawer-pf-notification unread">
 *             <tag class="drawer-pf-notification-message">Notfication A</tag>
 *           </tag>
 *           <tag class="drawer-pf-notification">
 *             <tag className="drawer-pf-notification-message">Notfication B</tag>
 *           </tag>
 *           . . .
 *         </pf-notification-drawer-accordion-panel-body>
 *       </pf-notification-drawer-accordion-panel-collapse>
 *     </pf-notification-drawer-accordion-panel>
 *     <pf-notification-drawer-accordion-panel>
 *       . . .
 *     </pf-notification-drawer-accordion-panel>
 *   </pf-notification-drawer-accordion>
 * </pf-notification-drawer>
 *
 * @properties
 *
 * @prop {string} targetSelector Indicating which element will fireup the notification-drawer
 *
 * @methods
 *
 *
 * @events
 *
 * @pf-notification-drawer.markallread It's fired when user clicks the "Mark All read" button to
 * update the read status of one group of notifications.
 * @pf-notification-drawer.clearall It's fired when user clicks the "Clear All" button to
 * remove all the items of one group of notifications.
 * @pf-notification-drawer.updateall It's fired when user updates the datasoure of one
 * existing notification group.
 * @pf-notification-drawer.updategroups It's fired when user updates the datasoure of all the
 * notification groups.
 */

var PfNotificationDrawer = exports.PfNotificationDrawer = function (_HTMLElement) {
  _inherits(PfNotificationDrawer, _HTMLElement);

  _createClass(PfNotificationDrawer, [{
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'targetselector' && newValue !== null && oldValue === null) {
        this._target = document.querySelector(newValue);
        if (this._target) {
          this._target.addEventListener('click', this._toggleDrawer.bind(this), false);
          this._target.setAttribute('data-bound', 'bound');
        }
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',


    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */
    get: function get() {
      return ['targetselector'];
    }
  }]);

  function PfNotificationDrawer() {
    _classCallCheck(this, PfNotificationDrawer);

    return _possibleConstructorReturn(this, (PfNotificationDrawer.__proto__ || Object.getPrototypeOf(PfNotificationDrawer)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawer, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.className = 'drawer-pf hide drawer-pf-notifications-non-clickable';

      if (this.getAttribute('targetSelector')) {
        this._target = document.querySelector(this.getAttribute('targetSelector'));
        if (this._target && !(this._target.getAttribute('data-bound') === 'bound')) {
          this._target.addEventListener('click', this._toggleDrawer.bind(this), false);
        }
      }

      this._updateDrawerLogo();
      this.addEventListener('pf-notification-drawer.markallread', this._updateDrawerLogo, false);
      this.addEventListener('pf-notification-drawer.clearall', this._updateDrawerLogo, false);
      this.addEventListener('pf-notification-drawer.updateall', this._updateDrawerLogo, false);
      this.addEventListener('pf-notification-drawer.updategroups', this._updateDrawerLogo, false);

      this.dispatchEvent(new Event('pf-notification-drawer.initialized'));
    }

    /*
     * toggle the notification-drawer
     * @private
     */

  }, {
    key: '_toggleDrawer',
    value: function _toggleDrawer(e) {
      if (_pfUtils.pfUtil.hasClass(this, 'hide')) {
        _pfUtils.pfUtil.removeClass(this, 'hide');
      } else {
        _pfUtils.pfUtil.addClass(this, 'hide');
      }
    }
  }, {
    key: '_updateDrawerLogo',
    value: function _updateDrawerLogo() {
      var flag = 0;
      _pfUtils.pfUtil.getArrayFromNodeList(this.querySelectorAll('pf-notification-drawer-accordion-panel-collapse:not(.empty-view)')).forEach(function (el) {
        flag += el.querySelectorAll('.unread').length;
      });
      if (flag && !this._target.querySelector('.badge')) {
        this._target.insertAdjacentHTML('beforeend', '<span class="badge"> </span>');
      } else if (!flag && this._target.querySelector('.badge')) {
        var unreadLogo = this._target.querySelector('.badge');
        unreadLogo.parentNode.removeChild(unreadLogo);
      }
    }
  }]);

  return PfNotificationDrawer;
}(HTMLElement);

window.customElements.define('pf-notification-drawer', PfNotificationDrawer);

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

var _pfNotificationDrawerHeader = __webpack_require__(36);

var _pfNotificationDrawerHeader2 = _interopRequireDefault(_pfNotificationDrawerHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-header&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-header>
 *   <a class="drawer-pf-toggle-expand"></a>
 *   <a class="drawer-pf-close"></a>
 *   <h3>Notifications Drawer</h3>
 * </pf-notification-drawer-header>
 */

var PfNotificationDrawerHeader = exports.PfNotificationDrawerHeader = function (_HTMLElement) {
  _inherits(PfNotificationDrawerHeader, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerHeader() {
    _classCallCheck(this, PfNotificationDrawerHeader);

    return _possibleConstructorReturn(this, (PfNotificationDrawerHeader.__proto__ || Object.getPrototypeOf(PfNotificationDrawerHeader)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerHeader, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.className = 'drawer-pf-title';

      this._template = document.createElement('template');
      this._template.innerHTML = _pfNotificationDrawerHeader2.default;
      this.appendChild(this._template.content);

      if (this.drawerTitle) {
        this._updateDrawerTitle(this.drawerTitle);
      }
      this.querySelector('.drawer-pf-toggle-expand').addEventListener('click', this._toggleDrawer.bind(this), false);
      this.querySelector('.drawer-pf-close').addEventListener('click', this._hideDrawer.bind(this), false);
    }

    /*
     * update title for notification-drawer
     *
     * @private
     */

  }, {
    key: '_updateDrawerTitle',
    value: function _updateDrawerTitle(val) {
      var title = this.querySelector('h3');
      if (title) {
        title.innerHTML = val;
      }
    }

    /*
     * toggle the drawer between the narrow and wide modes
     *
     * @private
     */

  }, {
    key: '_toggleDrawer',
    value: function _toggleDrawer(e) {
      var drawer = this.parentNode;
      if (_pfUtils.pfUtil.hasClass(drawer, 'drawer-pf-expanded')) {
        _pfUtils.pfUtil.removeClass(drawer, 'drawer-pf-expanded');
      } else {
        _pfUtils.pfUtil.addClass(drawer, 'drawer-pf-expanded');
      }
    }

    /*
     * hide the drawer
     *
     * @private
     */

  }, {
    key: '_hideDrawer',
    value: function _hideDrawer(e) {
      _pfUtils.pfUtil.addClass(this.parentNode, 'hide');
    }

    /*
     * Get modalTitle
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
      if (attrName === 'drawertitle') {
        this._updateDrawerTitle(newValue ? newValue : '&nbsp;');
      }
    }
  }, {
    key: 'drawerTitle',
    get: function get() {
      return this.getAttribute('drawerTitle');
    }

    /*
     * Set modalTitle
     *
     * @param {string} val Modal title
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('drawerTitle', val);
      } else {
        this.removeAttribute('drawerTitle');
      }
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['drawertitle'];
    }
  }]);

  return PfNotificationDrawerHeader;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-header', PfNotificationDrawerHeader);

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfNotificationDrawerHeaderTemplate = "\n<a class=\"drawer-pf-toggle-expand fa fa-angle-double-left\"></a>\n<a class=\"drawer-pf-close pficon pficon-close\"></a>\n<h3 class=\"text-center\">&nbsp;</h3>\n";
exports.default = PfNotificationDrawerHeaderTemplate;

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion>
 *   <pf-notification-drawer-accordion-panel></pf-notification-drawer-accordion-panel>
 *   <pf-notification-drawer-accordion-panel></pf-notification-drawer-accordion-panel>
 *   . . .
 * </pf-notification-drawer-accordion>
 */

var PfNotificationDrawerAccordion = exports.PfNotificationDrawerAccordion = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordion, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordion() {
    _classCallCheck(this, PfNotificationDrawerAccordion);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordion.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordion)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordion, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      _pfUtils.pfUtil.addClass(this, 'panel-group');

      var observer = new MutationObserver(function (mutations) {
        if (that.querySelector('.drawer-pf-notification')) {
          that.dispatchEvent(new CustomEvent('pf-notification-drawer.updategroups', { 'bubbles': true }));
        }
      });
      observer.observe(this, { childList: true });
    }

    /*
     * collapse the expanded panel
     * @private
     */

  }, {
    key: '_collapseExpandedPanel',
    value: function _collapseExpandedPanel(expanded) {
      var originalExpanded = this.querySelector('.uncollapsed');
      if (originalExpanded) {
        _pfUtils.pfUtil.removeClass(originalExpanded, 'uncollapsed');
      }
    }
  }]);

  return PfNotificationDrawerAccordion;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion', PfNotificationDrawerAccordion);

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordionPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

var _pfNotificationDrawerAccordionPanel = __webpack_require__(39);

var _pfNotificationDrawerAccordionPanel2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion-panel>
 *   <div class="panel-heading"></div>
 *   <pf-notification-drawer-accordion-panel-collapse>
 *   </pf-notification-drawer-accordion-panel-collapse>
 * </pf-notification-drawer-accordion-panel>
 */

var PfNotificationDrawerAccordionPanel = exports.PfNotificationDrawerAccordionPanel = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordionPanel, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordionPanel() {
    _classCallCheck(this, PfNotificationDrawerAccordionPanel);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordionPanel.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordionPanel)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordionPanel, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      var transclusion = '';
      this.className = 'panel panel-default';
      this.insertAdjacentHTML('afterbegin', _pfNotificationDrawerAccordionPanel2.default);
      if (this.panelTitle) {
        this._updatePanelTitle(this.panelTitle);
      }
      this.querySelector('.panel-counter').textContent = this.querySelectorAll('.unread').length + ' New Events';

      this.querySelector('.panel-title').children[0].addEventListener('click', this._togglePanel.bind(this), false);
      this.addEventListener('pf-notification-drawer.markoneread', this._markOneRead.bind(this), false);
      this.addEventListener('pf-notification-drawer.markallread', this._clearCounter.bind(this), false);
      this.addEventListener('pf-notification-drawer.clearall', this._clearCounter.bind(this), false);
      this.addEventListener('pf-notification-drawer.updateall', this._updateCounter.bind(this), false);
    }

    /*
     * Get panelTitle
     *
     * @returns {string} The panel title of a group of notifications
     */

  }, {
    key: '_updatePanelTitle',


    /*
     * update title for notification-drawer-accordion-panel
     *
     * @private
     */
    value: function _updatePanelTitle(val) {
      var title = this.querySelector('.panel-title a');
      if (title) {
        title.innerHTML = val;
      }
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
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
      if (attrName === 'paneltitle') {
        this._updatePanelTitle(newValue);
      }
    }

    /*
     * clear the unread status and caculate the new count of unread notifications
     * @private
     */

  }, {
    key: '_markOneRead',
    value: function _markOneRead(e) {
      var counter = this.querySelector('.panel-counter');
      counter.textContent = window.parseInt(counter.textContent) - 1 + ' New Events';

      if (counter.textContent.indexOf('0') === 0) {
        _pfUtils.pfUtil.removeNodes(this.querySelector('.mark-all-read').parentNode);
        this.dispatchEvent(new CustomEvent('pf-notification-drawer.markallread', { 'bubbles': true, 'detail': { 'source': this } }));
      }
    }

    /*
     * clear the counter
     * @private
     */

  }, {
    key: '_clearCounter',
    value: function _clearCounter(e) {
      this.querySelector('.panel-counter').textContent = '0 New Events';
    }

    /*
     * update the counter according to the new datasoure of notifications
     * @private
     */

  }, {
    key: '_updateCounter',
    value: function _updateCounter(e) {
      this.querySelector('.panel-counter').textContent = e.target.querySelectorAll('.unread').length + ' New Events';
    }

    /*
     * toggle the panel
     * @private
     */

  }, {
    key: '_togglePanel',
    value: function _togglePanel(e) {
      e.stopPropagation();
      var panel = this.querySelector('.panel-collapse');
      if (_pfUtils.pfUtil.hasClass(panel, 'uncollapsed')) {
        _pfUtils.pfUtil.removeClass(panel, 'uncollapsed');
        _pfUtils.pfUtil.addClass(this.querySelector('.panel-title').querySelector('a'), 'collapsed');
      } else {
        this.parentNode._collapseExpandedPanel(this);
        _pfUtils.pfUtil.addClass(panel, 'uncollapsed');
        _pfUtils.pfUtil.removeClass(this.querySelector('.panel-title').querySelector('a'), 'collapsed');
      }
    }
  }, {
    key: 'panelTitle',
    get: function get() {
      return this.getAttribute('panelTitle');
    }

    /*
     * Set panelTitle
     *
     * @param {string} val The panel title of a group of notifications
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('panelTitle', val);
      } else {
        this.removeAttribute('panelTitle');
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['paneltitle'];
    }
  }]);

  return PfNotificationDrawerAccordionPanel;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion-panel', PfNotificationDrawerAccordionPanel);

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfNotificationDrawerAccordionPanelTemplate = "\n<div class=\"panel-heading\" data-component=\"collapse-heading\">\n  <h4 class=\"panel-title\">\n    <a class=\"collapsed\"></a>\n  </h4>\n  <span class=\"panel-counter\"></span>\n</div>\n";
exports.default = PfNotificationDrawerAccordionPanelTemplate;

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordionPanelCollapse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

var _pfNotificationDrawerAccordionPanelBlank = __webpack_require__(41);

var _pfNotificationDrawerAccordionPanelBlank2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelBlank);

var _pfNotificationDrawerAccordionPanelAction = __webpack_require__(42);

var _pfNotificationDrawerAccordionPanelAction2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion-panel-collapse&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion-panel-collapse>
 *   <pf-notification-drawer-accordion-panel-body></pf-notification-drawer-accordion-panel-body>
 *   <div class="blank-slate-pf"></div>
 *   <div class="drawer-pf-action"></div>
 * </pf-notification-drawer-accordion-panel-collapse>
 */

var PfNotificationDrawerAccordionPanelCollapse = exports.PfNotificationDrawerAccordionPanelCollapse = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordionPanelCollapse, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordionPanelCollapse() {
    _classCallCheck(this, PfNotificationDrawerAccordionPanelCollapse);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordionPanelCollapse.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordionPanelCollapse)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordionPanelCollapse, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      this.className = 'panel-collapse';
      this.insertAdjacentHTML('beforeend', _pfNotificationDrawerAccordionPanelBlank2.default + _pfNotificationDrawerAccordionPanelAction2.default);

      this.addEventListener('click', function (e) {
        if (_pfUtils.pfUtil.getClosest(e.target, '.mark-all-read')) {
          that._markAllRead(e);
        }
      }, false);
      this.addEventListener('click', function (e) {
        if (_pfUtils.pfUtil.getClosest(e.target, '.clear-all')) {
          that._clearAll(e);
        }
      }, false);
      this.addEventListener('pf-notification-drawer.updateall', this._updateAll.bind(this), false);
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
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
      if (attrName === 'paneltitle') {
        this._updatePanelTitle(newValue);
      }
    }

    /*
     * clear the unread status of all the notification items
     * @private
     */

  }, {
    key: '_markAllRead',
    value: function _markAllRead(e) {
      _pfUtils.pfUtil.getArrayFromNodeList(this.querySelectorAll('.unread')).forEach(function (noti) {
        _pfUtils.pfUtil.removeClass(noti, 'unread');
      });
      var link = _pfUtils.pfUtil.getClosest(e.target, '.drawer-pf-action-link');
      link.parentNode.removeChild(link);
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.markallread', { 'bubbles': true, 'detail': { 'source': this.parentNode } }));
    }

    /*
     * remove all the notification items of one panel-group
     * @private
     */

  }, {
    key: '_clearAll',
    value: function _clearAll() {
      _pfUtils.pfUtil.addClass(this, 'empty-view');
      _pfUtils.pfUtil.removeNodes(this.querySelector('.drawer-pf-action'));
      _pfUtils.pfUtil.removeClass(this.querySelector('.blank-slate-pf'), 'hidden');
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.clearall', { 'bubbles': true, 'detail': { 'source': this.parentNode } }));
    }

    /*
     * update the view status on reloading notifications
     * @private
     */

  }, {
    key: '_updateAll',
    value: function _updateAll() {
      _pfUtils.pfUtil.removeClass(this, 'empty-view');
      if (!this.querySelector('.drawer-pf-action')) {
        this.insertAdjacentHTML('beforeend', _pfNotificationDrawerAccordionPanelAction2.default);
      } else if (!this.querySelector('.mark-all-read')) {
        this.querySelector('.drawer-pf-action').insertAdjacentHTML('afterbegin', '<div class="drawer-pf-action-link">' + '  <button class="btn btn-link mark-all-read">Mark All Read</button>' + '</div>');
      }
      _pfUtils.pfUtil.addClass(this.querySelector('.blank-slate-pf'), 'hidden');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['paneltitle'];
    }
  }]);

  return PfNotificationDrawerAccordionPanelCollapse;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion-panel-collapse', PfNotificationDrawerAccordionPanelCollapse);

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfNotificationDrawerAccordionPanelBlankTemplate = "\n<div class=\"blank-slate-pf hidden\">\n  <div class=\"blank-slate-pf-icon\">\n    <span class=\"pficon-info\"></span>\n  </div>\n  <h1>There are no notifications to display.</h1>\n</div>\n";
exports.default = PfNotificationDrawerAccordionPanelBlankTemplate;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfNotificationDrawerAccordionPanelActionTemplate = "\n<div class=\"drawer-pf-action\">\n  <div class=\"drawer-pf-action-link\">\n    <button class=\"btn btn-link mark-all-read\">Mark All Read</button>\n  </div>\n  <div class=\"drawer-pf-action-link\">\n    <button class=\"btn btn-link clear-all\">\n      <span class=\"pficon pficon-close\"></span>\n      Clear All\n    </button>\n  </div>\n</div>\n";
exports.default = PfNotificationDrawerAccordionPanelActionTemplate;

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordionPanelBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion-panel-body&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion-panel-body>
 *   <tag className="drawer-pf-notification unread">
 *     <tag className="drawer-pf-notification-message">Notification content</tag>
 *   </tag>
 * </pf-notification-drawer-accordion-panel-body>
 */

var PfNotificationDrawerAccordionPanelBody = exports.PfNotificationDrawerAccordionPanelBody = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordionPanelBody, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordionPanelBody() {
    _classCallCheck(this, PfNotificationDrawerAccordionPanelBody);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordionPanelBody.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordionPanelBody)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordionPanelBody, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      _pfUtils.pfUtil.addClass(this, 'panel-body');

      this.addEventListener('click', function (e) {
        var noti = _pfUtils.pfUtil.getClosest(e.target, '.drawer-pf-notification');
        if (_pfUtils.pfUtil.hasClass(e.target, 'drawer-pf-notification-message') && noti && noti.classList.contains('unread')) {
          that._markRead(e);
        }
      }, false);
      var observer = new MutationObserver(function (mutations) {
        if (that.querySelector('.drawer-pf-notification')) {
          that.dispatchEvent(new CustomEvent('pf-notification-drawer.updateall', { 'bubbles': true, 'detail': { 'source': _pfUtils.pfUtil.getClosest(that, '.panel') } }));
        }
      });
      observer.observe(this, { childList: true });
    }

    /*
     * clear the unread status and caculate the new count of unread notifications
     * @private
     */

  }, {
    key: '_markRead',
    value: function _markRead(e) {
      _pfUtils.pfUtil.removeClass(_pfUtils.pfUtil.getClosest(e.target, '.drawer-pf-notification'), 'unread');
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.markoneread', { 'bubbles': true, 'detail': { 'source': e.target } }));
    }
  }]);

  return PfNotificationDrawerAccordionPanelBody;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion-panel-body', PfNotificationDrawerAccordionPanelBody);

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF Notification-Drawer Component **/
__webpack_require__(34);

/***/ })

/******/ });