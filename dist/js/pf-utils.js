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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** PF Utils **/
	__webpack_require__(15);

/***/ },

/***/ 15:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * PfUtils JS Helper
	 * Common js helper methods used in Patternfly Web Components
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
	var i18n = exports.i18n = new I18nUtil();

/***/ }

/******/ });