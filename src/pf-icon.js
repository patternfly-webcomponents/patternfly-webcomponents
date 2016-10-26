(function(){
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var dangerTemplate = doc.querySelector('.pf-icon-danger-template');
  var infoTemplate = doc.querySelector('.pf-icon-info-template');
  var successTemplate = doc.querySelector('.pf-icon-success-template');
  var warningTemplate = doc.querySelector('.pf-icon-warning-template');

  // PfIcon Element
  class PfIcon extends HTMLElement {
    attachedCallback() {
      var template = warningTemplate;
      switch (this.getAttribute("type")) {
        case "danger": template = dangerTemplate; break;
        case "info": template = infoTemplate; break;
        case "success": template = successTemplate; break;
        case "warning": template = warningTemplate; break;
      }
      this.appendChild(document.importNode(template.content, true));
    }
  }
  document.registerElement('pf-icon', PfIcon);
})();