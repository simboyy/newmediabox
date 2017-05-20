'use strict';

describe('Directive: repeatInput', function () {

  // load the directive's module and view
  beforeEach(module('mediaboxApp'));
  beforeEach(module('components/repeat-input/repeat-input.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<repeat-input></repeat-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the repeatInput directive');
  }));
});
