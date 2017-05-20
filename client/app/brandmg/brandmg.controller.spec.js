'use strict';

describe('Controller: BrandMGCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var BrandMGCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrandMGCtrl = $controller('BrandMGCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
