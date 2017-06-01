/**
 * <b>&lt;pf-touchspin&gt;</b> element for Patternfly Web Components
 *
 * <pf-touchspin></pf-touchspin>
 */

export class PfTouchspin extends HTMLElement {

  init() {
    this._min = this.getAttribute('min') ? this.getAttribute('min') : 0;
    this._max = this.getAttribute('max') ? this.getAttribute('max') : 100;
    this._initVal = this.getAttribute('initval') ? this.getAttribute('initval') : "";
    this._step = this.getAttribute('step') ? this.getAttribute('step') : 1;
    this._decimals = this.getAttribute('decimals') ? this.getAttribute('decimals') : 0;
    this._booster = this.getAttribute('booster') ? this.getAttribute('booster') : true;
    this._boostat = this.getAttribute('boostat') ? this.getAttribute('boostat') : 10;
    this._maxBoostedStep = this.getAttribute('maxboostedstep') ? this.getAttribute('maxboostedstep') : false;
    this._stepInterval = this.getAttribute('stepinterval') ? this.getAttribute('stepinterval') : 100;
    this._stepIntervalDelay = this.getAttribute('stepintervaldelay') ? this.getAttribute('stepintervaldelay') : 500;
  }

  connectedCallback() {
    let self = this;
    var input = this.querySelector('input');
    var down = this.querySelector('.bootstrap-touchspin-down');
    var up = this.querySelector('.bootstrap-touchspin-up');

    this.init();

    input.addEventListener('keydown', function (event) {
      let keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 38) {
        if (true) {
          self._up();
          self._upSpin();
        }
        event.preventDefault();
      } else if (keycode === 40) {
        if (true) {
          self._down();
          self._downSpin();
        }
        event.preventDefault();
      }
    });

    input.addEventListener('keyup', function (event) {
      let keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 38) {
        self._stop();
      } else if (keycode === 40) {
        self._stop();
      }
    });

    down.addEventListener('mousedown', function (event) {
      if (input.classList.contains('disabled')) {
        return;
      }

      self._down();
      self._downSpin();

      event.preventDefault();
      event.stopPropagation();
    });

    down.addEventListener('mouseup', function (event) {
      if (!this._spinning) {
        return;
      }

      event.selfPropagation();
      self._stop();
    });

  }

  /**
  * Called when element's attribute value has changed
  *
  * @param {string} attrName The attribute name that has changed
  * @param {string} oldValue The old attribute value
  * @param {string} newValue The new attribute value
  */
  attributeChangedCallback(attrName, oldValue, newValue) {
    this.init();
  }

  /**
   * Called when an instance of the element is created
   */
  constructor() {
    super();
  }

  /**
   *
   * @param {*} value
   */
  _boostedStep(value) {
    if (!this._booster) {
      return this._step;
    }
    if (isNaN(this._spincount)) {
      this._spincount = 0;
    }
    let boosted = Math.pow(2, Math.floor(this._spincount / this._boostat)) * this._step;

    if (this._maxBoostedStep) {
      if (boosted > this._maxBoostedstep) {
        boosted = this._maxBoostedStep;
        value = Math.round((value / boosted)) * boosted;
      }
    }

    return Math.max(this._step, boosted);

  }

  /**
   * increment input value
   */
  _up() {
    let val, boostedStep;
    val = parseFloat(this.querySelector('input').value);
    if (isNaN(val)) {
      val = 0;
    }

    boostedStep = this._boostedStep(val);

    val = val + boostedStep;

    if (val > this._max) {
      val = this._max;
      this.dispatchEvent(new CustomEvent('pf-touchspin.max', {}));
      this._stop();
    }

    this.querySelector('input').value = val.toFixed(this._decimals);
  }

  /**
   *
   */
  _down() {
    let val, boostedStep;
    val = parseFloat(this.querySelector('input').value);
    if (isNaN(val)) {
      val = 0;
    }

    boostedStep = this._boostedStep(val);

    val = val - boostedStep;

    if (val < this._min) {
      val = this._min;
      this.dispatchEvent(new CustomEvent('pf-touchspin.min', {}));
      this._stop();
    }

    this.querySelector('input').value = val.toFixed(this._decimals);
  }

  /**
   *
   */
  _downSpin() {
    let self = this;
    this._stop();

    this._spincount = 0;
    this._spinning = 'down';

    this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
    this.dispatchEvent(new CustomEvent('pf-touchspin.startdownspin', {}));

    this._downDelayTimeout = setTimeout(function () {
      this._downSpinTimer = setInterval(function () {
        this._spincount++;
        self._down();
      }, this._stepInterval);
    }, this._stepIntervalDelay);
  }

  /**
   *
   */
  _upSpin() {
    let self = this;
    this._stop();

    this._spincount = 0;
    this._spinning = 'up';

    this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
    this.dispatchEvent(new CustomEvent('pf-touchspin.startupspin', {}));

    this._upDelayTimeout = setTimeout(function () {
      this._upSpinTimer = setInterval(function () {
        this._spincount++;
        self._up();
      }, this._stepInterval);
    }, this._stepIntervalDelay);
  }

  /**
   *
   */
  _stop() {

    clearTimeout(this._downDelayTimeout);
    clearTimeout(this._upDelayTimeout);
    clearInterval(this._downSpinTimer);
    clearInterval(this._upSpinTimer);

    switch (this._spinning) {
      case 'up':
        this.dispatchEvent(new CustomEvent('pf-touchspin.stopupspin', {}));
        this.dispatchEvent(new CustomEvent('pf-touchspin.stopspin', {}));

        break;
      case 'down':
        this.dispatchEvent(new CustomEvent('pf-touchspin.stopdownspin', {}));
        this.dispatchEvent(new CustomEvent('pf-touchspin.stopspin', {}));
        break;
    }

    this._spincount = 0;
    this._spinning = false;
  }

}
window.customElements.define('pf-touchspin', PfTouchspin);