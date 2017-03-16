import {pfUtil} from 'pf-utils.js';

/*
 * <b>&lt;pf-modal-footer&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal-footer></pf-modal-footer>
 */

export class PfModalFooter extends HTMLElement {

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
    pfUtil.addClass(this, 'modal-footer');

    if (this.cancelCaption) {
      this._addCancelBtn();
    }
    if (this.saveCaption) {
      this._addSaveBtn();
    }
  }

  /*
   * Append cancel button
   *
   * @private
   */
  _addCancelBtn () {
    if (!this.querySelector('.btn-default')) {
      this.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-default pf-hide-modal">' + this.cancelCaption + '</button>');
    }
  }

  /*
   * Append save button
   *
   * @private
   */
  _addSaveBtn () {
    if (!this.querySelector('.btn-primary')) {
      this.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-primary">' + this.saveCaption + '</button>');
    }
  }

  /*
   * Get cancelCaption
   *
   * @returns {string} The cancelCaption
   */
  get cancelCaption () {
    return this.getAttribute('cancelCaption');
  }

  /*
   * Set cancelCaption
   *
   * @param {string} val Caption of cancel button
   */
  set cancelCaption (val) {
    if (val) {
      this.setAttribute('cancelCaption', val);
    } else {
      this.removeAttribute('cancelCaption');
    }
  }

  /*
   * Get saveCaption
   *
   * @returns {string} The saveCaption
   */
  get saveCaption () {
    return this.getAttribute('saveCaption');
  }

  /*
   * Set saveCaption
   *
   * @param {string} val Caption of save button
   */
  set saveCaption (val) {
    if (val) {
      this.setAttribute('saveCaption', val);
    } else {
      this.removeAttribute('saveCaption');
    }
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['cancelcaption', 'savecaption'];
  }

  /*
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === 'cancelcaption') {
      if (newValue && !oldValue) {
        this._addCancelBtn(newValue);
      }
      if (newValue && oldValue) {
        this.querySelector('.btn-default').textContent = this.cancelCaption;
      }
      if (!newValue) {
        let btn = this.querySelector('.btn-default');
        btn.parentNode.removeChild(btn);
      }
    }
    if (attrName === 'savecaption') {
      if (newValue && !oldValue) {
        this._addSaveBtn(newValue);
      }
      if (newValue && oldValue) {
        this.querySelector('.btn-primary').textContent = this.saveCaption;
      }
      if (!newValue) {
        let btn = this.querySelector('.btn-primary');
        btn.parentNode.removeChild(btn);
      }
    }
  }

}

window.customElements.define('pf-modal-footer', PfModalFooter);