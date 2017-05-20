'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feature', {
        url: '/feature',
        templateUrl: 'app/feature/feature.html',
        controller: 'FeatureCtrl',
        authenticate: 'manager'
      });
  });
