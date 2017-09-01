import {pfUtil} from 'pf-utils.js';

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

export class PfNotificationDrawerAccordion extends HTMLElement {

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
    pfUtil.addClass(this, 'panel-group');

    let observer = new MutationObserver(function(mutations) {
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
  _collapseExpandedPanel (expanded) {
    let originalExpanded = this.querySelector('.uncollapsed');
    if (originalExpanded) {
      pfUtil.removeClass(originalExpanded, 'uncollapsed');
    }
  }

}

window.customElements.define('pf-notification-drawer-accordion', PfNotificationDrawerAccordion);