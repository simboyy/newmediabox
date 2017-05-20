'use strict';

describe('Controller: MediasCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var MediasCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MediasCtrl = $controller('MediasCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
