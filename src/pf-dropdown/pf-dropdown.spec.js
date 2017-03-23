describe("Patternfly Dropdown Component Test", function () {
  var customElement;

  beforeEach(function (done) {
    customElement = document.createElement('pf-dropdown');
    customElement.innerHTML = '<button class="btn btn-primary dropdown-toggle" type="button" id="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Dropdown<span class="caret"></span></button><ul class="dropdown-menu"><li class="dropdown-header">Header</li><li><a href="#">Item 1</a></li><li><a href="#">Item 2</a></li><li class="disabled"><a href="#">Item 3</a></li><li><a href="#">Item 4</a></li><li class="divider"></li><li><a href="#">Item 5</a></li></ul>';
    document.body.appendChild(customElement);
    if (customElement.initialized) {
      done();
    } else {
      //wait for initialization
      customElement.addEventListener('initialized', function (event) {
        done();
      });
    }
  });

  afterEach(function () {
    document.body.removeChild(customElement);
  });

  it("should open if closed or close if open the dropdown on toggle()", function (done) {
    var button = customElement.querySelector('#button');
    //open dropdown
    customElement.toggle();
    customElement.addEventListener('shown.bs.dropdown', function () {
      expect(button.parentNode.classList.contains('open')).toBe(true);

      //close dropdown
      customElement.toggle();
    }, false);

    customElement.addEventListener('hidden.bs.dropdown', function () {
      expect(button.parentNode.classList.contains('open')).toBe(false);
    }, false);
    done();
  });

  it("disabled button should not open dropdown", function () {
    var button = customElement.querySelector('.btn');
    button.classList.add('disabled');
    customElement.toggle();
    expect(button.parentNode.classList.contains('open')).toBe(false);
    button.click();
    expect(button.parentNode.classList.contains('open')).toBe(false);
  });

  it("should select an element", function () {
    var buttonText = customElement.querySelector('.btn');
    var item = customElement.querySelector('ul.dropdown-menu > li:nth-child(2) a');
    var result = false;
    expect(buttonText.innerText).toBe('Dropdown');
    expect(item.innerText).toBe('Item 1');
    customElement.addEventListener('itemClicked', function () {
      result = true;
    });
    item.click();
    expect(result).toBe(true);
  });

  it("should not click disabled item", function () {
    var item = customElement.querySelector('ul.dropdown-menu  li.disabled a');
    var result = false;
    // custom event is not fired for disabled item
    customElement.addEventListener('itemClicked', function () {
      result = true;
    });
    item.click();
    expect(result).toBe(false);
  });
});