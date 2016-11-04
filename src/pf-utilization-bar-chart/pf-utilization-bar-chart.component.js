import {default as defaultTemplate} from 'pf-utilization-bar-chart.default.template';
import {inline as inlineTemplate} from 'pf-utilization-bar-chart.inline.template';

export class PfUtilizationBarChart extends HTMLElement {
  createdCallback () {
    this._lastThresholdClass;
    this._layout;
  }

  attachedCallback () {
    this._layout = this.getAttribute('layout');
    if (this._layout && this._layout === 'inline') {
      this.innerHTML = inlineTemplate;
    } else {
      this.innerHTML = defaultTemplate;
    }
    this.updateChart();
  }

  attributeChangedCallback (attributeName, oldValue, newValue) {
    this.updateChart();
  }

  updateChart () {
    let chartTitle = this.getAttribute('chart-title');
    if (chartTitle) {
      this.querySelector('.progress-description').innerText = chartTitle;
    }

    let usedBar = this.querySelector('.progress-bar-used');
    let remainingBar = this.querySelector('.progress-bar-remaining');

    let usedValue = this.getAttribute('used');
    let totalValue = this.getAttribute('total');
    let units = this.getAttribute('units') !== null ? this.getAttribute('units') : "";

    if (this._layout && this._layout === 'inline') {
      usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " " + units;
    } else {
      usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " of " + totalValue + " " + units;
    }

    let percentageUsed = Math.round(100 * (usedValue / totalValue));

    usedBar.setAttribute("style", "width: " + percentageUsed + "%;");
    remainingBar.setAttribute("style", "width: " + (100 - percentageUsed) + "%;");

    let errorThreshold = this.getAttribute('threshold-error');
    let warnThreshold = this.getAttribute('threshold-warning');

    if (errorThreshold || warnThreshold) {
      this.setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold);
    }
  }

  setUsedBarThresholdColor (usedBar, percentageUsed, errorThreshold, warnThreshold) {
    let thresholdClass;

    if (errorThreshold || warnThreshold) {
      if (percentageUsed >= errorThreshold) {
        thresholdClass = "progress-bar-danger";
      } else if (percentageUsed >= warnThreshold && percentageUsed < errorThreshold) {
        thresholdClass = "progress-bar-warning";
      } else if (percentageUsed < warnThreshold) {
        thresholdClass = "progress-bar-success";
      }

      if (thresholdClass !== this._lastThresholdClass) {
        let event = new CustomEvent('thresholdSet', {'id':this.getAttribute('id'), 'threshold':thresholdClass});
        event.initCustomEvent('thresholdSet', true, true, {'id':this.getAttribute('id'), 'threshold':thresholdClass});
        usedBar.classList.remove(this._lastThresholdClass);
        usedBar.classList.add(thresholdClass);
        this._lastThresholdClass = thresholdClass;
        usedBar.dispatchEvent(event);
      }
    }
  }
}
(function () {
  document.registerElement('pf-utilization-bar-chart', PfUtilizationBarChart);
})();