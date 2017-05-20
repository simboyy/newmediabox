'use strict';

describe('Controller: BrandTVCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var BrandTVCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrandTVCtrl = $controller('BrandTVCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
