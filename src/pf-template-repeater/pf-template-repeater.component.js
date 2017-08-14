/**
 * <b>&lt;pf-template-repeater&gt;</b> element for Patternfly Web Components
 *
 * This is a fork of a template-repeater: <a href="http://github.com/Nevraeka/template-repeater">http://github.com/Nevraeka/template-repeater</a>
 *
 * @example {@lang xml}
 * <pf-template-repeater id="example1-content" content='[{"name": "Big Bird", "address": "1 Seaseme Street"}]'>
 *
 *
 * @prop {string} content the json stringified content
 */

class PFTemplateRepeater extends HTMLElement {

  /**
   * Renders the &lt;pf-template&gt; using PFTemplateRepeater
   *
   * @param {string} val The json content
   */
  render (val) {
    const renderError = "Content should be an Array of objects.";
    let template = this.template;
    let content = PFTemplateRepeater.fromJson(val);
    this.innerHTML = (Array.isArray(content) ? content.map(andApplyTemplate) : new Error(renderError).message).join('');

    function andApplyTemplate (item) {
      return "<pf-template>" + PFTemplateRepeater.interpolate(template.cloneNode(true), item) + "</pf-template>";
    }

    // dispatch a 'repeater content changed' event
    let event = new CustomEvent('pf-template-repeater.ContentChanged', {});
    event.initCustomEvent('pf-template-repeater.ContentChanged', true, true, {});
    this.dispatchEvent(event);

    return this.innerHTML;
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['content'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (name, oldVal, newVal) {
    if (name === "content" && typeof newVal === 'string') {
      this.template = this.querySelector('pf-template');
      if (this.template) {
        this.render(newVal);
      }
    }
  }

  static interpolate (template, content) {
    let contentArr = Object.keys(content);
    let updatedHTML = "";

    if (typeof content === "object") {

      contentArr.forEach(andIterateOverData);

      function andIterateOverData (item) {
        template.innerHTML = template.innerHTML.replace("${" + item + "}", content[item]);
      }

      updatedHTML += template.innerHTML;
    }

    return updatedHTML;

  }

  static fromJson (str) {
    let obj = [];
    if (typeof str === "string") {
      try {
        obj = JSON.parse(str);
      } catch (e) {
        // throw new Error("Invalid JSON string provided. ");
      }
    }
    return obj;
  }
}

window.customElements.define("pf-template-repeater", PFTemplateRepeater);