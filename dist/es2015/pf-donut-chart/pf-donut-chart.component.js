'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfDonutChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfChartUtils = require('pf-chart-utils.js');

var _pfPaletteColors = require('pf-palette-colors.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *<b>&lt;pf-dropdown&gt;</b> element for Patternfly Web Components
 *
 * <pf-donut-chart></pf-donut-chart>
 *
 * @prop {array} columns data for chart in columns
 * @prop {array} rows data for chart in rows
 * @prop {array} json data for chart
 * @prop {string} url url/path for chart either in .json or .csv
 * @prop {JSON} colors colors for data (colors method takes object as argument)
 * @prop {JSON} data additional data for c3.data (method takes object as argument)
 * @prop {string} width width of chart
 * @prop {string} height height of chart
 * @prop {JSON} legend c3 legend for chart (method takes object as argument)
 * @prop {string} target-selector target element selector
 * @prop {string} title title for chart
 *
 * @method tooltip takes an object as argument with its properties show and content
 * @method onclick takes a function as argument -- for c3 data.onclick
 * @method onmouseover takes a function as argument -- for c3 data.onmouseover
 * @method onmouseout takes a function as argument -- for c3 data.onmouseout
 * @method load takes an object as argument -- for c3 api load
 * @method unload takes an object as argument -- for c3 api unload
 */

var PfDonutChart = exports.PfDonutChart = function (_HTMLElement) {
  _inherits(PfDonutChart, _HTMLElement);

  _createClass(PfDonutChart, [{
    key: 'init',


    /**
     * Reinitializes with attribute values and resets content
     */
    value: function init() {
      this._additionalData = this.getAttribute('data') ? _pfChartUtils.pfChartUtil.getJSONAttribute(this, 'data') : {};
      this._width = this.getAttribute('width') ? parseInt(this.getAttribute('width')) : null;
      this._height = this.getAttribute('height') ? parseInt(this.getAttribute('height')) : 171;
      this._legend = this.getAttribute('legend') ? _pfChartUtils.pfChartUtil.getJSONAttribute(this, 'legend') : { show: false };
      this._targetSelector = this.getAttribute('target-selector');
      this._title = this.getAttribute('title') ? this.getAttribute('title') : '';
      this._colors = this.getAttribute('colors') ? _pfChartUtils.pfChartUtil.getJSONAttribute(this, 'colors') : {};
      this._getData();
      this._prepareData();
    }

    /**
     * Called when an instance was inserted into the document
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.init();
    }

    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */

  }, {
    key: 'attributeChangedCallback',


    /**
    * Called when element's attribute value has changed
    *
    * @param {string} attrName The attribute name that has changed
    * @param {string} oldValue The old attribute value
    * @param {string} newValue The new attribute value
    */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      this.init();
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['width', 'height', 'legend', 'target-selector', 'title', 'data', 'colors', 'columns', 'rows', 'json', 'url'];
    }
  }]);

  function PfDonutChart() {
    _classCallCheck(this, PfDonutChart);

    return _possibleConstructorReturn(this, (PfDonutChart.__proto__ || Object.getPrototypeOf(PfDonutChart)).call(this));
  }

  /**
   * Get chart width
   * @returns {number}
   */


  _createClass(PfDonutChart, [{
    key: 'onclick',


    /**
     * set data.onclick
     */
    value: function onclick(func) {
      this._onclick = func;
      this._prepareData();
    }

    /**
     *  set data.onmouseover
     */

  }, {
    key: 'onmouseover',
    value: function onmouseover(func) {
      this._onmouseover = func;
      this._prepareData();
    }

    /**
     * set data.onmouseout
     */

  }, {
    key: 'onmouseout',
    value: function onmouseout(func) {
      this._onmouseout = func;
      this._prepareData();
    }

    /**
     * get data in columns/rows/json/url format
     */

  }, {
    key: '_getData',
    value: function _getData() {
      if (this.getAttribute('columns')) {
        this._inputData = _pfChartUtils.pfChartUtil.getJSONAttribute(this, 'columns');
        this._dataFormat = 'columns';
      } else if (this.getAttribute('rows')) {
        this._inputData = _pfChartUtils.pfChartUtil.getJSONAttribute(this, 'rows');
        this._dataFormat = 'rows';
      } else if (this.getAttribute('json')) {
        this._inputData = _pfChartUtils.pfChartUtil.getJSONAttribute(this, 'json');
        this._dataFormat = 'json';
      } else if (this.getAttribute('url')) {
        this._inputData = this.getAttribute('url');
        this._dataFormat = 'url';
      }
    }

    /**
     * prepare c3 data
     */

  }, {
    key: '_prepareData',
    value: function _prepareData() {
      switch (this._dataFormat) {
        case 'columns':
          this._data = {
            columns: this._inputData,
            type: 'donut'
          };
          break;

        case 'rows':
          this._data = {
            rows: this._inputData,
            type: 'donut'
          };
          break;

        case 'json':
          this._data = {
            json: this._inputData,
            type: 'donut'
          };
          break;

        case 'url':
          if (/.json/.test(this._inputData)) {
            this._data = {
              url: this._inputData,
              type: 'donut',
              mimeType: 'json'
            };
          } else {
            this._data = {
              url: this._inputData,
              type: 'donut'
            };
          }
          break;
      }
      if (this.getAttribute('colors') || this._colors) {
        this._data["colors"] = this._colors;
      }
      if (this._onmouseover) {
        this._data["onmouseover"] = this._onmouseover;
      }
      if (this._onclick) {
        this._data["onclick"] = this._onclick;
      }
      if (this._onmouseout) {
        this._data["onmouseout"] = this._onmouseout;
      }
      this._prepareChart();
    }

    /**
     * generate c3 chart
     */

  }, {
    key: '_prepareChart',
    value: function _prepareChart() {
      var config = {
        bindto: this._targetSelector,
        data: Object.assign({}, this._data, this._additionalData),
        donut: {
          title: this._title,
          label: {
            show: false
          },
          width: 11
        },
        color: {
          pattern: [_pfPaletteColors.pfPaletteColors.blue, _pfPaletteColors.pfPaletteColors.black300]
        },
        size: {
          width: this._width,
          height: this._height
        },
        legend: this._legend,
        tooltip: Object.assign({}, { show: false }, this._tooltip)
      };

      this.donutChart = _pfChartUtils.pfChartUtil.generate(config);
    }

    /**
     * wrapper for c3 api load
     * @param {object} obj
     */

  }, {
    key: 'load',
    value: function load(obj) {
      _pfChartUtils.pfChartUtil.load(this.donutChart, obj);
    }

    /**
     * wrapper for c3 api unload
     * @param {object} obj
     */

  }, {
    key: 'unload',
    value: function unload(obj) {
      _pfChartUtils.pfChartUtil.unload(this.donutChart, obj);
    }
  }, {
    key: 'width',
    get: function get() {
      return this._width;
    }

    /**
     * Set chart width
     */
    ,
    set: function set(value) {
      if (this._width !== value) {
        this._width = value;
        this.setAttribute('width', value);
      }
    }

    /**
     *  Get chart height
     * @returns {number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this._height;
    }

    /**
     * Set chart height
     */
    ,
    set: function set(value) {
      if (this._height !== value) {
        this._height = value;
        this.setAttribute('height', value);
      }
    }

    /**
     * Get charts legend
     * @returns {object}
     */

  }, {
    key: 'legend',
    get: function get() {
      return this._legend;
    }

    /**
     * Set chart legeng
     * @param {object} value object contains legend properties
     */
    ,
    set: function set(value) {
      this._legend = value;
      this._prepareChart();
    }

    /**
     * Get chart title
     * @returns {string} title of donut
     */

  }, {
    key: 'title',
    get: function get() {
      return this._title;
    }

    /**
     * Set chart title
     * @param {string} value title string
     */
    ,
    set: function set(value) {
      if (this._title !== value) {
        this._title = value;
        this.setAttribute('title', value);
      }
    }

    /**
     * Get target-selector
     * @returns {string} target to which chart is binded
     */

  }, {
    key: 'targetSelector',
    get: function get() {
      return this._targetSelector;
    }

    /**
     * Set target-selector
     * @param {string} value the element target selector
     */
    ,
    set: function set(value) {
      if (this._targetSelector !== value) {
        this._targetSelector = value;
        this.setAttribute('target-selector', value);
      }
    }

    /**
     * get additional data
     * @returns {object}
     */

  }, {
    key: 'data',
    get: function get() {
      return this._additionalData;
    }

    /**
     * set additional data  for c3
     * @param {object} obj additional data object
     */
    ,
    set: function set(obj) {
      this._additionalData = obj;
      this._prepareChart();
    }

    /**
     * get colors
     * @returns {object}
     */

  }, {
    key: 'colors',
    get: function get() {
      return this._colors;
    }

    /**
     * set colors for c3 data.colors
     * @param {object} obj colors object
     */
    ,
    set: function set(obj) {
      this._colors = obj;
      this._prepareData();
    }

    /**
     * get c3 tooltip object
     * @returns {object}
     */

  }, {
    key: 'tooltip',
    get: function get() {
      return this._tooltip;
    }

    /**
     * set c3 tootltip object
     * @param {object} obj object for tooltip
     */
    ,
    set: function set(obj) {
      this._tooltip = obj;
      this._prepareChart();
    }
  }]);

  return PfDonutChart;
}(HTMLElement);

window.customElements.define('pf-donut-chart', PfDonutChart);