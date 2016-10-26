(function(){
  var doc = (document._currentScript || document.currentScript).ownerDocument;
  var tabsTemplate = doc.querySelector('.tabs-template');
  var tabTemplate = doc.querySelector('.tab-template');
  var panelTemplate = doc.querySelector('.panel-template');
  var forEach = Array.prototype.forEach;

  // shimStyles(tabsTemplate.content, 'pf-tabs');
  // shimStyles(panelTemplate.content, 'pf-tab');
  //
  // function shimStyles(root, name) {
  //   if (window.ShadowDOMPolyfill) {
  //     WebComponents.ShadowCSS.shimStyling(root, name);
  //   }
  // }

  //PfTab Custom Element
  class PfTab extends HTMLElement {
    attachedCallback() {
      // this.createShadowRoot();
      // this.shadowRoot.appendChild(
      //   document.importNode(panelTemplate.content, true)
      // );
      this.appendChild(document.importNode(panelTemplate.content, true));
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      var parent = this.parentNode;
      if(attributeName === 'title' && parent && parent.handleTitle) {
        parent.handleTitle(this, newValue);
      }
    }

    get title() {
      return this._title;
    }

    set title(value) {
      if(this._title !== value) {
        this._title = value;
        this.setAttribute('title', value);
      }
    }

    get active() {
      return this._active;
    }

    set active(value) {
      if(this._active !== value) {
        this._active = value;
        this.setAttribute('active', value);
      }
    }
  }

  //PfTabs Custom Element
  class PfTabs extends HTMLElement {
    createdCallback() {
      this.selected = null;
      this.tabMap = new Map();
      this.panelMap = new WeakMap();
      this.displayMap = new WeakMap();
    }

    attachedCallback() {
      // this.createShadowRoot();
      // this.shadowRoot.appendChild(
      // document.importNode(tabsTemplate.content, true);
      // );
      this.insertBefore(document.importNode(tabsTemplate.content, true), this.firstChild);

      this.makeTabsFromPfTab();

      // this.shadowRoot.querySelector('ul').addEventListener('click', this);
      this.querySelector('ul').addEventListener('click', this);

      //add the ul class if specified
      this.querySelector('ul').className = this.attributes.class ?
        this.attributes.class.value : 'nav nav-tabs';

      if(!this.mutationObserver) {
        this.mutationObserver = new MutationObserver(this.handleMutations.bind(this));
        this.mutationObserver.observe(this, { childList: true, attributes: true });
      }
    }

    detachedCallback() {
      // this.shadowRoot.querySelector('ul').removeEventListener('click', this);
      this.querySelector('ul').removeEventListener('click', this);
    }

    handleEvent(ev) {
      if(ev.target.tagName === 'A') {
        this.setTabStatus(ev.target.parentNode);
      }
    }

    attributeChangedCallback(attrName, oldVal, newVal){
      if(attrName === 'class'){
        this.querySelector('ul').className = newVal;
      }
    }

    handleMutations(mutations) {
      var pfTabs = this;
      var handlers = [];
      mutations.forEach(function(mutationRecord){
        //child dom nodes have been added
        if ( mutationRecord.type == 'childList' ) {
          forEach.call(mutationRecord.addedNodes, function(node){
            handlers.push(['add', node]);
          });
          forEach.call(mutationRecord.removedNodes, function(node){
            handlers.push(['remove', node]);
          });
        }  else if (mutationRecord.type == 'attributes') {
          //mutationRecord.attributeName contains changed attributes
          //note: we can ignore this for attributes as the v1 spec of custom
          //elements already provides attributeChangedCallback
        }
      });
      if(handlers.length) {
        requestAnimationFrame(function(){
          // var ul = pfTabs.shadowRoot.querySelector('ul');
          var ul = pfTabs.querySelector('ul');
          handlers.forEach(function(notes){
            var action = notes[0];
            var pfTab = notes[1];
            var tab;

            //ignore Angular directive #text and #comment nodes
            if(pfTab.nodeName !== "PF-TAB"){
              return;
            }

            if(action === 'add') {
              //add tab
              tab = pfTabs.makeTab(pfTab);
              pfTabs.tabMap.set(tab, pfTab);
              pfTabs.panelMap.set(pfTab, tab);

              //if active, deactivate others
              if(pfTab.attributes.active){
                pfTabs.tabMap.forEach(function(value, key){
                  var fn = tab === key ? pfTabs.makeActive : pfTabs.makeInactive;
                  fn.call(pfTabs, key);
                });
              } else {
                pfTabs.makeInactive(tab);
              }
              ul.appendChild(tab);
            } else {
              //remove tab
              tab = pfTabs.panelMap.get(pfTab);
              tab.parentNode.removeChild(tab);
              pfTabs.panelMap.delete(pfTab);
              pfTabs.tabMap.delete(tab);
              pfTabs.displayMap.delete(tab);

              //we removed the active tab, make the last one active
              if(pfTab.attributes.active){
                var last = ul.querySelector('li:last-child');
                pfTabs.setTabStatus(last);
              }
            }
          });
        });
      }
    }

    handleTitle(panel, title) {
      var tab = this.panelMap.get(panel);
      //attribute changes may fire as Angular is rendering
      //before this tab is in the panelMap, so check first
      if(tab){
        tab.textContent = panel.title;
      }
    }

    makeTabsFromPfTab() {
      // var ul = this.shadowRoot.querySelector('ul');
      var ul = this.querySelector('ul');
      var pfTabs = this.querySelectorAll('pf-tab');
      [].forEach.call(pfTabs, function(pfTab, idx){
        var tab = this.makeTab(pfTab);
        ul.appendChild(tab);
        this.tabMap.set(tab, pfTab);
        this.panelMap.set(pfTab, tab);

        if(idx === 0) {
          this.makeActive(tab);
        } else {
          pfTab.style.display = 'none';
        }
      }.bind(this));
    }

    makeTab(pfTab) {
      var frag = document.importNode(tabTemplate.content, true);
      var tab = frag.firstElementChild;
      var tabAnchor = tab.firstElementChild;
      //React gives us a node with attributes, Angular adds it as a property
      tabAnchor.innerHTML = pfTab.attributes && pfTab.attributes.title ?
        pfTab.attributes.title.value : pfTab.title;
      this.displayMap.set(pfTab, pfTab.style.display);
      return tab;
    }

    makeActive(tab) {
      tab.classList.add('active');
      var pfTab = this.tabMap.get(tab);
      var naturalDisplay = this.displayMap.get(pfTab);
      pfTab.style.display = naturalDisplay;
      pfTab.setAttribute('active','');
    }

    makeInactive(tab) {
      tab.classList.remove('active');
      var pfTab = this.tabMap.get(tab);
      pfTab.style.display = 'none';
      pfTab.removeAttribute('active');
    }

    setTabStatus(active) {
      if(active === this.selected) return;
      this.selected = active;

      // var tabs = this.shadowRoot.querySelector('ul').children;
      var tabs = this.querySelector('ul').children;
      [].forEach.call(tabs, function(tab){
        var fn = active === tab ? this.makeActive : this.makeInactive;
        fn.call(this, tab);
      }.bind(this));
    }
  }

  document.registerElement('pf-tab', PfTab);
  document.registerElement('pf-tabs', PfTabs);
})();