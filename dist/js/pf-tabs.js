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

	/** PF Tabs Component **/
	__webpack_require__(6);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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
	 * PfTabs element for Patternfly web components
	 */
	var PfTabs = exports.PfTabs = function (_HTMLElement) {
	  _inherits(PfTabs, _HTMLElement);

	  function PfTabs() {
	    _classCallCheck(this, PfTabs);

	    return _possibleConstructorReturn(this, (PfTabs.__proto__ || Object.getPrototypeOf(PfTabs)).apply(this, arguments));
	  }

	  _createClass(PfTabs, [{
	    key: 'attachedCallback',

	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
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
	      if (attrName === 'class') {
	        this.querySelector('ul').className = newValue;
	      }
	    }

	    /**
	     * Called when an instance of the element is created
	     */

	  }, {
	    key: 'createdCallback',
	    value: function createdCallback() {
	      this._tabsTemplate = document.createElement('template');
	      this._tabsTemplate.innerHTML = _pfTabs2.default;

	      this.selected = null;
	      this.tabMap = new Map();
	      this.panelMap = new WeakMap();
	      this.displayMap = new WeakMap();
	    }

	    /**
	     * Called when the element is removed from the DOM
	     */

	  }, {
	    key: 'detachedCallback',
	    value: function detachedCallback() {
	      this.querySelector('ul').removeEventListener('click', this);
	    }

	    /**
	     * Handle event
	     *
	     * @param event
	     */

	  }, {
	    key: 'handleEvent',
	    value: function handleEvent(event) {
	      if (event.target.tagName === 'A') {
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
	          forEach.call(mutationRecord.addedNodes, function (node) {
	            handlers.push(['add', node]);
	          });
	          forEach.call(mutationRecord.removedNodes, function (node) {
	            handlers.push(['remove', node]);
	          });
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
	     * Handle title change
	     *
	     * @param panel The tab panel
	     * @param title The tab title
	     */

	  }, {
	    key: 'handleTitle',
	    value: function handleTitle(panel, title) {
	      var tab = this.panelMap.get(panel);
	      //attribute changes may fire as Angular is rendering
	      //before this tab is in the panelMap, so check first
	      if (tab) {
	        tab.textContent = panel.title;
	      }
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
	      var pfTabs = this.querySelectorAll('pf-tab');
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
	      tabAnchor.innerHTML = pfTab.attributes && pfTab.attributes.title ? pfTab.attributes.title.value : pfTab.title;
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
	     * @private
	     */

	  }, {
	    key: '_setTabStatus',
	    value: function _setTabStatus(active) {
	      if (active === this.selected) {
	        return;
	      }
	      this.selected = active;

	      var tabs = this.querySelector('ul').children;
	      [].forEach.call(tabs, function (tab) {
	        var fn = active === tab ? this._makeActive : this._makeInactive;
	        fn.call(this, tab);
	      }.bind(this));
	    }
	  }]);

	  return PfTabs;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-tabs', PfTabs);
	})();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfTabTemplate = "\n<li role=\"presentation\">\n  <a href=\"#\" role=\"tab\" data-toggle=\"tab\"></a>\n</li>\n";
	exports.default = PfTabTemplate;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfTabsTemplate = "\n<ul role=\"tablist\"></ul>\n";
	exports.default = PfTabsTemplate;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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
	 * PfTab element for Patternfly web components
	 */
	var PfTab = exports.PfTab = function (_HTMLElement) {
	  _inherits(PfTab, _HTMLElement);

	  function PfTab() {
	    _classCallCheck(this, PfTab);

	    return _possibleConstructorReturn(this, (PfTab.__proto__ || Object.getPrototypeOf(PfTab)).apply(this, arguments));
	  }

	  _createClass(PfTab, [{
	    key: 'attachedCallback',

	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
	      this.appendChild(this._template.content);
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
	      var parent = this.parentNode;
	      if (attrName === 'title' && parent && parent.handleTitle) {
	        parent.handleTitle(this, newValue);
	      }
	    }

	    /**
	     * Called when an instance of the element is created
	     */

	  }, {
	    key: 'createdCallback',
	    value: function createdCallback() {
	      this._template = document.createElement('template');
	      this._template.innerHTML = _panel2.default;
	    }

	    /**
	     * Get tab title
	     *
	     * @returns {string} The tab title
	     */

	  }, {
	    key: 'title',
	    get: function get() {
	      return this._title;
	    }

	    /**
	     * Set tab title
	     *
	     * @param {string} value The tab title
	     */
	    ,
	    set: function set(value) {
	      if (this._title !== value) {
	        this._title = value;
	        this.setAttribute('title', value);
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

	(function () {
	  document.registerElement('pf-tab', PfTab);
	})();

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfPanelTemplate = "\n<div role=\"tabpanel\"></div>\n";
	exports.default = PfPanelTemplate;

/***/ }
/******/ ]);