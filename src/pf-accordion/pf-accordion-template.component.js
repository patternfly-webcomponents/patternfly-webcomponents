import PfAccordionBody from 'pf-accordion-body.component';
import { pfUtil } from 'pf-utils';
/**
 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
 *
 * @prop {boolean} open indicates if accordion is expanded
 */
export class PfAccordionTemplate extends HTMLElement {

  /**
   * Returns a list of attributes on which we are interested to track changes
   * @returns {String[]}
   */
  static get observedAttributes() {
    return ['open'];
  }

  /**
   * Called when an instance was inserted into the document
   */
  connectedCallback() {
    this.classList.add('panel-collapse');
    this.classList.add('collapse');
    this.setAttribute('role', 'tabpanel');

    this.addEventListener('transitionend', this._handleTransitionEnd);

    if (this.hasAttribute('open')) {
      this.classList.add('in');
    } else if (this.classList.contains('in')) {
      this.setAttribute('open', '');
    } else {
      this.style.height = 0;
    }

    this._initialized = true;
    this.dispatchEvent(new Event('pf-accordion.initialized'));
  }

  /**
   * Called when an instance of the element is created
   */
  constructor() {
    super();
    this._initialized = false;
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if ('open' === attrName) {
      if (this.hasAttribute('open')) {
        this._expand();
      } else {
        this._collapse();
      }
    }
  }

  /**
   * Make the panel visible
   */
  _expand() {
    this._transitioning = true;
    this._action = 'expanding';

    this.dispatchEvent(new CustomEvent('pf-accordion.expanding', {
      bubbles: true,
      cancelable: false
    }));
    this.classList.remove('collapse');
    this.classList.add('collapsing');

    this.style.height = pfUtil.getMaxHeight(this) + 'px';

  }

  /**
   * Hide the panel
   */
  _collapse() {
    this._transitioning = true;
    this._action = 'collapsing';

    this.dispatchEvent(new CustomEvent('pf-accordion.collapsing', {
      bubbles: true,
      cancelable: false
    }));
    let maxHeight = pfUtil.getMaxHeight(this);
    this.classList.remove('collapse');
    this.classList.add('collapsing');
    this.style.height = maxHeight + 'px';

    setTimeout(() => {
      this.style.height = '0px';
    }, 10);
  }

  /**
   * Toggle the visiblity of the panel
   */
  toggle() {
    this.open = !this.open;
  }

  /**
   * Handles the transitionend event.
   * @private
   */
  _handleTransitionEnd() {

    this.classList.remove('collapsing');
    this.classList.add('collapse');
    if ('expanding' === this._action) {
      this.classList.add('in');
      this.style.height = '';
      this.setAttribute('aria-expanded', 'true');
      this.dispatchEvent(new CustomEvent('pf-accordion.expanded', {
        bubbles: true
      }));
    } else {
      this.setAttribute('aria-expanded', 'false');
      this.dispatchEvent(new CustomEvent('pf-accordion.collapsed', {
        bubbles: true
      }));
    }

    this._transitioning = false;
    this._action = null;
  }

  /**
   * Get the display state of the panel
   *
   * @returns {string} the display state, either 'shown' or 'hidden'
   */
  get open() {
    return this.hasAttribute('open');
  }

  /**
   * Set the display state of the panel
   *
   * @param {string} value the display state, either 'shown' or 'hidden'
   */
  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}

(function () {
  customElements.define('pf-accordion-template', PfAccordionTemplate);
}());
