'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfTab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panel = require('panel.template');

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