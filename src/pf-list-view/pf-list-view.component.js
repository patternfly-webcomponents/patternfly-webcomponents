import {default as defaultTemplate, itemRow, pfCheckbox} from './pf-list-view.template.js';

let forEach = Array.prototype.forEach;

export class PfListView extends HTMLElement {
  createdCallback () {
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
    this._template.innerHTML = defaultTemplate;

    let itemRowTemplate = document.createElement('template');
    itemRowTemplate.innerHTML = itemRow;

    // get user defined template-repeater's template
    let transcludeTemplate = this.querySelector('template');

    // add all children of transcludeTemplate to itemRowTemplate (wraps them)
    itemRowTemplate.content.querySelector('.list-view-pf-main-info').innerHTML = transcludeTemplate.innerHTML;

    // add checkbox
    let header = itemRowTemplate.content.querySelector('.list-group-item-header');
    header.innerHTML = pfCheckbox + header.innerHTML;

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

  attachedCallback () {
    this.innerHTML = this._template.innerHTML;
  }

  attributeChangedCallback (attributeName, oldValue, newValue) {
    if (attributeName === 'show-checkboxes') {
      this.showHideCheckboxes();
    }
  }

  handleRepeaterContentChanged () {
    this.updateCheckboxes();
    this.updateActionButtons();
  }

  updateCheckboxes () {
    this.showHideCheckboxes();
    this.listenForCheckboxChanges();
  }

  updateActionButtons () {
    let actionButtons = PfListView.fromJson(this.getAttribute("action-buttons"));
    // Get the headers of each row
    let headers = this.querySelectorAll('.list-group-item-header');

    // wish forEach worked with NodeLists :-(
    for (let i = 0; i < headers.length; i++) {
      let header = headers[i];
      let actions = document.createElement('div');
      actions.classList = "list-view-pf-actions";
      actionButtons.forEach(function (button) {
        let btn = document.createElement('button');
        btn.innerHTML = button.name;
        btn.classList = "btn btn-default" + (button.class ? " " + button.class : "");
        btn.title = button.title;
        btn.actionFn = button.actionFn;
        btn.rowInnerText = header.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
        // btn.onclick = this.handleActionButtonClick;   <-- why can't I get this way to work?!
        btn.addEventListener("click", this.handleActionButtonClick);
        actions.appendChild(btn);
      }, this);

      let refNode = header.querySelector('.list-view-pf-checkbox');
      header.insertBefore(actions, refNode);
    }
  }

  handleActionButtonClick (e) {
    let funcStr = e.currentTarget.actionFn;
    let funcParam = e.currentTarget.rowInnerText;
    // TODO: There are pros & cons to using eval, we'll need to reevaluate
    eval('(' + funcStr + ')("' + funcParam + '")');
  }

  showHideCheckboxes () {
    let showCheckboxes = this.getAttribute("show-checkboxes");
    let checkboxes = this.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
      let checkbox = checkboxes[i];
      if (showCheckboxes === undefined || showCheckboxes === 'true') {
        checkbox.parentNode.style.display = "";
      } else {
        checkbox.parentNode.style.display = "none";
      }
    }
  }

  listenForCheckboxChanges () {
    let showCheckboxes = this.getAttribute("show-checkboxes");
    if (showCheckboxes === undefined || showCheckboxes === 'true') {
      let checkboxes = this.querySelectorAll('input[type="checkbox"]');
      for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        // TODO: kind of hacky, need a better way to do this
        let rowInnerText = checkbox.parentNode.parentNode.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
        checkbox.value = rowInnerText;
        // there can only be one
        checkbox.removeEventListener("change", handleCheckboxChange);
        checkbox.addEventListener("change", handleCheckboxChange);
      }
    }

    function handleCheckboxChange (e) {
      // TODO: keep track of selected items/rows, for now just output
      let checkbox = e.currentTarget;
      // TODO: this seems very fragile, what if HTML hierarchy changes?  Need better way.
      checkbox.parentNode.parentNode.parentNode.classList.toggle('active');

      let msg = (checkbox.checked ? "Selected: " : "Unselected: ") + checkbox.value;
      let event = new CustomEvent('RowSelectionChanged', {"value": msg});
      event.initCustomEvent('RowSelectionChanged', true, true, {"value": msg});
      this.dispatchEvent(event);
    }
  }

  static fromJson (str) {
    let obj = [];
    if (typeof str === "string") {
      try {
        obj = JSON.parse(str);
      } catch (e) {
        // throw new Error("Invalid JSON string provided. ");
      }
    }
    return obj;
  }
}
(function () {
  document.registerElement('pf-list-view', PfListView);
})();