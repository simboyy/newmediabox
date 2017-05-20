'use strict';

angular.module('mediaboxApp')
  .controller('PaymentMethodCtrl', function ($scope) {
    $scope.options = [
      {field: 'name', dataType: 'select', options: ['PayPal', 'COD','Stripe']},
      {field: 'email'},
      {field: 'active', dataType: 'boolean'}
    ];
  });
