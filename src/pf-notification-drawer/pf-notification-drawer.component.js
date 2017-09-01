import {pfUtil} from 'pf-utils.js';
import PfNotificationDrawerHeader from 'pf-notification-drawer-header.component';
import PfNotificationDrawerAccordion from 'pf-notification-drawer-accordion.component';
import PfNotificationDrawerAccordionPanel from 'pf-notification-drawer-accordion-panel.component';
import PfNotificationDrawerAccordionPanelCollapse from 'pf-notification-drawer-accordion-panel-collapse.component';
import PfNotificationDrawerAccordionPanelBody from 'pf-notification-drawer-accordion-panel-body.component';

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

export class PfNotificationDrawer extends HTMLElement {

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['targetselector'];
  }

  /*
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
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
  constructor () {
    super();
  }

  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback () {
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
  _toggleDrawer (e) {
    if (pfUtil.hasClass(this, 'hide')) {
      pfUtil.removeClass(this, 'hide');
    } else {
      pfUtil.addClass(this, 'hide');
    }
  }

  _updateDrawerLogo () {
    let flag = 0;
    pfUtil.getArrayFromNodeList(this.querySelectorAll('pf-notification-drawer-accordion-panel-collapse:not(.empty-view)')).forEach(function (el) {
      flag += el.querySelectorAll('.unread').length;
    });
    if (flag && !this._target.querySelector('.badge')) {
      this._target.insertAdjacentHTML('beforeend', '<span class="badge"> </span>');
    } else if (!flag && this._target.querySelector('.badge')) {
      let unreadLogo = this._target.querySelector('.badge');
      unreadLogo.parentNode.removeChild(unreadLogo);
    }
  }

}

window.customElements.define('pf-notification-drawer', PfNotificationDrawer);