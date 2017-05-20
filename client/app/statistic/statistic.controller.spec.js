'use strict';

describe('Controller: StatisticCtrl', function () {

  // load the controller's module
  beforeEach(module('mediaboxApp'));

  var FeatureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatisticCtrl = $controller('StatisticCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
