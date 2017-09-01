/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ({

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**---------Patternfly Web Components Palette----------**/

var pfPaletteColors = {
  black: '#030303',
  black100: '#fafafa',
  black200: '#ededed',
  black300: '#d1d1d1',
  black400: '#bbbbbb',
  black500: '#8b8d8f',
  black600: '#72767b',
  black700: '#4d5258',
  black800: '#393f44',
  black900: '#292e34',
  blue: '#0088ce',
  blue100: '#bee1f4',
  blue200: '#7dc3e8',
  blue300: '#39a5dc',
  blue400: '#0088ce',
  blue500: '#00659c',
  blue600: '#004368',
  blue700: '#002235',
  gold: '#f0ab00',
  gold100: '#fbeabc',
  gold200: '#f9d67a',
  gold300: '#f5c12e',
  gold400: '#f0ab00',
  gold500: '#b58100',
  gold600: '#795600',
  gold700: '#3d2c00',
  orange: '#ec7a08',
  orange100: '#fbdebf',
  orange200: '#f7bd7f',
  orange300: '#f39d3c',
  orange400: '#ec7a08',
  orange500: '#b35c00',
  orange600: '#773d00',
  orange700: '#3b1f00',
  lightBlue: '#00b9e4',
  lightBlue100: '#beedf9',
  lightBlue200: '#7cdbf3',
  lightBlue300: '#35caed',
  lightBlue400: '#00b9e4',
  lightBlue500: '#008bad',
  lightBlue600: '#005c73',
  lightBlue700: '#002d39',
  green: '#3f9c35',
  green100: '#cfe7cd',
  green200: '#9ecf99',
  green300: '#6ec664',
  green400: '#3f9c35',
  green500: '#2d7623',
  green600: '#1e4f18',
  green700: '#0f280d',
  lightGreen: '#92d400',
  lightGreen100: '#e4f5bc',
  lightGreen200: '#c8eb79',
  lightGreen300: '#ace12e',
  lightGreen400: '#92d400',
  lightGreen500: '#6ca100',
  lightGreen600: '#486b00',
  lightGreen700: '#253600',
  cyan: '#007a87',
  cyan100: '#bedee1',
  cyan200: '#7dbdc3',
  cyan300: '#3a9ca6',
  cyan400: '#007a87',
  cyan500: '#005c66',
  cyan600: '#003d44',
  cyan700: '#001f22',
  purple: '#703fec',
  purple100: '#c7bfff',
  purple200: '#a18fff',
  purple300: '#8461f7',
  purple400: '#703fec',
  purple500: '#582fc0',
  purple600: '#40199a',
  purple700: '#1f0066',
  red: '#cc0000',
  red100: '#cc0000',
  red200: '#a30000',
  red300: '#8b0000',
  red400: '#470000',
  red500: '#2c0000'
};

exports.pfPaletteColors = pfPaletteColors;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfDonutChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfChartUtils = __webpack_require__(3);

var _pfPaletteColors = __webpack_require__(29);

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

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* pf-donut-chart webcomponent */
__webpack_require__(49);

/***/ })

/******/ });