'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfI18n = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _i18nUtils = require('i18n-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-i18n&gt;</b> element for Patternfly Web Components
 *
 * @example <caption>Example with object literal:</caption> {@lang xml}
 * <script>
 *   var i18n = {
 *     "Hello World!": "Hello World! (de-DE)"
 *   };
 * <script>
 * <pf-i18n mixin="i18n">
 *
 * @example <caption>Example with Jed and translated JSON files:</caption> {@lang xml}
 * <link rel="localization" href="/app/i18n/fr/patternfly.json" hreflang="fr">
 * <link rel="localization" href="/app/i18n/de-DE/patternfly.json" hreflang="de-DE">
 * <script src="//cdnjs.cloudflare.com/ajax/libs/jed/1.1.1/jed.min.js"></script>
 * <script>
 *   var i18n = function() {
 *     var I18nUtil = function (locale) {
 *       var self = this;
 *
 *       // NOTE: This function is required for the pf-i18n tag to retrieve translated messages.
 *       this.getMsg = function (key) {
 *         return self.jed.gettext(key);
 *       };
 *
 *       // Fetch locale data
 *       this._fetchLocaleData = function(url) {
 *         let xmlhttp = new XMLHttpRequest();
 *         xmlhttp.onreadystatechange = function () {
 *           if (this.readyState === 4 && this.status === 200) {
 *             const localeData = JSON.parse(this.responseText);
 *             self.jed = new Jed(localeData);
 *           }
 *         };
 *         xmlhttp.open("GET", url, false);
 *         xmlhttp.send();
 *       };
 *
 *       // Initialize locale data
 *       this._initLocaleData = function(locale) {
 *         let links = document.querySelectorAll('link[rel="localization"]');
 *         if (links !== null && links.length > 0) {
 *           for (let i = 0; i < links.length; i++) {
 *             const hreflang = links[i].getAttribute('hreflang');
 *             if (hreflang === locale) {
 *               self._fetchLocaleData(links[i].getAttribute('href'));
 *               break;
 *             }
 *           }
 *         }
 *       };
 *       this._initLocaleData(locale);
 *     };
 *     return new I18nUtil("de-DE");
 *   }();
 * </script>
 * <pf-i18n mixin="i18n">
 *
 * @example <caption>Example task for compiling .po files to JSON, formatted for Jed:</caption>
 * gulp.task('gettext-compile', function() {
 *   return gulp.src('src/po/** /*.po')
 *     .pipe(po2json({
 *       pretty: true,
 *       format: 'jed1.x'
 *     }))
 *     .pipe(gulp.dest("dist/i18n"));
 * });
 *
 * @prop {string} mixin i18n or custom mixin name
 */
var PfI18n = exports.PfI18n = function (_HTMLElement) {
  _inherits(PfI18n, _HTMLElement);

  _createClass(PfI18n, [{
    key: 'attributeChangedCallback',


    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      this._init();
    }

    /*
     * An instance of the element is created or upgraded
     */

  }], [{
    key: 'observedAttributes',


    /*
     * Only attributes listed in the observedAttributes property will receive this callback
     */
    get: function get() {
      return ['mixin'];
    }
  }]);

  function PfI18n() {
    _classCallCheck(this, PfI18n);

    var _this = _possibleConstructorReturn(this, (PfI18n.__proto__ || Object.getPrototypeOf(PfI18n)).call(this));

    _this._init();
    return _this;
  }

  /**
   * Helper function to init i18n mixin
   * @private
   */


  _createClass(PfI18n, [{
    key: '_init',
    value: function _init() {
      if (this.getAttribute('mixin') !== null) {
        var mixin = new Function('return ' + this.getAttribute('mixin'));
        _i18nUtils.i18n.setMixin(mixin());
      }
    }
  }]);

  return PfI18n;
}(HTMLElement);

window.customElements.define('pf-i18n', PfI18n);
