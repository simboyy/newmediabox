'use strict';

angular.module('mediaboxApp')
  .directive('leftMenu', function () {
    return {
      templateUrl: 'components/left-menu/left-menu.html',
      restrict: 'EA',
      controller: 'LeftMenuController as left',
      link: function (scope, element, attrs) {
      }
    };
  });
