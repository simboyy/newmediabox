'use strict';

describe('Directive: remoteUnique', function () {

  // load the directive's module
  beforeEach(module('mediaboxApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<remote-unique></remote-unique>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the remoteUnique directive');
  }));
});
