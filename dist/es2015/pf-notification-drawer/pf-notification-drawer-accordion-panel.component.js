'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfNotificationDrawerAccordionPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfUtils = require('pf-utils.js');

var _pfNotificationDrawerAccordionPanel = require('pf-notification-drawer-accordion-panel.template');

var _pfNotificationDrawerAccordionPanel2 = _interopRequireDefault(_pfNotificationDrawerAccordionPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * <b>&lt;pf-notification-drawer-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-accordion-panel>
 *   <div class="panel-heading"></div>
 *   <pf-notification-drawer-accordion-panel-collapse>
 *   </pf-notification-drawer-accordion-panel-collapse>
 * </pf-notification-drawer-accordion-panel>
 */

var PfNotificationDrawerAccordionPanel = exports.PfNotificationDrawerAccordionPanel = function (_HTMLElement) {
  _inherits(PfNotificationDrawerAccordionPanel, _HTMLElement);

  /*
   * An instance of the element is created or upgraded
   */
  function PfNotificationDrawerAccordionPanel() {
    _classCallCheck(this, PfNotificationDrawerAccordionPanel);

    return _possibleConstructorReturn(this, (PfNotificationDrawerAccordionPanel.__proto__ || Object.getPrototypeOf(PfNotificationDrawerAccordionPanel)).call(this));
  }

  /*
   * Called every time the element is inserted into the DOM
   */


  _createClass(PfNotificationDrawerAccordionPanel, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var that = this;
      var transclusion = '';
      this.className = 'panel panel-default';
      this.insertAdjacentHTML('afterbegin', _pfNotificationDrawerAccordionPanel2.default);
      if (this.panelTitle) {
        this._updatePanelTitle(this.panelTitle);
      }
      this.querySelector('.panel-counter').textContent = this.querySelectorAll('.unread').length + ' New Events';

      this.querySelector('.panel-title').children[0].addEventListener('click', this._togglePanel.bind(this), false);
      this.addEventListener('pf-notification-drawer.markoneread', this._markOneRead.bind(this), false);
      this.addEventListener('pf-notification-drawer.markallread', this._clearCounter.bind(this), false);
      this.addEventListener('pf-notification-drawer.clearall', this._clearCounter.bind(this), false);
      this.addEventListener('pf-notification-drawer.updateall', this._updateCounter.bind(this), false);
    }

    /*
     * Get panelTitle
     *
     * @returns {string} The panel title of a group of notifications
     */

  }, {
    key: '_updatePanelTitle',


    /*
     * update title for notification-drawer-accordion-panel
     *
     * @private
     */
    value: function _updatePanelTitle(val) {
      var title = this.querySelector('.panel-title a');
      if (title) {
        title.innerHTML = val;
      }
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
     * clear the unread status and caculate the new count of unread notifications
     * @private
     */

  }, {
    key: '_markOneRead',
    value: function _markOneRead(e) {
      var counter = this.querySelector('.panel-counter');
      counter.textContent = window.parseInt(counter.textContent) - 1 + ' New Events';

      if (counter.textContent.indexOf('0') === 0) {
        _pfUtils.pfUtil.removeNodes(this.querySelector('.mark-all-read').parentNode);
        this.dispatchEvent(new CustomEvent('pf-notification-drawer.markallread', { 'bubbles': true, 'detail': { 'source': this } }));
      }
    }

    /*
     * clear the counter
     * @private
     */

  }, {
    key: '_clearCounter',
    value: function _clearCounter(e) {
      this.querySelector('.panel-counter').textContent = '0 New Events';
    }

    /*
     * update the counter according to the new datasoure of notifications
     * @private
     */

  }, {
    key: '_updateCounter',
    value: function _updateCounter(e) {
      this.querySelector('.panel-counter').textContent = e.target.querySelectorAll('.unread').length + ' New Events';
    }

    /*
     * toggle the panel
     * @private
     */

  }, {
    key: '_togglePanel',
    value: function _togglePanel(e) {
      e.stopPropagation();
      var panel = this.querySelector('.panel-collapse');
      if (_pfUtils.pfUtil.hasClass(panel, 'uncollapsed')) {
        _pfUtils.pfUtil.removeClass(panel, 'uncollapsed');
        _pfUtils.pfUtil.addClass(this.querySelector('.panel-title').querySelector('a'), 'collapsed');
      } else {
        this.parentNode._collapseExpandedPanel(this);
        _pfUtils.pfUtil.addClass(panel, 'uncollapsed');
        _pfUtils.pfUtil.removeClass(this.querySelector('.panel-title').querySelector('a'), 'collapsed');
      }
    }
  }, {
    key: 'panelTitle',
    get: function get() {
      return this.getAttribute('panelTitle');
    }

    /*
     * Set panelTitle
     *
     * @param {string} val The panel title of a group of notifications
     */
    ,
    set: function set(val) {
      if (val) {
        this.setAttribute('panelTitle', val);
      } else {
        this.removeAttribute('panelTitle');
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['paneltitle'];
    }
  }]);

  return PfNotificationDrawerAccordionPanel;
}(HTMLElement);

window.customElements.define('pf-notification-drawer-accordion-panel', PfNotificationDrawerAccordionPanel);