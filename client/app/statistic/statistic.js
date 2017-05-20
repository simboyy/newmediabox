'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('statistic', {
        url: '/statistic',
        templateUrl: 'app/statistic/statistic.html',
        controller: 'StatisticCtrl',
        authenticate: 'manager'
      });
  });
