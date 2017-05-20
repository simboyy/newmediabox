'use strict';

angular.module('mediaboxApp')
  .directive('topMenu', function () {
    return {
      templateUrl: 'components/top-menu/top-menu.html',
      restrict: 'E',
      controller: 'TopMenuController',
      controllerAs: 'topmenu'
    };
  });
