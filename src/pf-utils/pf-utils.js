// ToDo: Add more utils here

/**
 * Internationalization util.
 *
 * See pf-i18n element for initialization details.
 *
 * @constructor
 */
let I18nUtil = function() {
  let self = this;

  /**
   * Get localized text.
   *
   * @param {string} key The message key
   */
  this.gettext = function(key) {
    if (self.mixin !== undefined && typeof self.mixin.getMsg === 'function') {
      return self.mixin.getMsg(key);
    } else if (self.mixin !== undefined) {
      return self.mixin[key];
    }
    return key;
  };

  /**
   * Set an object literal containing translated messages or an object containing a getMsg() function to retrieve
   * translated messages.
   *
   * @param {Function} mixin The i18n mixin.
   */
  this.setMixin = function(mixin) {
    if (mixin === undefined) {
      throw new Error("I18nUtil: Mixin cannot be undefined.");
    }
    self.mixin = mixin;
  };
};
export let i18n = new I18nUtil();
