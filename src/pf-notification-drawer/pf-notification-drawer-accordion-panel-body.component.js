import {pfUtil} from 'pf-utils.js';

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

export class PfNotificationDrawerAccordionPanelBody extends HTMLElement {

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
    pfUtil.addClass(this, 'panel-body');

    this.addEventListener('click', function (e) {
      let noti = pfUtil.getClosest(e.target, '.drawer-pf-notification');
      if (pfUtil.hasClass(e.target, 'drawer-pf-notification-message') && noti && noti.classList.contains('unread')) {
        that._markRead(e);
      }
    }, false);
    let observer = new MutationObserver(function(mutations) {
      if (that.querySelector('.drawer-pf-notification')) {
        that.dispatchEvent(new CustomEvent('pf-notification-drawer.updateall', { 'bubbles': true,  'detail': { 'source': pfUtil.getClosest(that, '.panel') }}));
      }
    });
    observer.observe(this, { childList: true });
  }

  /*
   * clear the unread status and caculate the new count of unread notifications
   * @private
   */
  _markRead (e) {
    pfUtil.removeClass(pfUtil.getClosest(e.target, '.drawer-pf-notification'), 'unread');
    this.dispatchEvent(new CustomEvent('pf-notification-drawer.markoneread', { 'bubbles': true,  'detail': { 'source': e.target }}));
  }

}

window.customElements.define('pf-notification-drawer-accordion-panel-body', PfNotificationDrawerAccordionPanelBody);