describe ('PatternFly Notification Drawer Component Tests', function () {
  let drawer, btn;

  function render(html) {
    let template = document.createElement('template');
    template.innerHTML = html;
    document.body.appendChild(document.importNode(template.content, true));
  }

  beforeEach(function (done) {
    let mo = new MutationObserver(function () {
      mo.disconnect();
      done();
    });
    mo.observe(document.body, { childList: true });
    render(
      '<button id="btn-toggle-notification-drawer">Toggle Notification-Drawer</button>' +
      '<pf-notification-drawer id="drawer" targetSelector="#btn-toggle-notification-drawer">' +
      ' <pf-notification-drawer-header drawerTitle="Notes"></pf-notification-drawer-header>' +
      ' <pf-notification-drawer-accordion>' +
      '   <pf-notification-drawer-accordion-panel panelTitle="Tab 1">' +
      '     <pf-notification-drawer-accordion-panel-collapse>' +
      '       <pf-notification-drawer-accordion-panel-body>' +
      '         <p class="drawer-pf-notification unread">' +
      '           <span class="drawer-pf-notification-message">Notfication 1</span>' +
      '         </p>' +
      '         <p class="drawer-pf-notification">' +
      '           <span class="drawer-pf-notification-message">Notfication 2</span>' +
      '         </p>' +
      '       </pf-notification-drawer-accordion-panel-body>' +
      '     </pf-notification-drawer-accordion-panel-collapse>' +
      '   </pf-notification-drawer-accordion-panel>' +
      '  </pf-notification-drawer-accordion>' +
      '</pf-notification-drawer>'
    );
    btn = document.querySelector('#btn-toggle-notification-drawer');
    drawer = document.querySelector('#drawer');
  });

  afterEach(function () {
    document.body.removeChild(drawer);
    drawer = null;
    document.body.removeChild(btn);
    btn = null;
  });

  describe('Prperties testing', function () {
    it('update the drawer title', function () {
      drawer.querySelector('pf-notification-drawer-header').drawerTitle = 'Notices';
      expect(drawer.querySelector('.drawer-pf-title').querySelector('h3').textContent).toBe('Notices');
    });

    it('update the panel title for one notification group', function () {
      drawer.querySelector('pf-notification-drawer-accordion-panel').panelTitle = 'Group 1';
      expect(drawer.querySelector('.panel-title').children[0].textContent).toBe('Group 1');
    });
  });

  describe('Events testing', function () {
    let callback = null;

    beforeEach(function () {
      callback = jasmine.createSpy();
    });

    it('pf-notification-drawer.markallread should be triggered when user clicks the "Mark All Read" button', function () {
      drawer.addEventListener('pf-notification-drawer.markallread', callback);
      document.querySelector('.mark-all-read').click();
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.mostRecent().args[0].detail.source.panelTitle).toBe('Tab 1');
      expect(drawer.querySelectorAll('.unread').length).toBe(0);
      expect(drawer.querySelector('.panel-counter').textContent).toBe('0 New Events');
      expect(btn.querySelector('.badge')).toBeNull();
    });

    it('pf-notification-drawer.clearall should be triggered when user clicks the "Clear All" button', function () {
      drawer.addEventListener('pf-notification-drawer.clearall', callback);
      document.querySelector('.clear-all').click();
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.mostRecent().args[0].detail.source.panelTitle).toBe('Tab 1');
      expect(drawer.querySelector('.panel-counter').textContent).toBe('0 New Events');
      expect(btn.querySelector('.badge')).toBeNull();
    });

    describe('pf-notification-drawer.updateall testing', function () {
      beforeEach(function (done) {
        drawer.addEventListener('pf-notification-drawer.updateall', callback);
        let mo = new MutationObserver(function () {
          mo.disconnect();
          done();
        });
        mo.observe(drawer.querySelector('.panel-body'), { childList: true });
        drawer.querySelector('.panel-body').innerHTML =
          '<p class="drawer-pf-notification">' +
          '  <span class="drawer-pf-notification-message">Notfication A</span>' +
          '</p>' +
          '<p class="drawer-pf-notification unread">' +
          '  <span class="drawer-pf-notification-message">Notfication B</span>' +
          '</p>';
      });

      it('pf-notification-drawer.updateall should be triggered when user updates the data of one notification group', function () {
        expect(callback).toHaveBeenCalled();
        expect(callback.calls.mostRecent().args[0].detail.source.panelTitle).toBe('Tab 1');
      });
    });

    describe('pf-notification-drawer.updategroups testing', function () {
      beforeEach(function (done) {
        drawer.addEventListener('pf-notification-drawer.updategroups', callback);
        let mo = new MutationObserver(function () {
          mo.disconnect();
          done();
        });
        mo.observe(drawer.querySelector('.panel-group'), { childList: true });
        drawer.querySelector('.panel-group').innerHTML =
          '<pf-notification-drawer-accordion-panel panelTitle="New Tab">' +
          '  <pf-notification-drawer-accordion-panel-collapse>' +
          '    <pf-notification-drawer-accordion-panel-body>' +
          '      <p class="drawer-pf-notification">' +
          '        <span class="drawer-pf-notification-message">Notfication No.1</span>' +
          '      </p>' +
          '      <p class="drawer-pf-notification">' +
          '        <span class="drawer-pf-notification-message">Notfication No.2</span>' +
          '      </p>' +
          '    </pf-notification-drawer-accordion-panel-body>' +
          '  </pf-notification-drawer-accordion-panel-collapse>' +
          '</pf-notification-drawer-accordion-panel>';
      });

      it('pf-notification-drawer.updategroups should be triggered when user updates the data of all the notification groups', function () {
        expect(callback).toHaveBeenCalled();
        expect(drawer.querySelector('.panel-counter').textContent).toBe('0 New Events');
        expect(btn.querySelector('.badge')).toBeNull();
        expect(drawer.querySelector('.panel-title').children[0].textContent).toBe('New Tab');
      });
    });

  });

});