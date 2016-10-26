'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var dangerTemplate = doc.querySelector('.pf-alert-danger-template');
  var infoTemplate = doc.querySelector('.pf-alert-info-template');
  var successTemplate = doc.querySelector('.pf-alert-success-template');
  var warningTemplate = doc.querySelector('.pf-alert-warning-template');

  // PfAlert Element

  var PfAlert = function (_HTMLDivElement) {
    _inherits(PfAlert, _HTMLDivElement);

    function PfAlert() {
      _classCallCheck(this, PfAlert);

      return _possibleConstructorReturn(this, (PfAlert.__proto__ || Object.getPrototypeOf(PfAlert)).apply(this, arguments));
    }

    _createClass(PfAlert, [{
      key: 'attachedCallback',
      value: function attachedCallback() {
        var template = warningTemplate;
        switch (this.getAttribute("type")) {
          case "danger":
            this.className = "alert alert-danger";
            template = dangerTemplate;
            break;
          case "info":
            this.className = "alert alert-info";
            template = infoTemplate;
            break;
          case "success":
            this.className = "alert alert-success";
            template = successTemplate;
            break;
          case "warning":
            this.className = "alert alert-warning";
            template = warningTemplate;
            break;
        }
        this.insertBefore(document.importNode(template.content, true), this.firstChild);
      }
    }]);

    return PfAlert;
  }(HTMLDivElement);

  document.registerElement('pf-alert', PfAlert);
})();