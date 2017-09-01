import {pfUtil} from 'pf-utils.js';
import {default as tmpl} from 'pf-notification-drawer-accordion-panel.template';

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

export class PfNotificationDrawerAccordionPanel extends HTMLElement {

  /*
   * An instance of the element is created or upgraded
   */
  constructor () {
    super();
  }

  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback () {
    let that = this;
    let transclusion = '';
    this.className = 'panel panel-default';
    this.insertAdjacentHTML('afterbegin', tmpl);
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
  get panelTitle () {
    return this.getAttribute('panelTitle');
  }

  /*
   * Set panelTitle
   *
   * @param {string} val The panel title of a group of notifications
   */
  set panelTitle (val) {
    if (val) {
      this.setAttribute('panelTitle', val);
    } else {
      this.removeAttribute('panelTitle');
    }
  }

  /*
   * update title for notification-drawer-accordion-panel
   *
   * @private
   */
  _updatePanelTitle (val) {
    let title = this.querySelector('.panel-title a');
    if (title) {
      title.innerHTML = val;
    }
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['paneltitle'];
  }

  /*
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === 'paneltitle') {
      this._updatePanelTitle(newValue);
    }
  }

  /*
   * clear the unread status and caculate the new count of unread notifications
   * @private
   */
  _markOneRead (e) {
    let counter = this.querySelector('.panel-counter');
    counter.textContent = (window.parseInt(counter.textContent) - 1) + ' New Events';

    if (counter.textContent.indexOf('0') === 0) {
      pfUtil.removeNodes(this.querySelector('.mark-all-read').parentNode);
      this.dispatchEvent(new CustomEvent('pf-notification-drawer.markallread', { 'bubbles': true,  'detail': { 'source': this }}));
    }
  }

  /*
   * clear the counter
   * @private
   */
  _clearCounter (e) {
    this.querySelector('.panel-counter').textContent = '0 New Events';
  }

  /*
   * update the counter according to the new datasoure of notifications
   * @private
   */
  _updateCounter (e) {
    this.querySelector('.panel-counter').textContent = e.target.querySelectorAll('.unread').length + ' New Events';
  }

  /*
   * toggle the panel
   * @private
   */
  _togglePanel (e) {
    e.stopPropagation();
    let panel = this.querySelector('.panel-collapse');
    if (pfUtil.hasClass(panel, 'uncollapsed')) {
      pfUtil.removeClass(panel, 'uncollapsed');
      pfUtil.addClass(this.querySelector('.panel-title').querySelector('a'), 'collapsed');
    } else {
      this.parentNode._collapseExpandedPanel(this);
      pfUtil.addClass(panel, 'uncollapsed');
      pfUtil.removeClass(this.querySelector('.panel-title').querySelector('a'), 'collapsed');
    }
  }

}

window.customElements.define('pf-notification-drawer-accordion-panel', PfNotificationDrawerAccordionPanel);