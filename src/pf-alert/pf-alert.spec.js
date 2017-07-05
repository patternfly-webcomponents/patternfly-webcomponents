describe ("PatternFly Alert Component Tests", function () {
  let customElement;

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
    customElement = document.createElement('pf-alert');
    customElement.id = 'pfAlert';
  });

  afterEach(function () {
    document.body.removeChild(customElement);
  });

  it('put the correct class on for a danger alert', function () {
    customElement.setAttribute('type', 'danger');
    return addElementToBody(customElement).then(function () {
      let classes = customElement.querySelector('span.pficon-error-circle-o');
      expect(customElement.classList.contains('alert-danger')).toBe(true);
      expect(classes).not.toBe(null);
    });
  });

  it('put the correct class on for a warning alert', function () {
    customElement.setAttribute('type', 'warning');
    return addElementToBody(customElement).then(function () {
      let classes = customElement.querySelector('span.pficon-warning-triangle-o');
      expect(customElement.classList.contains('alert-warning')).toBe(true);
      expect(classes).not.toBe(null);
    });
  });

  it('put the correct class on for a success alert', function () {
    customElement.setAttribute('type', 'success');
    return addElementToBody(customElement).then(function () {
      let classes = customElement.querySelector('span.pficon-ok');
      expect(customElement.classList.contains('alert-success')).toBe(true);
      expect(classes).not.toBe(null);
    });
  });

  it('put the correct class on for a info alert', function () {
    customElement.setAttribute('type', 'info');
    return addElementToBody(customElement).then(function () {
      let classes = customElement.querySelector('span.pficon-info');
      expect(customElement.classList.contains('alert-info')).toBe(true);
      expect(classes).not.toBe(null);
    });
  });

  it('updates the internal span after the attribute is changed', function () {
    customElement.setAttribute('type', 'info');
    return addElementToBody(customElement).then(function () {
      let updatedClasses;
      expect(customElement.classList.contains('alert-info')).toBe(true);

      // Update attribute on the fly
      customElement.setAttribute('type', 'success');
      updatedClasses = customElement.querySelector('span.pficon-ok');
      expect(customElement.classList.contains('alert-success')).toBe(true);
      expect(updatedClasses).not.toBe(null);
    });
  });
});