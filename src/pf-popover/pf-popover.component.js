import { default as tmpl } from 'pf-popover.template';
import { pfUtil } from 'pf-utils.js';

/**
 * <b>&lt;pf-popover&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-popover animation="fade" target-selector="#btn-left" placement="left" delay="100" duration="150" popover-title="Popover Title" dismissible="true" container-selector="#container"></pf-alert>
 *
 * @prop {string} animation the animation class
 * @prop {string} target-selector the target element selector
 * @prop {string} placement left, right, top, bottom
 * @prop {string} popover-title the title of popover
 * @prop {string} dismissible true, false
 * @prop {number} delay animation delay (ms)
 * @prop {number} duration animation duration (ms)
 * @prop {string} container-selector the container element selector
 */


export class PfPopover extends HTMLElement {

  /**
   * Reinitializes popover component with attribute values and resets content
   */
  init() {
    this.element = this;
    this.content = this._innerHtml || this.element.innerHTML;
    this.popover = null;
    this._targetSelector = this.getAttribute('target-selector');
    this._target = this._targetSelector ? document.querySelector(this._targetSelector) : this;
    this._animation = this.getAttribute('animation') ? this.getAttribute('animation') : 'fade';
    this._popoverTitle = this.getAttribute('popover-title') ? this.getAttribute('popover-title') : '';
    this._dismissible = this.getAttribute('dismissible') ? this.getAttribute('dismissible') : false;
    this._placement = this.getAttribute('placement') ? this.getAttribute('placement') : 'right';
    this._delay = parseInt(this.getAttribute('delay')) || 100;
    this._duration = pfUtil.isMSIE && pfUtil.isMSIE < 10 ? 0 : (parseInt(this.getAttribute('duration')) || 150);
    this._containerSelector = this.getAttribute('container-selector');
    this._container = this._containerSelector ? document.querySelector(this._containerSelector) : document.body;

    if (this._target) {
      //create open event listeners
      this._target.addEventListener('click', (e) => {
        if (this.popover !== null) {
          this.close(e);
        } else {
          this.open(e);
        }

      }, false);
    }

    if (this._dismissible) {

      document.addEventListener('click', (event) => {
        if (this.popover !== null && event.target === this.popover.querySelector('div.popover > h3.popover-title .close > span.pficon-close')) {
          this.close();
        }
      }, false);
    }
  }


  /**
   * Called when an instance was inserted into the document
   */
  connectedCallback() {
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
    return ['animation', 'target-selector', 'placement', 'delay', 'duration', 'container-selector', 'popover-title'];
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
   * An instance of the element is created or upgraded
   */
  constructor() {
    super();
    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;
    this._timer = 0;
  }

  /**
   * Sets popover the inner HTML
   * @param {string} html string
   */
  setInnerHtml(html) {
    this._innerHtml = html;
    this.element.dispatchEvent(new CustomEvent('handleContentChanged', {}));
  }

  /**
   * public handler
   */
  toggle() {
    this.init();
    if (this.popover === null) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Get the animation class
   *
   * @returns {string} The animation class
   */
  get animation() {
    return this._animation;
  }

  /**
   * Set animation class
   *
   * @param {string} value The animation class
   */
  set animation(value) {
    if (this._animation !== value) {
      this._animation = value;
      this.setAttribute('animation', value);
    }
  }

  /**
   * Get the popover container-selector
   *
   * @returns {string} The container element selector
   */
  get containerSelector() {
    return this._containerSelector;
  }

  /**
   * Set the popover container-selector
   *
   * @param {string} value The container element selector
   */
  set containerSelector(value) {
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
  get duration() {
    return this._duration;
  }

  /**
   * Set the animation duration
   *
   * @param {string} value The animation duration
   */
  set duration(value) {
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
  get delay() {
    return this._duration;
  }

  /**
   * Set the animation delay
   *
   * @param {string} value The animation delay
   */
  set delay(value) {
    if (this._delay !== value) {
      this._delay = value;
      this.setAttribute('delay', value);
    }
  }

  /**
   * Get the placement this._placement
   *
   * @returns {string} The placement this._placement left, top, bottom, right
   */
  get placement() {
    return this._placement;
  }

  /**
   * Set placement this._placement
   *
   * @param {string} value The placement this._placement left, top, bottom, right
   */
  set placement(value) {
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
  get targetSelector() {
    return this._targetSelector;
  }

  /**
   * Set target-selector
   *
   * @param {string} value The target element selector
   */
  set targetSelector(value) {
    if (this._targetSelector !== value) {
      this._targetSelector = value;
      this._target = document.querySelector(this._targetSelector);
      this.setAttribute('target-selector', value);
    }
  }

  /**
   * Get the popover-title
   *
   * @return {string} the title of popover
   */
  get popoverTitle() {
    return this._popoverTitle;
  }

  /**
   * Set popover-title
   *
   * @param {string} value The title of popover
   */
  set popoverTitle(value) {
    if (this._popoverTitle !== value) {
      this._popoverTitle = value;
      this.setAttribute('popover-title', value);
    }
  }

  /**
     * The popover open method
     */
  open() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      if (this.popover === null) {
        this._createPopover();
        this._stylePopover();
        this._checkPlacement();
        this._showPopover();
        //notify frameworks
        this.dispatchEvent(new CustomEvent('pf-popover.opened', {}));
      }
    }, 20);
  }

  /**
   * The popover close method
   */
  close() {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      if (this.popover && this.popover !== null) {
        pfUtil.removeClass(this.popover, 'in');
        setTimeout(() => {
          this._removePopover();
          //notify frameworks
          this.dispatchEvent(new CustomEvent('pf-popover.closed', {}));
          // reset position after popover is closed
          this._placement = this.getAttribute('placement') ? this.getAttribute('placement') : 'right';
        }, this._duration);
      }
    }, this._delay + this._duration);
  }

