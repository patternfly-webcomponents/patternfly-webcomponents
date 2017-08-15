'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
 *
 */
var PfAccordionHeading = exports.PfAccordionHeading = function (_HTMLElement) {
  _inherits(PfAccordionHeading, _HTMLElement);

  /**
   * Called when an instance of the element is created
   */
  function PfAccordionHeading() {
    _classCallCheck(this, PfAccordionHeading);

    var _this = _possibleConstructorReturn(this, (PfAccordionHeading.__proto__ || Object.getPrototypeOf(PfAccordionHeading)).call(this));

    _this._observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (record) {
        // detach handlers on toggle removal, try to get another toggle
        if (_this._toggle || _this._target) {
          for (var i = 0, length = record.removedNodes.length; i < length; i++) {
            if (record.removedNodes[i] === _this._toggle) {
              _this._toggle.removeEventListener('click', _this._toggleClickHandler);
              _this._toggle.removeEventListener('keyup', _this._toggleKeyUpHandler);
              _this._initializeToggle();
            }

            if (record.removedNodes[i] === _this._target) {
              _this._findTarget();
            }
          }
        }

        // if there is no toggle or target initialized
        if (record.addedNodes.length > 0) {
          if (!_this._target) {
            _this._findTarget();
          } else if (!_this._toggle) {
            _this._initializeToggle();
          }
        }
      });
    });
    return _this;
  }
  /**
   * Called when an instance was inserted into the document
   */


  _createClass(PfAccordionHeading, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.classList.add('panel-heading');
      this.setAttribute('role', 'tab');

      this._findTarget();

      this._observer.observe(this, {
        childList: true,
        subtree: true
      });
    }
  }, {
    key: '_findTarget',
    value: function _findTarget() {
      var _this2 = this;

      this._target = this.parentElement.querySelector('pf-accordion-template');
      if (this._target) {
        if (this._target._initialized) {
          this._initializeToggle();
        } else {
          this._target.addEventListener('pf-accordion.initialized', function () {
            _this2._initializeToggle();
          });
        }
      }
    }
    /**
     * Finds the toggle element and adds appropriate listeners to it.
     * @private
     */

  }, {
    key: '_initializeToggle',
    value: function _initializeToggle() {
      var _this3 = this;

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

          this._target.addEventListener('pf-accordion.expanding', function () {
            _this3._toggle.classList.remove('collapsed');
            _this3._toggle.setAttribute('aria-expanded', 'true');
          });
          this._target.addEventListener('pf-accordion.collapsing', function () {
            _this3._toggle.classList.add('collapsed');
            _this3._toggle.setAttribute('aria-expanded', 'false');
          });
        }
      }
    }

    /**
     * Toggle the target
     * @private
     */

  }, {
    key: '_doToggle',
    value: function _doToggle() {
      if (this._target) {
        this._target.toggle();
      }
    }

    /**
     * Handle keyUp on the toggle element
     * @private
     */

  }, {
    key: '_handleToggleKeyUp',
    value: function _handleToggleKeyUp(event) {
      event.preventDefault();
      if (32 === event.keyCode) {
        this._doToggle();
      }
    }

    /**
     * Handle keyUp on the toggle element
     * @private
     */

  }, {
    key: '_handleToggleClick',
    value: function _handleToggleClick(event) {
      event.preventDefault();
      this._doToggle();
    }

    /**
     * Called when the element is removed from the DOM
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._observer.disconnect();
    }
  }]);

  return PfAccordionHeading;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion-heading', PfAccordionHeading);
})();