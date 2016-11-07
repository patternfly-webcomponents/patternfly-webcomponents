'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfListView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfListViewTemplate = require('./pf-list-view.template.js');

var _pfListViewTemplate2 = _interopRequireDefault(_pfListViewTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var forEach = Array.prototype.forEach;

var PfListView = exports.PfListView = function (_HTMLElement) {
  _inherits(PfListView, _HTMLElement);

  function PfListView() {
    _classCallCheck(this, PfListView);

    return _possibleConstructorReturn(this, (PfListView.__proto__ || Object.getPrototypeOf(PfListView)).apply(this, arguments));
  }

  _createClass(PfListView, [{
    key: 'createdCallback',
    value: function createdCallback() {
      /**
       * This method updates the raw user defined template before the template-repeater processes it.
       * Ie.
       *  <pf-list-view>
       *    <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...
         *      <template>
         *        <div class="list-view-pf-description">
         *          <div class="list-group-item-heading">
         *            ${name}
         *          ...
         */
      this._template = document.createElement('template');
      this._template.innerHTML = _pfListViewTemplate2.default;

      var itemRowTemplate = document.createElement('template');
      itemRowTemplate.innerHTML = _pfListViewTemplate.itemRow;

      // get user defined template-repeater's template
      var transcludeTemplate = this.querySelector('template');

      // add all children of transcludeTemplate to itemRowTemplate (wraps them)
      itemRowTemplate.content.querySelector('.list-view-pf-main-info').innerHTML = transcludeTemplate.innerHTML;

      // add checkbox
      var header = itemRowTemplate.content.querySelector('.list-group-item-header');
      header.innerHTML = _pfListViewTemplate.pfCheckbox + header.innerHTML;

      // Update the template-repeater's template in the DOM to that of the itemRowTemplate
      transcludeTemplate.innerHTML = itemRowTemplate.innerHTML;

      // wrap all in default template
      this._template.content.querySelector('.list-view-pf').innerHTML = this.innerHTML;

      // Listen for when the child template-repeater updates it's content
      // ie. repeates the user defined template and replaces $(name) with actual values
      this.addEventListener("RepeaterContentChanged", function (e) {
        this.handleRepeaterContentChanged();
      });

      /**
       * This method updated the user defined template to:
       * Ie.
       *  <pf-list-view>
       *    <div class="list-group list-view-pf" >
       *      <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...
         *        <template>
         *          <div class="list-group-item">
         *            <div class="list-group-item-header">
         *              <div class="list-view-pf-checkbox">
         *                <input type="checkbox">
         *              </div>
         *              <div class="list-view-pf-main-info">
         *                <div class="list-view-pf-description">
         *                  ${name}
         *                ...
         *
         */
    }
  }, {
    key: 'attachedCallback',
    value: function attachedCallback() {
      this.innerHTML = this._template.innerHTML;
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
      if (attributeName === 'show-checkboxes') {
        this.showHideCheckboxes();
      }
    }
  }, {
    key: 'handleRepeaterContentChanged',
    value: function handleRepeaterContentChanged() {
      this.updateCheckboxes();
      this.updateActionButtons();
    }
  }, {
    key: 'updateCheckboxes',
    value: function updateCheckboxes() {
      this.showHideCheckboxes();
      this.listenForCheckboxChanges();
    }
  }, {
    key: 'updateActionButtons',
    value: function updateActionButtons() {
      var _this2 = this;

      var actionButtons = PfListView.fromJson(this.getAttribute("action-buttons"));
      // Get the headers of each row
      var headers = this.querySelectorAll('.list-group-item-header');

      // wish forEach worked with NodeLists :-(

      var _loop = function _loop(i) {
        var header = headers[i];
        var actions = document.createElement('div');
        actions.classList = "list-view-pf-actions";
        actionButtons.forEach(function (button) {
          var btn = document.createElement('button');
          btn.innerHTML = button.name;
          btn.classList = "btn btn-default" + (button.class ? " " + button.class : "");
          btn.title = button.title;
          btn.actionFn = button.actionFn;
          btn.rowInnerText = header.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
          // btn.onclick = this.handleActionButtonClick;   <-- why can't I get this way to work?!
          btn.addEventListener("click", this.handleActionButtonClick);
          actions.appendChild(btn);
        }, _this2);

        var refNode = header.querySelector('.list-view-pf-checkbox');
        header.insertBefore(actions, refNode);
      };

      for (var i = 0; i < headers.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'handleActionButtonClick',
    value: function handleActionButtonClick(e) {
      var funcStr = e.currentTarget.actionFn;
      var funcParam = e.currentTarget.rowInnerText;
      // TODO: There are pros & cons to using eval, we'll need to reevaluate
      eval('(' + funcStr + ')("' + funcParam + '")');
    }
  }, {
    key: 'showHideCheckboxes',
    value: function showHideCheckboxes() {
      var showCheckboxes = this.getAttribute("show-checkboxes");
      var checkboxes = this.querySelectorAll('input[type="checkbox"]');
      for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (showCheckboxes === undefined || showCheckboxes === 'true') {
          checkbox.parentNode.style.display = "";
        } else {
          checkbox.parentNode.style.display = "none";
        }
      }
    }
  }, {
    key: 'listenForCheckboxChanges',
    value: function listenForCheckboxChanges() {
      var showCheckboxes = this.getAttribute("show-checkboxes");
      if (showCheckboxes === undefined || showCheckboxes === 'true') {
        var checkboxes = this.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
          var checkbox = checkboxes[i];
          // TODO: kind of hacky, need a better way to do this
          var rowInnerText = checkbox.parentNode.parentNode.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
          checkbox.value = rowInnerText;
          // there can only be one
          checkbox.removeEventListener("change", handleCheckboxChange);
          checkbox.addEventListener("change", handleCheckboxChange);
        }
      }

      function handleCheckboxChange(e) {
        // TODO: keep track of selected items/rows, for now just output
        var checkbox = e.currentTarget;
        // TODO: this seems very fragile, what if HTML hierarchy changes?  Need better way.
        checkbox.parentNode.parentNode.parentNode.classList.toggle('active');

        var msg = (checkbox.checked ? "Selected: " : "Unselected: ") + checkbox.value;
        var event = new CustomEvent('RowSelectionChanged', { "value": msg });
        event.initCustomEvent('RowSelectionChanged', true, true, { "value": msg });
        this.dispatchEvent(event);
      }
    }
  }], [{
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

  return PfListView;
}(HTMLElement);

(function () {
  document.registerElement('pf-list-view', PfListView);
})();