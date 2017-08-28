/**
 * --------------------------------------------------------------------------
 * PfChartUtil
 * Internal Utility Functions for Patternfly Web Components
 * --------------------------------------------------------------------------
 */

class PfChartUtil {

  constructor() {

  }
  /**
   * generate chart
   * @param {object} config
   */
  generate(config) {
    return c3.generate(config);
  }

  /**
   * replace single quotes with double while parsing JSON strings
   * @param  e this
   * @param {string} attribute attribute's name
   */
  getJSONAttribute(e, attribute) {
    return JSON.parse(e.getAttribute(attribute).replace(/'/g, '"'));
  }

  /**
   * c3 load function
   * @param {} chart
   * @param {object} obj
   */
  load(chart, obj) {
    chart.load(obj);
  }

  /**
   * c3 unload function
   * @param {} chart
   * @param {object} obj
   */
  unload(chart, obj) {
    chart.unload(obj);
  }
}

let pfChartUtil = new PfChartUtil();
export { pfChartUtil };