'use strict';

describe('Component: rating', function() {
  // load the component's module
  beforeEach(module('mediaboxApp.rating'));

  var ratingComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    ratingComponent = $componentController('rating', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
