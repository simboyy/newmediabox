'use strict';

describe('Directive: userAvatar', function () {

  // load the directive's module and view
  beforeEach(module('crudTable2App'));
  beforeEach(module('components/user-avatar/user-avatar.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-avatar></user-avatar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the userAvatar directive');
  }));
});
