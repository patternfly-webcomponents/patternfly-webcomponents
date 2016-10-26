(function(){
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var utilBarChartTemplate = doc.querySelector('.utilization-bar-chart-template');
  var forEach = Array.prototype.forEach;

  //Pf-Utilization Bar Chart Custom Element
  class PfUtilizationBarChart extends HTMLElement {
    attachedCallback() {
      this.appendChild(document.importNode(utilBarChartTemplate.content, true));

      var percentageUsed = Math.round(100 * (this.getAttribute('used') / this.getAttribute('total')));

      var usedBar = this.querySelector('.progress-bar-used');
      var remainingBar = this.querySelector('.progress-bar-remaining');

      usedBar.setAttribute("style", "width: " + percentageUsed + "%;");
      usedBar.querySelector('.tooltiptext').innerText = percentageUsed + "% Used";
      remainingBar.setAttribute("style", "width: " + (100 - percentageUsed) + "%;");
      remainingBar.querySelector('.tooltiptext').innerText = (100 - percentageUsed) + "% Available";

      var errorThreshold = this.getAttribute('threshold-error');
      var warnThreshold = this.getAttribute('threshold-warning');

      if (errorThreshold || warnThreshold) {
        this.setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold);
      }
    }

    setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold){
      var thresholdClass;

      if (errorThreshold || warnThreshold) {
        if (percentageUsed >= errorThreshold) {
          thresholdClass = "progress-bar-danger";
        } else if (percentageUsed >= warnThreshold && percentageUsed < errorThreshold) {
          thresholdClass = "progress-bar-warning";
        } else if (percentageUsed < warnThreshold) {
          thresholdClass = "progress-bar-success";
        }

        if(thresholdClass){
          usedBar.setAttribute("class", usedBar.getAttribute("class") + " " + thresholdClass);
        }
      }
    }
  }

  document.registerElement('pf-utilization-bar-chart', PfUtilizationBarChart);
})();