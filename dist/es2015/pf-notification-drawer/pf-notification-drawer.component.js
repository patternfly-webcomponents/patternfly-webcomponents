'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = require('pf-utils.js');

var _pfNotificationDrawerHeader = require('pf-notification-drawer-header.component');

var _pfNotificationDrawerHeader2 = _interopRequireDefault(_pfNotificationDrawerHeader);

var _pfNotificationDrawerAccordion = require('pf-notification-drawer-accordion.component');

var _pfNotificationDrawerAccordion2 = _interopRequireDefault(_pfNotificationDrawerAccordion);

var _pfNotificationDrawerAccordionPanel = require('pf-notification-drawer-accordion-panel.component');

var _pfNotificationDrawerAccordionPanel2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanel);

var _pfNotificationDrawerAccordionPanelCollapse = require('pf-notification-drawer-accordion-panel-collapse.component');

var _pfNotificationDrawerAccordionPanelCollapse2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelCollapse);

var _pfNotificationDrawerAccordionPanelBody = require('pf-notification-drawer-accordion-panel-body.component');

var _pfNotificationDrawerAccordionPanelBody2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer>
 *   <pf-notification-drawer-accordion>
 *     <pf-notification-drawer-accordion-panel>
 *       <pf-notification-drawer-accordion-panel-collapse>
 *         <pf-notification-drawer-accordion-panel-body>
 *           <tag class="drawer-pf-notification unread">
 *             <tag class="drawer-pf-notification-message">Notfication A</tag>
 *           </tag>
 *           <tag class="drawer-pf-notification">
 *             <tag className="drawer-pf-notification-message">Notfication B</tag>
 *           </tag>
 *           . . .
 *         </pf-notification-drawer-accordion-panel-body>
 *       </pf-notification-drawer-accordion-panel-collapse>
 *     </pf-notification-drawer-accordion-panel>
 *     <pf-notification-drawer-accordion-panel>
 *       . . .
 *     </pf-notification-drawer-accordion-panel>
 *   </pf-notification-drawer-accordion>
 * </pf-notification-drawer>
 *
 * @properties
 *
 * @prop {string} targetSelector Indicating which element will fireup the notification-drawer
 *
 * @methods
 *
 *
 * @events
 *
 * @pf-notification-drawer.markallread It's fired when user clicks the "Mark All read" button to
 * update the read status of one group of notifications.
 * @pf-notification-drawer.clearall It's fired when user clicks the "Clear All" button to
 * remove all the items of one group of notifications.
 * @pf-notification-drawer.updateall It's fired when user updates the datasoure of one
 * existing notification group.
 * @pf-notification-drawer.updategroups It's fired when user updates the datasoure of all the
 * notification groups.
 */

var PfNotificationDrawer = exports.PfNotificationDrawer = function (_HTMLElement) {
  _inherits(PfNotificationDrawer, _HTMLElement);

  _createClass(PfNotificationDrawer, [{
    key: 'attributeChangedCallback',


    /*
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'targetselector' && newValue !== null && oldValue === null) {
        this._target = document.querySelector(newValue);
        if (this._target) {
          this._target.addEventListener('click', this._toggleDrawer.bind(this), false);
          this._target.setAttribute('data-bound', 'bound');
        }
      }
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',


    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */
    get: function get() {
      return ['targetselector'];
    }
  }]);

  function PfNotificationDrawer() {
    _classCallCheck(this, PfNotificationDrawer);

    return _possibleConstructorReturn(this, (PfNotificationDrawer.__proto__ || Object.getPrototypeOf(PfNotificationDrawer)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawer, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.className = 'drawer-pf hide drawer-pf-notifications-non-clickable';

      if (this.getAttribute('targetSelector')) {
        this._target = document.querySelector(this.getAttribute('targetSelector'));
        if (this._target && !(this._target.getAttribute('data-bound') === 'bound')) {
          this._target.addEventListener('click', this._toggleDrawer.bind(this), false);
        }
      }

      this._updateDrawerLogo();
      this.addEventListener('pf-notification-drawer.markallread', this._updateDrawerLogo, false);
      this.addEventListener('pf-notification-drawer.clearall', this._updateDrawerLogo, false);
      this.addEventListener('pf-notification-drawer.updateall', this._updateDrawerLogo, false);
      this.addEventListener('pf-notification-drawer.updategroups', this._updateDrawerLogo, false);

      this.dispatchEvent(new Event('pf-notification-drawer.initialized'));
    }

    /*
     * toggle the notification-drawer
     * @private
     */

  }, {
    key: '_toggleDrawer',
    value: function _toggleDrawer(e) {
      if (_pfUtils.pfUtil.hasClass(this, 'hide')) {
        _pfUtils.pfUtil.removeClass(this, 'hide');
      } else {
        _pfUtils.pfUtil.addClass(this, 'hide');
      }
    }
  }, {
    key: '_updateDrawerLogo',
    value: function _updateDrawerLogo() {
      var flag = 0;
      _pfUtils.pfUtil.getArrayFromNodeList(this.querySelectorAll('pf-notification-drawer-accordion-panel-collapse:not(.empty-view)')).forEach(function (el) {
        flag += el.querySelectorAll('.unread').length;
      });
      if (flag && !this._target.querySelector('.badge')) {
        this._target.insertAdjacentHTML('beforeend', '<span class="badge"> </span>');
      } else if (!flag && this._target.querySelector('.badge')) {
        var unreadLogo = this._target.querySelector('.badge');
        unreadLogo.parentNode.removeChild(unreadLogo);
      }
    }
  }]);

  return PfNotificationDrawer;
}(HTMLElement);

window.customElements.define('pf-notification-drawer', PfNotificationDrawer);