'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAccordion = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAccordionPanel = require('pf-accordion-panel.component');

var _pfAccordionPanel2 = _interopRequireDefault(_pfAccordionPanel);

var _pfAccordionTemplate = require('pf-accordion-template.component');

var _pfAccordionTemplate2 = _interopRequireDefault(_pfAccordionTemplate);

var _pfUtils = require('pf-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-accordion&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-accordion>
 *   <pf-accordion-panel>
 *     <pf-accordion-heading>
 *       <h4 class="panel-title">
 *         <a role="button" data-toggle="collapse" href="#">
 *           Collapsible Group Item #1
 *         </a>
 *       </h4>
 *     </pf-accordion-heading>
 *     <pf-accordion-template open>
 *       <pf-accordion-body>
 *         Collapse CONTENT 1
 *       </pf-accordion-body>
 *     </pf-accordion-template>
 *   </pf-accordion-panel>
 *   <pf-accordion-panel class="panel panel-primary">
 *     <pf-accordion-heading>
 *       <h4 class="panel-title">
 *         <a role="button" data-toggle="collapse" href="#">
 *           Collapsible Group Item #2
 *         </a>
 *       </h4>
 *     </pf-accordion-heading>
 *     <pf-accordion-template>
 *       <pf-accordion-body>
 *         Collapse CONTENT 2
 *       </pf-accordion-body>
 *     </pf-accordion-template>
 *   </pf-accordion-panel>
 * </pf-accordion>
 *
 * @prop fixedHeight {Boolean} Whether the accrodion is a fixed-height accordion
 */
var PfAccordion = exports.PfAccordion = function (_HTMLElement) {
  _inherits(PfAccordion, _HTMLElement);

  /**
   * Called when an instance of the element is created
   */
  function PfAccordion() {
    _classCallCheck(this, PfAccordion);

    var _this = _possibleConstructorReturn(this, (PfAccordion.__proto__ || Object.getPrototypeOf(PfAccordion)).call(this));

    _this._initialized = false;
    _this._openPanels = [];
    _this._fixedHeight = false;

    _this._observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var mutation = mutations[i];
        if ('childList' === mutation.type) {
          // fixed height needs to be recalculated on DOM initialization
          if (_this.hasAttribute('fixedheight')) {
            _this._setFixedHeight();
          }
        }
      }
    });
    return _this;
  }

  /**
   * Called when an instance was inserted into the document
   */


  _createClass(PfAccordion, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.classList.add('panel-group');
      this.setAttribute('role', 'tablist');
      this.setAttribute('aria-multiselectable', 'true');

      // catch bubbled events
      this.addEventListener('pf-accordion.expanding', this._handlePanelShown);
      this.addEventListener('pf-accordion.collapsing', this._handlePanelHidden);

      this._observer.observe(this, {
        childList: true
      });

      if (this.hasAttribute('fixedheight')) {
        // _initialized is raised after _initFixedHeight
        this._initFixedHeight();
      } else {
        this._initialized = true;
        this.dispatchEvent(new Event('pf-accordion.initialized'));
      }
    }

    /**
     * Handle bubbled pf-accordion-expanding on accordion
     * @param {Event} e event
     * @private
     */

  }, {
    key: '_handlePanelShown',
    value: function _handlePanelShown(e) {
      var openPanels = this.querySelectorAll('.collapse.in');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = openPanels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var panel = _step.value;

          if (e !== panel) {
            panel.open = false;
          } else {
            window.__debug = 1 + 2;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Called when the element is removed from the DOM
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this._observer.disconnect();
      window.removeEventListener('resize', this._fixedHeightListener);
    }

    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if ('fixedheight' === attrName) {
        if (newValue) {
          this._initFixedHeight();
        } else {
          this._unsetFixedHeight();
        }
      }
    }

    /**
     * Recalculates and sets the collapse height after every browser resize
     * @private
     */

  }, {
    key: '_setFixedHeight',
    value: function _setFixedHeight() {
      var _this2 = this;

      var height = this.clientHeight;

      // Close any open panels
      var openPanels = this.querySelectorAll('.collapse.in');

      for (var i = 0; i < openPanels.length; i++) {
        var panel = openPanels[i];
        panel.classList.remove('in');
      }

      // Determine the necessary height for the closed content
      var contentHeight = 0;
      for (var _i = 0; _i < this.children.length; _i++) {
        var element = this.children[_i];
        contentHeight += element.offsetHeight;
      }

      // Determine the height remaining for opened collapse panels
      var bodyHeight = this.clientHeight - contentHeight;

      // Make sure we have enough height to be able to scroll the contents if necessary
      if (bodyHeight < 25) {
        bodyHeight = 25;
      }

      // Reopen the initially opened panel
      for (var _i2 = 0; _i2 < openPanels.length; _i2++) {
        var _panel = openPanels[_i2];
        _panel.classList.add('in');
      }

      // run as requestAnimationFrame to prevent performance issues while resizing
      requestAnimationFrame(function () {
        // Set the max-height for the collapse panels
        var panels = _this2.getElementsByTagName('pf-accordion-template');
        for (var _i3 = 0; _i3 < panels.length; _i3++) {
          var _element = panels[_i3];
          // Set the max-height and vertical scroll of the scroll element
          if (!_element._oldStyle) {
            _element._oldStyle = {
              maxHeight: _element.style.maxHeight,
              overflowY: _element.style.overflowY
            };
          }
          _element.style.maxHeight = bodyHeight + 'px';
          _element.style.overflowY = 'auto';
        }

        _this2._oldStyle = {
          overflowY: _this2.style.overflowY
        };
        _this2.style.overflowY = 'fixed';

        if (!_this2._initialized) {
          // first time run, send an initialized event
          _this2._initialized = true;
          _this2.dispatchEvent(new Event('pf-accordion.initialized'));
        }
      });
    }

    /**
     * Removes the fixed-height panel configuration
     * @private
     */

  }, {
    key: '_unsetFixedHeight',
    value: function _unsetFixedHeight() {
      if (!this._fixedHeight) {
        return;
      }
      var panels = this.getElementsByTagName('pf-accordion-template');
      for (var i = 0; i < panels.length; i++) {
        var element = panels[i];

        // Set the max-height and vertical scroll of the scroll element
        if (element._oldStyle) {
          element.style.maxHeight = element._oldStyle.maxHeight;
          element.style.overflowY = element._oldStyle.overflowY;
          element._oldStyle = null;
        }
      }
      this.style.overflowY = this._oldStyle.overflowY;
      this._oldStyle = null;
      window.removeEventListener('resize', this._fixedHeihtListener);
      this._fixedHeight = false;
    }

    /**
     * Initializes a fixed-width accordion
     * @private
     */

  }, {
    key: '_initFixedHeight',
    value: function _initFixedHeight() {
      var _this3 = this;

      if (this._fixedHeight) {
        return;
      }

      requestAnimationFrame(function () {
        return _this3._setFixedHeight();
      });
      // Update on window resizing
      this._fixedHeightListener = this._setFixedHeight.bind(this);
      window.addEventListener('resize', this._fixedHeightListener);
      this._fixedHeight = true;
    }
  }, {
    key: 'fixedHeight',
    get: function get() {
      return this._fixedHeight;
    },
    set: function set(value) {
      if (value) {
        if (!this.hasAttribute('fixedheight')) {
          this.setAttribute('fixedheight', '');
        }
      } else {
        this.removeAttribute('fixedheight');
      }
    }
  }]);

  return PfAccordion;
}(HTMLElement);

(function () {
  customElements.define('pf-accordion', PfAccordion);
})();