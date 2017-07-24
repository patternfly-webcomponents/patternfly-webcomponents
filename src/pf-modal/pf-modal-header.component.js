import {pfUtil} from 'pf-utils.js';
import {default as tmpl} from 'pf-modal-header.template';

/*
 * <b>&lt;pf-modal-header&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal-header modal-title="Modal Title"></pf-modal-header>
 */

export class PfModalHeader extends HTMLElement {

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
    pfUtil.addClass(this, 'modal-header');

    if (!this.querySelector('.pf-hide-modal')) {
      this._template = document.createElement('template');
      this._template.innerHTML = tmpl;
      this.appendChild(this._template.content);
    }
    if (this.modalTitle) {
      this._addModalTitle();
    }
  }

    /*
   * Append cancel button
   *
   * @private
   */
  _addModalTitle () {
    if (!this.querySelector('.modal-title')) {
      this.insertAdjacentHTML('beforeend', '<h4 class="modal-title">' + this.modalTitle + '</h4>');
    }
  }

  /*
   * Get modal-title
   *
   * @returns {string} The modal title
   */
  get modalTitle () {
    return this.getAttribute('modal-title');
  }

  /*
   * Set modal-title
   *
   * @param {string} val Modal title
   */
  set modalTitle (val) {
    if (val) {
      this.setAttribute('modal-title', val);
    } else {
      this.removeAttribute('modal-title');
    }
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['modal-title'];
  }

  /*
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === 'modal-title') {
      if (newValue && !oldValue) {
        this._addModalTitle();
      }
      if (newValue && oldValue) {
        this.querySelector('.modal-title').textContent = this.modalTitle;
      }
      if (!newValue) {
        let title = this.querySelector('.modal-title');
        title.parentNode.removeChild(title);
      }
    }
  }

}

window.customElements.define('pf-modal-header', PfModalHeader);