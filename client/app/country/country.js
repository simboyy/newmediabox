'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('country', {
        url: '/country',
        templateUrl: 'app/country/country.html',
        controller: 'CountryCtrl',
        authenticate: 'manager'
      });
  });
