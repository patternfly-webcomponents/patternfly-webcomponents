'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordionPanelBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = require('pf-utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion-panel-body&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion-panel-body>
 *   <tag className="drawer-pf-notification unread">
 *     <tag className="drawer-pf-notification-message">Notification content</tag>
 *   </tag>
 * </pf-notification-drawer-accordion-panel-body>
 */

var PfNotificationDrawerAccordionPanelBody = exports.PfNotificationDrawerAccordionPanelBody = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordionPanelBody, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordionPanelBody() {
    _classCallCheck(this, PfNotificationDrawerAccordionPanelBody);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordionPanelBody.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordionPanelBody)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordionPanelBody, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      _pfUtils.pfUtil.addClass(this, 'panel-body');

      this.addEventListener('click', function (e) {
        var noti = _pfUtils.pfUtil.getClosest(e.target, '.drawer-pf-notification');
        if (_pfUtils.pfUtil.hasClass(e.target, 'drawer-pf-notification-message') && noti && noti.classList.contains('unread')) {
          that._markRead(e);
        }
      }, false);
      var observer = new MutationObserver(function (mutations) {
        if (that.querySelector('.drawer-pf-notification')) {
          that.dispatchEvent(new CustomEvent('pf-notification-drawer.updateall', { 'bubbles': true, 'detail': { 'source': _pfUtils.pfUtil.getClosest(that, '.panel') } }));
        }
      });
      observer.observe(this, { childList: true });
    }

    /*
     * clear the unread status and caculate the new count of unread notifications
     * @private
     */

  }, {
    key: '_markRead',
    value: function _markRead(e) {
      _pfUtils.pfUtil.removeClass(_pfUtils.pfUtil.getClosest(e.target, '.drawer-pf-notification'), 'unread');
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.markoneread', { 'bubbles': true, 'detail': { 'source': e.target } }));
    }
  }]);

  return PfNotificationDrawerAccordionPanelBody;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion-panel-body', PfNotificationDrawerAccordionPanelBody);