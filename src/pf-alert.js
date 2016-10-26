(function(){
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var dangerTemplate = doc.querySelector('.pf-alert-danger-template');
  var infoTemplate = doc.querySelector('.pf-alert-info-template');
  var successTemplate = doc.querySelector('.pf-alert-success-template');
  var warningTemplate = doc.querySelector('.pf-alert-warning-template');

  // PfAlert Element
  class PfAlert extends HTMLDivElement {
    attachedCallback() {
      var template = warningTemplate;
      switch (this.getAttribute("type")) {
        case "danger":
          this.className = "alert alert-danger";
          template = dangerTemplate;
          break;
        case "info":
          this.className = "alert alert-info";
          template = infoTemplate;
          break;
        case "success":
          this.className = "alert alert-success";
          template = successTemplate;
          break;
        case "warning":
          this.className = "alert alert-warning";
          template = warningTemplate;
          break;
      }
      this.insertBefore(document.importNode(template.content, true), this.firstChild);
    }
  }
  document.registerElement('pf-alert', PfAlert);
})();