import {default as defaultTemplate} from 'pf-utilization-bar-chart.default.template';
import {inline as inlineTemplate} from 'pf-utilization-bar-chart.inline.template';

/**
 * <b>&lt;pf-utilization-bar-chart&gt;</b> element for Patternfly Web Components
 *
 * @example <caption>Default Layout, no Thresholds</caption> {@lang xml}
 * <pf-utilization-bar-chart chart-title="RAM Usage" used="8" total="24" units="MB"></pf-utilization-bar-chart>
 *
 * @example <caption>Default Layout, no Thresholds</caption> {@lang xml}
 * <pf-utilization-bar-chart chart-title="RAM Usage" used="8" total="24" units="MB"></pf-utilization-bar-chart>
 *
 * @example <caption>Inline Layout</caption> {@lang xml}
 * <pf-utilization-bar-chart id="thresholdExample2" chart-title="Disk I/O" layout="inline" used="450" total="500" units="I/Ops" threshold-warning="60" threshold-error="85"></pf-utilization-bar-chart>
 *
 * @prop {string} chart-title the chart title
 * @prop {string} layout 'inline' for inline layout
 * @prop {number} used the percentage used
 * @prop {number} total the percentage total
 * @prop {string} units the display units
 * @prop {number} threshold-warning the warning threshold
 * @prop {number} threshold-error the error threshold
 */
export class PfUtilizationBarChart extends HTMLElement {
  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._lastThresholdClass;
    this._layout;
  }

  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this._layout = this.getAttribute('layout');
    if (this._layout && this._layout === 'inline') {
      this.innerHTML = inlineTemplate;
    } else {
      this.innerHTML = defaultTemplate;
    }
    this.updateChart();
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attributeName, oldValue, newValue) {
    this.updateChart();
  }

  /**
   * Updates chart content
   */
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

  /**
   * Sets the used bar threshold color, percentageUsed, errorThreshold, warnThreshold
   */
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