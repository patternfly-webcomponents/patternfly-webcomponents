import {default as tmpl} from 'pf-alert.template';
import {default as utils} from 'pf-utils';

/**
 * PfAlert element for Patternfly web components
 *
 * ToDo: Document attrbutes and examples.
 */
export class PfAlert extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.insertBefore(this._template.content, this.firstChild);
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === "type") {
      this._resetType(oldValue, newValue);
      this._initType();
    } else if (attrName === "persistent" || attrName === "persistentCallbackFn") {
      this._initPersistent();
    }
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
    this.classList.add("alert");
    this._initDefaults();
    this._initPersistent();
    this._initType();
  }

  /**
   * Helper function to init defaults
   * @private
   */
  _initDefaults () {
    this._classNames = {
      "pfalert": {
        "danger": "alert-danger",
        "info": "alert-info",
        "success": "alert-success",
        "warning": "alert-warning"
      },
      "pficon": {
        "danger": "pficon-error-circle-o",
        "info": "pficon-info",
        "success": "pficon-ok",
        "warning": "pficon-warning-triangle-o"
      }
    };
  }

  /**
   * Helper function to make alert persistent
   * @private
   */
  _initPersistent () {
    let self = this;
    let nodes = this._getNodes('button.close');
    let el = nodes[0];
    if (this.getAttribute("persistent") === "true") {
      this.classList.add("alert-dismissable");
      if (el !== undefined) {
        el.classList.remove("hidden");
        el.setAttribute('onclick', this.getAttribute("persistentCallbackFn"));
      }
    } else {
      this.classList.remove("alert-dismissable");
      if (el !== undefined) {
        el.classList.add("hidden");
      }
    }
  }

  /**
   * Helper function to init alert type
   * @private
   */
  _initType () {
    let nodes = this._getNodes('span.pficon');
    let el = nodes[nodes.length - 1];
    switch (this.getAttribute("type")) {
      case "danger":
        this.classList.add(this._classNames.pfalert.danger);
        el.classList.add(this._classNames.pficon.danger);
        break;
      case "info":
        this.classList.add(this._classNames.pfalert.info);
        el.classList.add(this._classNames.pficon.info);
        break;
      case "success":
        this.classList.add(this._classNames.pfalert.success);
        el.classList.add(this._classNames.pficon.success);
        break;
      case "warning":
        this.classList.add(this._classNames.pfalert.warning);
        el.classList.add(this._classNames.pficon.warning);
        break;
    }
  }

  /**
   * Helper function to reset alert type
   * @param oldValue The old attribute value
   * @private
   */
  _resetType (oldValue) {
    let nodes = this._getNodes('span.pficon');
    let el = nodes[nodes.length - 1];
    switch (oldValue) {
      case "danger":
        this.classList.remove(this._classNames.pfalert.danger);
        el.classList.remove(this._classNames.pficon.danger);
        break;
      case "info":
        this.classList.remove(this._classNames.pfalert.info);
        el.classList.remove(this._classNames.pficon.info);
        break;
      case "success":
        this.classList.remove(this._classNames.pfalert.success);
        el.classList.remove(this._classNames.pficon.success);
        break;
      case "warning":
        this.classList.remove(this._classNames.pfalert.warning);
        el.classList.remove(this._classNames.pficon.warning);
        break;
    }
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
}
(function () {
  document.registerElement('pf-alert', PfAlert);
}());
