(function() {
  window.perf = window.perf || {};

  perf.createTab = function() {
    var tabs = document.createElement('pf-tabs');

    var tab1 = document.createElement('pf-tab');
    tab1.setAttribute('title', 'Tab 1');
    tabs.appendChild(tab1);

    var p1 = document.createElement('p');
    p1.innerText = 'Tab1 content here';
    tab1.appendChild(p1);

    var tab2 = document.createElement('pf-tab');
    tab2.setAttribute('title', 'Tab 2');
    tabs.appendChild(tab2);

    var p2 = document.createElement('p');
    p2.innerText = 'Tab2 content here';
    tab2.appendChild(p2);

    return tabs;
  }
})()