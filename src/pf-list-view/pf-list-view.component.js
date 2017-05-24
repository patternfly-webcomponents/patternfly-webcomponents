import {default as defaultTemplate, itemRow} from './pf-list-view.template.js';

let forEach = Array.prototype.forEach;

/**
 * <b>&lt;pf-list-view&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-list-view id="example1" show-checkboxes="true">
 *  <pf-template-repeater id="example1-content" content='[{"name": "Big Bird", "address": "1 Seaseme Street"}]'>
 *    <pf-template>
 *      <div class="list-view-pf-description">
 *        <div class="list-group-item-heading">
 *          ${name}
 *        </div>
 *        <div class="list-group-item-text">
 *          ${address}
 *        </div>
 *      </div>
 *    </pf-template>
 *  </pf-template-repeater>
 * </pf-list-view>
 *
 * @prop {string} show-checkboxes whether to show list-view checkboxes
 */
export class PfListView extends HTMLElement {
  /*
   * An instance of the element is created or upgraded
   */
  constructor () {
    super();
    // Listen for when the child template-repeater updates it's content
    // ie. repeates the user defined template and replaces $(name) with actual values
    this.addEventListener("RepeaterContentChanged", function (e) {
      this.handleRepeaterContentChanged();
    });
  }

  /*
   * Only attributes listed in the observedAttributes property will receive this callback
   */
  static get observedAttributes() {
    return ['show-checkboxes'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attributeName, oldValue, newValue) {
    this.showHideCheckboxes();
  }

  /**
   * Called when repeater content changes (updates content)
   */
  handleRepeaterContentChanged () {
    this.updateComponent();
    this.updateCheckboxes();
    this.updateActionButtons();
  }

  /**
   * This method updates the overall list view and each repeated row/item in the list.
   * @example {@lang xml}
   *  <pf-list-view>
   *    <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...'
   *      <pf-template>
   *        <div class="list-view-pf-description">
   *          <div class="list-group-item-heading">
   *            ${name}
   *          ...
   */
  updateComponent() {


    this._template = document.createElement('template');
    this._template.innerHTML = defaultTemplate;

    // get repeated templates
    let repeatedTemplates = this.querySelectorAll('pf-template');

    for (let i = 0; i < repeatedTemplates.length; i++) {
      let template = repeatedTemplates[i];

      let itemRowTemplate = document.createElement('template');
      itemRowTemplate.innerHTML = itemRow;

      // Where the transclude happens
      itemRowTemplate.content.querySelector('.list-view-pf-main-info').innerHTML = template.innerHTML;

      this._template.content.querySelector('.list-view-pf').appendChild(itemRowTemplate.content);
    }

    this.innerHTML = this._template.innerHTML;

    /**
     * This method updated the component to:
     * Ie.
     *  <pf-list-view>
     *    <div class="list-group list-view-pf" >
     *      <pf-template-repeater content='[{"name": "Fred Flintstone", "address": "20 Dinosaur Way"}, {"name": "John Smith", "address": "415 ...
     *        <pf-template>
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
        btn.actionType = button.actionType;
        btn.itemId = header.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
        // btn.onclick = this.handleActionButtonClick;   <-- why can't I get this way to work?!
        btn.addEventListener("click", this.handleActionButtonClick);
        actions.appendChild(btn);
      }, this);

      let refNode = header.querySelector('.list-view-pf-checkbox');
      header.insertBefore(actions, refNode);
    }
  }

  handleActionButtonClick (e) {
    let actionType = e.currentTarget.actionType;
    let itemId = e.currentTarget.itemId;

    let event = new CustomEvent('ListViewItemActionInitiated', {"actionType": actionType, "itemId": itemId});
    event.initCustomEvent('ListViewItemActionInitiated', true, true, {"actionType": actionType, "itemId": itemId});
    this.dispatchEvent(event);
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
        let itemId = checkbox.parentNode.parentNode.lastElementChild.innerText.replace(/\s+/g, ' ').trim();
        checkbox.value = itemId;
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

window.customElements.define('pf-list-view', PfListView);