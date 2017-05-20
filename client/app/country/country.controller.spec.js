'use strict';

describe('Controller: CountryCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var CountryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CountryCtrl = $controller('CountryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
