import {pfUtil} from 'pf-utils.js';
import {default as blankTmpl} from 'pf-notification-drawer-accordion-panel-blank.template';
import {default as actionTmpl} from 'pf-notification-drawer-accordion-panel-action.template';

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

export class PfNotificationDrawerAccordionPanelCollapse extends HTMLElement {

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
    this.className = 'panel-collapse';
    this.insertAdjacentHTML('beforeend', blankTmpl + actionTmpl);

    this.addEventListener('click', function (e) {
      if (pfUtil.getClosest(e.target, '.mark-all-read')) {
        that._markAllRead(e);
      }
    }, false);
    this.addEventListener('click', function (e) {
      if (pfUtil.getClosest(e.target, '.clear-all')) {
        that._clearAll(e);
      }
    }, false);
    this.addEventListener('pf-notification-drawer.updateall', this._updateAll.bind(this), false);
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
   * clear the unread status of all the notification items
   * @private
   */
  _markAllRead (e) {
    pfUtil.getArrayFromNodeList(this.querySelectorAll('.unread')).forEach(function (noti) {
      pfUtil.removeClass(noti, 'unread');
    });
    let link = pfUtil.getClosest(e.target, '.drawer-pf-action-link');
    link.parentNode.removeChild(link);
    this.dispatchEvent(new CustomEvent('pf-notification-drawer.markallread', { 'bubbles': true,  'detail': { 'source': this.parentNode }}));
  }

  /*
   * remove all the notification items of one panel-group
   * @private
   */
  _clearAll () {
    pfUtil.addClass(this, 'empty-view');
    pfUtil.removeNodes(this.querySelector('.drawer-pf-action'));
    pfUtil.removeClass(this.querySelector('.blank-slate-pf'), 'hidden');
    this.dispatchEvent(new CustomEvent('pf-notification-drawer.clearall', { 'bubbles': true,  'detail': { 'source': this.parentNode }}));
  }

  /*
   * update the view status on reloading notifications
   * @private
   */
  _updateAll () {
    pfUtil.removeClass(this, 'empty-view');
    if (!this.querySelector('.drawer-pf-action')) {
      this.insertAdjacentHTML('beforeend', actionTmpl);
    } else if (!this.querySelector('.mark-all-read')) {
      this.querySelector('.drawer-pf-action').insertAdjacentHTML('afterbegin',
        '<div class="drawer-pf-action-link">' +
        '  <button class="btn btn-link mark-all-read">Mark All Read</button>' +
        '</div>'
      );
    }
    pfUtil.addClass(this.querySelector('.blank-slate-pf'), 'hidden');
  }

}

window.customElements.define('pf-notification-drawer-accordion-panel-collapse', PfNotificationDrawerAccordionPanelCollapse);