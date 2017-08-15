import PfAccordionHeading from 'pf-accordion-heading.component';
import PfAccordionTemplate from 'pf-accordion-template.component';
/**
 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionPanel extends HTMLElement {
  /**
   * Called when an instance of the element is created
   */
  constructor() {
    super();
    this._initDefaults();
  }

  /**
   * Called when an instance of the element was inserted into the document
   */
  connectedCallback() {
    this._setClasses();
  }

  /**
   * Returns a list of attributes on which we are interested to track changes
   * @returns {String[]}
   */
  static get observedAttributes() {
    return ['class'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if ('class' === attrName) {
      this._setClasses();
    }
  }

  /**
   * Sets default constants
   * @private
   */
  _initDefaults() {
    this._classes = {
      'context': {
        'classes': ['panel-default', 'panel-info', 'panel-success', 'panel-primary', 'panel-warning', 'panel-danger'],
        'default': 'panel-default'
      }
    };
  }

  /**
   * Sets default classes on the component
   * @private
   */
  _setClasses() {
    // add default class for this component
    if (!this.classList.contains('panel')) {
      this.classList.add('panel');
    }

    let hasClass = false;
    this._classes.context.classes.forEach((clazz) => {
      hasClass = hasClass || this.classList.contains(clazz);
    });

    if (!hasClass) {
      this.classList.add(this._classes.context.default);
    }
  }
}
(function () {
  customElements.define('pf-accordion-panel', PfAccordionPanel);
}());
