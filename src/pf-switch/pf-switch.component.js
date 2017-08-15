import {default as tmpl} from 'pf-switch.template';

/**
 * <b>&lt;pf-switch&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-switch state="closed">
 *   <input type="checkbox" id="switch-state" />
 * </pf-switch>
 *
 * @prop {string} state
 * @prop {bool} readonly
 * @prop {bool} disabled
 * @prop {bool} hidden
 * @prop {bool} animated
 */
export class PfSwitch extends HTMLElement {
  /**
   * Constructor
   */
  constructor() {
    super();

    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;

    this.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.disabled && !this.readonly) {
        this.toggle();
      }
    });
  }

  static get observedAttributes() {
    return ['state', 'open-text', 'closed-text', 'label-text', 'readonly', 'disabled', 'hidden', 'animated'];
  }

  /**
   * Called when an instance of the element is created
   */
  connectedCallback() {

    this.insertBefore(this._template.content, this.firstChild);
    this._stateElement = this.querySelector('input');
    this._setState(this.getAttribute('state'));
    this._normalizeAndSetText();
    this._setAnimated(this.hasAttribute('animated'));
    this._setDisabled(this.hasAttribute('disabled'));
    this._setHidden(this.hasAttribute('hidden'));
    this._setReadOnly(this.hasAttribute('readonly'));
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'state' && newValue !== oldValue) {
      this._setState(newValue);
      this.dispatchEvent(new Event('pf-switch.change', {
        bubbles: false
      }));
    } else if (attrName === 'open-text' || attrName === 'closed-text'
      || attrName === 'label-text') {
      this._normalizeAndSetText();
    } else if (attrName === 'readonly') {
      this._setReadOnly(this.hasAttribute('readonly'));
    } else if (attrName === 'disabled') {
      this._setDisabled(this.hasAttribute('disabled'));
    } else if (attrName === 'hidden') {
      this._setHidden(this.hasAttribute('hidden'));
    } else if (attrName === 'animated') {
      this._setAnimated(this.hasAttribute('animated'));
    }
  }

  /**
   * Sets the state of the switch
   *
   * @param state current state
   * @private
   */
  _setState(state) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
    if (wrapper) {
      wrapper.classList.remove('bootstrap-switch-on');
      wrapper.classList.remove('bootstrap-switch-off');
      wrapper.classList.remove('bootstrap-switch-indeterminate');
    }
    switch (state) {
      case 'closed':
        this._state = 'closed';
        if (wrapper) {
          wrapper.classList.add('bootstrap-switch-on');
        }
        if (this._stateElement) {
          this._stateElement.indeterminate = false;
          this._stateElement.setAttribute('checked', '');
        }
        break;
      case 'indeterminate':
        this._state = 'indeterminate';
        if (wrapper) {
          wrapper.classList.add('bootstrap-switch-indeterminate');
          if (this._stateElement) {
            this._stateElement.indeterminate = true;
          }
        }
        break;
      default:
        this._state = 'open';
        if (wrapper) {
          wrapper.classList.add('bootstrap-switch-off');
        }
        if (this._stateElement) {
          this._stateElement.indeterminate = false;
          this._stateElement.removeAttribute('checked');
        }
        break;
    }
  }

  /**
   * Get state of the switch
   *
   * @return {string}
   */
  get state() {
    return this._state;
  }

  /**
   * Set state of the switch
   *
   * @param {string} value state to set, must be 'open', 'closed' or 'indeterminate'
   */
  set state(value) {
    this.setAttribute('state', value);
  }

  /**
   * Get text displayed in closed state
   *
   * @return {string}
   */
  get closedText() {
    return this.getAttribute('closed-text') || 'ON';
  }

  /**
   * Set text displayed in closed state
   *
   * @param {string} value text to use in closed switch
   */
  set closedText(value) {
    this.setAttribute('closed-text', value);
  }

  /**
   * Get text displayed in open state
   *
   * @return {string}
   */
  get openText() {
    return this.getAttribute('open-text') || 'OFF';
  }

  /**
   * Set text displayed in open state
   *
   * @param {string} value text to use in open switch
   */
  set openText(value) {
    this.setAttribute('open-text', value);
  }

  /**
   * Set text displayed on the slider knob
   *
   * @return {string}
   */
  get labelText() {
    return this.getAttribute('label-text') || '';
  }

  /**
   * Set text displayed on the slider knob
   *
   * @param {string} value text to use as label
   */
  set labelText(value) {
    this.setAttribute('label-text', value);
  }

  /**
   * Get whether switch is set to read only.
   *
   * @return {boolean}
   */
  get readonly() {
    return this.hasAttribute('readonly');
  }

  /**
   * Set whether switch should be read only.
   *
   * @param {boolean} value
   */
  set readonly(value) {
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }

  /**
   * Get whether switch is disabled.
   *
   * @return {boolean}
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  /**
   * Set whether switch should be disabled.
   *
   * @param {boolean} value
   */
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * Get whether switch animations are enabled.
   *
   * @return {boolean}
   */
  get animated() {
    return this.hasAttribute('animated');
  }

  /**
   * Set whether switch should be animated.
   *
   * @param {boolean} value
   */
  set animated(value) {
    if (value) {
      this.setAttribute('animated', '');
    } else {
      this.removeAttribute('animated');
    }
  }

  /**
   * Get whether switch is hidden.
   *
   * @return {boolean}
   */
  get hidden() {
    return this.hasAttribute('hidden');
  }

  /**
   * Set whether switch should be hidden.
   *
   * This also sets the hidden attribute on the underlying input element.
   *
   * @param {boolean} value
   */
  set hidden(value) {
    if (value) {
      this.setAttribute('hidden', '');
    } else {
      this.removeAttribute('hidden');
    }
  }

  /**
   * Toggle the state of the switch.
   *
   * If the current state is 'indeterminate' it sets the state to 'open'.
   */
  toggle() {
    if (this.state === 'open') {
      this.state = 'closed';
    } else {
      this.state = 'open';
    }
  }

  /**
   * Set text used in closed state.
   *
   * @param text
   * @private
   */
  _setClosedText(text) {
    let close = this.querySelector('.bootstrap-switch-handle-on');
    if (close) {
      close.innerText = text;
    }
  }

  /**
   * Set text used in open state.
   *
   * @param text
   * @private
   */
  _setOpenText(text) {
    let open = this.querySelector('.bootstrap-switch-handle-off');
    if (open) {
      open.innerText = text;
    }
  }

  /**
   * Set text used for label.
   *
   * @param text
   * @private
   */
  _setLabelText(text) {
    let label = this.querySelector('.bootstrap-switch-label');
    if (label) {
      label.innerText = text;
    }
  }

  /**
   * Set this switch to read-only
   *
   * @param isReadOnly
   * @private
   */
  _setReadOnly(isReadOnly) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
    if (wrapper) {
      if (isReadOnly) {
        wrapper.classList.add('bootstrap-switch-readonly');
        if (this._stateElement) {
          this._stateElement.setAttribute('readonly', '');
        }
      } else {
        wrapper.classList.remove('bootstrap-switch-readonly');
        if (this._stateElement) {
          this._stateElement.removeAttribute('readonly');
        }
      }
    }
  }

  /**
   * Disable or enable this switch
   *
   * @param isDisabled
   * @private
   */
  _setDisabled(isDisabled) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
    if (wrapper) {
      if (isDisabled) {
        wrapper.classList.add('bootstrap-switch-disabled');

        if (this._stateElement) {
          this._stateElement.setAttribute('disabled', '');
        }
      } else {
        wrapper.classList.remove('bootstrap-switch-disabled');
        if (this._stateElement) {
          this._stateElement.removeAttribute('disabled');
        }
      }
    }
  }

  /**
   * Set this switch and its underlying input element to hidden.
   *
   * @param isHidden
   * @private
   */
  _setHidden(isHidden) {
    if (isHidden) {
      if (this._stateElement) {
        this._stateElement.setAttribute('hidden', '');
      }
    } else {
      if (this._stateElement) {
        this._stateElement.removeAttribute('hidden');
      }
    }
  }

  /**
   * Enable or disable animations of this switch
   *
   * @param isAnimated
   * @private
   */
  _setAnimated(isAnimated) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
    if (wrapper) {
      if (isAnimated) {
        wrapper.classList.add('bootstrap-switch-animate');
      } else {
        wrapper.classList.remove('bootstrap-switch-animate');
      }
    }
  }

  /**
   * Properly display the text in the switch
   * @private
   */
  _normalizeAndSetText() {
    let onText = this.closedText;
    let offText = this.openText;
    let labText = this.labelText;

    let len = Math.max(onText.length, offText.length, labText.length);

    this._setClosedText(this._padBoth(onText, len));
    this._setOpenText(this._padBoth(offText, len));
    this._setLabelText(this._padBoth(labText, len));
  }

  /**
   * Pad both sides of the string with non-breaking space to make it to a specific length
   * @param {string} str
   * @param {int} length
   * @return {string}
   * @private
   */
  _padBoth(str, length) {
    let diff = length - str.length;
    if (diff > 0) {
      let pad = String.fromCharCode(160).repeat(diff / 2);
      return pad + str + pad + (diff % 2 === 0 ? '' : String.fromCharCode(160));
    }
    return str;
  }
}

(function () {
  window.customElements.define('pf-switch', PfSwitch);
}());
