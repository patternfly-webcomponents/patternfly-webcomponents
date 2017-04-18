'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-dropdown&gt;</b> element for Patternfly Web Components
 *
 * <pf-dropdown id="dropdown1"><div class="dropdown">
 *    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdown2" data-toggle="dropdown" aria-haspopup="true"
 *      aria-expanded="false">
 *      Dropdown
 *      <span class="caret"></span>
 *      </button>
 *      <ul class="dropdown-menu">
 *        <li class="dropdown-header">Header</li>
 *        <li><a href="#">Item 1</a></li>
 *        <li><a href="#">Item 2</a></li>
 *        <li class="disabled"><a href="#">Item 3</a></li>
 *        <li><a href="#">Item 4</a></li>
 *        <li class="divider"></li>
 *        <li><a href="#">Item 5</a></li>
 *      </ul>
 *      </div>
 *  </pf-dropdown>
 */

var PfDropdown = exports.PfDropdown = function (_HTMLElement) {
  _inherits(PfDropdown, _HTMLElement);

  function PfDropdown() {
    _classCallCheck(this, PfDropdown);

    return _possibleConstructorReturn(this, (PfDropdown.__proto__ || Object.getPrototypeOf(PfDropdown)).apply(this, arguments));
  }

  _createClass(PfDropdown, [{
    key: 'attachedCallback',


    /**
     * Called when an instance was inserted into the document
     */
    value: function attachedCallback() {
      var _this2 = this;

      this._button = this.querySelector('.btn');
      this._disabled = /\bdisabled/.test(this._button.className);
      var menu = this.querySelector('.dropdown-menu');

      this._button.addEventListener('click', function () {
        _this2._showDropdown();
      });

      document.addEventListener('click', function (event) {
        //close dropdown if clicked outside menu
        if (event.target !== menu && event.target !== _this2._button && !menu.contains(event.target) && !_this2._button.contains(event.target)) {
          _this2._clearDropdown();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (/input|textarea/.test(event.target.tagName)) {
          return;
        }
        if (_this2._disabled) {
          return;
        }
        var active = /\bopen/.test(_this2._button.parentNode.className);

        //check if dropdown is open
        if (active) {
          _this2._keyHandler(event);
        }
      });

      // disable click for disabled Items
      this.disableClick();

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

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {}

    /**
     * Called when an instance of the element is created
     */

  }, {
    key: 'createdCallback',
    value: function createdCallback() {}

    /**
     *Toggle the dropdown
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      this._showDropdown();
    }

    /**
     * Disable click on disabled items
     */

  }, {
    key: 'disableClick',
    value: function disableClick() {
      var self = this;
      var items = this.querySelectorAll('ul.dropdown-menu li a');

      var _loop = function _loop(i) {
        items[i].onclick = function () {
          if (items[i].parentNode.classList.contains('disabled')) {
            return false;
          }
          self.dispatchEvent(new CustomEvent('itemClicked', {}));
          return true;
        };
      };

      for (var i = 0; i < items.length; i++) {
        _loop(i);
      }
    }
    /**
     * Open the dropdown
     *
     */

  }, {
    key: '_showDropdown',
    value: function _showDropdown() {
      var button = this.querySelector('.btn');
      if (/\bdisabled/.test(button.className)) {
        return;
      }
      var active = /\bopen/.test(button.parentNode.className);
      if (!active) {
        this._detectTouch();
        this.dispatchEvent(new CustomEvent('show.bs.dropdown', {}));
        button.focus();
        button.setAttribute('aria-expanded', 'true');
        button.parentNode.classList.toggle('open');
        this.dispatchEvent(new CustomEvent('shown.bs.dropdown', {}));
      }
      if (active) {
        this._clearDropdown();
      }
    }
    /**
     * Close the dropdown
     *
     */

  }, {
    key: '_clearDropdown',
    value: function _clearDropdown() {
      var button = this.querySelector('.btn');
      var backdrop = this.querySelector('.dropdown-backdrop');
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
      this.dispatchEvent(new CustomEvent('hide.bs.dropdown', {}));
      button.setAttribute('aria-expanded', 'false');
      button.parentNode.classList.remove('open');
      this.dispatchEvent(new CustomEvent('hidden.bs.dropdown', {}));
    }

    /**
     * Support for phone browser
     *
     */

  }, {
    key: '_detectTouch',
    value: function _detectTouch() {
      if ('ontouchstart' in document.documentElement) {
        var div = document.createElement('div');
        div.classList.add('dropdown-backdrop');
        this.insertBefore(div, this.querySelector('.dropdown-menu'));
        div.addEventListener('click', this._clearDropdown());
      }
    }

    /**
     *Support for accessibility
     *
     * @param {Event} event
     */

  }, {
    key: '_keyHandler',
    value: function _keyHandler(event) {
      var keycode = event.keyCode ? event.keyCode : event.which;

      // escape key
      if (keycode === 27) {
        this._clearDropdown();
        this._button.focus();
      }

      // up and down key
      if (keycode === 38 || keycode === 40) {

        event.preventDefault();
        event.stopPropagation();

        var menuItem = this.querySelectorAll('.dropdown-menu li:not(.disabled) a');
        // index: guide focus on menu items
        var index = Array.prototype.indexOf.call(menuItem, event.target);

        if (keycode === 38 && index > 0) {
          index--;
        }
        if (keycode === 40 && index < menuItem.length - 1) {
          index++;
        }
        if (index < 0) {
          index = 0;
        }
        menuItem[index].focus();
      }
    }
  }]);

  return PfDropdown;
}(HTMLElement);

(function () {
  document.registerElement('pf-dropdown', PfDropdown);
})();