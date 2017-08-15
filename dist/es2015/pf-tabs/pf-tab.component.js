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
 * <b>&lt;pf-tab&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs>
 *  <pf-tab tab-title="Tab1" active="true">
 *    <p>Tab1 content here</p>
 *  </pf-tab>
 *  <pf-tab tab-title="Tab2">
 *    <p>Tab2 content here</p>
 *  </pf-tab>
 * </pf-tabs>
 *
 * @prop {string} tab-title the tab title
 * @prop {string} active if attribute exists, tab will be active
 */
var PfTab = exports.PfTab = function (_HTMLElement) {
  _inherits(PfTab, _HTMLElement);

  _createClass(PfTab, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this._tabTitle = this.getAttribute('tab-title');

      this.appendChild(this._template.content);
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
      var parent = this.parentNode;
      if (attrName === 'tab-title' && parent && parent.handleTitle) {
        parent.handleTitle(this, newValue);
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['tab-title'];
    }
  }]);

  function PfTab() {
    _classCallCheck(this, PfTab);

    var _this = _possibleConstructorReturn(this, (PfTab.__proto__ || Object.getPrototypeOf(PfTab)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _panel2.default;
    return _this;
  }

  /**
   * Get tab-title
   *
   * @returns {string} The tab-title
   */


  _createClass(PfTab, [{
    key: 'tabTitle',
    get: function get() {
      return this._tabTitle;
    }

    /**
     * Set tab tab-title
     *
     * @param {string} value The tab tab-title
     */
    ,
    set: function set(value) {
      if (this._tabTitle !== value) {
        this._tabTitle = value;
        this.setAttribute('tab-title', value);
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

window.customElements.define('pf-tab', PfTab);