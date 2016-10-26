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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfAlert = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfAlertTmpl = __webpack_require__(2);

	var _pfAlertTmpl2 = _interopRequireDefault(_pfAlertTmpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// PfAlert Element
	var PfAlert = exports.PfAlert = function (_HTMLElement) {
	  _inherits(PfAlert, _HTMLElement);

	  function PfAlert() {
	    _classCallCheck(this, PfAlert);

	    return _possibleConstructorReturn(this, (PfAlert.__proto__ || Object.getPrototypeOf(PfAlert)).apply(this, arguments));
	  }

	  _createClass(PfAlert, [{
	    key: "attachedCallback",

	    // Fires when an instance was inserted into the document.
	    value: function attachedCallback() {
	      switch (this.getAttribute("type")) {
	        case "danger":
	          this.className = "alert alert-danger";
	          this._template = _pfAlertTmpl2.default.danger;
	          break;
	        case "info":
	          this.className = "alert alert-info";
	          this._template = _pfAlertTmpl2.default.info;
	          break;
	        case "success":
	          this.className = "alert alert-success";
	          this._template = _pfAlertTmpl2.default.success;
	          break;
	        case "warning":
	          this.className = "alert alert-warning";
	          this._template = _pfAlertTmpl2.default.warning;
	          break;
	      }
	      this.innerHTML = this._template + this.innerHTML;
	    }
	  }, {
	    key: "createdCallback",


	    // Fires when an instance of the element is created.
	    value: function createdCallback() {
	      this._template = _pfAlertTmpl2.default.warning;
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// PfAlert Templates
	var PfAlertTmpl = {
	  danger: '<pf-icon type="danger"></pf-icon>',
	  info: '<pf-icon type="info"></pf-icon>',
	  success: '<pf-icon type="success"></pf-icon>',
	  warning: '<pf-icon type="warning"></pf-icon>'
	};
	exports.default = PfAlertTmpl;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfIcon = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfIconTmpl = __webpack_require__(4);

	var _pfIconTmpl2 = _interopRequireDefault(_pfIconTmpl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// PfIcon Element
	var PfIcon = exports.PfIcon = function (_HTMLElement) {
	  _inherits(PfIcon, _HTMLElement);

	  function PfIcon() {
	    _classCallCheck(this, PfIcon);

	    return _possibleConstructorReturn(this, (PfIcon.__proto__ || Object.getPrototypeOf(PfIcon)).apply(this, arguments));
	  }

	  _createClass(PfIcon, [{
	    key: "attachedCallback",

	    // Fires when an instance was inserted into the document.
	    value: function attachedCallback() {
	      switch (this.getAttribute("type")) {
	        case "danger":
	          this._template = _pfIconTmpl2.default.danger;break;
	        case "info":
	          this._template = _pfIconTmpl2.default.info;break;
	        case "success":
	          this._template = _pfIconTmpl2.default.success;break;
	        case "warning":
	          this._template = _pfIconTmpl2.default.warning;break;
	      }
	      this.innerHTML = this._template;
	    }
	  }, {
	    key: "createdCallback",


	    // Fires when an instance of the element is created.
	    value: function createdCallback() {
	      this._template = _pfIconTmpl2.default.warning;
	    }
	  }]);

	  return PfIcon;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-icon', PfIcon);
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// PfIcon Templates
	var PfIconTmpl = {
	  danger: '<span class="pficon pficon-error-circle-o"></span>',
	  info: '<span class="pficon pficon-info"></span>',
	  success: '<span class="pficon pficon-ok"></span>',
	  warning: '<span class="pficon pficon-warning-triangle-o"></span>'
	};
	exports.default = PfIconTmpl;

/***/ }
/******/ ]);