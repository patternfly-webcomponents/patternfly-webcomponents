import { default as tabTemplate } from 'pf-tab.template';
import { default as tabsTemplate } from 'pf-tabs.template';
import { default as tabRowTemplate } from 'pf-tab-row-contents.template';
import { pfUtil } from 'pf-utils.js';
import PfTab from 'pf-tab.component';
import 'pf-tab-content.component';

/**
 * <b>&lt;pf-tabs&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-tabs tabs-class="nav nav-tabs">
 *  <pf-tab tab-class="nav-item" content-id="content1" active="true">
 *    Tab One
 *  </pf-tab>
 *  <pf-tab tab-class="nav-item" content-id="content2" active="true">
 *    Tab Two
 *  </pf-tab>
 *  <pf-tab-row-contents contents-class="pf-tabrow-contents">
 *    <button class="btn btn-default" type="button">Default</button>
 *  </pf-tab-row-contents>
 * </pf-tabs>
 * <pf-tab-content content-id="content1"> <p> my content 1 </p></pf-tab-content>
 * <pf-tab-content content-id="content2"> <p> my content 2 </p></pf-tab-content>
 *
 */
export class PfTabs extends HTMLElement {
  /*
    * Called every time the element is inserted into the DOM
    */
  connectedCallback() {
    if (!this._initialized) {
      this.insertBefore(this._tabsTemplate.content, this.firstChild);

      this._makeTabsFromPfTab();

      this._makeTabRowContents();

      // Add the ul class if specified
      this.querySelector('ul').className = this.attributes['tabs-class']
          ? this.attributes['tabs-class'].value
          : 'nav nav-tabs';

      if (!this.mutationObserver) {
        this.mutationObserver = new MutationObserver(this._handleMutations.bind(this));
        this.mutationObserver.observe(this, { characterData: true, childList: true, attributes: true, subtree: true});
      }

      this.initialized = true;
      this.dispatchEvent(new CustomEvent('pf-tabs.initialized', {}));
    }
  }

  /*
    * Only attributes listed in the observedAttributes property will receive this callback
    */
  static get observedAttributes() {
    return ['tabs-class'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'tabs-class' && newValue !== 'ng-isolate-scope') {
      let ul = this.firstElementChild;
      if (ul) {
        ul.className = newValue;
      }
    }
  }

  /*
    * An instance of the element is created or upgraded
    */
  constructor() {
    super();
    this._tabsTemplate = document.createElement('template');
    this._tabsTemplate.innerHTML = tabsTemplate;

    this.selectedIndex = null;
    this.tabs = [];
    this.tabRowListItem = null;
  }

  /**
   * Handle mutations
   *
   * @param mutations
   * @private
   */
  _handleMutations(mutations) {
    let handlers = [];
    mutations.forEach(function(mutationRecord) {
      if (mutationRecord.type === 'childList') {
        for (let i = 0; i < mutationRecord.addedNodes.length; i++) {
          handlers.push(['add', mutationRecord.target, 'childList', mutationRecord.addedNodes[i]]);
        }
        for (let i = 0; i < mutationRecord.removedNodes.length; i++) {
          handlers.push(['remove', mutationRecord.target, 'childList', mutationRecord.removedNodes[i]]);
        }
      }
      if (mutationRecord.type === 'attributes') {
        handlers.push([mutationRecord.attributeName, mutationRecord.target, 'attributes']);
      }
      if (mutationRecord.type === 'characterData') {
        handlers.push([mutationRecord.oldValue, mutationRecord.target, 'characterData']);
      }
    });
    if (handlers.length) {
      requestAnimationFrame(() => {
        let ul = this.querySelector('ul');
        handlers.forEach((notes) => {
          let action = notes[0];
          let target = notes[1];
          let type = notes[2];
          let node = notes[3];

          // if a pf-tab node has been added
          if (node && node.nodeName === 'PF-TAB' && type === 'childList' && action === 'add'
            && target.nodeName === 'PF-TABS') {
            //add tab
            let tab = this._makeTab(node);

            //if active, deactivate others
            if (tab.active) {
              [].forEach.call(this.tabs, (t) => {
                if (t.tabIndex !== tab.tabIndex) {
                  this._makeInactive(t);
                }
              });
            } else {
              this._makeInactive(tab);
            }
            ul.insertBefore(tab.tabElement, ul.children[this.tabs.length - 1]);
            return;
          }

          // if a pf-tab node has been removed
          if (node && node.nodeName === 'PF-TAB' && type === 'childList' && action === 'remove'
            && target.nodeName === 'PF-TABS') {
            //remove tab
            let tabIndex = parseInt(node.getAttribute('tab-index'), 10);
            let tab = this.tabs[tabIndex];
            tab.tabElement.parentNode.removeChild(tab.tabElement);
            this.tabs.splice(tabIndex, 1);

            //we removed the active tab, make the first tab active now instead
            if (tab.active) {
              this._makeActive(this.tabs[0]);
            }
            return;
          }

          //if the pf-tab-row-contents have changed, update the contents
          if (this.tabRowContents && action === 'remove' && type === 'childList'
            && target && target.nodeName === 'LI'
            && this.tabRowListItem.contains(node)) {
            this.tabRowListItem.removeChild(node);
            return;
          }
          if (this.tabRowContents && this.tabRowContents.contains(node)
              && action === 'add' && type === 'childList'
              && target && target.nodeName === 'PF-TAB-ROW-CONTENTS') {
            //if this is an add, we need to transclude the inner dom
            pfUtil.transcludeChildren(this.tabRowContents, this.tabRowListItem);
            return;
          }
        });
      });
    }
  }


