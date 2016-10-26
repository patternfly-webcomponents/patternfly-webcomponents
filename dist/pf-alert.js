"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfAlert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfAlertTmpl = require("./pf-alert-tmpl");

var _pfAlertTmpl2 = _interopRequireDefault(_pfAlertTmpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// PfAlert Element
var PfAlert = exports.PfAlert = function (_HTMLElement) {
  _inherits(PfAlert, _HTMLElement);

  function PfAlert() {
    _classCallCheck(this, PfAlert);

    return _possibleConstructorReturn(this, (PfAlert.__proto__ || Object.getPrototypeOf(PfAlert)).apply(this, arguments));
  }

  _createClass(PfAlert, [{
    key: "attachedCallback",

    // Fires when an instance was inserted into the document.
    value: function attachedCallback() {
      switch (this.getAttribute("type")) {
        case "danger":
          this.className = "alert alert-danger";
          this._template = _pfAlertTmpl2.default.danger;
          break;
        case "info":
          this.className = "alert alert-info";
          this._template = _pfAlertTmpl2.default.info;
          break;
        case "success":
          this.className = "alert alert-success";
          this._template = _pfAlertTmpl2.default.success;
          break;
        case "warning":
          this.className = "alert alert-warning";
          this._template = _pfAlertTmpl2.default.warning;
          break;
      }
      this.innerHTML = this._template + this.innerHTML;
    }
  }, {
    key: "createdCallback",


    // Fires when an instance of the element is created.
    value: function createdCallback() {
      this._template = _pfAlertTmpl2.default.warning;
    }
  }]);

  return PfAlert;
}(HTMLElement);

(function () {
  document.registerElement('pf-alert', PfAlert);
})();