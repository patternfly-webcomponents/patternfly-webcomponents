'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * PfChartUtil
 * Internal Utility Functions for Patternfly Web Components
 * --------------------------------------------------------------------------
 */

var PfChartUtil = function () {
  function PfChartUtil() {
    _classCallCheck(this, PfChartUtil);
  }
  /**
   * generate chart
   * @param {object} config
   */


  _createClass(PfChartUtil, [{
    key: 'generate',
    value: function generate(config) {
      return c3.generate(config);
    }

    /**
     * replace single quotes with double while parsing JSON strings
     * @param  e this
     * @param {string} attribute attribute's name
     */

  }, {
    key: 'getJSONAttribute',
    value: function getJSONAttribute(e, attribute) {
      return JSON.parse(e.getAttribute(attribute).replace(/'/g, '"'));
    }

    /**
     * c3 load function
     * @param {} chart
     * @param {object} obj
     */

  }, {
    key: 'load',
    value: function load(chart, obj) {
      chart.load(obj);
    }

    /**
     * c3 unload function
     * @param {} chart
     * @param {object} obj
     */

  }, {
    key: 'unload',
    value: function unload(chart, obj) {
      chart.unload(obj);
    }
  }]);

  return PfChartUtil;
}();

var pfChartUtil = new PfChartUtil();
exports.pfChartUtil = pfChartUtil;