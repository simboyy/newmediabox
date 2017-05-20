'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('keyfeature', {
        url: '/keyfeature',
        templateUrl: 'app/keyfeature/keyfeature.html',
        controller: 'KeyFeatureCtrl',
        authenticate: 'manager'
      });
  });
