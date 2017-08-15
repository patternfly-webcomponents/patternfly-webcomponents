/**
 * <b>&lt;pf-accordion-body&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionBody extends HTMLElement {
  /**
   * Called when an instance in inserted into the document
   */
  connectedCallback() {
    this.classList.add('panel-body');
  }
}
(function () {
  customElements.define('pf-accordion-body', PfAccordionBody);
}());
