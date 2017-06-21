import {pfUtil} from 'pf-utils.js';
import PfModalDialog from 'pf-modal-dialog.component';
import PfModalContent from 'pf-modal-content.component';
import PfModalHeader from 'pf-modal-header.component';
import PfModalBody from 'pf-modal-body.component';
import PfModalFooter from 'pf-modal-footer.component';

/*
 * <b>&lt;pf-modal&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-modal targetSelector="#btn-toggle-modal" backdrop keyboard>
 *   <pf-modal-dialog>
 *     <pf-modal-content>
 *       <pf-modal-header modalTitle="Modal Title"></pf-modal-header>
 *       <pf-modal-body>custom content</pf-modal-body>
 *       <pf-modal-footer></pf-modal-footer>
 *     </pf-modal-content>
 *   </pf-modal-dialog>
 * </pf-modal>
 *
 * @prop {string} targetSelector Indicating which element will fireup the modal
 * @prop {boolean} backdrop Indicating whether Clicking the backdrop could hide the modal or not
 * @prop {boolean} keyboard Indicating whether clicking the escape key could hide the modal or not
 * @prop {boolean} open Indicating whether or not the modal is opend
 *
 * @methods
 *
 * @show Show the modal
 * @hide Hide the modal
 * @toggle Toggle the visible/invisible state of modal
 *
 * @events
 *
 * @pf-modal.show It's fired immediately when the show instance method is called. If caused by a click,
 * the clicked element is available as the relatedTarget property of the event.detail
 * @pf-modal.shown It's fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click,
 * the clicked element is available as the relatedTarget property of the event.detail
 * @pf-modal.hide It's fired immediately when the hide instance method has been called
 * @pf-modal.hidden It's fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete)
 */

export class PfModal extends HTMLElement {

  /*
   * Get the show/hide state of modal
   *
   * @returns {boolean} True if modal is visible
   */
  get open () {
    return this.hasAttribute('open');
  }

  /*
   * Set flag indicating modal is shown
   *
   * @param {boolean} val True to set modal visible
   */
  set open (val) {
    if (this.open !== val) {
      if (val) {
        this.setAttribute('open', '');
      } else {
        this._hideModal();
      }
    }
  }

  /*
   * Get the backdrop setting
   *
   * @returns {boolean} True if users are allowed to hide modal on clicking backdrop
   */
  get backdrop () {
    return this.hasAttribute('backdrop');
  }

  /*
   * Set flag indicating clicking backdrop of modal could hide modal
   *
   * @param {boolean} val True to enable backdrop clicking
   */
  set backdrop (val) {
    if (this.backdrop !== val) {
      if (val) {
        this.setAttribute('backdrop', '');
      } else {
        this.removeAttribute('backdrop');
      }
    }
  }

  /*
   * Get the keyboard setting
   *
   * @returns {boolean} True if users are allowed to hide modal when escape key is pressed
   */
  get keyboard () {
    return this.hasAttribute('keyboard');
  }

  /*
   * Set flag indicating pressing escape key could hide modal
   *
   * @param {boolean} val True to enable escape key reaction
   */
  set keyboard (val) {
    if (this.keyboard !== val) {
      if (val) {
        this.setAttribute('keyboard', '');
      } else {
        this.removeAttribute('keyboard');
      }
    }
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['targetselector', 'open', 'keyboard', 'backdrop'];
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
        this._target.addEventListener('click', this.show.bind(this), false);
        this._target.setAttribute('data-bound', 'bound');
      }
    }
    if (attrName === 'open' && newValue !== null) {
      this._showModal();
    }
    if (attrName === 'keyboard') {
      if (newValue === '') {
        this.addEventListener('keydown', this._keydownHandler, false);
      } else {
        this.removeEventListener('keydown', this._keydownHandler, false);
      }
    }
  }

  /*
   * An instance of the element is created or upgraded
   */
  constructor () {
    super();

    this._mask = null;
  }

  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback () {
    this.className = 'modal fade';
    this.setAttribute('tabindex', -1);

    if (this.open) {
      this._showModal();
    }

    if (this.getAttribute('targetSelector')) {
      this._target = document.querySelector(this.getAttribute('targetSelector'));
      if (this._target && !(this._target.getAttribute('data-bound') === 'bound')) {
        this._target.addEventListener('click', this.show.bind(this), false);
      }
    }

    this.addEventListener('click', this.hide, false);
  }

  /*
   * Show the modal when attribute open is added or property open is enabled
   * @private
   */
  _showModal () {
    pfUtil.addClass(document.body, 'modal-open');
    this._mask = document.createElement('div');
    this._mask.className = 'modal-backdrop fade';
    document.body.appendChild(this._mask);
    pfUtil.reflow(this._mask);
    pfUtil.addClass(this._mask, 'in');
    pfUtil.reflow(this);
    pfUtil.addClass(this, 'in');
    pfUtil.once(this.querySelector('pf-modal-dialog'), 'transitionend', this._afterShowModal, this);
  }

  /*
   * Show the modal
   * @public
   */
  show (e) {
    if (e) {
      this.dispatchEvent(new CustomEvent('pf-modal.show', { 'detail': { 'relatedTarget': e.currentTarget }}));
      this._triggeredByUser = true;
    } else {
      this.dispatchEvent(new CustomEvent('pf-modal.show', {}));
    }
    if (this.open) {
      return;
    }
    this.open = true;
  }

  /*
   * Callback after modal is shown
   * @private
   */
  _afterShowModal () {
    this.focus();
    if (this._triggeredByUser) {
      this.dispatchEvent(new CustomEvent('pf-modal.shown', { 'detail': { 'relatedTarget': this._target }}));
    } else {
      this.dispatchEvent(new CustomEvent('pf-modal.shown', {}));
    }
    this._triggeredByUser = false;
  }

  /*
   * Hide the modal when attribute open is removed or property open is disabled
   * @private
   */
  _hideModal () {
    pfUtil.removeClass(document.body, 'modal-open');
    pfUtil.removeClass(this._mask, 'in');
    pfUtil.removeClass(this, 'in');
    pfUtil.once(this, 'transitionend', this._afterHideModal, this);
  }

  /*
   * Hide the modal
   * @public
   */
  hide (e) {
    if (e) {
      e.preventDefault();
      if (!(pfUtil.getClosest(e.target, '.pf-hide-modal') || (e.target === e.currentTarget && this.backdrop))) {
        return;
      }
    }

    this.dispatchEvent(new CustomEvent('pf-modal.hide', {}));

    if (!this.open) {
      return;
    }
    this._hideModal();
  }

  /*
   * Callback after the modal is hidden
   * @private
   */
  _afterHideModal () {
    this.removeAttribute('open');
    if (this._mask) {
      this._mask.remove();
      this._mask = null;
    }
    this.dispatchEvent(new CustomEvent('pf-modal.hidden', {}));
  }

  /*
   * Toggle the visible/invisible state of modal
   * @public
   */
  toggle () {
    return this.open ? this.hide() : this.show();
  }

  /*
   * Handler of keydown event of escape key
   * @private
   */
  _keydownHandler (e) {
    let isEscape = (e.key && e.key === 'Escape') || (e.keyIdentifier && e.keyIdentifier === 'U+001B') || (e.keyCode && e.keyCode === 27) || (e.which && e.which === 27);
    if (isEscape && this.open) {
      this.hide();
    }
  }

}

window.customElements.define('pf-modal', PfModal);