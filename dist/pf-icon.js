"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfIcon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfIconTmpl = require("./pf-icon-tmpl");

var _pfIconTmpl2 = _interopRequireDefault(_pfIconTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// PfIcon Element
var PfIcon = exports.PfIcon = function (_HTMLElement) {
  _inherits(PfIcon, _HTMLElement);

  function PfIcon() {
    _classCallCheck(this, PfIcon);

    return _possibleConstructorReturn(this, (PfIcon.__proto__ || Object.getPrototypeOf(PfIcon)).apply(this, arguments));
  }

  _createClass(PfIcon, [{
    key: "attachedCallback",

    // Fires when an instance was inserted into the document.
    value: function attachedCallback() {
      switch (this.getAttribute("type")) {
        case "danger":
          this._template = _pfIconTmpl2.default.danger;break;
        case "info":
          this._template = _pfIconTmpl2.default.info;break;
        case "success":
          this._template = _pfIconTmpl2.default.success;break;
        case "warning":
          this._template = _pfIconTmpl2.default.warning;break;
      }
      this.innerHTML = this._template;
    }
  }, {
    key: "createdCallback",


    // Fires when an instance of the element is created.
    value: function createdCallback() {
      this._template = _pfIconTmpl2.default.warning;
    }
  }]);

  return PfIcon;
}(HTMLElement);

(function () {
  document.registerElement('pf-icon', PfIcon);
})();