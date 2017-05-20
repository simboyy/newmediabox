'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('payment-success', {
        url: '/payment/success',
        templateUrl: 'app/payment/success.html',
        controller: 'PaymentController as payment',
        authenticate: true
      })
      .state('payment-cancel', {
        url: '/payment/cancel',
        templateUrl: 'app/payment/cancel.html',
        controller: 'PaymentController as payment',
        authenticate: true
      })
      .state('payment-error', {
        url: '/payment/error',
        templateUrl: 'app/payment/error.html',
        controller: 'PaymentController as payment',
        authenticate: true
      });
  });
