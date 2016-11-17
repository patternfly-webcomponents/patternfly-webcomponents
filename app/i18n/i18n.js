var i18n = function() {
  /**
   * Internationalization util.
   *
   * @parm {string} locale The locale for message translations.
   * @constructor
   */
  var I18nUtil = function (locale) {
    var self = this;

    /**
     * Get locale
     *
     * @return {string} The current locale
     */
    this.getLocale = function () {
      return self.locale;
    };

    /**
     * Get translated message.
     *
     * Note: This function is used with the pf-i18n tag.
     *
     * @param {string} key The message key
     */
    this.getMsg = function (key) {
      return self.jed.gettext(key);
    };

    /**
     * Set locale
     *
     * @param {string} locale
     */
    this.setLocale = function (locale) {
      self.locale = locale;
      self._initLocaleData();
    };

    // Private functions

    /**
     * Fetch locale data
     *
     * @param url
     * @private
     */
    this._fetchLocaleData = function(url) {
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const localeData = JSON.parse(this.responseText);
          self._setLocaleData(localeData);
        }
      };
      xmlhttp.open("GET", url, false);
      xmlhttp.send();
    };

    /**
     * Initialize locale data
     *
     * @param locale
     * @private
     */
    this._initLocaleData = function(locale) {
      let links = document.querySelectorAll('link[rel="localization"]');
      if (links !== null && links.length > 0) {
        for (let i = 0; i < links.length; i++) {
          const hreflang = links[i].getAttribute('hreflang');
          if (hreflang === self.locale) {
            self._fetchLocaleData(links[i].getAttribute('href'));
            break;
          }
        }
      }
    };

    /**
     * Set locale data
     *
     * @param localeData
     * @private
     */
    this._setLocaleData = function(localeData) {
      if (typeof Jed === 'function') {
        self.jed = new Jed(localeData);
      }
    };

    this.setLocale(locale);
  };
  return new I18nUtil("de-DE");
}();
