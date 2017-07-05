/**
 * <b>&lt;pf-touchspin&gt;</b> element for Patternfly Web Components
 *
 * <pf-touchspin id="touchspin" class="input-group bootstrap-touchspin" decimals="2" step="0.1">
 *  <span class="input-group-btn">
 *    <button class="btn btn-default bootstrap-touchspin-down" type="button">-</button>
 *  </span>
 *  <input value="50.00" type="text" class="form-control">
 *  <span class="input-group-btn">
 *    <button class="btn btn-default bootstrap-touchspin-up" type="button">+</button>
 *  </span>
 * </pf-touchspin>
 *
 * @prop {number} min the minimum value
 * @prop {number} max the maximum value
 * @prop {number} step Increment/Decrement in value on up/down
 * @prop {number} decimals decimal points in value
 * @prop {boolean} booster if true, spinner will become faster continousally on holding down the button
 * @prop {number} boostat boost at every nth step
 * @prop {number} maxboostedstep maximum step when boosted
 * @prop {number} stepinterval refresh reate of spinner in millisecond
 * @prop {number} stepintervaldelay delay before sppiner starts to spin(millisecond)
 * @prop {string} forcestepdivisibility force the value to be divisible by step value: 'none' | 'round' | 'floor' | 'ceil'
 *
 */

export class PfTouchspin extends HTMLElement {

  init() {
    this._min = parseFloat(this.getAttribute('min')) ? this.getAttribute('min') : 0;
    this._max = parseFloat(this.getAttribute('max')) ? this.getAttribute('max') : 100;
    this._step = parseFloat(this.getAttribute('step')) ? this.getAttribute('step') : 1;
    this._decimals = parseInt(this.getAttribute('decimals')) ? this.getAttribute('decimals') : 0;
    this._booster = this.getAttribute('booster') ? this.getAttribute('booster') : true;
    this._boostat = parseInt(this.getAttribute('boostat')) ? this.getAttribute('boostat') : 10;
    this._maxBoostedStep = this.getAttribute('maxboostedstep') ? this.getAttribute('maxboostedstep') : false;
    this._stepInterval = this.getAttribute('stepinterval') ? this.getAttribute('stepinterval') : 100;
    this._stepIntervalDelay = this.getAttribute('stepintervaldelay') ? this.getAttribute('stepintervaldelay') : 500;
    this._forceStepDivisibility = this.getAttribute('forcestepdivisibility') ? this.getAttribute('forcestepdivisibility') : 'round';
    this._spinning = false;
    this.spincount = 0;
  }

  connectedCallback() {
    let input = this.querySelector('input');
    let down = this.querySelector('.bootstrap-touchspin-down');
    let up = this.querySelector('.bootstrap-touchspin-up');
    this.init();

    // support for up/down keys
    input.addEventListener('keydown', (event) => {
      let inputVal = parseFloat(this.querySelector('input').value);
      let keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 38) {
        this._up();
        if (inputVal === this._max) {
          return;
        }
        this._upSpin();
        event.preventDefault();
      } else if (keycode === 40) {
        this._down();
        if (inputVal === this._min) {
          return;
        }
        this._downSpin();
        event.preventDefault();
      }
    });

