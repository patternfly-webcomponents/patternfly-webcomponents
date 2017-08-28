/**
 * <b>&lt;pf-tab-row-contents&gt;</b> element for Patternfly Web Components
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
 * @prop {string} contentsClass the tab row contents class
 */
export class PfTabRowContents extends HTMLElement {
  /*
   * An instance of the element is created or upgraded
   */
  constructor() {
    super();
  }

  /*
   * Called every time the element is inserted into the DOM
   */
  connectedCallback() {
    this._contentsClass = this.getAttribute('contents-class');
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['contents-class'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'contents-class' && newValue !== 'ng-isolate-scope') {
      //the last li within the tabs ul
      let li = this.parentNode.firstElementChild.lastElementChild;
      if (li) {
        li.className = newValue;
      }
    }
  }

  /**
   * Get tab row contents class
   *
   * @returns {string} contents class
   */
  get contentsClass() {
    return this._contentsClass;
  }

  /**
   * Set tab row contents class
   *
   * @param {string} value contents class
   */
  set contentsClass(value) {
    if (this._contentsClass !== value) {
      this._contentsClass = value;
      this.setAttribute('contents-class', value);
    }
  }
}

window.customElements.define('pf-tab-row-conents', PfTab);