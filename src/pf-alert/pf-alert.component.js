import {default as tmpl} from './pf-alert.template';
import {default as utils} from '../pf-utils/pf-utils';

/**
 * PfAlert element for Patternfly web components
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
   * Helper function to init alert type
   * @private
   */
  _initType () {
    let pficon = this._getElement('.pficon');
    switch (this.getAttribute("type")) {
      case "danger":
        this.classList.add(this._classNames.pfalert.danger);
        pficon.classList.add(this._classNames.pficon.danger);
        break;
      case "info":
        this.classList.add(this._classNames.pfalert.info);
        pficon.classList.add(this._classNames.pficon.info);
        break;
      case "success":
        this.classList.add(this._classNames.pfalert.success);
        pficon.classList.add(this._classNames.pficon.success);
        break;
      case "warning":
        this.classList.add(this._classNames.pfalert.warning);
        pficon.classList.add(this._classNames.pficon.warning);
        break;
    }
  }

  /**
   * Helper function to reset alert type
   * @param oldValue The old attribute value
   * @private
   */
  _resetType (oldValue) {
    let pficon = this._getElement('.pficon');
    switch (oldValue) {
      case "danger":
        this.classList.remove(this._classNames.pfalert.danger);
        pficon.classList.remove(this._classNames.pficon.danger);
        break;
      case "info":
        this.classList.remove(this._classNames.pfalert.info);
        pficon.classList.remove(this._classNames.pficon.info);
        break;
      case "success":
        this.classList.remove(this._classNames.pfalert.success);
        pficon.classList.remove(this._classNames.pficon.success);
        break;
      case "warning":
        this.classList.remove(this._classNames.pfalert.warning);
        pficon.classList.remove(this._classNames.pficon.warning);
        break;
    }
  }

  /**
   * Get pficon from this node or document fragment
   *
   * @param selector The query selector identifying the element to retrieve
   * @returns {Element}
   * @private
   */
  _getElement (selector) {
    let el = this.querySelector(selector);
    if (el === null) {
      el = this._template.content.querySelector(selector);
    }
    return el;
  }
}
(function () {
  document.registerElement('pf-alert', PfAlert);
}());
