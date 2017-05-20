'use strict';

describe('Component: CategoryComponent', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var CategoryComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CategoryComponent = $componentController('CategoryComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
