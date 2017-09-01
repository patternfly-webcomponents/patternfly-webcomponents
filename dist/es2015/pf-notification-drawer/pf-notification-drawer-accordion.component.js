'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = require('pf-utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion>
 *   <pf-notification-drawer-accordion-panel></pf-notification-drawer-accordion-panel>
 *   <pf-notification-drawer-accordion-panel></pf-notification-drawer-accordion-panel>
 *   . . .
 * </pf-notification-drawer-accordion>
 */

var PfNotificationDrawerAccordion = exports.PfNotificationDrawerAccordion = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordion, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordion() {
    _classCallCheck(this, PfNotificationDrawerAccordion);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordion.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordion)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordion, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      _pfUtils.pfUtil.addClass(this, 'panel-group');

      var observer = new MutationObserver(function (mutations) {
        if (that.querySelector('.drawer-pf-notification')) {
          that.dispatchEvent(new CustomEvent('pf-notification-drawer.updategroups', { 'bubbles': true }));
        }
      });
      observer.observe(this, { childList: true });
    }

    /*
     * collapse the expanded panel
     * @private
     */

  }, {
    key: '_collapseExpandedPanel',
    value: function _collapseExpandedPanel(expanded) {
      var originalExpanded = this.querySelector('.uncollapsed');
      if (originalExpanded) {
        _pfUtils.pfUtil.removeClass(originalExpanded, 'uncollapsed');
      }
    }
  }]);

  return PfNotificationDrawerAccordion;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion', PfNotificationDrawerAccordion);