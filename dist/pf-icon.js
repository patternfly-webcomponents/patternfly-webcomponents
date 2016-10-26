'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var dangerTemplate = doc.querySelector('.pf-icon-danger-template');
  var infoTemplate = doc.querySelector('.pf-icon-info-template');
  var successTemplate = doc.querySelector('.pf-icon-success-template');
  var warningTemplate = doc.querySelector('.pf-icon-warning-template');

  // PfIcon Element

  var PfIcon = function (_HTMLElement) {
    _inherits(PfIcon, _HTMLElement);

    function PfIcon() {
      _classCallCheck(this, PfIcon);

      return _possibleConstructorReturn(this, (PfIcon.__proto__ || Object.getPrototypeOf(PfIcon)).apply(this, arguments));
    }

    _createClass(PfIcon, [{
      key: 'attachedCallback',
      value: function attachedCallback() {
        var template = warningTemplate;
        switch (this.getAttribute("type")) {
          case "danger":
            template = dangerTemplate;break;
          case "info":
            template = infoTemplate;break;
          case "success":
            template = successTemplate;break;
          case "warning":
            template = warningTemplate;break;
        }
        this.appendChild(document.importNode(template.content, true));
      }
    }]);

    return PfIcon;
  }(HTMLElement);

  document.registerElement('pf-icon', PfIcon);
})();