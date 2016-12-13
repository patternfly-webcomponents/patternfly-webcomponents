import {default as tmpl} from 'panel.template';

/**
 * <b>&lt;pf-tab&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs>
 *  <pf-tab title="Tab1" active="true">
 *    <p>Tab1 content here</p>
 *  </pf-tab>
 *  <pf-tab title="Tab2">
 *    <p>Tab2 content here</p>
 *  </pf-tab>
 * </pf-tabs>
 *
 * @prop {string} title the tab title
 * @prop {string} active if attribute exists, tab will be active
 */
export class PfTab extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.appendChild(this._template.content);
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    var parent = this.parentNode;
    if (attrName === 'title' && parent && parent.handleTitle) {
      parent.handleTitle(this, newValue);
    }
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
  }

  /**
   * Get tab title
   *
   * @returns {string} The tab title
   */
  get title () {
    return this._title;
  }

  /**
   * Set tab title
   *
   * @param {string} value The tab title
   */
  set title (value) {
    if (this._title !== value) {
      this._title = value;
      this.setAttribute('title', value);
    }
  }

  /**
   * Get flag indicating tab is active
   *
   * @returns {boolean} True if tab is active
   */
  get active () {
    return this._active;
  }

  /**
   * Set flag indicating tab is active
   *
   * @param {boolean} value True to set tab active
   */
  set active (value) {
    if (this._active !== value) {
      this._active = value;
      this.setAttribute('active', value);
    }
  }
}
(function () {
  document.registerElement('pf-tab', PfTab);
}());
