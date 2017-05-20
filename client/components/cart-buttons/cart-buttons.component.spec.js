'use strict';

describe('Component: cartButton', function() {
  // load the component's module
  beforeEach(module('mediaboxApp.cartButton'));

  var cartButtonComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    cartButtonComponent = $componentController('cartButton', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
