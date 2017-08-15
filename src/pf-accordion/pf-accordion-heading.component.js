/**
 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionHeading extends HTMLElement {

  /**
   * Called when an instance of the element is created
   */
  constructor() {
    super();
    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((record) => {
        // detach handlers on toggle removal, try to get another toggle
        if (this._toggle || this._target) {
          for (let i = 0, length = record.removedNodes.length; i < length; i++) {
            if (record.removedNodes[i] === this._toggle) {
              this._toggle.removeEventListener('click', this._toggleClickHandler);
              this._toggle.removeEventListener('keyup', this._toggleKeyUpHandler);
              this._initializeToggle();
            }

            if (record.removedNodes[i] === this._target) {
              this._findTarget();
            }
          }
        }

        // if there is no toggle or target initialized
        if (record.addedNodes.length > 0) {
          if (!this._target) {
            this._findTarget();
          } else if (!this._toggle) {
            this._initializeToggle();
          }
        }
      });
    });
  }
  /**
   * Called when an instance was inserted into the document
   */
  connectedCallback() {
    this.classList.add('panel-heading');
    this.setAttribute('role', 'tab');

    this._findTarget();

    this._observer.observe(this, {
      childList: true,
      subtree: true
    });
  }

  _findTarget() {
    this._target = this.parentElement.querySelector('pf-accordion-template');
    if (this._target) {
      if (this._target._initialized) {
        this._initializeToggle();
      } else {
        this._target.addEventListener('pf-accordion.initialized', () => {
          this._initializeToggle();
        });
      }
    }
  }
  /**
   * Finds the toggle element and adds appropriate listeners to it.
   * @private
   */
  _initializeToggle() {
    this._toggle = this.querySelector('*[data-toggle="collapse"]');

    if (this._toggle) {
      this._toggleClickHandler = this._handleToggleClick.bind(this);
      this._toggleKeyUpHandler = this._handleToggleKeyUp.bind(this);
      this._toggle.addEventListener('click', this._toggleClickHandler);
      this._toggle.addEventListener('keyup', this._toggleKeyUpHandler);

      if (this._target !== null) {
        if (this._target.open) {
          this._toggle.classList.remove('collapsed');
          this._toggle.setAttribute('aria-expanded', 'true');
        } else {
          this._toggle.classList.add('collapsed');
          this._toggle.setAttribute('aria-expanded', 'false');
        }

        this._target.addEventListener('pf-accordion.expanding', () => {
          this._toggle.classList.remove('collapsed');
          this._toggle.setAttribute('aria-expanded', 'true');
        });
        this._target.addEventListener('pf-accordion.collapsing', () => {
          this._toggle.classList.add('collapsed');
          this._toggle.setAttribute('aria-expanded', 'false');
        });
      }
    }
  }

  /**
   * Toggle the target
   * @private
   */
  _doToggle() {
    if (this._target) {
      this._target.toggle();
    }
  }

  /**
   * Handle keyUp on the toggle element
   * @private
   */
  _handleToggleKeyUp(event) {
    event.preventDefault();
    if (32 === event.keyCode) {
      this._doToggle();
    }
  }

  /**
   * Handle keyUp on the toggle element
   * @private
   */
  _handleToggleClick(event) {
    event.preventDefault();
    this._doToggle();
  }

  /**
   * Called when the element is removed from the DOM
   */
  disconnectedCallback() {
    this._observer.disconnect();
  }
}
(function () {
  customElements.define('pf-accordion-heading', PfAccordionHeading);
}());
