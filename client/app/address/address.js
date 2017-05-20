'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('address', {
        url: '/address?id&msg',
        templateUrl: 'app/address/address.html',
        controller: 'AddressController as address',
        authenticate: true
      })
  });
