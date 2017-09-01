import {pfUtil} from 'pf-utils.js';
import {default as tmpl} from 'pf-notification-drawer-header.template';

/*
 * <b>&lt;pf-notification-drawer-header&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-notification-drawer-header>
 *   <a class="drawer-pf-toggle-expand"></a>
 *   <a class="drawer-pf-close"></a>
 *   <h3>Notifications Drawer</h3>
 * </pf-notification-drawer-header>
 */

export class PfNotificationDrawerHeader extends HTMLElement {

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
    this.className = 'drawer-pf-title';

    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
    this.appendChild(this._template.content);

    if (this.drawerTitle) {
      this._updateDrawerTitle(this.drawerTitle);
    }
    this.querySelector('.drawer-pf-toggle-expand').addEventListener('click', this._toggleDrawer.bind(this), false);
    this.querySelector('.drawer-pf-close').addEventListener('click', this._hideDrawer.bind(this), false);
  }

  /*
   * update title for notification-drawer
   *
   * @private
   */
  _updateDrawerTitle (val) {
    let title = this.querySelector('h3');
    if (title) {
      title.innerHTML = val;
    }
  }

  /*
   * toggle the drawer between the narrow and wide modes
   *
   * @private
   */
  _toggleDrawer (e) {
    let drawer = this.parentNode;
    if (pfUtil.hasClass(drawer, 'drawer-pf-expanded')) {
      pfUtil.removeClass(drawer, 'drawer-pf-expanded');
    } else {
      pfUtil.addClass(drawer, 'drawer-pf-expanded');
    }
  }

  /*
   * hide the drawer
   *
   * @private
   */
  _hideDrawer (e) {
    pfUtil.addClass(this.parentNode, 'hide');
  }

  /*
   * Get modalTitle
   *
   * @returns {string} The modal title
   */
  get drawerTitle () {
    return this.getAttribute('drawerTitle');
  }

  /*
   * Set modalTitle
   *
   * @param {string} val Modal title
   */
  set drawerTitle (val) {
    if (val) {
      this.setAttribute('drawerTitle', val);
    } else {
      this.removeAttribute('drawerTitle');
    }
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['drawertitle'];
  }

  /*
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === 'drawertitle') {
      this._updateDrawerTitle(newValue ? newValue : '&nbsp;');
    }
  }

}

window.customElements.define('pf-notification-drawer-header', PfNotificationDrawerHeader);