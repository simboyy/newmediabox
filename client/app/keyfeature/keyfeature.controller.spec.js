'use strict';

describe('Controller: KeyFeatureCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var KeyFeatureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KeyFeatureCtrl = $controller('KeyFeatureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
