import {default as tmpl} from 'pf-hello.template';
import {i18n} from 'pf-utils';

/**
 * <b>&lt;pf-hello&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-hello></pf-hello>
 */
export class PfHello extends HTMLElement {
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
    if (attrName === "text") {
      this.refresh();
    }
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
    this.refresh();
  }

  /**
   * Get nodes from given selector
   *
   * @param selector The query selector identifying the elements to retrieve
   * @returns {Element}
   * @private
   */
  _getNodes (selector) {
    let el = this.querySelectorAll(selector);
    if (el.length === 0) {
      el = this._template.content.querySelectorAll(selector);
    }
    return el;
  }

  /**
   * Helper function to init text
   * @private
   */
  refresh() {
    let nodes = this._getNodes('span');
    let el = nodes[nodes.length - 1];
    el.innerHTML = i18n.gettext("Hello World!");
  }
}
(function () {
  document.registerElement('pf-hello', PfHello);
}());
