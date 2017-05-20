'use strict';

angular.module('mediaboxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('payment-method', {
        url: '/payment-method',
        templateUrl: 'app/payment-method/payment-method.html',
        controller: 'PaymentMethodCtrl',
        authenticate: 'admin',
      });
  });
