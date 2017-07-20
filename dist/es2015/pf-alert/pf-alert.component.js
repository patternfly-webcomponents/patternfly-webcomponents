'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAlert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAlert = require('pf-alert.template');

var _pfAlert2 = _interopRequireDefault(_pfAlert);

var _pfUtils = require('pf-utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-alert&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-alert type="danger" persistent="true" persistentCallbackFn="alert('Danger alert closed');"></pf-alert>
 *
 * @prop {string} type danger, warning, success, info
 * @prop {string} persistant true, false
 * @prop {function} persistent-callback-fn
 */
var PfAlert = exports.PfAlert = function (_HTMLElement) {
  _inherits(PfAlert, _HTMLElement);

  _createClass(PfAlert, [{
    key: 'connectedCallback',

    /*
     * Called every time the element is inserted into the DOM
     */
    value: function connectedCallback() {
      this.classList.add("alert");
      this.insertBefore(this._template.content, this.firstChild);
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
      if (attrName === "type") {
        this._resetType(oldValue, newValue);
        this._initType();
      } else if (attrName === "persistent" || attrName === "persistent-callback-fn") {
        this._initPersistent();
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['type', 'persistent', 'persistent-callback-fn'];
    }
  }]);

  function PfAlert() {
    _classCallCheck(this, PfAlert);

    var _this = _possibleConstructorReturn(this, (PfAlert.__proto__ || Object.getPrototypeOf(PfAlert)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _pfAlert2.default;
    _this._initDefaults();
    _this._initPersistent();
    _this._initType();
    return _this;
  }

  /**
   * Helper function to init defaults
   * @private
   */


  _createClass(PfAlert, [{
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

window.customElements.define('pf-alert', PfAlert);