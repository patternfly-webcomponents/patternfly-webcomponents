describe ("PatternFly Switch Component Tests", function () {
  let customElement, stateElement;

  function addElementToBody (element) {
    let promise = new Promise(function (resolve) {
      let observer = new MutationObserver(function () {
        resolve();
        observer.disconnect();
      });
      let config = { attributes: true, childList: true, characterData: true };
      observer.observe(element, config);
    });
    document.body.appendChild(element);
    return promise;
  }

  beforeEach(function () {
    customElement = document.createElement('pf-switch');
    customElement.id = 'pfSwitch';
    stateElement = document.createElement('input');
    stateElement.setAttribute('type','checkbox');
    stateElement.id = 'state';
    customElement.appendChild(stateElement);
  });

  afterEach(function () {
    document.body.removeChild(customElement);
  });

  describe('Initialization behavior', () => {
    it('initializes properties from attributes correctly', () => {
      customElement.setAttribute('state', 'closed');
      customElement.setAttribute('open-text', 'open');
      customElement.setAttribute('closed-text','closed');
      customElement.setAttribute('label-text', 'label');
      customElement.setAttribute('readonly','');
      customElement.setAttribute('disabled', '');
      customElement.setAttribute('hidden','');
      customElement.setAttribute('animated', '');

      addElementToBody(customElement).then(() => {
        expect(customElement.state).toBe('closed');
        expect(customElement.openText).toBe('open');
        expect(customElement.closedText).toBe('closed');
        expect(customElement.labelText).toBe('label');
        expect(customElement.readonly).toBe(true);
        expect(customElement.disabled).toBe(true);
        expect(customElement.hidden).toBe(true);
        expect(customElement.animated).toBe(true);
      });
    });


    it('sets attributes from properties correctly', () => {
      addElementToBody(customElement).then(() => {
        customElement.state = 'closed';
        customElement.openText = 'open';
        customElement.closedText = 'closed';
        customElement.labelText = 'label';
        customElement.readonly = true;
        customElement.disabled = true;
        customElement.hidden = true;
        customElement.animated = true;

        expect(customElement.getAttribute('state')).toBe('closed');
        expect(customElement.getAttribute('open-text')).toBe('open');
        expect(customElement.getAttribute('closed-text')).toBe('closed');
        expect(customElement.getAttribute('label-text')).toBe('label');
        expect(customElement.hasAttribute('readonly')).toBe(true);
        expect(customElement.hasAttribute('disabled')).toBe(true);
        expect(customElement.hasAttribute('hidden')).toBe(true);
        expect(customElement.hasAttribute('animated')).toBe(true);
      });
    });
  });

  describe('CSS classes', () => {
    it('adds appropriate class when switch set to animate', () => {
      customElement.setAttribute('animated','');
      addElementToBody(customElement).then(() => {
        let wrapper = customElement.querySelector('.bootstrap-switch-wrapper');
        expect(wrapper.classList.contains('bootstrap-switch-animate')).toBe(true);
      });
    });

    it('adds appropriate class when switch set to readonly', () => {
      customElement.setAttribute('readonly','');
      addElementToBody(customElement).then(() => {
        let wrapper = customElement.querySelector('.bootstrap-switch-wrapper');
        expect(wrapper.classList.contains('bootstrap-switch-readonly')).toBe(true);
      });
    });

    it('adds appropriate class when switch set to disabled', () => {
      customElement.setAttribute('disabled','');
      addElementToBody(customElement).then(() => {
        let wrapper = customElement.querySelector('.bootstrap-switch-wrapper');
        expect(wrapper.classList.contains('bootstrap-switch-disabled')).toBe(true);
      });
    });

    it('adds appropriate class when switch state is set to open', () => {
      customElement.state = 'open';
      addElementToBody(customElement).then(() => {
        let wrapper = customElement.querySelector('.bootstrap-switch-wrapper');
        expect(wrapper.classList.contains('bootstrap-switch-off')).toBe(true);
      });
    });

    it('adds appropriate class when switch state is set to closed', () => {
      customElement.state = 'closed';
      addElementToBody(customElement).then(() => {
        let wrapper = customElement.querySelector('.bootstrap-switch-wrapper');
        expect(wrapper.classList.contains('bootstrap-switch-on')).toBe(true);
      });
    });

    it('adds appropriate class when switch state is set to indeterminate', () => {
      customElement.state = 'indeterminate';
      addElementToBody(customElement).then(() => {
        let wrapper = customElement.querySelector('.bootstrap-switch-wrapper');
        expect(wrapper.classList.contains('bootstrap-switch-indeterminate')).toBe(true);
      });
    });
  });

  describe('Behavior', () => {
    it('toggles', () => {
      customElement.state = 'open';
      addElementToBody(customElement).then(() => {
        expect(customElement.state).toBe('open');
        customElement.toggle();
        expect(customElement.state).toBe('closed');
        customElement.toggle();
        expect(customElement.state).toBe('open');
      });
    });

    it('coerces invalid state to open', () => {
      customElement.state = 'invalid';
      addElementToBody(customElement).then(() => {
        expect(customElement.state).toBe('open');
      });
    });

    it('normalizes all labels to single size', () => {
      customElement.openText = 'on';
      customElement.closedText = 'off';
      customElement.labelText = 'switch';
      addElementToBody(customElement).then(() => {
        let benchLength = customElement.querySelector('.bootstrap-switch-handle-on').innerText.length;
        expect(customElement.querySelector('.bootstrap-switch-handle-off').innerText.length).toBe(benchLength);
        expect(customElement.querySelector('.bootstrap-switch-label').innerText.length).toBe(benchLength);
      });
    });

    it('updates underlying checkbox state', () => {
      addElementToBody(customElement).then(() => {
        customElement.state = 'closed';
        expect(stateElement.checked).toBe(true);
        customElement.state = 'open';
        expect(stateElement.checked).toBe(false);
        customElement.state = 'indeterminate';
        expect(stateElement.indeterminate).toBe(true);
      });
    });
  });
});
