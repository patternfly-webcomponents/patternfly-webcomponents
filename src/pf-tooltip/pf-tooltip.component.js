import {default as tmpl} from 'pf-tooltip.template';
import {pfUtil} from 'pf-utils.js';

/**
 * <b>&lt;pf-tooltip&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tooltip animation="fade" target-selector="#btn-left" placement="left" delay="100" duration="150" container-selector="#container"></pf-alert>
 *
 * @prop {string} animation the animation class
 * @prop {string} target-selector the target element selector
 * @prop {string} placement left, right, top, bottom
 * @prop {number} delay animation delay (ms)
 * @prop {number} duration animation duration (ms)
 * @prop {string} container-selector the container element selector
 */

export class PfTooltip extends HTMLElement {

  /**
   * Reinitializes tooltip component with attribute values and resets content
   */
  init () {
    this.element = this;
    this.content = this._innerHtml || this.element.innerHTML;
    this.tooltip = null;
    this._targetSelector = this.getAttribute('target-selector');
    this._target = this._targetSelector ? document.querySelector(this._targetSelector) : this;
    this._animation = this.getAttribute('animation') ? this.getAttribute('animation') : 'fade';
    this._placement = this.getAttribute('placement') ? this.getAttribute('placement') : 'right';
    this._delay = parseInt(this.getAttribute('delay')) || 100;
    this._mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];
    this._tipPositions = /\b(top|bottom|left|top)+/;
    this._duration = pfUtil.isMSIE && pfUtil.isMSIE < 10 ? 0 : (parseInt(this.getAttribute('duration')) || 150);
    this._containerSelector = this.getAttribute('container-selector');
    this._container = this._containerSelector ? document.querySelector(this._containerSelector) : document.body;

