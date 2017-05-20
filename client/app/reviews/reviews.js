'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reviews', {
        url: '/reviews',
        templateUrl: 'app/reviews/reviews.html',
        controller: 'ReviewsController as reviews',
        authenticate: true
      })
  });