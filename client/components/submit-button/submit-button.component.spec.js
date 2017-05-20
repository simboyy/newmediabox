'use strict';

describe('Component: submitButton', function() {
  // load the component's module
  beforeEach(module('mediaboxApp.submitButton'));

  var submitButtonComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    submitButtonComponent = $componentController('submitButton', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
