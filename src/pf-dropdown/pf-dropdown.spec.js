describe("Patternfly Dropdown Component Test", function () {
  var customElement;

  beforeEach(function () {
    customElement = document.createElement('pf-dropdown');
    customElement.innerHTML = '<button class="btn btn-primary dropdown-toggle" type="button" id="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Dropdown<span class="caret"></span></button><ul class="dropdown-menu"><li class="dropdown-header">Header</li><li><a href="#">Item 1</a></li><li><a href="#">Item 2</a></li><li class="disabled"><a href="#">Item 3</a></li><li><a href="#">Item 4</a></li><li class="divider"></li><li><a href="#">Item 5</a></li></ul>';
    document.body.appendChild(customElement);
  });

  afterEach(function () {
    document.body.removeChild(customElement);
  });

  it("should open if closed or close if open the dropdown on toggle()", function () {
    var button = document.querySelector('#button');
    //open dropdown
    customElement.toggle();
    customElement.addEventListener('shown.bs.dropdown', function () {
      expect(button.parentNode.classList.contains('open')).toBe(true);

      //close dropdown
      customElement.toggle();
    }, false);

    customElement.addEventListener('hidden.bs.dropdown', function () {
      expect(button.parentNode.classList.contains('open')).toBe(false);
      done();
    }, false);
  });
});