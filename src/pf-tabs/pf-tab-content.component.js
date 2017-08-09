import { default as tmpl } from 'pf-tab-content.template';

/**
 * <b>&lt;pf-tab-content&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs tabs-class="nav nav-tabs">
 *  <pf-tab tab-class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab tab-class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
 *  <pf-tab-row-contents contents-class="pf-tabrow-contents">
 *    <button class="btn btn-default" type="button">Default</button>
 *  </pf-tab-row-contents>
 * </pf-tabs>
 * <pf-tab-content content-id="content1"> <p> my content 1 </p></pf-tab-content>
 * <pf-tab-content content-id="content2"> <p> my content 2 </p></pf-tab-content>
 *
 * @prop {string} class the tab ul class
 * @prop {string} contentId the content id which describes this tabs content
 * @prop {string} active whether this tab is currently active
 */
export class PfTabContent extends HTMLElement {
  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback() {
    this.firstElementChild.setAttribute('role', 'tabpanel');
    this.firstElementChild.setAttribute('aria-labelledby', this.getAttribute('content-id'));
    this.initialized = true;
    this.dispatchEvent(new CustomEvent('pf-tab-content.initialized', {}));
  }

  /*
   * An instance of the element is created or upgraded
   */
  constructor() {
    super();
  }
}

window.customElements.define('pf-tab-content', PfTabContent);