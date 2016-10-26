import {default as tmpl} from './pf-alert-tmpl';

// PfAlert Element
export class PfAlert extends HTMLElement {
  // Fires when an instance was inserted into the document.
  attachedCallback() {
    switch (this.getAttribute("type")) {
      case "danger":
        this.className = "alert alert-danger";
        this._template = tmpl.danger;
        break;
      case "info":
        this.className = "alert alert-info";
        this._template = tmpl.info;
        break;
      case "success":
        this.className = "alert alert-success";
        this._template = tmpl.success;
        break;
      case "warning":
        this.className = "alert alert-warning";
        this._template = tmpl.warning;
        break;
    }
    this.innerHTML = this._template + this.innerHTML;
  };

  // Fires when an instance of the element is created.
  createdCallback() {
    this._template = tmpl.warning;
  };
}
(function() {
  document.registerElement('pf-alert', PfAlert);
}());
