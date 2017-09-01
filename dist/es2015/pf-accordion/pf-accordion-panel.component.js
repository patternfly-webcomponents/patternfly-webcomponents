'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordionPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionHeading = require('pf-accordion-heading.component');

var _pfAccordionHeading2 = _interopRequireDefault(_pfAccordionHeading);

var _pfAccordionTemplate = require('pf-accordion-template.component');

var _pfAccordionTemplate2 = _interopRequireDefault(_pfAccordionTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 */
var PfAccordionPanel = exports.PfAccordionPanel = function (_HTMLElement) {
  _inherits(PfAccordionPanel, _HTMLElement);

  /**
   * Called when an instance of the element is created
   */
  function PfAccordionPanel() {
    _classCallCheck(this, PfAccordionPanel);

    var _this = _possibleConstructorReturn(this, (PfAccordionPanel.__proto__ || Object.getPrototypeOf(PfAccordionPanel)).call(this));

    _this._initDefaults();
    return _this;
  }

  /**
   * Called when an instance of the element was inserted into the document
   */


  _createClass(PfAccordionPanel, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._setClasses();
    }

    /**
     * Returns a list of attributes on which we are interested to track changes
     * @returns {String[]}
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
      if ('class' === attrName) {
        this._setClasses();
      }
    }

    /**
     * Sets default constants
     * @private
     */

  }, {
    key: '_initDefaults',
    value: function _initDefaults() {
      this._classes = {
        'context': {
          'classes': ['panel-default', 'panel-info', 'panel-success', 'panel-primary', 'panel-warning', 'panel-danger'],
          'default': 'panel-default'
        }
      };
    }

    /**
     * Sets default classes on the component
     * @private
     */

  }, {
    key: '_setClasses',
    value: function _setClasses() {
      var _this2 = this;

      // add default class for this component
      if (!this.classList.contains('panel')) {
        this.classList.add('panel');
      }

      var hasClass = false;
      this._classes.context.classes.forEach(function (clazz) {
        hasClass = hasClass || _this2.classList.contains(clazz);
      });

      if (!hasClass) {
        this.classList.add(this._classes.context.default);
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['class'];
    }
  }]);

  return PfAccordionPanel;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-panel', PfAccordionPanel);
})();