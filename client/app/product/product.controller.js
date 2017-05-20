'use strict';

angular.module('mediaboxApp')
  .controller('ProductCtrl', function ($scope) {
    $scope.summary = [
      {field: 'name'},
      {field: 'category'},
      {field: 'active'}
    ];
    $scope.details = [
      {field: 'name'},
      {field: 'category'},
      {field: 'brand'},
      {field: 'active'}
    ];
  });
