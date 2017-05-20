'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('brandmg', {
        url: '/brandmg',
        templateUrl: 'app/brandmg/brandmg.html',
        controller: 'BrandMGCtrl',
        authenticate: 'manager'
      });
  });
