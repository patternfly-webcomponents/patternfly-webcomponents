/**
 * This is a fork of a repeater: github.com/Nevraeka/template-repeater
 */

class PFTemplateRepeater extends HTMLElement {

  render (val) {
    const renderError = "Content should be an Array of objects.";
    let template = this.template;
    let content = PFTemplateRepeater.fromJson(val);
    this.innerHTML = (Array.isArray(content) ? content.map(andApplyTemplate) : new Error(renderError).message).join('');

    function andApplyTemplate (item) {
      return "<pf-template>" + PFTemplateRepeater.interpolate(template.cloneNode(true), item) + "</pf-template>";
    }

    // dispatch a 'repeater content changed' event
    let event = new CustomEvent('RepeaterContentChanged', {});
    event.initCustomEvent('RepeaterContentChanged', true, true, {});
    this.dispatchEvent(event);

    return this.innerHTML;
  }

  attributeChangedCallback (name, oldVal, newVal) {
    if (name === "content" && typeof newVal === 'string') {
      this.template = this.querySelector('pf-template');
      this.render(newVal);
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

document.registerElement("pf-template-repeater", PFTemplateRepeater);