  /**
   * Sets the active tab programmatically
   * @param {number} tabIndex the tab index
   */
  setActiveTab(tabIndex) {
    let tab = this.tabs[tabIndex];
    if (!tab.active) {
      this._makeActive(tab);
      [].forEach.call(this.tabs, (t) => {
        if (t.tabIndex !== tab.tabIndex) {
          this._makeInactive(t);
        }
      });
    }
  }

  /**
   * Helper function to create tabs
   *
   * @private
   */
  _makeTabsFromPfTab() {
    let ul = this.querySelector('ul');
    if (this.children && this.children.length) {
      let pfTabs = [].slice.call(this.children).filter(
          (node) => {
            return node.nodeName === 'PF-TAB';
          }
      );
      let tabActive = false;
      [].forEach.call(pfTabs, (pfTab, idx) => {
        let tab = this._makeTab(pfTab);
        ul.appendChild(tab.tabElement);
        if (tab.active) {
          tabActive = true;
          this._makeActive(tab);
        }
      });

      if (!tabActive) {
        //if we don't have an active tab specified, make the first tab active by default
        this._makeActive(this.tabs[0]);
      }
    }
  }

  /**
   * Helper function to create tab row contents
   *
   * @private
   */
  _makeTabRowContents() {
    this.tabRowContents = this.querySelector('pf-tab-row-contents');

    if (this.tabRowContents) {
      let frag = document.createElement('template');
      frag.innerHTML = tabRowTemplate;

      // move contents to the tab-row-contents template
      let li = frag.content.firstElementChild;
      pfUtil.transcludeChildren(this.tabRowContents, li);

      // set the tab row class
      let tabRowClass = pfUtil.getAttributeOrProperty(this.tabRowContents, 'contents-class');
      li.className = tabRowClass || 'pf-tabrow-contents';

      let ul = this.querySelector('ul');
      ul.appendChild(li);

      this.tabRowListItem = li;
    }
  }

  /**
   * Helper function to create a new tab element from given tab
   *
   * @param pfTab A PfTab element
   * @returns {Object} A new tab object
   * @private
   */
  _makeTab(pfTab) {
    let tabIndex = this.tabs.length;
    pfTab.setAttribute('tab-index', tabIndex);

    let frag = document.createElement('template');
    frag.innerHTML = tabTemplate;
    let tabElement = frag.content.firstElementChild;
    let tabAnchor = tabElement.firstElementChild;

    pfUtil.transcludeChildren(pfTab, tabAnchor);

    tabAnchor.onclick = (e) => {
      e.preventDefault();
      this._tabClicked(tabElement);
    };

    let tabContentId = pfUtil.getAttributeOrProperty(pfTab, 'content-id');
    tabAnchor.setAttribute('aria-controls', tabContentId);

    let tabClass = pfUtil.getAttributeOrProperty(pfTab, 'tab-class');
    if (tabClass) {
      tabElement.className = tabClass;
    }

    let active = (pfTab.attributes && pfTab.attributes.active) || pfTab.active;
    let tab = {
      tabIndex: tabIndex,
      pfTab: pfTab,
      tabElement: tabElement,
      tabAnchor: tabAnchor,
      tabContentId: tabContentId,
      active: active
    };

    this.tabs.push(tab);
    return tab;
  }

  /**
   * Helper function to make given tab active
   *
   * @param tab A tab object
   * @private
   */
  _makeActive(tab) {
    tab.active = true;
    tab.tabElement.classList.add('active');
    tab.tabElement.setAttribute('aria-selected', 'true');
    tab.pfTab.setAttribute('active', 'true');

    this.selectedIndex = tab.tabIndex;

    //display tab contents
    let tabContents =
      document.querySelectorAll('pf-tab-content[content-id="' + tab.tabContentId + '"]');
    [].forEach.call(tabContents, (tabContent) => {
      pfUtil.addClass(tabContent, 'active');
    });
  }

  /**
   * Helper function to make given tab inactive
   *
   * @param tab a tab object
   * @private
   */
  _makeInactive(tab) {
    tab.active = false;
    tab.tabElement.classList.remove('active');
    tab.tabElement.setAttribute('aria-selected', 'false');
    tab.pfTab.removeAttribute('active');

    //hide tab contents
    let tabContents =
        document.querySelectorAll('pf-tab-content[content-id="' + tab.tabContentId + '"]');
    [].forEach.call(tabContents, (tabContent) => {
      pfUtil.removeClass(tabContent, 'active');
    });
  }

  /**
   * Helper function to set tab status
   *
   * @param tabElement a pfTab li element
   * @private
   */
  _tabClicked(tabElement) {
    let tab;
    [].forEach.call(this.tabs, (t) => {
      if (t.tabElement === tabElement) {
        tab = t;
      }
    });

    if (tab && !tab.active) {
      this.setActiveTab(tab.tabIndex);
      //dispatch the custom 'tabChanged' event for framework listeners
      this.dispatchEvent(new CustomEvent('pf-tabs.tabChanged', { detail: tab.tabIndex }));
    }
  }
}

window.customElements.define('pf-tabs', PfTabs);