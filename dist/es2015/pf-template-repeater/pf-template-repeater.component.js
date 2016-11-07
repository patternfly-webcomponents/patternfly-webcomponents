'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This is a fork of a repeater: github.com/Nevraeka/template-repeater
 */

var PFTemplateRepeater = function (_HTMLElement) {
  _inherits(PFTemplateRepeater, _HTMLElement);

  function PFTemplateRepeater() {
    _classCallCheck(this, PFTemplateRepeater);

    return _possibleConstructorReturn(this, (PFTemplateRepeater.__proto__ || Object.getPrototypeOf(PFTemplateRepeater)).apply(this, arguments));
  }

  _createClass(PFTemplateRepeater, [{
    key: 'attachedCallback',
    value: function attachedCallback() {
      this.template = this.querySelector('template');
      this.render(this.getAttribute('content'));
    }
  }, {
    key: 'render',
    value: function render(val) {
      var renderError = "Content should be an Array of objects.";
      var template = this.template;
      var content = PFTemplateRepeater.fromJson(val);
      this.innerHTML = (Array.isArray(content) ? content.map(andApplyTemplate) : new Error(renderError).message).join('');

      function andApplyTemplate(item) {
        return PFTemplateRepeater.interpolate(template.cloneNode(true), item);
      }

      // dispatch a 'repeater content changed' event
      var event = new CustomEvent('RepeaterContentChanged', {});
      event.initCustomEvent('RepeaterContentChanged', true, true, {});
      this.dispatchEvent(event);

      return this.innerHTML;
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldVal, newVal) {
      if (name === "content" && typeof newVal === 'string') {
        this.render(newVal);
      }
    }
  }], [{
    key: 'interpolate',
    value: function interpolate(template, content) {
      var contentArr = Object.keys(content);
      var updatedHTML = "";

      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === "object") {
        var andIterateOverData = function andIterateOverData(item) {
          template.innerHTML = template.innerHTML.replace("${" + item + "}", content[item]);
        };

        contentArr.forEach(andIterateOverData);

        updatedHTML += template.innerHTML;
      }

      return updatedHTML;
    }
  }, {
    key: 'fromJson',
    value: function fromJson(str) {
      var obj = [];
      if (typeof str === "string") {
        try {
          obj = JSON.parse(str);
        } catch (e) {
          // throw new Error("Invalid JSON string provided. ");
        }
      }
      return obj;
    }
  }]);

  return PFTemplateRepeater;
}(HTMLElement);

document.registerElement("pf-template-repeater", PFTemplateRepeater);