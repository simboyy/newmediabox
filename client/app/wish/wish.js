'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wish', {
        url: '/wish',
        templateUrl: 'app/wish/wish.html',
        controller: 'WishController as wish',
        authenticate: true
      })
  });