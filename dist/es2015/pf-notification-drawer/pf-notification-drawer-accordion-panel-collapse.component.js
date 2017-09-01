'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordionPanelCollapse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = require('pf-utils.js');

var _pfNotificationDrawerAccordionPanelBlank = require('pf-notification-drawer-accordion-panel-blank.template');

var _pfNotificationDrawerAccordionPanelBlank2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelBlank);

var _pfNotificationDrawerAccordionPanelAction = require('pf-notification-drawer-accordion-panel-action.template');

var _pfNotificationDrawerAccordionPanelAction2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanelAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion-panel-collapse&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion-panel-collapse>
 *   <pf-notification-drawer-accordion-panel-body></pf-notification-drawer-accordion-panel-body>
 *   <div class="blank-slate-pf"></div>
 *   <div class="drawer-pf-action"></div>
 * </pf-notification-drawer-accordion-panel-collapse>
 */

var PfNotificationDrawerAccordionPanelCollapse = exports.PfNotificationDrawerAccordionPanelCollapse = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordionPanelCollapse, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordionPanelCollapse() {
    _classCallCheck(this, PfNotificationDrawerAccordionPanelCollapse);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordionPanelCollapse.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordionPanelCollapse)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordionPanelCollapse, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      this.className = 'panel-collapse';
      this.insertAdjacentHTML('beforeend', _pfNotificationDrawerAccordionPanelBlank2.default + _pfNotificationDrawerAccordionPanelAction2.default);

      this.addEventListener('click', function (e) {
        if (_pfUtils.pfUtil.getClosest(e.target, '.mark-all-read')) {
          that._markAllRead(e);
        }
      }, false);
      this.addEventListener('click', function (e) {
        if (_pfUtils.pfUtil.getClosest(e.target, '.clear-all')) {
          that._clearAll(e);
        }
      }, false);
      this.addEventListener('pf-notification-drawer.updateall', this._updateAll.bind(this), false);
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
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
      if (attrName === 'paneltitle') {
        this._updatePanelTitle(newValue);
      }
    }

    /*
     * clear the unread status of all the notification items
     * @private
     */

  }, {
    key: '_markAllRead',
    value: function _markAllRead(e) {
      _pfUtils.pfUtil.getArrayFromNodeList(this.querySelectorAll('.unread')).forEach(function (noti) {
        _pfUtils.pfUtil.removeClass(noti, 'unread');
      });
      var link = _pfUtils.pfUtil.getClosest(e.target, '.drawer-pf-action-link');
      link.parentNode.removeChild(link);
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.markallread', { 'bubbles': true, 'detail': { 'source': this.parentNode } }));
    }

    /*
     * remove all the notification items of one panel-group
     * @private
     */

  }, {
    key: '_clearAll',
    value: function _clearAll() {
      _pfUtils.pfUtil.addClass(this, 'empty-view');
      _pfUtils.pfUtil.removeNodes(this.querySelector('.drawer-pf-action'));
      _pfUtils.pfUtil.removeClass(this.querySelector('.blank-slate-pf'), 'hidden');
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.clearall', { 'bubbles': true, 'detail': { 'source': this.parentNode } }));
    }

    /*
     * update the view status on reloading notifications
     * @private
     */

  }, {
    key: '_updateAll',
    value: function _updateAll() {
      _pfUtils.pfUtil.removeClass(this, 'empty-view');
      if (!this.querySelector('.drawer-pf-action')) {
        this.insertAdjacentHTML('beforeend', _pfNotificationDrawerAccordionPanelAction2.default);
      } else if (!this.querySelector('.mark-all-read')) {
        this.querySelector('.drawer-pf-action').insertAdjacentHTML('afterbegin', '<div class="drawer-pf-action-link">' + '  <button class="btn btn-link mark-all-read">Mark All Read</button>' + '</div>');
      }
      _pfUtils.pfUtil.addClass(this.querySelector('.blank-slate-pf'), 'hidden');
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['paneltitle'];
    }
  }]);

  return PfNotificationDrawerAccordionPanelCollapse;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion-panel-collapse', PfNotificationDrawerAccordionPanelCollapse);