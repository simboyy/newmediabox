'use strict';

describe('Controller: BookCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var BookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookCtrl = $controller('BookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
