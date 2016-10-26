import {default as tmpl} from './pf-icon-tmpl';

// PfIcon Element
export class PfIcon extends HTMLElement {
  // Fires when an instance was inserted into the document.
  attachedCallback() {
    switch (this.getAttribute("type")) {
      case "danger": this._template = tmpl.danger; break;
      case "info": this._template = tmpl.info; break;
      case "success": this._template = tmpl.success; break;
      case "warning": this._template = tmpl.warning; break;
    }
    this.innerHTML = this._template;
  };

  // Fires when an instance of the element is created.
  createdCallback() {
    this._template = tmpl.warning;
  };
}
(function() {
  document.registerElement('pf-icon', PfIcon);
}());
