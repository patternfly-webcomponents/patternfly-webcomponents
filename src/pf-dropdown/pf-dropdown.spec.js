describe("Patternfly Dropdown Component Test", function () {
  let customElement;

  beforeEach(function (done) {
    customElement = document.createElement('pf-dropdown');
    customElement.innerHTML = '<button class="btn btn-primary dropdown-toggle" type="button" id="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Dropdown<span class="caret"></span></button><ul class="dropdown-menu"><li class="dropdown-header">Header</li><li><a href="#">Item 1</a></li><li><a href="#">Item 2</a></li><li class="disabled"><a href="#">Item 3</a></li><li><a href="#">Item 4</a></li><li class="divider"></li><li><a href="#">Item 5</a></li></ul>';
    document.body.appendChild(customElement);
    if (customElement.initialized) {
      done();
    } else {
      //wait for initialization
      customElement.addEventListener('pf-dropdown.initialized', function (event) {
        done();
      });
    }
  });

  afterEach(function () {
    document.body.removeChild(customElement);
  });

  it("should open if closed or close if open the dropdown on toggle()", function (done) {
    let button = customElement.querySelector('#button');
    //open dropdown
    customElement.toggle();
    customElement.addEventListener('pf-dropdown.shown', function () {
      expect(button.parentNode.classList.contains('open')).toBe(true);

      //close dropdown
      customElement.toggle();
    }, false);

    customElement.addEventListener('pf-dropdown.hidden', function () {
      expect(button.parentNode.classList.contains('open')).toBe(false);
    }, false);
    done();
  });

  it("disabled button should not open dropdown", function () {
    let button = customElement.querySelector('.btn');
    button.classList.add('disabled');
    customElement.toggle();
    expect(button.parentNode.classList.contains('open')).toBe(false);
    button.click();
    expect(button.parentNode.classList.contains('open')).toBe(false);
  });

  it("should select an element", function () {
    let buttonText = customElement.querySelector('.btn');
    let item = customElement.querySelector('ul.dropdown-menu > li:nth-child(2) a');
    let result = false;
    expect(buttonText.innerText).toBe('Dropdown');
    expect(item.innerText).toBe('Item 1');
    customElement.addEventListener('pf-dropdown.itemClicked', function () {
      result = true;
    });
    item.click();
    expect(result).toBe(true);
  });

  it("should not click disabled item", function () {
    let item = customElement.querySelector('ul.dropdown-menu  li.disabled a');
    let result = false;
    // custom event is not fired for disabled item
    customElement.addEventListener('pf-dropdown.itemClicked', function () {
      result = true;
    });
    item.click();
    expect(result).toBe(false);
  });
});