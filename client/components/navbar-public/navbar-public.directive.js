'use strict';

angular.module('mediaboxApp')
  .directive('navbarPublic', function () {
    return {
      templateUrl: 'components/navbar-public/navbar-public.html',
      restrict: 'E',
      controller: 'NavbarPublicController',
      controllerAs: 'vm'
    };
  });
