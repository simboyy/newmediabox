'use strict';

describe('Directive: navbarPublic', function () {

  // load the directive's module and view
  beforeEach(module('mediaboxApp'));
  beforeEach(module('components/navbar-public/navbar-public.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<navbar></navbar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the navbarPublic directive');
  }));
});
