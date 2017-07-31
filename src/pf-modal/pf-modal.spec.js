describe ('PatternFly Moadl Component Tests', function () {
  let customElement, button;

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
      '<button id="btn">Launch demo modal</button>' +
      '<pf-modal id="modal" target-selector="#btn" backdrop keyboard>' +
      '  <pf-modal-dialog>' +
      '    <pf-modal-content>' +
      '      <pf-modal-header></pf-modal-header>' +
      '      <pf-modal-body>Modal body</pf-modal-body>' +
      '      <pf-modal-footer></pf-modal-footer>' +
      '    </pf-modal-content>' +
      '  </pf-modal-dialog>' +
      '</pf-modal>'
    );
    button = document.querySelector('#btn');
    customElement = document.querySelector('#modal');
  });

  afterEach(function () {
    document.body.removeChild(button);
    button = null;
    document.body.removeChild(customElement);
    customElement = null;
    if (document.querySelector('.modal-backdrop')) {
      document.body.removeChild(document.querySelector('.modal-backdrop'));
    }
  });

  describe('Prperties & Attributes testing', function () {
    it('Reflecting properties to attributes', function () {
      customElement.open = true;
      expect(customElement.getAttribute('open')).toBe('');

      customElement.backdrop = false;
      expect(customElement.getAttribute('backdrop')).toBe(null);

      customElement.backdrop = true;
      expect(customElement.getAttribute('backdrop')).toBe('');

      customElement.keyboard = false;
      expect(customElement.getAttribute('keyboard')).toBe(null);

      customElement.keyboard = true;
      expect(customElement.getAttribute('keyboard')).toBe('');
    });

    describe('Set open to false', function () {
      it('_hideModal() should be called when open is disable', function () {
        spyOn(customElement, '_hideModal');
        customElement.setAttribute('open', '');
        customElement.open = false;
        expect(customElement._hideModal).toHaveBeenCalled();
      });
    });

    it('Reflecting attributes to properties', function () {
      customElement.setAttribute('open', '');
      expect(customElement.open).toBe(true);

      customElement.removeAttribute('open');
      expect(customElement.open).toBe(false);

      customElement.removeAttribute('backdrop');
      expect(customElement.backdrop).toBe(false);

      customElement.setAttribute('backdrop', '');
      expect(customElement.backdrop).toBe(true);

      customElement.removeAttribute('keyboard');
      expect(customElement.keyboard).toBe(false);

      customElement.setAttribute('keyboard', '');
      expect(customElement.keyboard).toBe(true);
    });
  });

  describe('Methods testing', function () {

    it('modal should be visible after calling method show()', function() {
      customElement.show();
      expect(customElement.getAttribute('open')).toBe('');
    });

    describe('Method hide() testing', function () {
      it('_hideModal() should be called when hide() is called', function () {
        spyOn(customElement, '_hideModal');
        customElement.open = true;
        customElement.hide();
        expect(customElement._hideModal).toHaveBeenCalled();
      });
      it('Aattribute open will be removed after calling method _afterHideModal', function () {
        customElement._afterHideModal();
        expect(customElement.getAttribute('open')).toBe(null);
      });
    });

    it('show() method should be called when calling method toggle() on visible modal', function () {
      spyOn(customElement, 'show');
      customElement.toggle();
      expect(customElement.show).toHaveBeenCalled();
    });

  });

  describe('Events testing', function () {
    let callback = null;

    beforeEach(function () {
      callback = jasmine.createSpy();
    });

    it('pf-modal.show should be triggered when user clicks the modal launch button', function () {
      customElement.addEventListener('pf-modal.show', callback);
      btn.click();
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.mostRecent().args[0].detail.relatedTarget.isEqualNode(btn)).toBe(true);
    });

    it('pf-modal.show should be triggered when the show instance method is called', function () {
      customElement.addEventListener('pf-modal.show', callback);
      customElement.show();
      expect(callback).toHaveBeenCalled();
      expect(callback.calls.mostRecent().args[0].detail).toBeNull();
    });

    it('pf-modal.shown should be triggered when the modal is visible', function () {
      customElement.addEventListener('pf-modal.shown', callback);
      customElement._afterShowModal();
      expect(callback).toHaveBeenCalled();
    });

    it('pf-modal.hide should be triggered when user clicks the cancel button', function () {
      customElement.addEventListener('pf-modal.hide', callback);
      customElement.querySelector('.pf-hide-modal').click();
      expect(callback).toHaveBeenCalled();
    });

    it('pf-modal.hidden should be triggered when the modal is hidden', function () {
      customElement.addEventListener('pf-modal.hidden', callback);
      customElement._afterHideModal();
      expect(callback).toHaveBeenCalled();
    });
  });

});