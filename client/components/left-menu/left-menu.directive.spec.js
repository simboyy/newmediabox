'use strict';

describe('Directive: leftMenu', function () {

  // load the directive's module and view
  beforeEach(module('mediaboxApp'));
  beforeEach(module('components/left-menu/left-menu.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<left-menu></left-menu>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the leftMenu directive');
  }));
});
