'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordionTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionBody = require('pf-accordion-body.component');

var _pfAccordionBody2 = _interopRequireDefault(_pfAccordionBody);

var _pfUtils = require('pf-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
 *
 * @prop {boolean} open indicates if accordion is expanded
 */
var PfAccordionTemplate = exports.PfAccordionTemplate = function (_HTMLElement) {
  _inherits(PfAccordionTemplate, _HTMLElement);

  _createClass(PfAccordionTemplate, [{
    key: 'connectedCallback',


    /**
     * Called when an instance was inserted into the document
     */
    value: function connectedCallback() {
      this.classList.add('panel-collapse');
      this.classList.add('collapse');
      this.setAttribute('role', 'tabpanel');

      this.addEventListener('transitionend', this._handleTransitionEnd);

      if (this.hasAttribute('open')) {
        this.classList.add('in');
      } else if (this.classList.contains('in')) {
        this.setAttribute('open', '');
      } else {
        this.style.height = 0;
      }

      this._initialized = true;
      this.dispatchEvent(new Event('pf-accordion.initialized'));
    }

    /**
     * Called when an instance of the element is created
     */

  }], [{
    key: 'observedAttributes',


    /**
     * Returns a list of attributes on which we are interested to track changes
     * @returns {String[]}
     */
    get: function get() {
      return ['open'];
    }
  }]);

  function PfAccordionTemplate() {
    _classCallCheck(this, PfAccordionTemplate);

    var _this = _possibleConstructorReturn(this, (PfAccordionTemplate.__proto__ || Object.getPrototypeOf(PfAccordionTemplate)).call(this));

    _this._initialized = false;
    return _this;
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */


  _createClass(PfAccordionTemplate, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if ('open' === attrName) {
        if (this.hasAttribute('open')) {
          this._expand();
        } else {
          this._collapse();
        }
      }
    }

    /**
     * Make the panel visible
     */

  }, {
    key: '_expand',
    value: function _expand() {
      this._transitioning = true;
      this._action = 'expanding';

      this.dispatchEvent(new CustomEvent('pf-accordion.expanding', {
        bubbles: true,
        cancelable: false
      }));
      this.classList.remove('collapse');
      this.classList.add('collapsing');

      this.style.height = _pfUtils.pfUtil.getMaxHeight(this) + 'px';
    }

    /**
     * Hide the panel
     */

  }, {
    key: '_collapse',
    value: function _collapse() {
      var _this2 = this;

      this._transitioning = true;
      this._action = 'collapsing';

      this.dispatchEvent(new CustomEvent('pf-accordion.collapsing', {
        bubbles: true,
        cancelable: false
      }));
      var maxHeight = _pfUtils.pfUtil.getMaxHeight(this);
      this.classList.remove('collapse');
      this.classList.add('collapsing');
      this.style.height = maxHeight + 'px';

      setTimeout(function () {
        _this2.style.height = '0px';
      }, 10);
    }

    /**
     * Toggle the visiblity of the panel
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      this.open = !this.open;
    }

    /**
     * Handles the transitionend event.
     * @private
     */

  }, {
    key: '_handleTransitionEnd',
    value: function _handleTransitionEnd() {

      this.classList.remove('collapsing');
      this.classList.add('collapse');
      if ('expanding' === this._action) {
        this.classList.add('in');
        this.style.height = '';
        this.setAttribute('aria-expanded', 'true');
        this.dispatchEvent(new CustomEvent('pf-accordion.expanded', {
          bubbles: true
        }));
      } else {
        this.setAttribute('aria-expanded', 'false');
        this.dispatchEvent(new CustomEvent('pf-accordion.collapsed', {
          bubbles: true
        }));
      }

      this._transitioning = false;
      this._action = null;
    }

    /**
     * Get the display state of the panel
     *
     * @returns {string} the display state, either 'shown' or 'hidden'
     */

  }, {
    key: 'open',
    get: function get() {
      return this.hasAttribute('open');
    }

    /**
     * Set the display state of the panel
     *
     * @param {string} value the display state, either 'shown' or 'hidden'
     */
    ,
    set: function set(value) {
      if (value) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
    }
  }]);

  return PfAccordionTemplate;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-template', PfAccordionTemplate);
})();