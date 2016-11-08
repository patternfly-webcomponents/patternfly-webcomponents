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
	__webpack_require__(1);

	/** PfListView Component **/
	__webpack_require__(4);

	/** PfTemplateRepeaterComponent **/
	__webpack_require__(6);

	/** PF Tabs Component **/
	__webpack_require__(7);

	/** PF Utilization Bar Chart **/
	__webpack_require__(12);

	/** PF Utils **/
	__webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfAlert = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfAlert = __webpack_require__(2);

	var _pfAlert2 = _interopRequireDefault(_pfAlert);

	var _pfUtils = __webpack_require__(3);

	var _pfUtils2 = _interopRequireDefault(_pfUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * PfAlert element for Patternfly web components
	 *
	 * ToDo: Document attrbutes and examples.
	 */
	var PfAlert = exports.PfAlert = function (_HTMLElement) {
	  _inherits(PfAlert, _HTMLElement);

	  function PfAlert() {
	    _classCallCheck(this, PfAlert);

	    return _possibleConstructorReturn(this, (PfAlert.__proto__ || Object.getPrototypeOf(PfAlert)).apply(this, arguments));
	  }

	  _createClass(PfAlert, [{
	    key: 'attachedCallback',

	    /**
	     * Called when an instance was inserted into the document
	     */
	    value: function attachedCallback() {
	      this.insertBefore(this._template.content, this.firstChild);
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
	      if (attrName === "type") {
	        this._resetType(oldValue, newValue);
	        this._initType();
	      } else if (attrName === "persistent" || attrName === "persistent-callback-fn") {
	        this._initPersistent();
	      }
	    }

	    /**
	     * Called when an instance of the element is created
	     */

	  }, {
	    key: 'createdCallback',
	    value: function createdCallback() {
	      this._template = document.createElement('template');
	      this._template.innerHTML = _pfAlert2.default;
	      this.classList.add("alert");
	      this._initDefaults();
	      this._initPersistent();
	      this._initType();
	    }

	    /**
	     * Helper function to init defaults
	     * @private
	     */

	  }, {
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

	(function () {
	  document.registerElement('pf-alert', PfAlert);
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfAlertTemplate = "\n<button type=\"button\" class=\"close hidden\" data-dismiss=\"alert\" aria-hidden=\"true\">\n  <span class=\"pficon pficon-close\"></span>\n</button>\n<span class=\"pficon\"></span>\n";
	exports.default = PfAlertTemplate;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfUtils = {
	  // ToDo: Add utils here
	};
	exports.default = PfUtils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfListView = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfListViewTemplate = __webpack_require__(5);

	var _pfListViewTemplate2 = _interopRequireDefault(_pfListViewTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var forEach = Array.prototype.forEach;

	var PfListView = exports.PfListView = function (_HTMLElement) {
	  _inherits(PfListView, _HTMLElement);

	  function PfListView() {
	    _classCallCheck(this, PfListView);

	    return _possibleConstructorReturn(this, (PfListView.__proto__ || Object.getPrototypeOf(PfListView)).apply(this, arguments));
	  }

	  _createClass(PfListView, [{
	    key: 'createdCallback',
	    value: function createdCallback() {
	      /**
	       * This method updates the raw user defined template before the template-repeater processes it.
	       * Ie.
	       *  <pf-list-view>
	       *    <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...
	         *      <template>
	         *        <div class="list-view-pf-description">
	         *          <div class="list-group-item-heading">
	         *            ${name}
	         *          ...
	         */
	      this._template = document.createElement('template');
	      this._template.innerHTML = _pfListViewTemplate2.default;

	      var itemRowTemplate = document.createElement('template');
	      itemRowTemplate.innerHTML = _pfListViewTemplate.itemRow;

	      // get user defined template-repeater's template
	      var transcludeTemplate = this.querySelector('template');

	      // add all children of transcludeTemplate to itemRowTemplate (wraps them)
	      itemRowTemplate.content.querySelector('.list-view-pf-main-info').innerHTML = transcludeTemplate.innerHTML;

	      // add checkbox
	      var header = itemRowTemplate.content.querySelector('.list-group-item-header');
	      header.innerHTML = _pfListViewTemplate.pfCheckbox + header.innerHTML;

	      // Update the template-repeater's template in the DOM to that of the itemRowTemplate
	      transcludeTemplate.innerHTML = itemRowTemplate.innerHTML;

	      // wrap all in default template
	      this._template.content.querySelector('.list-view-pf').innerHTML = this.innerHTML;

	      // Listen for when the child template-repeater updates it's content
	      // ie. repeates the user defined template and replaces $(name) with actual values
	      this.addEventListener("RepeaterContentChanged", function (e) {
	        this.handleRepeaterContentChanged();
	      });

	      /**
	       * This method updated the user defined template to:
	       * Ie.
	       *  <pf-list-view>
	       *    <div class="list-group list-view-pf" >
	       *      <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...
	         *        <template>
	         *          <div class="list-group-item">
	         *            <div class="list-group-item-header">
	         *              <div class="list-view-pf-checkbox">
	         *                <input type="checkbox">
	         *              </div>
	         *              <div class="list-view-pf-main-info">
	         *                <div class="list-view-pf-description">
	         *                  ${name}
	         *                ...
	         *
	         */
	    }
	  }, {
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      this.innerHTML = this._template.innerHTML;
	    }
	  }, {
	    key: 'attributeChangedCallback',
	    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
	      if (attributeName === 'show-checkboxes') {
	        this.showHideCheckboxes();
	      }
	    }
	  }, {
	    key: 'handleRepeaterContentChanged',
	    value: function handleRepeaterContentChanged() {
	      this.updateCheckboxes();
	      this.updateActionButtons();
	    }
	  }, {
	    key: 'updateCheckboxes',
	    value: function updateCheckboxes() {
	      this.showHideCheckboxes();
	      this.listenForCheckboxChanges();
	    }
	  }, {
	    key: 'updateActionButtons',
	    value: function updateActionButtons() {
	      var _this2 = this;

	      var actionButtons = PfListView.fromJson(this.getAttribute("action-buttons"));
	      // Get the headers of each row
	      var headers = this.querySelectorAll('.list-group-item-header');

	      // wish forEach worked with NodeLists :-(

	      var _loop = function _loop(i) {
	        var header = headers[i];
	        var actions = document.createElement('div');
	        actions.classList = "list-view-pf-actions";
	        actionButtons.forEach(function (button) {
	          var btn = document.createElement('button');
	          btn.innerHTML = button.name;
	          btn.classList = "btn btn-default" + (button.class ? " " + button.class : "");
	          btn.title = button.title;
	          btn.actionFn = button.actionFn;
	          btn.rowInnerText = header.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
	          // btn.onclick = this.handleActionButtonClick;   <-- why can't I get this way to work?!
	          btn.addEventListener("click", this.handleActionButtonClick);
	          actions.appendChild(btn);
	        }, _this2);

	        var refNode = header.querySelector('.list-view-pf-checkbox');
	        header.insertBefore(actions, refNode);
	      };

	      for (var i = 0; i < headers.length; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: 'handleActionButtonClick',
	    value: function handleActionButtonClick(e) {
	      var funcStr = e.currentTarget.actionFn;
	      var funcParam = e.currentTarget.rowInnerText;
	      // TODO: There are pros & cons to using eval, we'll need to reevaluate
	      eval('(' + funcStr + ')("' + funcParam + '")');
	    }
	  }, {
	    key: 'showHideCheckboxes',
	    value: function showHideCheckboxes() {
	      var showCheckboxes = this.getAttribute("show-checkboxes");
	      var checkboxes = this.querySelectorAll('input[type="checkbox"]');
	      for (var i = 0; i < checkboxes.length; i++) {
	        var checkbox = checkboxes[i];
	        if (showCheckboxes === undefined || showCheckboxes === 'true') {
	          checkbox.parentNode.style.display = "";
	        } else {
	          checkbox.parentNode.style.display = "none";
	        }
	      }
	    }
	  }, {
	    key: 'listenForCheckboxChanges',
	    value: function listenForCheckboxChanges() {
	      var showCheckboxes = this.getAttribute("show-checkboxes");
	      if (showCheckboxes === undefined || showCheckboxes === 'true') {
	        var checkboxes = this.querySelectorAll('input[type="checkbox"]');
	        for (var i = 0; i < checkboxes.length; i++) {
	          var checkbox = checkboxes[i];
	          // TODO: kind of hacky, need a better way to do this
	          var rowInnerText = checkbox.parentNode.parentNode.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
	          checkbox.value = rowInnerText;
	          // there can only be one
	          checkbox.removeEventListener("change", handleCheckboxChange);
	          checkbox.addEventListener("change", handleCheckboxChange);
	        }
	      }

	      function handleCheckboxChange(e) {
	        // TODO: keep track of selected items/rows, for now just output
	        var checkbox = e.currentTarget;
	        // TODO: this seems very fragile, what if HTML hierarchy changes?  Need better way.
	        checkbox.parentNode.parentNode.parentNode.classList.toggle('active');

	        var msg = (checkbox.checked ? "Selected: " : "Unselected: ") + checkbox.value;
	        var event = new CustomEvent('RowSelectionChanged', { "value": msg });
	        event.initCustomEvent('RowSelectionChanged', true, true, { "value": msg });
	        this.dispatchEvent(event);
	      }
	    }
	  }], [{
	    key: 'fromJson',
	    value: function fromJson(str) {
	      var obj = [];
	      if (typeof str === "string") {
	        try {
	          obj = JSON.parse(str);
	        } catch (e) {
	          // throw new Error("Invalid JSON string provided. ");
	        }
	      }
	      return obj;
	    }
	  }]);

	  return PfListView;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-list-view', PfListView);
	})();

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pfListViewDefault = "\n<div class=\"list-group list-view-pf\">\n</div>";

	var pfListItem = "\n<div class=\"list-group-item\">\n  <div class=\"list-group-item-header\">\n    <div class=\"list-view-pf-main-info\">\n    </div>\n  </div>\n</div>\n";

	var pfCheckbox = "\n<div class=\"list-view-pf-checkbox\">\n  <input type=\"checkbox\">\n</div>\n";
	exports.default = pfListViewDefault;
	exports.itemRow = pfListItem;
	exports.pfCheckbox = pfCheckbox;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * This is a fork of a repeater: github.com/Nevraeka/template-repeater
	 */

	var PFTemplateRepeater = function (_HTMLElement) {
	  _inherits(PFTemplateRepeater, _HTMLElement);

	  function PFTemplateRepeater() {
	    _classCallCheck(this, PFTemplateRepeater);

	    return _possibleConstructorReturn(this, (PFTemplateRepeater.__proto__ || Object.getPrototypeOf(PFTemplateRepeater)).apply(this, arguments));
	  }

	  _createClass(PFTemplateRepeater, [{
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      this.template = this.querySelector('template');
	      this.render(this.getAttribute('content'));
	    }
	  }, {
	    key: 'render',
	    value: function render(val) {
	      var renderError = "Content should be an Array of objects.";
	      var template = this.template;
	      var content = PFTemplateRepeater.fromJson(val);
	      this.innerHTML = (Array.isArray(content) ? content.map(andApplyTemplate) : new Error(renderError).message).join('');

	      function andApplyTemplate(item) {
	        return PFTemplateRepeater.interpolate(template.cloneNode(true), item);
	      }

	      // dispatch a 'repeater content changed' event
	      var event = new CustomEvent('RepeaterContentChanged', {});
	      event.initCustomEvent('RepeaterContentChanged', true, true, {});
	      this.dispatchEvent(event);

	      return this.innerHTML;
	    }
	  }, {
	    key: 'attributeChangedCallback',
	    value: function attributeChangedCallback(name, oldVal, newVal) {
	      if (name === "content" && typeof newVal === 'string') {
	        this.render(newVal);
	      }
	    }
	  }], [{
	    key: 'interpolate',
	    value: function interpolate(template, content) {
	      var contentArr = Object.keys(content);
	      var updatedHTML = "";

	      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === "object") {
	        var andIterateOverData = function andIterateOverData(item) {
	          template.innerHTML = template.innerHTML.replace("${" + item + "}", content[item]);
	        };

	        contentArr.forEach(andIterateOverData);

	        updatedHTML += template.innerHTML;
	      }

	      return updatedHTML;
	    }
	  }, {
	    key: 'fromJson',
	    value: function fromJson(str) {
	      var obj = [];
	      if (typeof str === "string") {
	        try {
	          obj = JSON.parse(str);
	        } catch (e) {
	          // throw new Error("Invalid JSON string provided. ");
	        }
	      }
	      return obj;
	    }
	  }]);

	  return PFTemplateRepeater;
	}(HTMLElement);

	document.registerElement("pf-template-repeater", PFTemplateRepeater);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfTabs = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfTab = __webpack_require__(8);

	var _pfTab2 = _interopRequireDefault(_pfTab);

	var _pfTabs = __webpack_require__(9);

	var _pfTabs2 = _interopRequireDefault(_pfTabs);

	var _pfTab3 = __webpack_require__(10);

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
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfTabTemplate = "\n<li role=\"presentation\">\n  <a href=\"#\" role=\"tab\" data-toggle=\"tab\"></a>\n</li>\n";
	exports.default = PfTabTemplate;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfTabsTemplate = "\n<ul role=\"tablist\"></ul>\n";
	exports.default = PfTabsTemplate;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfTab = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _panel = __webpack_require__(11);

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
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PfPanelTemplate = "\n<div role=\"tabpanel\"></div>\n";
	exports.default = PfPanelTemplate;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfUtilizationBarChart = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfUtilizationBarChartDefault = __webpack_require__(13);

	var _pfUtilizationBarChartDefault2 = _interopRequireDefault(_pfUtilizationBarChartDefault);

	var _pfUtilizationBarChartInline = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PfUtilizationBarChart = exports.PfUtilizationBarChart = function (_HTMLElement) {
	  _inherits(PfUtilizationBarChart, _HTMLElement);

	  function PfUtilizationBarChart() {
	    _classCallCheck(this, PfUtilizationBarChart);

	    return _possibleConstructorReturn(this, (PfUtilizationBarChart.__proto__ || Object.getPrototypeOf(PfUtilizationBarChart)).apply(this, arguments));
	  }

	  _createClass(PfUtilizationBarChart, [{
	    key: 'createdCallback',
	    value: function createdCallback() {
	      this._lastThresholdClass;
	      this._layout;
	    }
	  }, {
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      this._layout = this.getAttribute('layout');
	      if (this._layout && this._layout === 'inline') {
	        this.innerHTML = _pfUtilizationBarChartInline.inline;
	      } else {
	        this.innerHTML = _pfUtilizationBarChartDefault2.default;
	      }
	      this.updateChart();
	    }
	  }, {
	    key: 'attributeChangedCallback',
	    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
	      this.updateChart();
	    }
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
	          var event = new CustomEvent('thresholdSet', { 'id': this.getAttribute('id'), 'threshold': thresholdClass });
	          event.initCustomEvent('thresholdSet', true, true, { 'id': this.getAttribute('id'), 'threshold': thresholdClass });
	          usedBar.classList.remove(this._lastThresholdClass);
	          usedBar.classList.add(thresholdClass);
	          this._lastThresholdClass = thresholdClass;
	          usedBar.dispatchEvent(event);
	        }
	      }
	    }
	  }]);

	  return PfUtilizationBarChart;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-utilization-bar-chart', PfUtilizationBarChart);
	})();

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pfUtilzBarChartDefault = "\n  <div class=\"utilization-bar-chart-pf\">\n    <div class=\"progress-description\"></div>\n    <div class=\"progress progress-label-top-right\">\n      <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-used\">\n          <span><strong class=\"utiliz-bar-strong-label\"></strong> Used</span>\n        </div>\n        <div class=\"progress-bar progress-bar-remaining\"></div>\n      </div>\n    </div>\n  </div>\n";
	exports.default = pfUtilzBarChartDefault;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pfUtilzBarChartInline = "\n  <div class=\"progress-container progress-description-left progress-label-right\">\n    <div class=\"progress-description\"></div>\n    <div class=\"progress\">\n      <div class=\"progress-bar progress-bar-used\">\n        <span><strong class=\"utiliz-bar-strong-label\"></strong> Used</span>\n      </div>\n      <div class=\"progress-bar progress-bar-remaining\"></div>\n    </div>\n  </div>\n";
	exports.inline = pfUtilzBarChartInline;

/***/ }
/******/ ]);