    input.addEventListener('keyup', (event) => {
      let keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 38) {
        this._stop();
      } else if (keycode === 40) {
        this._stop();
      }
    });

    // support for click foe down spin
    down.addEventListener('mousedown', (event) => {
      let inputVal = parseFloat(this.querySelector('input').value);
      if (input.classList.contains('disabled')) {
        return;
      }
      this._down();
      if (inputVal === this._min) {
        return;
      }
      this._downSpin();

      event.preventDefault();
      event.stopPropagation();
    });

    document.addEventListener('mouseup', (event) => {

      event.preventDefault();
      this._stop();
    });

    up.addEventListener('mousedown', (event) => {
      let inputVal = parseFloat(this.querySelector('input').value);
      if (input.classList.contains('disabled')) {
        return;
      }

      this._up();
      if (inputVal === this._max) {
        return;
      }
      this._upSpin();

      event.preventDefault();
      event.stopPropagation();
    });

    // stop spinning if mouse is not over buttons
    down.addEventListener('mouseout', (event) => {
      event.stopPropagation();
      this._stop();
    });

    up.addEventListener('mouseout', (event) => {

      event.stopPropagation();
      this._stop();
    });

    //support for mouse scroll
    document.addEventListener('wheel', (event) => {
      let delta = -event.deltaY;
      if (input !== document.activeElement) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      if (delta < 0) {
        this._down();
      } else {
        this._up();
      }
    });

    this._bindEvents();

    this.initialized = true;
    this.dispatchEvent(new CustomEvent('initialized', {}));
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
   */
  _bindEvents() {
    this.addEventListener('pf-touchspin.downonce', () => {
      this._down();
    });

    this.addEventListener('pf-touchspin.uponce', () => {
      this._up();
    });

    this.addEventListener('pf-touchspin.downspin', () => {
      this._downSpin();
    });

    this.addEventListener('pf-touchspin.upspin', () => {
      this._upSpin();
    });

    this.addEventListener('pf-touchspin.stop', () => {
      this._stop();
    });


  }

  /**
   * force the valur to be divisible by step
   *
   * @param {number} value
   */
  _stepDivisibility(value) {
    switch (this._forceStepDivisibility) {
      case 'round':
        return (Math.round(value / this._step) * this._step).toFixed(this._decimals);
      case 'floor':
        return (Math.floor(value / this._step) * this._step).toFixed(this._decimals);
      case 'ceil':
        return (Math.ceil(value / this._step) * this._step).toFixed(this._decimals);
      default:
        return value;
    }
  }

  /**
   * check the value before change in value
   */
  _checkValue() {
    let val, parsedval, returnval;

    val = this.querySelector('input').value;

    if (this._decimals > 0 && val === '.') {
      return;
    }

    parsedval = parseFloat(val);

    if (isNaN(parsedval)) {
      parsedval = 0;
    }

    returnval = parsedval;

    if (parsedval < this.min) {
      returnval = this.min;
    }

    if (parsedval > this.max) {
      returnval = this.max;
    }

    returnval = this._stepDivisibility(returnval);

    if (Number(val).toString() !== returnval.toString()) {
      this.querySelector('input').value = returnval;
    }
  }


  /**
   * boost the value
   *
   * @param {number} value
   */
  _boostedStep() {
    if (!this._booster) {
      return this._step;
    }
    let boosted = Math.pow(2, Math.floor(this.spincount / this._boostat)) * this._step;

    if (this._maxBoostedStep) {
      if (boosted > this._maxBoostedstep) {
        boosted = this._maxBoostedStep;
      }
    }
    return Math.max(this._step, boosted);

  }

  /**
   * increment input value
   */
  _up() {
    let val, boostedStep;

    this._checkValue();

    val = parseFloat(this.querySelector('input').value);
    if (isNaN(val)) {
      val = 0;
    }

    boostedStep = this._boostedStep();

    val = val + boostedStep;

    if (val > this._max) {
      val = this._max;
      this.dispatchEvent(new CustomEvent('pf-touchspin.max', {}));
      this._stop();
    }

    val = parseFloat(val).toFixed(this._decimals);

    this.querySelector('input').value = val;
  }

  /**
   *  decrement input value
   */
  _down() {
    let val, boostedStep;

    this._checkValue();

    val = parseFloat(this.querySelector('input').value);
    if (isNaN(val)) {
      val = 0;
    }

    boostedStep = this._boostedStep();

    val = val - boostedStep;

    if (val < this._min) {
      val = this._min;
      this.dispatchEvent(new CustomEvent('pf-touchspin.min', {}));
      this._stop();
    }

    val = parseFloat(val).toFixed(this._decimals);

    this.querySelector('input').value = val;
  }

  /**
   * Decremental spinner
   *
   */
  _downSpin() {
    this._stop();

    this.spincount = 0;
    this._spinning = 'down';

    this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
    this.dispatchEvent(new CustomEvent('pf-touchspin.startdownspin', {}));

    this._downDelayTimeout = setTimeout(() => {
      this._downSpinTimer = setInterval(() => {
        this.spincount++;
        this._down();
      }, this._stepInterval);
    }, this._stepIntervalDelay);
  }

  /**
   * Incremental spinner
   */
  _upSpin() {
    this._stop();

    this.spincount = 0;
    this._spinning = 'up';

    this.dispatchEvent(new CustomEvent('pf-touchspin.startspin', {}));
    this.dispatchEvent(new CustomEvent('pf-touchspin.startupspin', {}));

    this._upDelayTimeout = setTimeout(() => {
      this._upSpinTimer = setInterval(() => {
        this.spincount++;
        this._up();
      }, this._stepInterval);
    }, this._stepIntervalDelay);
  }

  /**
   * Stop the spinner
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

    this.spincount = 0;
    this._spinning = false;
  }

}
window.customElements.define('pf-touchspin', PfTouchspin);