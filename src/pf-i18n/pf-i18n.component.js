import {i18n} from 'i18n-utils';

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
export class PfI18n extends HTMLElement {

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['mixin'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    this._init();
  }

  /*
   * An instance of the element is created or upgraded
   */
  constructor () {
    super();

    this._init();
  }

  /**
   * Helper function to init i18n mixin
   * @private
   */
  _init() {
    if (this.getAttribute('mixin') !== null) {
      let mixin = new Function('return ' + this.getAttribute('mixin'));
      i18n.setMixin(mixin());
    }
  }
}

window.customElements.define('pf-i18n', PfI18n);
