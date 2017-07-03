describe("Patternfly Touchspin Component Tests", function () {
  let customElement, downbtn, upbtn, input, eventCallback, result;

  function buildHtml(html) {
    template = document.createElement('template');
    template.innerHTML = html;
    document.body.appendChild(document.importNode(template.content, true));
  }
  beforeEach(function () {
    buildHtml('<pf-touchspin id="touchspin" class="input-group bootstrap-touchspin"><span class="input-group-btn"><button id="button-down" class="btn btn-default bootstrap-touchspin-down" type="button">-</button></span><input value="50" type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default bootstrap-touchspin-up" type="button">+</button></span></pf-touchspin>');
    customElement = document.querySelector('#touchspin');
    downbtn = document.querySelector(".bootstrap-touchspin-down");
    upbtn = document.querySelector(".bootstrap-touchspin-up");
    input = document.querySelector("input");
    eventCallback = {
      eventHandle: function () {
        document.dispatchEvent(new MouseEvent('mouseup'));
      },
      eventFakeHandle: function () { }
    };
    spyOn(eventCallback, 'eventHandle');
    spyOn(eventCallback, 'eventFakeHandle');
  });

  afterEach(function () {
    document.body.removeChild(customElement);
    downbtn = null;
    upbtn = null;
    input = null;
  });

  it("should decrement and increment input value on _bindEvent", function (done) {

    customElement.dispatchEvent(new CustomEvent('pf-touchspin.downonce', {}));
    expect(input.value).toEqual('49');

    customElement.dispatchEvent(new CustomEvent('pf-touchspin.uponce', {}));
    expect(input.value).toEqual('50');

    done();
  });

  it("should decrement or increment value on click", function (done) {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.startdownspin', function () {
      documen.addEventListener(new MouseEvent('mouseup'));
    });
    expect(input.value).toEqual('49');

    upbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.startupspin', function () {
      documen.addEventListener(new MouseEvent('mouseup'));
    });
    expect(input.value).toEqual('50');
    done();
  });

  it("should fire pf-touchspin.startspin event", function (done) {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.startspin', eventCallback.eventHandle());
    expect(eventCallback.eventHandle).toHaveBeenCalled();
    done();
  });

  it("should fire pf-touchspin.max event", function () {

    upbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.max', eventCallback.eventHandle());
    expect(eventCallback.eventHandle).toHaveBeenCalled();
  });

  it("should fire pf-touchspin.min event", function () {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    customElement.addEventListener('pf-touchspin.min', eventCallback.eventHandle());
    expect(eventCallback.eventHandle).toHaveBeenCalled();
  });

  it("should fire pf-touchspin.stopspin", function (done) {
    downbtn.dispatchEvent(new MouseEvent('mousedown'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    customElement.addEventListener('pf-touchspin.stopspin', eventCallback.eventFakeHandle());
    expect(eventCallback.eventFakeHandle).toHaveBeenCalled();
    done();
  });
});