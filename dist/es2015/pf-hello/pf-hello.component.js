'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfHello = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfHello = require('pf-hello.template');

var _pfHello2 = _interopRequireDefault(_pfHello);

var _i18nUtils = require('i18n-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-hello&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-hello></pf-hello>
 */
var PfHello = exports.PfHello = function (_HTMLElement) {
  _inherits(PfHello, _HTMLElement);

  function PfHello() {
    _classCallCheck(this, PfHello);

    return _possibleConstructorReturn(this, (PfHello.__proto__ || Object.getPrototypeOf(PfHello)).apply(this, arguments));
  }

  _createClass(PfHello, [{
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
      if (attrName === "text") {
        this.refresh();
      }
    }

    /**
     * Called when an instance of the element is created
     */

  }, {
    key: 'createdCallback',
    value: function createdCallback() {
      this._template = document.createElement('template');
      this._template.innerHTML = _pfHello2.default;
      this.refresh();
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

    /**
     * Helper function to init text
     * @private
     */

  }, {
    key: 'refresh',
    value: function refresh() {
      var nodes = this._getNodes('span');
      var el = nodes[nodes.length - 1];
      el.innerHTML = _i18nUtils.i18n.gettext("Hello World!");
    }
  }]);

  return PfHello;
}(HTMLElement);

(function () {
  document.registerElement('pf-hello', PfHello);
})();