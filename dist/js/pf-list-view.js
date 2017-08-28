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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfListView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfListViewTemplate = __webpack_require__(31);

var _pfListViewTemplate2 = _interopRequireDefault(_pfListViewTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var forEach = Array.prototype.forEach;

/**
 * <b>&lt;pf-list-view&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-list-view id="example1" show-checkboxes="true">
 *  <pf-template-repeater id="example1-content" content='[{"name": "Big Bird", "address": "1 Seaseme Street"}]'>
 *    <pf-template>
 *      <div class="list-view-pf-description">
 *        <div class="list-group-item-heading">
 *          ${name}
 *        </div>
 *        <div class="list-group-item-text">
 *          ${address}
 *        </div>
 *      </div>
 *    </pf-template>
 *  </pf-template-repeater>
 * </pf-list-view>
 *
 * @prop {string} show-checkboxes whether to show list-view checkboxes
 */

var PfListView = exports.PfListView = function (_HTMLElement) {
  _inherits(PfListView, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfListView() {
    _classCallCheck(this, PfListView);

    // Listen for when the child template-repeater updates it's content
    // ie. repeates the user defined template and replaces $(name) with actual values
    var _this = _possibleConstructorReturn(this, (PfListView.__proto__ || Object.getPrototypeOf(PfListView)).call(this));

    _this.addEventListener("pf-template-repeater.ContentChanged", function (e) {
      this.handleRepeaterContentChanged();
    });
    return _this;
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */


  _createClass(PfListView, [{
    key: 'attributeChangedCallback',


    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
      this.showHideCheckboxes();
    }

    /**
     * Called when repeater content changes (updates content)
     */

  }, {
    key: 'handleRepeaterContentChanged',
    value: function handleRepeaterContentChanged() {
      this.updateComponent();
      this.updateCheckboxes();
      this.updateActionButtons();
    }

    /**
     * This method updates the overall list view and each repeated row/item in the list.
     * @example {@lang xml}
     *  <pf-list-view>
     *    <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...'
     *      <pf-template>
     *        <div class="list-view-pf-description">
     *          <div class="list-group-item-heading">
     *            ${name}
     *          ...
     */

  }, {
    key: 'updateComponent',
    value: function updateComponent() {

      this._template = document.createElement('template');
      this._template.innerHTML = _pfListViewTemplate2.default;

      // get repeated templates
      var repeatedTemplates = this.querySelectorAll('pf-template');

      for (var i = 0; i < repeatedTemplates.length; i++) {
        var template = repeatedTemplates[i];

        var itemRowTemplate = document.createElement('template');
        itemRowTemplate.innerHTML = _pfListViewTemplate.itemRow;

        // Where the transclude happens
        itemRowTemplate.content.querySelector('.list-view-pf-main-info').innerHTML = template.innerHTML;

        this._template.content.querySelector('.list-view-pf').appendChild(itemRowTemplate.content);
      }

      this.innerHTML = this._template.innerHTML;

      /**
       * This method updated the component to:
       * Ie.
       *  <pf-list-view>
       *    <div class="list-group list-view-pf" >
       *      <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...
       *        <pf-template>
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
          btn.actionType = button.actionType;
          btn.itemId = header.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
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
      var actionType = e.currentTarget.actionType;
      var itemId = e.currentTarget.itemId;

      var event = new CustomEvent('pf-list-view.ItemActionInitiated', { "actionType": actionType, "itemId": itemId });
      event.initCustomEvent('pf-list-view.ItemActionInitiated', true, true, { "actionType": actionType, "itemId": itemId });
      this.dispatchEvent(event);
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
          var itemId = checkbox.parentNode.parentNode.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
          checkbox.value = itemId;
          // there can only be one
          checkbox.removeEventListener("pf-list-view.change", handleCheckboxChange);
          checkbox.addEventListener("pf-list-view.change", handleCheckboxChange);
        }
      }

      function handleCheckboxChange(e) {
        // TODO: keep track of selected items/rows, for now just output
        var checkbox = e.currentTarget;
        // TODO: this seems very fragile, what if HTML hierarchy changes?  Need better way.
        checkbox.parentNode.parentNode.parentNode.classList.toggle('active');

        var msg = (checkbox.checked ? "Selected: " : "Unselected: ") + checkbox.value;
        var event = new CustomEvent('pf-list-view.RowSelectionChanged', { "value": msg });
        event.initCustomEvent('pf-list-view.RowSelectionChanged', true, true, { "value": msg });
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
  }, {
    key: 'observedAttributes',
    get: function get() {
      return ['show-checkboxes'];
    }
  }]);

  return PfListView;
}(HTMLElement);

window.customElements.define('pf-list-view', PfListView);

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pfListViewDefault = "\n<div class=\"list-group list-view-pf\">\n</div>";

var pfListItem = "\n<div class=\"list-group-item\">\n  <div class=\"list-group-item-header\">\n    <div class=\"list-view-pf-checkbox\">\n      <input type=\"checkbox\">\n    </div>\n    <div class=\"list-view-pf-main-info\">\n    </div>\n  </div>\n</div>\n";

exports.default = pfListViewDefault;
exports.itemRow = pfListItem;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PfListView Component **/
__webpack_require__(30);

/***/ })

/******/ });