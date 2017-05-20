'use strict';

describe('Component: wish', function() {
  // load the component's module
  beforeEach(module('mediaboxApp.wish'));

  var wishComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    wishComponent = $componentController('wish', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
