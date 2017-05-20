'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('brandtv', {
        url: '/brandtv',
        templateUrl: 'app/brandtv/brandtv.html',
        controller: 'BrandTVCtrl',
        authenticate: 'manager'
      });
  });
