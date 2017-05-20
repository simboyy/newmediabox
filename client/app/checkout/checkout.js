'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout?id&msg',
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutController as checkout',
        authenticate: true
      })
      .state('payment/prepare', {
        url: '/payment/prepare',
        authenticate: true
      });
  });
