'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = require('pf-utils.js');

var _pfNotificationDrawerHeader = require('pf-notification-drawer-header.template');

var _pfNotificationDrawerHeader2 = _interopRequireDefault(_pfNotificationDrawerHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-header&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-header>
 *   <a class="drawer-pf-toggle-expand"></a>
 *   <a class="drawer-pf-close"></a>
 *   <h3>Notifications Drawer</h3>
 * </pf-notification-drawer-header>
 */

var PfNotificationDrawerHeader = exports.PfNotificationDrawerHeader = function (_HTMLElement) {
  _inherits(PfNotificationDrawerHeader, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerHeader() {
    _classCallCheck(this, PfNotificationDrawerHeader);

    return _possibleConstructorReturn(this, (PfNotificationDrawerHeader.__proto__ || Object.getPrototypeOf(PfNotificationDrawerHeader)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerHeader, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.className = 'drawer-pf-title';

      this._template = document.createElement('template');
      this._template.innerHTML = _pfNotificationDrawerHeader2.default;
      this.appendChild(this._template.content);

      if (this.drawerTitle) {
        this._updateDrawerTitle(this.drawerTitle);
      }
      this.querySelector('.drawer-pf-toggle-expand').addEventListener('click', this._toggleDrawer.bind(this), false);
      this.querySelector('.drawer-pf-close').addEventListener('click', this._hideDrawer.bind(this), false);
    }

    /*
     * update title for notification-drawer
     *
     * @private
     */

  }, {
    key: '_updateDrawerTitle',
    value: function _updateDrawerTitle(val) {
      var title = this.querySelector('h3');
      if (title) {
        title.innerHTML = val;
      }
    }

    /*
     * toggle the drawer between the narrow and wide modes
     *
     * @private
     */

  }, {
    key: '_toggleDrawer',
    value: function _toggleDrawer(e) {
      var drawer = this.parentNode;
      if (_pfUtils.pfUtil.hasClass(drawer, 'drawer-pf-expanded')) {
        _pfUtils.pfUtil.removeClass(drawer, 'drawer-pf-expanded');
      } else {
        _pfUtils.pfUtil.addClass(drawer, 'drawer-pf-expanded');
      }
    }

    /*
     * hide the drawer
     *
     * @private
     */

  }, {
    key: '_hideDrawer',
    value: function _hideDrawer(e) {
      _pfUtils.pfUtil.addClass(this.parentNode, 'hide');
    }

    /*
     * Get modalTitle
     *
     * @returns {string} The modal title
     */

  }, {
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'drawertitle') {
        this._updateDrawerTitle(newValue ? newValue : '&nbsp;');
      }
    }
  }, {
    key: 'drawerTitle',
    get: function get() {
      return this.getAttribute('drawerTitle');
    }

    /*
     * Set modalTitle
     *
     * @param {string} val Modal title
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('drawerTitle', val);
      } else {
        this.removeAttribute('drawerTitle');
      }
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['drawertitle'];
    }
  }]);

  return PfNotificationDrawerHeader;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-header', PfNotificationDrawerHeader);