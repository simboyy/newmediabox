'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('review', {
        url: '/review',
        templateUrl: 'app/review/review.html',
        controller: 'ReviewController as review',
        authenticate: true
      })
  });