  /**
   * Removes the popover
   * @private
   */
  _removePopover() {
    this.popover && this._container.removeChild(this.popover);
    this.popover = null;
  }

  /**
   * Creates the popover
   * @private
   */
  _createPopover() {
    let clone = document.importNode(this._template.content, true);
    let popoverInner = clone.querySelector('.popover-content');
    let popovertitle = clone.querySelector('.popover-title');
    let closeButton = document.createElement('template');
    closeButton.innerHTML = `<button type="button" class="close"><span class="pficon pficon-close"></span></button>`;

    if (this._popoverTitle === '' && !this._dismissible) {
      popovertitle.parentNode.removeChild(popovertitle);
    } else {
      //set popover title
      popovertitle.innerHTML = this._popoverTitle;

      if (this._dismissible) {
        popovertitle.appendChild(closeButton.content);
      }
    }
    //set popover content
    popoverInner.innerHTML = this.content;

    //append to the container
    this._container.appendChild(clone);

    //set reference to appended node
    this.popover = this._container.querySelectorAll('.popover:last-child')[0];
    this.popover.style.display = 'block';
    this.popover.setAttribute('class', `popover ${this._placement} ${this._animation}`);
  }

  /**
   * update the placement of popover
   */
  _updatePlacement() {
    switch (this._placement) {
      case 'top':
        return 'bottom';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return this._placement;
    }
  }

  /**
   * Styles the popover based on placement attribute
   * @private
   */
  _stylePopover() {
    const rect = this._target.getBoundingClientRect(); //popover real dimensions

    const // link rect | window vertical and horizontal scroll
      scroll = pfUtil.getScroll();

    const //link real dimensions
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top };

    const popoverDimensions = { w: this.popover.offsetWidth, h: this.popover.offsetHeight };

    //apply styling
    switch (this._placement) {
      case 'top': //TOP
        this.popover.style.top = `${rect.top + scroll.y - popoverDimensions.h}px`;
        this.popover.style.left = `${rect.left + scroll.x - popoverDimensions.w / 2 + linkDimensions.w / 2}px`;
        break;

      case 'bottom': //BOTTOM
        this.popover.style.top = `${rect.top + scroll.y + linkDimensions.h}px`;
        this.popover.style.left = `${rect.left + scroll.x - popoverDimensions.w / 2 + linkDimensions.w / 2}px`;
        break;

      case 'left': //LEFT
        this.popover.style.top = `${rect.top + scroll.y - popoverDimensions.h / 2 + linkDimensions.h / 2}px`;
        this.popover.style.left = `${rect.left + scroll.x - popoverDimensions.w}px`;
        break;

      case 'right': //RIGHT
        this.popover.style.top = `${rect.top + scroll.y - popoverDimensions.h / 2 + linkDimensions.h / 2}px`;
        this.popover.style.left = `${rect.left + scroll.x + linkDimensions.w}px`;
        break;
    }
    this.popover.className.indexOf(this._placement) === -1 && (this.popover.className = this.popover.className.replace(/\b(top|bottom|left|right)+/, this._placement));
  }

  /**
   * check the placement of popover
   */
  _checkPlacement() {
    if (!pfUtil.isElementInViewport(this.popover)) {
      this._placement = this._updatePlacement();
      this._stylePopover();
    }
  }

  /**
   * Makes popover visible
   * @private
   */
  _showPopover() {
    !/\bin/.test(this.popover.className) && (pfUtil.addClass(this.popover, 'in'));
  }

}

window.customElements.define('pf-popover', PfPopover);