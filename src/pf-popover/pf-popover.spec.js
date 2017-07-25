describe("PatternFly Popover Component Tests", function () {
  let customElement, button;

  beforeEach(function () {
    customElement = document.createElement('pf-popover');
    customElement.setAttribute('id', 'popover');
    customElement.setAttribute('placement', 'left');
    customElement.setAttribute('target-selector', '#btn');
    button = document.createElement('button');
    button.setAttribute('id', 'btn');
    document.body.appendChild(button);
    document.body.appendChild(customElement);
  });
  afterEach(function () {
    document.body.removeChild(customElement);
    document.body.removeChild(button);
  });

  it('should create the popover or destroy on toggle', function (done) {

    customElement.toggle();

    customElement.addEventListener('pf-popover.opened', function () {
      let popover = document.querySelector('.popover');

      expect(popover.classList.contains('left')).toBe(true);
      customElement.close();
    }, false);

    customElement.addEventListener('pf-popover.closed', function () {
      expect(document.querySelector('.popover')).toBe(null);
      done();
    }, false);
  });

  it('should create the popover or destroy on click', function (done) {
    let result = false;
    customElement.addEventListener('pf-popover.opened', function () {
      result = true;
      button.click();
    });
    button.click();

    customElement.addEventListener('pf-popover.closed', function () {
      expect(result).toBe(true);
      done();
    });
  });
});