'use strict';

angular.module('mediaboxApp')
  .controller('CountryCtrl', function ($scope) {
    $scope.options = [
      {field: 'name'},
      {field: 'dial_code'},
      {field: 'code'},
      {field: 'active', dataType: 'boolean'}
    ];
  });
