describe('PatternFly Accordion Component Tests', function () {
  let accordion, accordionPanel, accordionHeading, accordionTemplate, accordionHeadingToggle,
    accordionPanel2, accordionHeading2, accordionTemplate2, accordionHeadingToggle2;

  function addChild(parent, element) {
    let promise = new Promise(function (resolve) {
      let observer = new MutationObserver(function () {
        resolve();
        observer.disconnect();
      });
      let config = {
        attributes: true,
        childList: true,
        characterData: true
      };
      observer.observe(element, config);
    });
    parent.appendChild(element);
    return promise;
  }

  function removeChild(parent, element) {
    let promise = new Promise(function (resolve) {
      let observer = new MutationObserver(function (mutations) {
        let i, j, mutation;
        for (i = 0; i < mutations.length; i++) {
          mutation = mutations[i];
          for (j = 0; j < mutation.removedNodes.length; j++) {
            if (element === mutation.removedNodes[j]) {
              observer.disconnect();
              resolve();
              break;
            }
          }
        }
      });
      let config = {
        attributes: true,
        childList: true,
        characterData: true
      };
      observer.observe(parent, config);
    });
    parent.removeChild(element);
    return promise;
  }

  function addElementToBody(element) {
    return addChild(document.body, element);
  }

  function simulateOnTransitionEnd(elem) {
    elem.addEventListener('pf-accordion.expanding',
      () =>   setTimeout( () =>  accordionTemplate._handleTransitionEnd(), 1000)
    );

    elem.addEventListener('pf-accordion.collapsing',
      () => setTimeout( () =>  accordionTemplate._handleTransitionEnd(), 1000)
    );
  }

  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    accordion = document.createElement('pf-accordion');
    accordion.id = 'pfAccordion';
    accordionPanel = document.createElement('pf-accordion-panel');
    accordionPanel.id = 'pfAccordionPanel';
    accordionHeading = document.createElement('pf-accordion-heading');
    accordionHeading.id = 'pfAccordionHeading';
    accordionTemplate = document.createElement('pf-accordion-template');
    accordionTemplate.innerHTML = '<pf-accordion-body>Collapse CONTENT 1</pf-accordion-body>';
    accordionTemplate.id = 'pfAccordionTemplate';

    accordionHeadingToggle = document.createElement('a');
    accordionHeadingToggle.setAttribute('data-toggle', 'collapse');
    accordionHeading.appendChild(accordionHeadingToggle);
    accordionPanel.appendChild(accordionHeading);
    accordionPanel.appendChild(accordionTemplate);
    accordion.appendChild(accordionPanel);

    accordionPanel2 = document.createElement('pf-accordion-panel');
    accordionPanel2.id = 'pfAccordionPanel2';
    accordionHeading2 = document.createElement('pf-accordion-heading');
    accordionHeading2.id = 'pfAccordionHeading2';
    accordionTemplate2 = document.createElement('pf-accordion-template');
    accordionTemplate2.innerHTML = '<pf-accordion-body>Collapse CONTENT 2</pf-accordion-body>';
    accordionTemplate2.id = 'pfAccordionTemplate2';

    accordionHeadingToggle2 = document.createElement('a');
    accordionHeadingToggle2.setAttribute('data-toggle', 'collapse');
    accordionHeading2.appendChild(accordionHeadingToggle2);
    accordionPanel2.appendChild(accordionHeading2);
    accordionPanel2.appendChild(accordionTemplate2);
    accordion.appendChild(accordionPanel2);
  });

  afterEach(function () {
    document.body.removeChild(accordion);
  });

  it('put the correct class and aria attributes', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordion.classList.contains('panel-group')).toBe(true);
      expect(accordion.getAttribute('role')).toBe('tablist');
      expect(accordion.getAttribute('aria-multiselectable')).toBe('true');
    });
  });

  it('put the correct class for an accordion panel', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel')).toBe(true);
    });
  });

  it('put the correct class and aria attributes for an accordion heading', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeading.classList.contains('panel-heading')).toBe(true);
      expect(accordionHeading.getAttribute('role')).toBe('tab');
    });
  });

  it('put the correct class and aria attributes for an accordion template', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionTemplate.classList.contains('panel-collapse')).toBe(true);
      expect(accordionTemplate.classList.contains('collapse')).toBe(true);
      expect(accordionTemplate.getAttribute('role')).toBe('tabpanel');
    });
  });

  it('recognizes element with data-toggle="collapse" as the accordion toggle', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeading._toggle).toBeDefined();
    });
  });

  it('put the correct class and aria attributes for an accordion toggle', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeadingToggle.classList.contains('collapsed')).toBe(true);
      expect(accordionTemplate.open).toBe(false);
    });
  });

  it('put the correct class and aria attributes for an accordion template when it has open attribute', function (done) {
    accordionTemplate.setAttribute('open', '');
    accordionTemplate.addEventListener('pf-accordion.initialized', function () {
      expect(accordionTemplate.classList.contains('in')).toBe(true);
      expect(accordionTemplate.open).toBe(true);
      done();
    });
    addElementToBody(accordion);
  });

  it('put the correct class on accordion toggle when accordion template is hidden', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.open = false;
      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          expect(accordionHeadingToggle.classList.contains('collapsed')).toBe(true);
          resolve();
        });
      });
    });
  });

  it('put the correct class on accordion toggle when accordion template is shown', function () {
    return addElementToBody(accordion).then(() => {
      accordionTemplate.open = true;
      expect(accordionHeadingToggle.classList.contains('collapsed')).toBe(false);
    });
  });

  it('closes other open panel when another is opened', function (done) {
    simulateOnTransitionEnd(accordionTemplate);
    accordionTemplate.addEventListener('pf-accordion.collapsed', function () {
      expect(accordionTemplate.open).toBe(false);
      done();
    });
    accordionTemplate.open = true;
    addElementToBody(accordion).then(function () {
      accordionTemplate2.open = true;
    });
  });

  it('adds the default context modifier class for an accordion panel where none is supplied', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel-default')).toBe(true);
    });
  });

  it('does not add the default context modifier class for an accordion panel where a value is supplied', function () {
    accordionPanel.className = 'panel panel-warning';
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel-default')).toBe(false);
    });
  });

  it('restores the default context modifier class for an accordion panel when all context modifier classes are removed', function () {
    accordionPanel.className = 'panel panel-warning';
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel-default')).toBe(false);
      accordionPanel.className = '';
      // wait till all work by browser is done
      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          expect(accordionPanel.classList.contains('panel')).toBe(true);
          expect(accordionPanel.classList.contains('panel-default')).toBe(true);
          resolve();
        });
      });
    });
  });

  it('sets css styles for all panels when fixed-height component is enabled', function (done) {
    accordion.setAttribute('fixedheight', 'fixedheight');
    accordion.addEventListener('pf-accordion.initialized', function () {
      expect(accordionTemplate.style.maxHeight).not.toBe('');
      expect(accordionTemplate2.style.maxHeight).not.toBe('');
      expect(accordionTemplate.style.overflowY).not.toBe('');
      expect(accordionTemplate2.style.overflowY).not.toBe('');
      done();
    });
    addElementToBody(accordion).catch(function () {
      done.fail();
    });
  });

  it('restores height of all panels when fixed-height is disabled', function () {
    return addElementToBody(accordion).then(function () {
      accordion.fixedHeight = false;
      expect(accordionTemplate.style.maxHeight).toBe('');
      expect(accordionTemplate2.style.maxHeight).toBe('');
      expect(accordionTemplate.style.overflowY).toBe('');
      expect(accordionTemplate2.style.overflowY).toBe('');
    });
  });

  it('picks the next toggle element when current is removed', function () {
    let newToggle = document.createElement('a');
    newToggle.setAttribute('data-toggle', 'collapse');
    accordionHeading.appendChild(newToggle);
    return addElementToBody(accordion)
      .then(function () {
        expect(accordionHeading._toggle).toBeDefined();
        return removeChild(accordionHeading, accordionHeadingToggle);
      }).then(function () {
        expect(accordionHeading._toggle).toBe(newToggle);
      });
  });

  it('picks the toggle when added after initialization', function () {
    let newToggle = document.createElement('a');
    newToggle.setAttribute('data-toggle', 'collapse');
    return removeChild(accordionHeading, accordionHeadingToggle)
      .then(function () {
        return addElementToBody(accordion);
      }).then(function () {
        expect(accordionHeading._toggle).toBe(null);
        return addChild(accordionHeading, newToggle);
      }).then(function () {
        expect(accordionHeading._toggle).toBe(newToggle);
      });
  });

  it('allows to add new panels after initialization', function () {
    let newChild = document.createElement('pf-accordion-panel');
    newChild.innerHTML = '<pf-accordion-heading>< a href="#" data-toggle="collapse">Heading</a></pf-accordion-heading><pf-accordion-template><pf-accordion-body></pf-accordion-body></pf-accordion-template>';
    return addElementToBody(accordion).then(function () {
      return addChild(accordion, newChild);
    }).then(function () {
      expect(newChild.parentNode).toBe(accordion);
    });
  });

  it('allows to remove panels after addition', function () {
    return addElementToBody(accordion).then(function () {
      return removeChild(accordion, accordionPanel2);
    }).then(function () {
      expect(accordionPanel2.parentNode).toBe(null);
    });
  });

  it('put the correct value in open on display change of accordion template', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.open = true;

      return new Promise(function (resolve) {
        setTimeout(function () {
          expect(accordionTemplate.open).toBe(true);
          accordionTemplate.open = false;
          setTimeout(function () {
            expect(accordionTemplate.open).toBe(false);
            resolve();
          }, 100);
        }, 100);
      });
    });
  });
});
