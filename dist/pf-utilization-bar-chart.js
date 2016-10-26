'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var utilBarChartTemplate = doc.querySelector('.utilization-bar-chart-template');
  var forEach = Array.prototype.forEach;

  //Pf-Utilization Bar Chart Custom Element

  var PfUtilizationBarChart = function (_HTMLElement) {
    _inherits(PfUtilizationBarChart, _HTMLElement);

    function PfUtilizationBarChart() {
      _classCallCheck(this, PfUtilizationBarChart);

      return _possibleConstructorReturn(this, (PfUtilizationBarChart.__proto__ || Object.getPrototypeOf(PfUtilizationBarChart)).apply(this, arguments));
    }

    _createClass(PfUtilizationBarChart, [{
      key: 'attachedCallback',
      value: function attachedCallback() {
        this.appendChild(document.importNode(utilBarChartTemplate.content, true));

        var percentageUsed = Math.round(100 * (this.getAttribute('used') / this.getAttribute('total')));

        var usedBar = this.querySelector('.progress-bar-used');
        var remainingBar = this.querySelector('.progress-bar-remaining');

        usedBar.setAttribute("style", "width: " + percentageUsed + "%;");
        usedBar.querySelector('.tooltiptext').innerText = percentageUsed + "% Used";
        remainingBar.setAttribute("style", "width: " + (100 - percentageUsed) + "%;");
        remainingBar.querySelector('.tooltiptext').innerText = 100 - percentageUsed + "% Available";

        var errorThreshold = this.getAttribute('threshold-error');
        var warnThreshold = this.getAttribute('threshold-warning');

        if (errorThreshold || warnThreshold) {
          this.setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold);
        }
      }
    }, {
      key: 'setUsedBarThresholdColor',
      value: function setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold) {
        var thresholdClass;

        if (errorThreshold || warnThreshold) {
          if (percentageUsed >= errorThreshold) {
            thresholdClass = "progress-bar-danger";
          } else if (percentageUsed >= warnThreshold && percentageUsed < errorThreshold) {
            thresholdClass = "progress-bar-warning";
          } else if (percentageUsed < warnThreshold) {
            thresholdClass = "progress-bar-success";
          }

          if (thresholdClass) {
            usedBar.setAttribute("class", usedBar.getAttribute("class") + " " + thresholdClass);
          }
        }
      }
    }]);

    return PfUtilizationBarChart;
  }(HTMLElement);

  document.registerElement('pf-utilization-bar-chart', PfUtilizationBarChart);
})();