    if (this._target) {
      //create open event listeners
      this._target.addEventListener(this._mouseHover[0], (e) => {
        this.open(e);
      }, false);

      //create close event listener
      this._target.addEventListener(this._mouseHover[1], (e) => {
        this.close(e);
      }, false);
    }
  }

  /**
   * Called when an instance was inserted into the document
   */
  connectedCallback () {
    this.init();

    //handleContentChanged
    this.element.addEventListener('handleContentChanged', (e) => {
      this.init();
    }, false);
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['animation', 'target-selector', 'placement', 'delay', 'duration', 'container-selector'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    this.init();
  }

  /*
   * An instance of the element is created or upgraded
   */
  constructor () {
    super();
    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
    this._timer = 0;
  }

  /**
   * Sets tooltip the inner HTML
   * @param {string} html string
   */
  setInnerHtml(html) {
    this._innerHtml = html;
    this.element.dispatchEvent(new CustomEvent('handleContentChanged', {}));
  }

  /**
   * Get the animation class
   *
   * @returns {string} The animation class
   */
  get animation () {
    return this._animation;
  }

  /**
   * Set animation class
   *
   * @param {string} value The animation class
   */
  set animation (value) {
    if (this._animation !== value) {
      this._animation = value;
      this.setAttribute('animation', value);
    }
  }

  /**
   * Get the tooltip container-selector
   *
   * @returns {string} The container element selector
   */
  get containerSelector () {
    return this._containerSelector;
  }

  /**
   * Set the tooltip container-selector
   *
   * @param {string} value The container element selector
   */
  set containerSelector (value) {
    if (this._containerSelector !== value) {
      this._containerSelector = value;
      this._container = document.querySelector(this._containerSelector);
      this.setAttribute('container-selector', value);
    }
  }

  /**
   * Get the animation duration
   *
   * @returns {string} The animation duration
   */
  get duration () {
    return this._duration;
  }

  /**
   * Set the animation duration
   *
   * @param {string} value The animation duration
   */
  set duration (value) {
    if (this._duration !== value) {
      this._duration = value;
      this.setAttribute('duration', value);
    }
  }

  /**
   * Get the animation delay
   *
   * @returns {string} The animation delay
   */
  get delay () {
    return this._duration;
  }

  /**
   * Set the animation delay
   *
   * @param {string} value The animation delay
   */
  set delay (value) {
    if (this._delay !== value) {
      this._delay = value;
      this.setAttribute('delay', value);
    }
  }

  /**
   * Get the placement position
   *
   * @returns {string} The placement position left, top, bottom, right
   */
  get placement () {
    return this._placement;
  }

  /**
   * Set placement position
   *
   * @param {string} value The placement position left, top, bottom, right
   */
  set placement (value) {
    if (this._placement !== value) {
      this._placement = value;
      this.setAttribute('placement', value);
    }
  }

  /**
   * Get the target-selector
   *
   * @returns {string} The target element selector
   */
  get targetSelector () {
    return this._targetSelector;
  }

  /**
   * Set target-selector
   *
   * @param {string} value The target element selector
   */
  set targetSelector (value) {
    if (this._targetSelector !== value) {
      this._targetSelector = value;
      this._target = document.querySelector(this._targetSelector);
      this.setAttribute('target-selector', value);
    }
  }

  /**
   * The tooltip open method
   */
  open () {
    clearTimeout(this._timer);
    this._timer = setTimeout( () => {
      if (this.tooltip === null) {
        this._createTooltip();
        this._styleTooltip();
        this._showTooltip();
        //notify frameworks
        this.dispatchEvent(new CustomEvent('tooltipOpened', {}));
      }
    }, 20 );
  }

  /**
   * The tooltip close method
   */
  close () {
    clearTimeout(this._timer);
    this._timer = setTimeout( () => {
      if (this.tooltip && this.tooltip !== null) {
        pfUtil.removeClass(this.tooltip, 'in');
        setTimeout(() => {
          this._removeTooltip();
          //notify frameworks
          this.dispatchEvent(new CustomEvent('tooltipClosed', {}));
        }, this._duration);
      }
    }, this._delay + this._duration);
  }

  /**
   * Removes the tooltip
   * @private
   */
  _removeTooltip () {
    this.tooltip && this._container.removeChild(this.tooltip);
    this.tooltip = null;
  }

  /**
   * Creates the tooltip
   * @private
   */
  _createTooltip () {
    let clone = document.importNode(this._template.content, true);
    let tooltipInner = clone.querySelector('.tooltip-inner');

    //set tooltip content
    tooltipInner.innerHTML = this.content;

    //append to the container
    this._container.appendChild(clone);

    //set reference to appended node
    let tooltips = this._container.querySelectorAll('.tooltip');
    this.tooltip = tooltips[tooltips.length - 1];
    this.tooltip.setAttribute('class', `tooltip ${this._placement} ${this._animation}`);
  }

  /**
   * Styles the tooltip based on placement attribute
   * @private
   */
  _styleTooltip () {
    const rect = this._target.getBoundingClientRect(); //tooltip real dimensions

    const // link rect | window vertical and horizontal scroll
      scroll = pfUtil.getScroll();

    const //link real dimensions
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top };

    const tooltipDimensions = { w : this.tooltip.offsetWidth, h: this.tooltip.offsetHeight };

    //apply styling
    if ( /top/.test(this._placement) ) { //TOP
      this.tooltip.style.top = `${rect.top + scroll.y - tooltipDimensions.h}px`;
      this.tooltip.style.left = `${rect.left + scroll.x - tooltipDimensions.w / 2 + linkDimensions.w / 2}px`;

    } else if ( /bottom/.test(this._placement) ) { //BOTTOM
      this.tooltip.style.top = `${rect.top + scroll.y + linkDimensions.h}px`;
      this.tooltip.style.left = `${rect.left + scroll.x - tooltipDimensions.w / 2 + linkDimensions.w / 2}px`;

    } else if ( /left/.test(this._placement) ) { //LEFT
      this.tooltip.style.top = `${rect.top + scroll.y - tooltipDimensions.h / 2 + linkDimensions.h / 2}px`;
      this.tooltip.style.left = `${rect.left + scroll.x - tooltipDimensions.w}px`;

    } else if ( /right/.test(this._placement) ) { //RIGHT
      this.tooltip.style.top = `${rect.top + scroll.y - tooltipDimensions.h / 2 + linkDimensions.h / 2}px`;
      this.tooltip.style.left = `${rect.left + scroll.x + linkDimensions.w}px`;
    }
  }

  /**
   * Makes tooltip visible
   * @private
   */
  _showTooltip () {
    !/\bin/.test(this.tooltip.className) && ( pfUtil.addClass(this.tooltip,'in') );
  }
}

window.customElements.define('pf-tooltip', PfTooltip);
