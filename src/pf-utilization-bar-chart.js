(function(){
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var utilBarChartTemplate = doc.querySelector('.utilization-bar-chart-template');
  var lastThresholdClass;
  var layout;
  var forEach = Array.prototype.forEach;

  //Pf-Utilization Bar Chart Custom Element
  class PfUtilizationBarChart extends HTMLElement {
    attachedCallback() {
      layout = this.getAttribute('layout');
      if(layout && layout === 'inline') {
        utilBarChartTemplate = doc.querySelector('.utilization-bar-chart-inline-template');
      }
      this.appendChild(document.importNode(utilBarChartTemplate.content, true));
      this.updateChart();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      this.updateChart();
    }

    updateChart() {
      var chartTitle = this.getAttribute('chart-title');
      if(chartTitle) {
        this.querySelector('.progress-description').innerText = chartTitle;
      }

      var usedBar = this.querySelector('.progress-bar-used');
      var remainingBar = this.querySelector('.progress-bar-remaining');

      var usedValue = this.getAttribute('used');
      var totalValue = this.getAttribute('total');
      var units = this.getAttribute('units') !== null ? this.getAttribute('units') : "";

      if(layout && layout === 'inline') {
        usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " " + units;
      } else {
        usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " of " + totalValue + " " + units;
      }

      var percentageUsed = Math.round(100 * (usedValue / totalValue));

      usedBar.setAttribute("style", "width: " + percentageUsed + "%;");
      remainingBar.setAttribute("style", "width: " + (100 - percentageUsed) + "%;");

      var errorThreshold = this.getAttribute('threshold-error');
      var warnThreshold = this.getAttribute('threshold-warning');

      if (errorThreshold || warnThreshold) {
        this.setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold);
      }
    }

    setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold) {
      var thresholdClass;

      if (errorThreshold || warnThreshold) {
        if (percentageUsed >= errorThreshold) {
          thresholdClass = "progress-bar-danger";
        } else if (percentageUsed >= warnThreshold && percentageUsed < errorThreshold) {
          thresholdClass = "progress-bar-warning";
        } else if (percentageUsed < warnThreshold) {
          thresholdClass = "progress-bar-success";
        }

        if(thresholdClass != lastThresholdClass){
          var event = new CustomEvent('thresholdSet', {'threshold':thresholdClass});
          event.initCustomEvent('thresholdSet', true, true, {'threshold':thresholdClass});
          usedBar.classList.remove(lastThresholdClass);
          usedBar.classList.add(thresholdClass);
          lastThresholdClass = thresholdClass;
          usedBar.dispatchEvent(event);
        }
      }
    }
  }

  document.registerElement('pf-utilization-bar-chart', PfUtilizationBarChart);
})();