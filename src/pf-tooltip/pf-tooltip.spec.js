describe ("PatternFly Tooltip Component Tests", function () {
  let customElement, button;

  function render(html) {
    let template = document.createElement('template');
    template.innerHTML = html;
    document.body.appendChild(document.importNode(template.content, true));
  }

  afterEach(function () {
    document.body.removeChild(customElement);
    document.body.removeChild(button);
  });

  it('should create the tooltip on open and destroy on close', function (done) {
    render('<button id="btn">Button</button>');
    render('<pf-tooltip id="tooltip" placement="left" target-selector="#btn">Would you look at that!</pf-tooltip>');

    button = document.querySelector('#btn');
    customElement = document.querySelector('#tooltip');

    //used open() due to issue with mouseover / mouseenter events being not available to karma-phantomjs-launcher
    //https://github.com/karma-runner/karma-phantomjs-launcher/issues/19
    customElement.open();

    customElement.addEventListener('pf-tooltip.opened', function () {
      let tooltip = document.querySelector('.tooltip');
      let tooltipText = tooltip.innerText.replace(/(\r\n|\n|\r)/gm,""); //remove any newlines rendered in Phantom

      expect(tooltip.classList.contains('left')).toBe(true);
      expect(tooltipText).toBe("Would you look at that!");
      customElement.close();
    }, false);

    customElement.addEventListener('pf-tooltip.closed', function () {
      expect(document.querySelector('.tooltip')).toBe(null);
      done();
    }, false);
  });
});